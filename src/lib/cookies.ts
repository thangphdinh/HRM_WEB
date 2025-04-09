'use client';

import Cookies from 'js-cookie';

export const setAuthCookies = (accessToken: string, refreshToken: string) => {
  Cookies.set('accessToken', accessToken, {
    path: '/',
    sameSite: 'Strict',
    maxAge: 60 * 15, // 15 minutes in seconds
    secure: false, // Set to false for local development, true for production
  });
  Cookies.set('refreshToken', refreshToken, {
    path: '/',
    sameSite: 'Strict',
    maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
    secure: false, // Set to false for local development, true for production
  });
};

export const clearAuthCookies = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
};

export const getAccessToken = (): string | undefined => {
  return Cookies.get('accessToken');
};

export const getRefreshToken = (): string | undefined => {
  return Cookies.get('refreshToken');
};
