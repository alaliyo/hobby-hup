import { Modal, Form, Button } from "react-bootstrap";

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
      <Modal.Header closeButton>
        <Modal.Title>비밀번호 입력</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="password">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          취소
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          확인
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PasswordModal;