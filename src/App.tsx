import React, { useState, useEffect } from 'react';
import { getPredictions } from './services/api';
import { PredictionCard } from './components/PredictionCard';
import { DatePicker } from './components/DatePicker';
import { ErrorMessage } from './components/ErrorMessage';
import { getValidDateRange, isDateWithinRange } from './utils/dateUtils';
import type { Prediction } from './types/prediction';

function App() {
  const [date, setDate] = useState(getValidDateRange().current);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleDateChange = (newDate: string) => {
    if (!isDateWithinRange(newDate)) {
      setError('Please select a date within 12 hours from now');
      return;
    }
    setDate(newDate);
    setError(null);
  };

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPredictions(date);
        setPredictions(data);
      } catch (err) {
        setError('Failed to fetch predictions. Please try again later.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (isDateWithinRange(date)) {
      fetchPredictions();
    }
  }, [date]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Football Predictions</h1>
            <DatePicker date={date} onDateChange={handleDateChange} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorMessage message={error} />
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : predictions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {predictions.map((prediction) => (
              <PredictionCard key={prediction.id} prediction={prediction} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-700">No predictions available for this date</h2>
            <p className="text-gray-500 mt-2">Try selecting a different date</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;