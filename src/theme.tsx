import { createContext, useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

type Mode = 'light' | 'dark';

interface Tokens {
  grey: { [key: number]: string };
  primary: { [key: number]: string };
  greenAccent: { [key: number]: string };
  redAccent: { [key: number]: string };
  blueAccent: { [key: number]: string };
}

// color design tokens export
export const tokens = (mode: Mode): Tokens => ({
  ...(mode === 'dark'
    ? {
        grey: {
          100: '#f5f5f5',
          200: '#e0e0e0',
          300: '#cccccc',
          400: '#b3b3b3',
          500: '#999999',
          600: '#808080',
          700: '#666666',
          800: '#4d4d4d',
          900: '#333333',
        },
        primary: {
          100: '#d4d7db',
          200: '#a9afb7',
          300: '#7e8892',
          400: '#2b384f',
          500: '#1e273a',
          600: '#192030',
          700: '#131a25',
          800: '#0e131b',
          900: '#080c10',
        },
        greenAccent: {
          100: '#d2f7eb',
          200: '#a5efdd',
          300: '#78e6cf',
          400: '#4bddc1',
          500: '#1fd5b2',
          600: '#19a78e',
          700: '#13796a',
          800: '#0c4b45',
          900: '#062d27',
        },
        redAccent: {
          100: '#fadad9',
          200: '#f5b5b3',
          300: '#f1908c',
          400: '#ec6b66',
          500: '#e7463f',
          600: '#ba382f',
          700: '#8c2a24',
          800: '#5f1c18',
          900: '#2f0e0c',
        },
        blueAccent: {
          100: '#dfe3fb',
          200: '#c0c8f7',
          300: '#a1acf3',
          400: '#828ff0',
          500: '#6373ec',
          600: '#505cb9',
          700: '#3c4691',
          800: '#292f69',
          900: '#151841',
        },
      }
    : {
        grey: {
          100: '#333333',
          200: '#4d4d4d',
          300: '#666666',
          400: '#808080',
          500: '#999999',
          600: '#b3b3b3',
          700: '#cccccc',
          800: '#e0e0e0',
          900: '#f5f5f5',
        },
        primary: {
          100: '#080c10',
          200: '#0e131b',
          300: '#131a25',
          400: '#f3f3f4',
          500: '#2b384f',
          600: '#3f516f',
          700: '#71768c',
          800: '#a9afb7',
          900: '#d4d7db',
        },
        greenAccent: {
          100: '#062d27',
          200: '#0c4b45',
          300: '#13796a',
          400: '#19a78e',
          500: '#1fd5b2',
          600: '#4bddc1',
          700: '#78e6cf',
          800: '#a5efdd',
          900: '#d2f7eb',
        },
        redAccent: {
          100: '#2f0e0c',
          200: '#5f1c18',
          300: '#8c2a24',
          400: '#ba382f',
          500: '#e7463f',
          600: '#ec6b66',
          700: '#f1908c',
          800: '#f5b5b3',
          900: '#fadad9',
        },
        blueAccent: {
          100: '#151841',
          200: '#292f69',
          300: '#3c4691',
          400: '#505cb9',
          500: '#6373ec',
          600: '#828ff0',
          700: '#a1acf3',
          800: '#c0c8f7',
          900: '#dfe3fb',
        },
      }),
});

// mui theme settings
export const themeSettings = (mode: Mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: '#fcfcfc',
            },
          }),
    },
    typography: {
      fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
      fontSize: 12,
      h1: {
        fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
        fontSize: 40,
      },
      h2: {
        fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
        fontSize: 32,
      },
      h3: {
        fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
        fontSize: 24,
      },
      h4: {
        fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
        fontSize: 20,
      },
      h5: {
        fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
        fontSize: 16,
      },
      h6: {
        fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState('dark');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
