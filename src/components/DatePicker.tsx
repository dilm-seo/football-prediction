import React from 'react';
import { Calendar } from 'lucide-react';
import { getValidDateRange } from '../utils/dateUtils';

interface DatePickerProps {
  date: string;
  onDateChange: (date: string) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({ date, onDateChange }) => {
  const { min, max } = getValidDateRange();

  return (
    <div className="flex flex-col space-y-1">
      <div className="flex items-center space-x-2">
        <Calendar className="w-5 h-5 text-gray-600" />
        <input
          type="date"
          value={date}
          min={min}
          max={max}
          onChange={(e) => onDateChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <p className="text-sm text-gray-500">
        Predictions available within 12 hours
      </p>
    </div>
  );
};