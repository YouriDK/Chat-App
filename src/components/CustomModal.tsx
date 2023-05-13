import { FC } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';

interface CustomModalProps {
  text: string;
  display: boolean;
  value?: string;
  change: Function;
  isOpen: boolean;
  handleOpen: Function;
  title?: string | 'Actions';
  fullscreen?: string;
}

const CustomModal: FC<CustomModalProps> = ({
  text,
  title,
  display,
  value,
  change,
  isOpen,
  handleOpen,
  fullscreen,
}): JSX.Element => {
  return display ? (
    <Modal
      // fullscreen={fullscreen}
      size='sm'
      isOpen={isOpen}
      toggle={() => handleOpen(!isOpen)}
    >
      <ModalHeader toggle={() => handleOpen(!isOpen)}>{title}</ModalHeader>
      <ModalBody>{text}</ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={() => handleOpen(!isOpen)}>
          Got it
        </Button>
      </ModalFooter>
    </Modal>
  ) : (
    <Modal
      // fullscreen={fullscreen}
      size='sm'
      isOpen={isOpen}
      toggle={() => handleOpen(!isOpen)}
    >
      <ModalHeader toggle={() => handleOpen(!isOpen)}>{title}</ModalHeader>
      <ModalBody>
        <Input
          value={value}
          onChange={(e) => change(e.target.value)}
          placeholder={text}
        />
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={() => handleOpen(!isOpen)}>
          Submit
        </Button>
        <Button onClick={() => handleOpen(!isOpen)}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};
export default CustomModal;
