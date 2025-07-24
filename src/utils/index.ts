import { v4 as uuidv4 } from 'uuid';

export const generateId = (): string => uuidv4();

export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};

// Accessibility helpers
export const getAriaLabel = (action: string, item: string): string => {
  return `${action} ${item}`;
};

export const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case 'mild':
    case 'mild-intolerance':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'moderate-intolerance':
    case 'strong':
      return 'text-orange-600 bg-orange-50 border-orange-200';
    case 'severe-allergy':
      return 'text-red-600 bg-red-50 border-red-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

export const getSeverityIcon = (severity: string): string => {
  switch (severity) {
    case 'mild':
    case 'mild-intolerance':
      return '⚠️';
    case 'moderate-intolerance':
    case 'strong':
      return '🚫';
    case 'severe-allergy':
      return '🚨';
    default:
      return 'ℹ️';
  }
};
