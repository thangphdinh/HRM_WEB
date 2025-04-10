'use client';

import Cookies from 'js-cookie';

export const setAuthCookies = (accessToken: string, refreshToken: string, rememberMe: boolean) => {
  Cookies.set('accessToken', accessToken, {
    path: '/',
    sameSite: 'Strict',
    expires: rememberMe ? 1 : 1/24/60*15, // 1 day if rememberMe is true, otherwise 15 minutes
    secure: false, // Set to false for local development, true for production
  });
  Cookies.set('refreshToken', refreshToken, {
    path: '/',
    sameSite: 'Strict',
    expires: 7, // 7 days for refresh token
    secure: false, // Set to false for local development, true for production
  });
  Cookies.set("rememberMe", rememberMe.toString(), {
    path: "/",
    sameSite: "Strict",
    secure: false,
  });
  
};

export const clearAuthCookies = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  Cookies.remove('rememberMe');
};

export const getAccessToken = (): string | undefined => {
  return Cookies.get('accessToken');
};

export const getRefreshToken = (): string | undefined => {
  return Cookies.get('refreshToken');
};
