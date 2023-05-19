import { useNavigate, useOutletContext } from "react-router-dom";
import { checkToken } from "../utils/authUtils";
import styled from "styled-components";
import EmptyImg from '../imgs/EmptyImg.png';
import { Button } from "react-bootstrap";

interface userObj {
    photoURL: any;
    displayName: string;
    email: string;
}

interface myPageProps {
    userObj: userObj;
}

function MyPage() {
    const { userObj } = useOutletContext<myPageProps>();
    const navigate = useNavigate();

    checkToken(navigate);
    
    return(
        <MyPageBox>
            <UserInforBox>
                <UserImg src={ userObj.photoURL ? userObj.photoURL : EmptyImg }/>
                <Nickname>{userObj.displayName}</Nickname>
                <ButtonStyle className='ms-auto' variant="light">
                    프로필 수정
                </ButtonStyle>
            </UserInforBox>
            <Test />
        </MyPageBox>
    );
}

export default MyPage;

const MyPageBox = styled.div`
    margin: 100px 5% 0 5%;
    padding: 30px 5% 0 5%;
    background-color: #ffffff;
    border: 2px solid #e7e7e7;
    border-radius: 20px;
    box-shadow: 2px 2px 6px gray;
`;

const UserInforBox = styled.div`
    display: flex;
`;

const UserImg = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 49px;
    border: 2px solid #e7e7e7;
    margin-right: 20px;
`;

const Nickname = styled.p`
    margin-top: 10px;
    font-size: 25px;
    font-weight: 900;
`;

const ButtonStyle = styled(Button)`
    height: 40px;
`;

const Test = styled.div`
    height: 100vh;
`;