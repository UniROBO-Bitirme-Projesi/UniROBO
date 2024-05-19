import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

interface TranslateProps {
  width?: number;
  height?: number;
  color?: string;
}

const Translate: React.FC<TranslateProps> = ({ width, height, color }) => (
  <Svg
    width={25}
    height={24}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M19.56 18.67L17.42 14.4L15.28 18.67"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.67 17.9099H19.19"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M17.42 22.0001C14.62 22.0001 12.34 19.73 12.34 16.92C12.34 14.12 14.61 11.8401 17.42 11.8401C20.22 11.8401 22.5 14.11 22.5 16.92C22.5 19.73 20.23 22.0001 17.42 22.0001Z"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.52 2H9.44C11.51 2 12.51 3.00002 12.46 5.02002V8.94C12.51 11.01 11.51 12.01 9.44 11.96H5.52C3.5 12 2.5 11 2.5 8.92999V5.01001C2.5 3.00001 3.5 2 5.52 2Z"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9.50995 5.84985H5.44995"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.46997 5.16992V5.84991"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.48994 5.83997C8.48994 7.58997 7.11994 9.00995 5.43994 9.00995"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9.5099 9.01001C8.7799 9.01001 8.11991 8.62 7.65991 8"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2.5 15C2.5 18.87 5.63 22 9.5 22L8.45 20.25"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22.5 9C22.5 5.13 19.37 2 15.5 2L16.55 3.75"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Translate.defaultProps = {
  width: 24,
  height: 25,
  color: 'white',
};

export default Translate;
