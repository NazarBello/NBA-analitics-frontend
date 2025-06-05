import { Component } from '@angular/core';
import {TeamSummary} from '../../models/TeamSummary';
import {TeamService} from '../../services/TeamService';
import {CommonModule, DecimalPipe, PercentPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-teams-page',
  imports: [
    DecimalPipe,
    PercentPipe,
    FormsModule,
    CommonModule
  ],
  templateUrl: './teams-page.component.html',
  styleUrl: './teams-page.component.scss'
})
export class TeamsPageComponent {
// current season (defaults to this year)
  season   = new Date().getFullYear();

  // dynamically build a descending list [2025,2024,…,1970]
  seasons: number[] = [];

  teams: TeamSummary[] = [];

  constructor(private teamsSvc: TeamService) {}

  ngOnInit() {
    // fill seasons from current down to 1970
    const start = 1970;
    const end   = new Date().getFullYear();
    for (let y = end; y >= start; y--) {
      this.seasons.push(y);
    }

    // load the first page of data
    this.loadTeams();
  }

  loadTeams() {
    this.teamsSvc.getBySeason(this.season)
      .subscribe(data => this.teams = data);
  }

  onSeasonChange(s: number) {
    this.season = s;
    this.loadTeams();
  }
}
