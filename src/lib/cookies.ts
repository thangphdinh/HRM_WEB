'use client';

import Cookies from 'js-cookie';

export const setAuthCookies = (accessToken: string, refreshToken: string) => {
  Cookies.set('accessToken', accessToken, { path: '/', sameSite: 'Strict' });
  Cookies.set('refreshToken', refreshToken, { path: '/', sameSite: 'Strict' });
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
