export interface Prediction {
  id: string;
  federation: string;
  match_date: string;
  home_team: string;
  away_team: string;
  prediction: string;
  status: string;
  competition_name: string;
  competition_cluster: string;
  season: string;
  result: string;
  odds: {
    home_win: number;
    draw: number;
    away_win: number;
  };
}