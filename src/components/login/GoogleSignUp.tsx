import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { authService } from '../../firebase';
import  GoogleIcon from '../../imgs/GoogleIcon.png';

function GoogleSignUp() {
    const handleGoogleSignUp = async () => {
      const provider = new GoogleAuthProvider();
      try {
        await signInWithPopup(authService, provider);
      } catch (error) {
        alert("로그인이 실패 되었습니다." + error);
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