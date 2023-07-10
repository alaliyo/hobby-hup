import { useEffect, useState } from "react";
import { CheckAuth } from "../utils/authUtils";
import { useLocation } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { authService, dbService } from "../firebase";
import styled from "styled-components";
import EmptyImg from '../imgs/EmptyImg.png';
import { Button, InputGroup, Form } from "react-bootstrap";

interface participationsProp {
    email: string;
    displayName: string;
    photoURL: string;
}

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
    participations: participationsProp[];
    createdAt: Date;
    contents: contentsProp[];
}

function Chatting() {
    const location = useLocation().pathname;
    const [chattiongData, setChattiongData] = useState<ChattingDataProp>();
    const [userObj, setUserObj] = useState<any>();
    const [chattingName, setChattingName] = useState<string>();
    const [chattingImg, setChattingImg] = useState<string>();
    console.log(chattiongData);
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
    
    // 채팅 닉네임
    useEffect(() => {
        if (userObj && chattiongData) {
            const nickName = userObj.email === chattiongData.participations[0].email ?
                chattiongData.participations[1].displayName : 
                chattiongData.participations[0].displayName;

            if (nickName) {
                setChattingName(nickName);
            }
        }
    }, [chattiongData, userObj])

    // 채팅 이미지
    useEffect(() => {
        if (userObj && chattiongData) {
            const img = userObj.email === chattiongData.participations[0].email ?
                chattiongData.participations[1].photoURL : 
                chattiongData.participations[0].photoURL;

            if (img) {
                setChattingImg(img);
            }
        }
    }, [chattiongData, userObj])
    
    return(
        <ChattingBox>
            <Header>
                <OpponentImg src={chattingImg ? chattingImg : EmptyImg}/>
                <OpponentName>{chattingName}</OpponentName>
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

const Body = styled.body`
    height: 510px;
    background-color: #cacaca;
`

const Footer = styled.footer`
    height: 60px;
`