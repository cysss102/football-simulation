export interface Match {
  homeTeam: string;
  awayTeam: string;
  currentTime: number;
  competition: string;
  score: {
    home: number;
    away: number;
  };
}
