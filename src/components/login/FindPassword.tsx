import styled from 'styled-components';
import { useState } from 'react';
import { getAuth, sendPasswordResetEmail} from 'firebase/auth';
import { Button, Modal, Form} from 'react-bootstrap';

function FindPassword() {
    const [show, setShow] = useState(false); // 모달 boolen
    const [findPassword, setFindPassword] = useState("")
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // 클라이언트 비밀번호 받기
    const onFindPassord = (e: { target: { value: string; }; }) => {
        const {
            target: { value },
        } = e;
        setFindPassword(value);
    }

    // 비밀번호 찾기 요청
    const changePasswordUsingEmail = async () => {
      try {
        const auth = getAuth();
        await sendPasswordResetEmail(auth, findPassword);
        alert('이메일로 비밀번호 재설정 메일을 보냈습니다. 변경 후 로그인 해주세요');
        handleClose()
      } catch ({ code, message }: any) {
        if (message === "Firebase: Error (auth/user-not-found).") {
          alert("아이디가 없습니다. 확인해주세요");
        } else if (message === "Firebase: Error (auth/invalid-email).") {
          alert("이메일 형태로 작성해주세요.")
        }
      }
    };

    return (
        <>
        <FindPasswordBtn
            className='ms-auto'
            variant="light"
            onClick={handleShow}
        >
            비밀번호찾기
        </FindPasswordBtn>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
            <Modal.Title>비밀번호 찾기</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>비밀번호 찾을 아이디를 입력해주세요</Form.Label>
                    <Form.Control name="email" type="email" placeholder="아이디를 입력해주세요." onChange={onFindPassord} required />
                    <Explanation> &nbsp; 이메일로 비밀번호 변경 링크가 전송됩니다.</Explanation>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                취소
            </Button>
            <Button variant="primary" onClick={changePasswordUsingEmail}>
                확인
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default FindPassword;

const Explanation = styled.span`
    font-size: 12px;
    color: rgb(255, 90, 90);
    font-weight: 900;
`

const FindPasswordBtn = styled(Button)`
    margin-top: 10px;
`;