import { useEffect, useState } from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { Spinner } from 'react-bootstrap';
import { authService } from './firebase';
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  // 모든 컴포넌트들이 로딩되었는지 확인하는 이벤트
  useEffect(() => {
    setInit(true);
  }, []);
  
  // 로그인 확인
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
        setLoggedIn(true);
      }
      setInit(true);
    })
  }, []);

  return (
    <AppBox>
      {init ? (<>
        <Header
          loggedIn={loggedIn}
          userObj={userObj}
        />

        <OutletBox>
          <Outlet context={{
            userObj: userObj,
          }} />
        </OutletBox>
      </>) : (
        <SpinnerStyled animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </SpinnerStyled>
      )}
      <Footer />
    </AppBox>
  );
}

export default App;

const AppBox = styled.div`
  margin-top: 70px;
  font-family: 'NanumSquareRound';
`;

const OutletBox = styled.div`
  width: 1024px;
  margin: 0 auto;
  @media screen and (max-width: 1024px){
    width: 100%;
  }
`;

const SpinnerStyled = styled(Spinner)`
  margin: 200px 46%;
`;