import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface WelcomeProps {
  width?: number;
  height?: number;
}

const Google: React.FC<WelcomeProps> = ({ width, height }) => {
  return (
    <Svg width="20" height="20" viewBox="0 0 48 48">
      <Path
        fill="#4285F4"
        d="M24 9.5c3.15 0 5.97 1.17 8.22 3.08L38.86 6C34.87 2.54 30.13 0.5 24 0.5 14.8 0.5 7 6.88 4.01 15.44l9.39 7.29C14.52 18.12 18.85 14.5 24 14.5z"
      />
      <Path
        fill="#34A853"
        d="M46.5 24.5c0-1.8-.2-3.52-.55-5.18H24v9.82h12.67c-1.24 3.08-3.19 5.71-5.61 7.49l9.1 7.06C45.23 39.09 46.5 32.21 46.5 24.5z"
      />
      <Path
        fill="#FBBC05"
        d="M14.4 28.26l-9.39-7.29C3.23 23.49 2.5 26.91 2.5 30.5c0 3.59.73 7.01 2.51 9.53l9.38-7.27c-1.22-1.95-1.92-4.27-1.92-6.77 0-2.5.7-4.82 1.93-6.78z"
      />
      <Path
        fill="#EA4335"
        d="M24 47.5c6.13 0 11.33-2.06 15.11-5.56l-9.11-7.05c-2.19 1.48-4.94 2.36-8.01 2.36-5.15 0-9.48-3.62-10.86-8.45l-9.38 7.27C7 41.12 14.8 47.5 24 47.5z"
      />
    </Svg>
  );
};

Google.defaultProps = {
  width: 20,
  height: 20,
};

export default Google;
