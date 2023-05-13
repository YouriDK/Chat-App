import { FC } from 'react';
import { ClimbingBoxLoader, HashLoader } from 'react-spinners';

interface LoadingBoxProps {
  Icon?: boolean;
  color?: string;
  size?: number;
}
const LoadingBox: FC<LoadingBoxProps> = ({
  Icon,
  color,
  size,
}): JSX.Element => {
  return Icon ? (
    <HashLoader color={color} loading size={size} />
  ) : (
    <ClimbingBoxLoader color='#2ec4b6' loading size={30} />
  );
};
export default LoadingBox;
