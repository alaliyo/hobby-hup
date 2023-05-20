import styled from 'styled-components';
import EmptyImg from '../../imgs/EmptyImg.png';

interface userObj {
    photoURL: any;
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
    border-radius: 49px;
    border: 2px solid #e7e7e7;
    margin-right: 20px;
`;

const Nickname = styled.p`
    margin-top: 10px;
    font-size: 25px;
    font-weight: 900;
`;