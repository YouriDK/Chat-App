import { FC } from 'react';
interface DisplayTextProps {
  text: string;
}
const DisplayText: FC<DisplayTextProps> = ({ text }): JSX.Element => {
  return <span className='display'>{text}</span>;
};
export default DisplayText;
