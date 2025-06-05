import { Component, OnInit, OnDestroy } from '@angular/core'; // Import OnInit and OnDestroy
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { filter } from 'rxjs';
import { NgIf } from '@angular/common';
import { GlobalPlayerSearchComponent } from './pages/global-player-search/global-player-search.component';
import { Subscription } from 'rxjs'; // Import Subscription for ngOnDestroy

@Component({
  selector: 'app-root',
  standalone: true, // Assuming this is correct from your provided file
  imports: [RouterOutlet, SidebarComponent, NgIf, GlobalPlayerSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy { // Implement OnInit and OnDestroy
  title = 'nba-analitics-frontend';

  showSidebar = true;
  showGlobalSearch = true;

  private routerSubscription!: Subscription; // Declare a subscription to manage cleanup

  constructor(private router: Router) { } // Constructor remains clean, subscriptions in ngOnInit

  ngOnInit(): void {
    // Subscribe to router events when the component initializes
    this.routerSubscription = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        const url = e.urlAfterRedirects;
        const isLoginPage = url.startsWith('/login');

        this.showSidebar = !isLoginPage;
        this.showGlobalSearch = !isLoginPage;

        // --- DEBUGGING LOGS (keep these temporarily) ---
        console.log('--- App Component Debugging (Router Event) ---');
        console.log('Current URL (urlAfterRedirects):', url);
        console.log('Is login page:', isLoginPage);
        console.log('showSidebar:', this.showSidebar);
        console.log('showGlobalSearch:', this.showGlobalSearch);
        console.log('-------------------------------------------');
        // --- END DEBUGGING LOGS ---
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks when the component is destroyed
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }


  handleGlobalPlayerSelection(playerName: string): void {
    // --- ADD THIS CONSOLE.LOG ---
    console.log('AppComponent: Received playerSelected event. Navigating to:', playerName);
    // --- END CONSOLE.LOG ---

    // It's important to encode the player name for the URL, especially for names with spaces or special characters
    // Replace spaces with hyphens for cleaner URLs, then encode the whole string
    const encodedPlayerName = encodeURIComponent(playerName.replace(/ /g, '-'));

    this.router.navigate(['/players', encodedPlayerName]);
    console.log(`AppComponent: Attempting to navigate to /players/${encodedPlayerName}`);
  }
}
