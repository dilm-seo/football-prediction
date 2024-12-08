import axios, { AxiosError } from 'axios';
import { Prediction } from '../types/prediction';

const API_HOST = 'football-prediction-api.p.rapidapi.com';
const API_KEY = 'ec270c7251msh7b49a329e230233p11ccaajsn298e2c9c191d';

const api = axios.create({
  baseURL: 'https://football-prediction-api.p.rapidapi.com/api/v2',
  headers: {
    'x-rapidapi-host': API_HOST,
    'x-rapidapi-key': API_KEY,
  },
});

const parseOdds = (odds: any) => {
  if (!odds) return { home_win: 0, draw: 0, away_win: 0 };
  
  return {
    home_win: parseFloat(odds.home_win) || 0,
    draw: parseFloat(odds.draw) || 0,
    away_win: parseFloat(odds.away_win) || 0,
  };
};

const parsePrediction = (pred: string): string => {
  switch (pred?.toLowerCase()) {
    case '1':
      return 'Home Win';
    case 'x':
      return 'Draw';
    case '2':
      return 'Away Win';
    default:
      return pred || 'No prediction';
  }
};

export const getPredictions = async (date: string): Promise<Prediction[]> => {
  try {
    const response = await api.get('/predictions', {
      params: {
        market: 'classic',
        iso_date: date,
        federation: 'UEFA',
      },
    });

    if (!response.data.data) {
      throw new Error('No prediction data received');
    }

    return response.data.data.map((prediction: any) => ({
      id: prediction.id || String(Math.random()),
      federation: prediction.federation || 'Unknown',
      match_date: prediction.match_date || date,
      home_team: prediction.home_team || 'Unknown Team',
      away_team: prediction.away_team || 'Unknown Team',
      prediction: parsePrediction(prediction.prediction),
      status: prediction.status || 'Unknown',
      competition_name: prediction.competition_name || 'Unknown Competition',
      competition_cluster: prediction.competition_cluster || '',
      season: prediction.season || '',
      result: prediction.result || 'Pending',
      odds: parseOdds(prediction.odds),
    }));
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data?.errors) {
      console.error('API Error:', error.response.data);
      throw new Error(Object.values(error.response.data.errors)[0] as string);
    } else {
      console.error('Error fetching predictions:', error);
      throw new Error('Failed to fetch predictions');
    }
  }
};