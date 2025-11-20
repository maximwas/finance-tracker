import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function getFirstNameAndLastName(fullName: string): {
  firstName: string;
  lastName: string;
} {
  const names = fullName.trim().split(' ');
  const firstName = names.at(0) || '';
  const lastName = names.length > 1 ? names.slice(1).join(' ') : '';

  return {
    firstName,
    lastName,
  };
}
