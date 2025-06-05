export interface PlayerSeasonTotal {
  playerId: number;
  season: number;
  seasId: number; // Season ID
  player: string; // Player's Name
  birthYear: number;
  pos: string; // Position
  age: number;
  experience: number;
  lg: string; // League (e.g., NBA)
  tm: string; // Team Abbreviation
  g: number; // Games Played
  gs: number; // Games Started
  mp: number; // Minutes Played Per Game
  fg: number; // Field Goals Per Game
  fga: number; // Field Goal Attempts Per Game
  fgPercent: number; // Field Goal Percentage
  x3p: number; // 3-Point Field Goals Per Game (using 'x' to avoid starting with a number)
  x3pa: number; // 3-Point Field Goal Attempts Per Game
  x3pPercent: number; // 3-Point Field Goal Percentage
  x2p: number; // 2-Point Field Goals Per Game
  x2pa: number; // 2-Point Field Goal Attempts Per Game
  x2pPercent: number; // 2-Point Field Goal Percentage
  eFgPercent: number; // Effective Field Goal Percentage
  ft: number; // Free Throws Per Game
  fta: number; // Free Throw Attempts Per Game
  ftPercent: number; // Free Throw Percentage
  orb: number; // Offensive Rebounds Per Game
  drb: number; // Defensive Rebounds Per Game
  trb: number; // Total Rebounds Per Game
  ast: number; // Assists Per Game
  stl: number; // Steals Per Game
  blk: number; // Blocks Per Game
  tov: number; // Turnovers Per Game
  pf: number; // Personal Fouls Per Game
  pts: number; // Points Per Game
}
