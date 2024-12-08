import React from 'react';
import { format, parseISO, isValid } from 'date-fns';
import { Trophy, Calendar, TrendingUp } from 'lucide-react';
import { Prediction } from '../types/prediction';

interface PredictionCardProps {
  prediction: Prediction;
}

export const PredictionCard: React.FC<PredictionCardProps> = ({ prediction }) => {
  const formatMatchDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      if (!isValid(date)) {
        return 'Invalid date';
      }
      return format(date, 'PPP');
    } catch (error) {
      return 'Invalid date';
    }
  };

  const getOddsColor = (odds: number) => {
    if (odds === 0) return 'text-gray-400';
    if (odds < 2) return 'text-green-600';
    if (odds < 3) return 'text-blue-600';
    return 'text-red-600';
  };

  const formatOdds = (odds: number) => {
    return odds === 0 ? '-' : odds.toFixed(2);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-gray-700">{prediction.competition_name}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>{formatMatchDate(prediction.match_date)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="text-center flex-1">
          <h3 className="font-bold text-lg text-gray-800">{prediction.home_team}</h3>
          <p className="text-sm text-gray-500">Home</p>
        </div>
        <div className="text-center px-4">
          <span className="text-2xl font-bold text-gray-700">vs</span>
        </div>
        <div className="text-center flex-1">
          <h3 className="font-bold text-lg text-gray-800">{prediction.away_team}</h3>
          <p className="text-sm text-gray-500">Away</p>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="font-medium text-gray-700">Prediction:</span>
          </div>
          <span className={`font-semibold px-3 py-1 rounded-full ${
            prediction.prediction.includes('Home') ? 'bg-green-100 text-green-800' :
            prediction.prediction.includes('Draw') ? 'bg-blue-100 text-blue-800' :
            'bg-red-100 text-red-800'
          }`}>
            {prediction.prediction}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="text-center p-2 bg-gray-50 rounded">
            <p className="text-sm text-gray-600">Home Win</p>
            <p className={`font-bold ${getOddsColor(prediction.odds.home_win)}`}>
              {formatOdds(prediction.odds.home_win)}
            </p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded">
            <p className="text-sm text-gray-600">Draw</p>
            <p className={`font-bold ${getOddsColor(prediction.odds.draw)}`}>
              {formatOdds(prediction.odds.draw)}
            </p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded">
            <p className="text-sm text-gray-600">Away Win</p>
            <p className={`font-bold ${getOddsColor(prediction.odds.away_win)}`}>
              {formatOdds(prediction.odds.away_win)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};