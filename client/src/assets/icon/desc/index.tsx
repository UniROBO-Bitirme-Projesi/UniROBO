import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

interface DescProps {
  width?: number;
  height?: number;
  color?: string;
}

const Desc: React.FC<DescProps> = ({ width, height, color }) => (
  <Svg
    width={29}
    height={28}
    viewBox="0 0 29 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M2.555 15.12C2.275 15.12 2.06 15.04 1.91 14.88C1.76 14.72 1.685 14.5 1.685 14.22V5.205C1.685 4.915 1.765 4.695 1.925 4.545C2.085 4.385 2.305 4.305 2.585 4.305C2.835 4.305 3.03 4.355 3.17 4.455C3.32 4.545 3.455 4.705 3.575 4.935L7.28 11.79H6.8L10.505 4.935C10.625 4.705 10.755 4.545 10.895 4.455C11.035 4.355 11.23 4.305 11.48 4.305C11.76 4.305 11.975 4.385 12.125 4.545C12.275 4.695 12.35 4.915 12.35 5.205V14.22C12.35 14.5 12.275 14.72 12.125 14.88C11.985 15.04 11.77 15.12 11.48 15.12C11.2 15.12 10.985 15.04 10.835 14.88C10.685 14.72 10.61 14.5 10.61 14.22V7.275H10.94L7.79 13.02C7.69 13.19 7.585 13.315 7.475 13.395C7.365 13.475 7.215 13.515 7.025 13.515C6.835 13.515 6.68 13.475 6.56 13.395C6.44 13.305 6.335 13.18 6.245 13.02L3.065 7.26H3.425V14.22C3.425 14.5 3.35 14.72 3.2 14.88C3.06 15.04 2.845 15.12 2.555 15.12Z"
      fill="#292D32"
    />
    <Path
      d="M16.5 8.5H25.5"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.5 13.5H25.5"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.5 18.5H25.5"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.5 23.5H25.5"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Desc.defaultProps = {
  width: 24,
  height: 25,
  color: 'white',
};

export default Desc;
