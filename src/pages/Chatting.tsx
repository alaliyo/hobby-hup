import { useEffect, useState } from "react";
import { CheckAuth } from "../utils/authUtils";
import { useLocation } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { authService, dbService } from "../firebase";
import styled from "styled-components";

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
    console.log(chattiongData);

    return(
        <ChattingBox>
            <ChattingHeader>
                <OpponentImg src={''}/>
                <OpponentName>
                    {userObj &&
                        userObj.email
                    }
                </OpponentName>
            </ChattingHeader>
        </ChattingBox>
    );
}

export default Chatting;

const ChattingBox = styled.div`
    height: 70vh;
    background-color: #f1f8ff;
    width: 45%;
    margin: 85px auto 30px auto;
    border: 2px solid #6f9fe7;
    border-radius: 10px;
    box-shadow: 1px 1px 2px #d4d4d4, -1px -1px 2px #d4d4d4;
`;

const ChattingHeader = styled.header`
    display: flex;
`;

const OpponentImg = styled.img`
    
`

const OpponentName = styled.h3`

`;