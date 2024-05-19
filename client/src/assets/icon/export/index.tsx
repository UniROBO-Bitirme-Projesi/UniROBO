import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

interface ExportProps {
  width?: number;
  height?: number;
  color?: string;
}

const Export: React.FC<ExportProps> = ({ width, height, color }) => (
  <Svg
    width={24}
    height={25}
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M9.31995 7L11.8799 4.44L14.4399 7"
      stroke="#CACACA"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11.88 14.68V4.51001"
      stroke="#CACACA"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 12.5C4 16.92 7 20.5 12 20.5C17 20.5 20 16.92 20 12.5"
      stroke="#CACACA"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Export.defaultProps = {
  width: 24,
  height: 25,
  color: 'white',
};

export default Export;
