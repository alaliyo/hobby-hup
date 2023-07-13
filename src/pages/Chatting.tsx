import { useEffect, useState } from "react";
import { CheckAuth } from "../utils/authUtils";
import { useLocation } from 'react-router-dom';
import { authService } from "../firebase";
import styled from "styled-components";
import EmptyImg from '../imgs/EmptyImg.png';
import { Button, InputGroup, Form } from "react-bootstrap";
import PostNickname from "../hooks/PostNickname";
import { ChattingData } from "../utils/dbService";

function Chatting() {
    const location = useLocation().pathname;
    const chattiongData = ChattingData(location.split('/')[2]);
    const [userObj, setUserObj] = useState<any>();
    const [opponentId, setOpponentId] = useState<string>('');
    const writerData = PostNickname(opponentId); // 작성자 닉네임, 프로필 이미지

    // 로그인 확인
    useEffect(() => {
        CheckAuth('1:1 채팅은 로그인 후 사용 가능합니다.');
    }, [])

    // 유저 정보 가져오기
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setUserObj(user);
            }
        })
    }, []);
    
    // 상대방 아이디 추출
    useEffect(() => {
        if (userObj) {
            const opponent = userObj.email === chattiongData?.participations[0] ?
                chattiongData?.participations[1] :
                chattiongData?.participations[0];

            if (opponent) {
                setOpponentId(opponent);
            }
        }
    }, [chattiongData, userObj]);
    
    return(
        <ChattingBox>
            <Header>
                {writerData && <>
                    <OpponentImg src={writerData.photoURL ? writerData.photoURL : EmptyImg}/>
                    <OpponentName>{writerData.displayName}</OpponentName>
                </>}
            </Header>
            <Body>
                {['a'].map((e, i) => (
                    <div key={i}>
                    <Profile>
                        {writerData && <>
                            <ProfileImg src={writerData.photoURL ? writerData.photoURL : EmptyImg}/>
                            <ProfileNickname>{writerData.displayName}</ProfileNickname>
                        </>}
                    </Profile>
                    <ChatBox>
                        <ChatBubble>
                            <p>{e}</p>
                        </ChatBubble>
                    </ChatBox>
                    </div>
                ))}
                
            </Body>
            <Footer>
            <InputGroup className="mb-3">
                <Form.Control
                placeholder="내용을 입력해주세요."
                aria-describedby="basic-addon2"
                />
                <Button variant="secondary" id="button-addon2">
                완료
                </Button>
            </InputGroup>
            </Footer>
        </ChattingBox>
    );
}

export default Chatting;

const ChattingBox = styled.div`
    height: 650px;
    background-color: #98b9eb;
    width: 45%;
    margin: 85px auto 30px auto;
    border: 1px solid #999999;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 1px 1px 2px #d4d4d4, -1px -1px 2px #d6d6d6;
`;

const Header = styled.header`
    display: flex;
    height: 55px;
    padding-bottom: 60px;
`;

const OpponentImg = styled.img`
    height: 40px;
    width: 40px;
    border-radius: 50%;
    margin-right: 10px;
`

const OpponentName = styled.p`
    font-size: 21px;
    font-weight: 900;
`;
const Body = styled.div`
    height: 500px;
    overflow: auto;
    margin-bottom: 10px;
`

const Profile = styled.div`
    display: flex;
    height: 30px;
`;

const ProfileImg = styled.img`
    height: 30px;
    width: 30px;
    border-radius: 50%;
    margin-right: 5px;
`;

const ProfileNickname = styled.p`
    font-weight: 900;
`;

const ChatBox = styled.div`
    display: flex;
    justify-content: flex-start;
    padding: 0px 30px;
    margin-bottom: 5px;
`;

const ChatBubble = styled.div`
    background-color: #ffffff;
    border-radius: 10px;
    color: #000000;
    padding: 5px 10px;
    max-width: 200px;
    word-wrap: break-word;

    p {
        margin: 0;
    }
`;

const Footer = styled.footer`
    height: 60px;
`;