import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

interface EditProps {
  width?: number;
  height?: number;
  color?: string;
}

const Edit: React.FC<EditProps> = ({ width, height, color }) => (
  <Svg
    width={25}
    height={24}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M13.76 3.59997L5.54997 12.29C5.23997 12.62 4.93997 13.27 4.87997 13.72L4.50997 16.96C4.37997 18.13 5.21997 18.93 6.37997 18.73L9.59997 18.18C10.05 18.1 10.68 17.77 10.99 17.43L19.2 8.73997C20.62 7.23997 21.26 5.52997 19.05 3.43997C16.85 1.36997 15.18 2.09997 13.76 3.59997Z"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.39 5.04999C12.82 7.80999 15.06 9.91999 17.84 10.2"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3.5 22H21.5"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Edit.defaultProps = {
  width: 24,
  height: 25,
  color: 'white',
};

export default Edit;
