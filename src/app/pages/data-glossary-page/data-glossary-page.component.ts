import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';


interface GlossaryItem {
  term: string;
  definition: string;
  category: string; // Used for alphabetical grouping (e.g., 'A', 'T', 'P')
}

interface GlossaryCategory {
  letter: string;
  items: GlossaryItem[];
}

@Component({
  selector: 'app-data-glossary-page',
  imports: [
    NgForOf
  ],
  templateUrl: './data-glossary-page.component.html',
  styleUrl: './data-glossary-page.component.scss'
})
export class DataGlossaryPageComponent implements OnInit {

  // This array holds all your glossary terms and their definitions
  glossaryData: GlossaryItem[] = [
    { term: 'Abbreviation', definition: 'This represents the short form or code used to identify the team, typically a three-letter acronym (e.g., LAL for Los Angeles Lakers).', category: 'A' },
    { term: 'Arena', definition: 'The venue or stadium where the team plays its home games.', category: 'A' },
    { term: 'Attend', definition: 'The total attendance for the games played by the team.', category: 'A' },
    { term: 'AttendG (Attendance per Game)', definition: 'The average attendance per game, indicating the fan support for the team.', category: 'A' },
    { term: 'DRTG (Defensive Rating)', definition: 'The average number of points the team allows per 100 possessions. It evaluates the team\'s defensive efficiency.', category: 'D' },
    { term: 'eFG% (Effective Field Goal Percentage)', definition: 'A variation of field goal percentage that gives extra weight to three-point shots, reflecting the value of shooting beyond the arc.', category: 'E' },
    { term: 'FTFGA (Free Throw per Field Goal Attempt)', definition: 'The ratio of free throws made to field goals attempted. It reflects the team’s ability to earn free throws relative to their field goal attempts.', category: 'F' },
    { term: 'FTR (Free Throw Rate)', definition: 'The ratio of free throws attempted to field goals attempted. A higher FTR indicates a team that drives to the basket more frequently and draws fouls.', category: 'F' },
    { term: 'L (Losses)', definition: 'The number of games the team has lost in the season.', category: 'L' },
    { term: 'MOV (Margin of Victory)', definition: 'The average point difference between the team\'s wins and losses, often used to evaluate how dominant a team is in their games.', category: 'M' },
    { term: 'NRTG (Net Rating)', definition: 'The difference between the team\'s offensive and defensive ratings (ORTG - DRTG), showing the team\'s overall efficiency.', category: 'N' },
    { term: 'Opp DRB% (Opponent Defensive Rebound Percentage)', definition: 'The percentage of available defensive rebounds the opposing team grabs. Lower percentages indicate better rebounding by the defending team.', category: 'O' },
    { term: 'Opp eFG% (Opponent Effective Field Goal Percentage)', definition: 'The effective field goal percentage of the opposing team, providing an insight into how well the team defends shots.', category: 'O' },
    { term: 'Opp FT/FGA (Opponent Free Throw per Field Goal Attempt)', definition: 'The ratio of free throws made to field goals attempted by the opposing team, reflecting how often they earn free throws relative to their shooting attempts.', category: 'O' },
    { term: 'Opp TOV% (Opponent Turnover Percentage)', definition: 'The percentage of the opposing team\'s possessions that end in a turnover. Lower percentages are better for the defending team.', category: 'O' },
    { term: 'ORB% (Offensive Rebound Percentage)', definition: 'The percentage of available offensive rebounds the team grabs. A higher value indicates a stronger presence on the boards.', category: 'O' },
    { term: 'ORTG (Offensive Rating)', definition: 'The average number of points the team scores per 100 possessions. It evaluates the team\'s offensive efficiency.', category: 'O' },
    { term: 'Pace', definition: 'A metric indicating the number of possessions a team uses per game. A higher pace means the team plays faster, and a lower pace indicates slower play.', category: 'P' },
    { term: 'PL (Playoff Losses)', definition: 'The number of games the team has lost in the playoffs, if applicable.', category: 'P' },
    { term: 'Playoffs', definition: 'Indicates whether the team has made it to the playoffs for the current season. \'Y\' stands for Yes, and \'N\' stands for No.', category: 'P' },
    { term: 'PW (Playoff Wins)', definition: 'The number of games the team has won in the playoffs, if applicable.', category: 'P' },
    { term: 'SOS (Strength of Schedule)', definition: 'A measure of the difficulty of the team\'s opponents, reflecting how tough the team\'s schedule has been.', category: 'S' },
    { term: 'SRS (Simple Rating System)', definition: 'A rating that combines a team\'s average point margin (MOV) and strength of schedule (SOS), providing a measure of overall team performance.', category: 'S' },
    { term: 'Team', definition: 'The full name of the team (e.g., Los Angeles Lakers, Boston Celtics).', category: 'T' },
    { term: 'TOV% (Turnover Percentage)', definition: 'The percentage of possessions that end in a turnover. Lower percentages are better, indicating better ball control.', category: 'T' },
    { term: 'TS% (True Shooting Percentage)', definition: 'A shooting efficiency metric that considers field goals, three-point field goals, and free throws, providing a more accurate measure of scoring efficiency.', category: 'T' },
    { term: 'W (Wins)', definition: 'The number of games the team has won in the season.', category: 'W' },
    { term: 'X3PAr (Three-Point Attempt Rate)', definition: 'The proportion of the team’s field goal attempts that come from beyond the three-point line.', category: 'X' },
  ];

  groupedGlossaryData: GlossaryCategory[] = [];

  constructor() { }

  ngOnInit(): void {
    this.groupAndSortGlossaryData();
  }

  private groupAndSortGlossaryData(): void {
    const groups: { [key: string]: GlossaryItem[] } = {};

    this.glossaryData.forEach(item => {
      const categoryLetter = item.category.toUpperCase();
      if (!groups[categoryLetter]) {
        groups[categoryLetter] = [];
      }
      groups[categoryLetter].push(item);
    });

    this.groupedGlossaryData = Object.keys(groups)
      .sort()
      .map(letter => ({
        letter: letter,
        items: groups[letter].sort((a, b) => a.term.localeCompare(b.term))
      }));
  }
}
