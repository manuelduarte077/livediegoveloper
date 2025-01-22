export interface Theme {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    shadow: string;
    description: string;
  };
}

export const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#0000ff',
    background: '#f5f5f5',
    card: '#ffffff',
    text: '#000000',
    border: '#e0e0e0',
    shadow: '#000000',
    description: '#666666',
  },
};

export const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#6b8aff',
    background: '#121212',
    card: '#1e1e1e',
    text: '#ffffff',
    border: '#2c2c2c',
    shadow: '#000000',
    description: '#a0a0a0',
  },
};
