// src/app/pages/home-page/home-page.component.ts
import { Component, OnInit } from '@angular/core';
import { TeamService }       from '../../services/TeamService';
import { LeaderService }     from '../../services/LeaderService';
import { TeamStanding }      from '../../models/TeamStanding';
import { Leader }            from '../../models/Leader';
import {CommonModule, DecimalPipe} from '@angular/common';

// 1) Define the exact stat keys you support
type StatKey = 'ppg' | 'apg' | 'rpg' | 'spg' | 'bpg';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  imports: [
    DecimalPipe, CommonModule
  ],
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  // --- Standings state ---
  standings: TeamStanding[] = [];
  season     = new Date().getFullYear();

  // --- Leaders state ---
  seasons: number[] = [2025, 2024, 2023, 2022, 2021];

  // list of keys (typed as StatKey!)
  statKeys: StatKey[] = ['ppg', 'apg', 'rpg', 'spg', 'bpg'];

  // map each key to its display label
  statLabels: Record<StatKey, string> = {
    ppg: 'PPG',
    apg: 'APG',
    rpg: 'RPG',
    spg: 'SPG',
    bpg: 'BPG'
  };

  // the currently‐selected stat
  selectedStat: StatKey = 'ppg';

  leaders: Leader[] = [];

  constructor(
    private teamSvc:   TeamService,
    private leaderSvc: LeaderService
  ) {}

  ngOnInit(): void {
    this.loadStandings();
    this.loadLeaders();
  }

  /** Fetch and display the standings for the current season */
  loadStandings(): void {
    this.teamSvc.getStandings(this.season).subscribe(data => {
      this.standings = data;
    });
  }

  /** Fetch and display the leaders for the current season & stat */
  loadLeaders(): void {
    this.leaderSvc.getLeaders(this.season, this.selectedStat)
      .subscribe(data => {
        this.leaders = data;
      });
  }

  /** Handler when the user picks a different season */
  selectSeason(s: number): void {
    this.season = s;
    this.loadStandings();
    this.loadLeaders();
  }

  /** Handler when the user picks a different stat key */
  selectStat(k: StatKey): void {
    this.selectedStat = k;
    this.loadLeaders();
  }
}
