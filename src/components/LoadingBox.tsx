import { FC } from 'react';
import { ClimbingBoxLoader, HashLoader } from 'react-spinners';
import { CSS } from '../Types/Spinners';

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
    <HashLoader color={color} loading /*css={CSS}*/ size={size} />
  ) : (
    <ClimbingBoxLoader color='#2ec4b6' loading /*css={CSS}*/ size={30} />
  );
};
export default LoadingBox;
