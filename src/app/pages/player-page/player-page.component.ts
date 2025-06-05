import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '../../services/PlayerService';
import { PlayerSeasonTotal } from '../../models/PlayerSeasonTotal';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-player-page',
  templateUrl: './player-page.component.html',
  imports: [
    NgIf,
    NgForOf
  ],
  styleUrls: ['./player-page.component.scss']
})
export class PlayerPageComponent implements OnInit, OnDestroy {

  playerDisplayName: string | null = null;
  playerSeasons: PlayerSeasonTotal[] = []; // Change from single object to an array of seasons
  private routeSubscription!: Subscription;

  // Define headers for the table to make them easily configurable
  // This array will dictate the order and display names of your columns
  tableHeaders = [
    { key: 'season', label: 'Season' },
    { key: 'age', label: 'Age' },
    { key: 'tm', label: 'Tm' },
    { key: 'lg', label: 'Lg' },
    { key: 'pos', label: 'Pos' },
    { key: 'g', label: 'G' },
    { key: 'gs', label: 'GS' },
    { key: 'mp', label: 'MP' },
    { key: 'fg', label: 'FG' },
    { key: 'fga', label: 'FGA' },
    { key: 'fgPercent', label: 'FG%' },
    { key: 'x3p', label: '3P' },
    { key: 'x3pa', label: '3PA' },
    { key: 'x3pPercent', label: '3P%' },
    { key: 'x2p', label: '2P' },
    { key: 'x2pa', label: '2PA' },
    { key: 'x2pPercent', label: '2P%' },
    { key: 'eFgPercent', label: 'eFG%' },
    { key: 'ft', label: 'FT' },
    { key: 'fta', label: 'FTA' },
    { key: 'ftPercent', label: 'FT%' },
    { key: 'orb', label: 'ORB' },
    { key: 'drb', label: 'DRB' },
    { key: 'trb', label: 'TRB' },
    { key: 'ast', label: 'AST' },
    { key: 'stl', label: 'STL' },
    { key: 'blk', label: 'BLK' },
    { key: 'tov', label: 'TOV' },
    { key: 'pf', label: 'PF' },
    { key: 'pts', label: 'PTS' },
    // Removed playerId, seasId, birthYear, experience as per request or common display practice
    // You can add 'birthYear', 'experience' back if desired in your headers or in a separate player info card
  ];

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.pipe(
      switchMap(params => {
        const playerName = params.get('playerName');
        if (playerName) {
          this.playerDisplayName = decodeURIComponent(playerName.replace(/-/g, ' '));
          console.log('PlayerPageComponent: Loading data for:', this.playerDisplayName);

          // Fetch ALL seasons for the player
          return this.playerService.searchPlayers(this.playerDisplayName);
        } else {
          this.playerDisplayName = null;
          this.playerSeasons = []; // Clear seasons if no player name
          return [];
        }
      })
    ).subscribe(
      (players: PlayerSeasonTotal[]) => {
        if (players && players.length > 0) {
          // Sort the seasons by year in descending order (latest season first)
          this.playerSeasons = players.sort((a, b) => b.season - a.season);
          console.log('Fetched player seasons:', this.playerSeasons);
        } else {
          this.playerSeasons = [];
          console.log('No season data found for player:', this.playerDisplayName);
        }
      },
      error => {
        console.error('Error fetching player details:', error);
        this.playerSeasons = [];
      }
    );
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  // Helper to get value dynamically using bracket notation
  getStatValue(playerSeason: PlayerSeasonTotal, key: string): any {
    // Special handling for percentages to ensure correct formatting
    if (key.endsWith('Percent')) {
      return (playerSeason as any)[key] ? (playerSeason as any)[key].toFixed(3) : 'N/A';
    }
    // Specific formatting for minutes played
    if (key === 'mp') {
      return (playerSeason as any)[key] ? (playerSeason as any)[key].toFixed(1) : 'N/A';
    }
    // Return numeric stats as they are, or 'N/A' if null/undefined
    const value = (playerSeason as any)[key];
    return typeof value === 'number' ? parseFloat(value.toFixed(1)) : value || 'N/A';
  }
}
