import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

interface ArrowLeftProps {
  width?: number;
  height?: number;
  color?: string;
}

const ArrowLeft: React.FC<ArrowLeftProps> = ({ width, height, color }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M9.57 6.42999L3.5 12.5L9.57 18.57"
      stroke={color}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20.5 12.5H3.67004"
      stroke={color}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

ArrowLeft.defaultProps = {
  width: 24,
  height: 25,
  color: '#292D32',
};

export default ArrowLeft;
