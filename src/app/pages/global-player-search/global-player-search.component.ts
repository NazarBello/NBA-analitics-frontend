import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { PlayerService } from '../../services/PlayerService'; // Adjust path
import { PlayerSeasonTotal } from '../../models/PlayerSeasonTotal'; // Adjust path
import { Subject, Subscription, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common'; // Import Router for navigation

@Component({
  selector: 'app-global-player-search',
  templateUrl: './global-player-search.component.html',
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./global-player-search.component.scss']
})
export class GlobalPlayerSearchComponent implements OnInit, OnDestroy {

  searchTerm: string = '';
  suggestions: string[] = [];
  showSuggestions: boolean = false;

  private searchInputSubject = new Subject<string>();
  private searchSubscription!: Subscription;

  // Emit event when a player is selected
  @Output() playerSelected = new EventEmitter<string>();

  constructor(private playerService: PlayerService, private router: Router) { }

  ngOnInit(): void {
    this.searchSubscription = this.searchInputSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((name: string) => {
        if (name.length < 2) {
          this.showSuggestions = false;
          return of([]);
        }
        this.showSuggestions = true;
        return this.playerService.searchPlayers(name).pipe(
          map(players => {
            const uniqueNames = new Set<string>();
            players.forEach(p => uniqueNames.add(p.player));
            return Array.from(uniqueNames).sort();
          }),
          catchError(error => {
            console.error('Error fetching player suggestions:', error);
            this.showSuggestions = false;
            return of([]);
          })
        );
      })
    ).subscribe(names => {
      this.suggestions = names;
    });
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  onSearchInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value;
    if (this.searchTerm.length === 0) {
      this.suggestions = [];
      this.showSuggestions = false;
    }
    this.searchInputSubject.next(this.searchTerm);
  }

  selectSuggestion(suggestion: string): void {
    this.searchTerm = suggestion;
    this.showSuggestions = false;
    this.suggestions = [];
    console.log('Global Search: Selected Player:', suggestion);

    // Emit the selected player name
    this.playerSelected.emit(suggestion);

    // Optionally, navigate directly to the player details page
    // Note: You might want to URL-encode the player name if it contains special characters
    this.router.navigate(['/players', suggestion.replace(/ /g, '-')]); // Example: "LeBron James" -> "LeBron-James"
  }

  onBlur(): void {
    // Small delay to allow click event on suggestion to fire before hiding
    setTimeout(() => {
      this.showSuggestions = false;
      this.suggestions = []; // Clear suggestions after blur for a clean state
    }, 150);
  }

  onFocus(): void {
    // If there's already text, re-trigger a search or show previous suggestions
    if (this.searchTerm.length >= 2) {
      this.searchInputSubject.next(this.searchTerm); // Re-run search for current term
      this.showSuggestions = true;
    }
  }
}
