import { useEffect, useState } from "react";
import { CheckAuth } from "../utils/authUtils";
import { useLocation } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { authService, dbService } from "../firebase";
import styled from "styled-components";
import EmptyImg from '../imgs/EmptyImg.png';
import { Button, InputGroup, Form } from "react-bootstrap";
import PostNickname from "../hooks/PostNickname";

interface contentsProp {
    contentsId: number;
    email: string;
    displayName: string;
    photoURL: string;
    content: string;
    createdAt: Date;
}

interface ChattingDataProp {
    id: number;
    participations: string[];
    createdAt: Date;
    contents: contentsProp[];
}

function Chatting() {
    const location = useLocation().pathname;
    const [chattiongData, setChattiongData] = useState<ChattingDataProp>();
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

    // 채팅창 data get
    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(dbService, "chattings", `chattingId${location.split('/')[2]}`);
            const snapshot = await getDoc(docRef);
            if (snapshot.exists()) {
                const postData = snapshot.data() as ChattingDataProp;
                setChattiongData(postData);
            }
        };

        fetchData();
    }, [location]);
    
    // 상대방 아이디 추출
    useEffect(() => {
        if (userObj) {
            const userEmail = userObj.email;
            if (chattiongData) {
                const opponent: string = userEmail === chattiongData?.participations[0] ?
                    chattiongData?.participations[1] :
                    chattiongData?.participations[0];
                setOpponentId(opponent);
            }
        }
    }, [chattiongData]);
    
    return(
        <ChattingBox>
            <Header>
                {/*
                <OpponentImg src={chattingImg ? chattingImg : EmptyImg}/>
                <OpponentName>{chattingName}</OpponentName>
                */}
            </Header>
            <Body>

            </Body>
            <Footer>
            <InputGroup className="mb-3">
                <Form.Control
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                />
                <Button variant="outline-secondary" id="button-addon2">
                Button
                </Button>
            </InputGroup>
            </Footer>
        </ChattingBox>
    );
}

export default Chatting;

const ChattingBox = styled.div`
    height: 650px;
    background-color: #f1f8ff;
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
    height: 510px;
    background-color: #cacaca;
`

const Footer = styled.footer`
    height: 60px;
`