import { Button } from 'react-bootstrap';
import { authService } from '../../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import  GoogleIcon from '../../imgs/GoogleIcon.png';
import styled from 'styled-components';

function GoogleSignUp() {
    const handleGoogleSignUp = async () => {
        const provider = new GoogleAuthProvider();
        try {
          await signInWithPopup(authService, provider);
          // 회원 가입 성공 시 처리할 로직 추가
        } catch (error) {
          // 회원 가입 실패 시 처리할 로직 추가
        }
      };
    return (
        <GoogleBtn className='ms-auto' variant="light" onClick={handleGoogleSignUp}>
            <img src={GoogleIcon} alt="" />
        </GoogleBtn>
    );
};

export default GoogleSignUp;

const GoogleBtn = styled(Button)`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    padding: 0;
    img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
    }
`;