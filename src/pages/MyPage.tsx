import styled from "styled-components";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { authService } from "../firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button } from "react-bootstrap";
import { CheckToken } from "../utils/authUtils";
import UserInfo from "../components/MyPage/UserInfo";
import EditUserInfo from "../components/MyPage/EditUserInfo";
import PasswordModal from "../components/MyPage/PasswordModal";
import MyPageNav from "../components/MyPage/MyPageNav";
import { fadeInAnimation } from "./PageStyled";

function MyPage() {
  const [userObj ,setUserObj] = useState<any>();
  const [change, setChange] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState("");

  const openPasswordModal = () => {
    setPasswordModalOpen(true);
  };

  const closePasswordModal = () => {
    setPasswordModalOpen(false);
  };

  const onChange = async () => {
    if (change) {
      setChange(false);
    } else {
      openPasswordModal();
    }
  };
  
  const handlePasswordSubmit = async () => {
    closePasswordModal();
    // Firebase 비밀번호 인증을 수행합니다.
    const currentUser = authService.currentUser;
    if (currentUser && currentUser.email !== null) {
      try {
        // 비밀번호를 확인하고 동일하다면 change 값을 true로 변경합니다.
        await signInWithEmailAndPassword(authService, currentUser.email, password);
        setChange(true);
      } catch (error) {
        alert("비밀번호가 일치하지 않습니다")
        // 비밀번호가 일치하지 않는 경우에 대한 처리를 수행합니다.
      }
    }
    setPassword("");
  };

  // 유저 정보 가져오기
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
        if (user) {
            setUserObj(user);
        }
    })
  }, []);

  useEffect(() => {
    CheckToken('마이 페이지를');
  }, [userObj])

  return (
    <MyPageBox>
      {userObj && <>
        <HeaderStyle>
          <UserInfoBox>
            <InfoBox>
              {change ? (
                <EditUserInfo userObj={userObj} />
              ) : (
                <UserInfo userObj={userObj} />
              )}
            </InfoBox>
            <BtnBox>
              <ButtonStyle
                className="ms-auto"
                variant="light"
                onClick={onChange}
              >
                {change ? '취소' : '프로필 수정'}
              </ButtonStyle>
            </BtnBox>
          </UserInfoBox>
          <MyPageNav />
        </HeaderStyle>
        
        <OutletBox>
          <Outlet context={{
            userObj: userObj
          }}/>
        </OutletBox>

        <PasswordModal
          show={passwordModalOpen}
          onClose={closePasswordModal}
          onSubmit={handlePasswordSubmit}
          password={password}
          setPassword={setPassword}
        />
      </>}
    </MyPageBox>
  );
}

export default MyPage;

const MyPageBox = styled.div`
  margin: 100px 5% 0 5%;
  padding: 30px 3% 30px 3%;
  background-color: #ffffff;
  border: 2px solid #e7e7e7;
  border-radius: 20px;
  margin-bottom: 50px;
  box-shadow: 2px 2px 6px gray;
  animation: ${fadeInAnimation} 0.15s ease-in;
`;

const HeaderStyle = styled.header`
  border-bottom: 2px solid #cecece;
`;

const UserInfoBox = styled.div`
  padding-bottom: 15px;
  display: flex;
  justify-content: space-between;
`;

const InfoBox = styled.div`
  width: 70%;
`;

const BtnBox = styled.div`
    
`

const ButtonStyle = styled(Button)`
  height: 40px;
`;

const OutletBox = styled.div`
  height: 500px;
`;