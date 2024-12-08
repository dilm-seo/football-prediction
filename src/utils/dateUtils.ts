import { addHours, subHours, startOfDay, endOfDay } from 'date-fns';

export const getValidDateRange = () => {
  const now = new Date();
  const minDate = startOfDay(subHours(now, 12));
  const maxDate = endOfDay(addHours(now, 12));
  
  return {
    min: minDate.toISOString().split('T')[0],
    max: maxDate.toISOString().split('T')[0],
    current: now.toISOString().split('T')[0]
  };
};

export const isDateWithinRange = (date: string) => {
  const { min, max } = getValidDateRange();
  return date >= min && date <= max;
};