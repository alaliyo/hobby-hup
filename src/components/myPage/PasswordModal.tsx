import { Modal, Form, Button } from "react-bootstrap";
import styled from "styled-components";

interface PasswordModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: () => void;
  password: string;
  setPassword: (password: string) => void;
}

function PasswordModal({
  show,
  onClose,
  onSubmit,
  password,
  setPassword,
}: PasswordModalProps) {
  const handleKeyPress = (e: { key: string; }) => {
    if (e.key === 'Enter') {
      onSubmit()
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <ModalHeader closeButton>
        <ModalTitle>비밀번호 입력</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form.Group controlId="password">
          <FormLabel>비밀번호</FormLabel>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </Form.Group>
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={onClose}>
          취소
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          확인
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default PasswordModal;

const ModalHeader = styled(Modal.Header)`
  @media screen and (max-width: 600px) {
    padding: 10px;
  }
  @media screen and (max-width: 600px) {
    padding: 9px;
  }
`;

const ModalTitle = styled(Modal.Title)`
  @media screen and (max-width: 600px) {
    font-size: 20px;
  }
  @media screen and (max-width: 450px) {
    font-size: 16px;
  }
`;

const ModalBody = styled(Modal.Body)`
  @media screen and (max-width: 600px) {
    padding: 12px;
  }
  input {
    @media screen and (max-width: 600px) {
      font-size: 14px;
    }
    @media screen and (max-width: 450px) {
      font-size: 12px;
    }
  }
`;

const FormLabel = styled(Form.Label)`
  @media screen and (max-width: 450px) {
      font-size: 14px;
    }
`;

const ModalFooter = styled(Modal.Footer)`
  @media screen and (max-width: 600px) {
    padding: 10px;
  }
  @media screen and (max-width: 450px) {
    padding: 8px;
  }
  button {
    @media screen and (max-width: 600px) {
      padding: 4px 10px;
    }
    @media screen and (max-width: 450px) {
      font-size: 14px;
      padding: 4px 12px;
    }
  }
`;