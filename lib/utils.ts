import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import Cookies from 'js-cookie'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fetcher = async (url: string) => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('Token not found. Please log in.');
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch user data');
  }

  return response.json();
};
export const getApiUrl = (url: string) => {
  return `${process.env.NEXT_PUBLIC_DATABASE_URL}/${url}`
}

// lib/utils.ts
// lib/utils.ts
export const getFormattedDate = (createdAt: string, updatedAt: string): string => {
  const createdDate = new Date(createdAt);
  const updatedDate = new Date(updatedAt);
  const now = new Date();

  const diffInMilliseconds = now.getTime() - createdDate.getTime();
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);

  let formattedDate = '';

  if (diffInSeconds < 60) {
    formattedDate = 'just now';
  } else if (diffInMinutes < 60) {
    formattedDate = `${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    formattedDate = `${diffInHours}h ago`;
  } else {
    formattedDate = createdDate.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  // Tambahkan "(edited)" jika post telah di-edit
  if (createdDate.getTime() !== updatedDate.getTime()) {
    formattedDate += ' (edited)';
  }

  return formattedDate;
};

export const isOwnPost = (postUserId: number, currentUserId: number): boolean => {
  return postUserId === currentUserId;
};
