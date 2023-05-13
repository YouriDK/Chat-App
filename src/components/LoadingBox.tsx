import { FC } from 'react';
import { ClimbingBoxLoader, PuffLoader } from 'react-spinners';

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
    <div style={{ margin: 'auto' }}>
      <PuffLoader color={color} loading size={size ?? 200} />
    </div>
  ) : (
    <ClimbingBoxLoader color='#2ec4b6' loading size={30} />
  );
};
export default LoadingBox;
