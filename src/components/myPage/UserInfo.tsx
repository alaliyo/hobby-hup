import styled from 'styled-components';
import EmptyImg from '../../imgs/EmptyImg.png';

interface userObj {
    photoURL: any | null | undefined;
    displayName: string;
    email: string;
}

interface UserInfoProps {
    userObj: userObj;
}

function UserInfo({ userObj }: UserInfoProps) {
    return(
        <UserInfoBox>
            <UserImg src={ userObj.photoURL ? userObj.photoURL : EmptyImg }/>
            <Nickname>{ userObj.displayName }</Nickname>
        </UserInfoBox>
    );
}

export default UserInfo;

const UserInfoBox = styled.div`
    display: flex;
`;

const UserImg = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px solid #e7e7e7;
    margin-right: 20px;
    @media screen and (max-width: 900px) {
        width: 90px;
        height: 90px;
    }
    @media screen and (max-width: 650px) {
        width: 75px;
        height: 75px;
    }
    @media screen and (max-width: 450px) {
        width: 60px;
        height: 60px;
    }
`;

const Nickname = styled.p`
    margin-top: 10px;
    font-size: 25px;
    font-weight: 900;
    @media screen and (max-width: 900px) {
        margin-top: 8px;
        font-size: 23px;
    }
    @media screen and (max-width: 650px) {
        margin-top: 5px;
        font-size: 18px;
    }
    @media screen and (max-width: 450px) {
        width: 60px;
        font-size: 16px;
    }
`;