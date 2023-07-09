import { useEffect, useState } from "react";
import { CheckAuth } from "../utils/authUtils";
import { useLocation } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { dbService } from "../firebase";
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
    
    // 로그인 확인
    useEffect(() => {
        CheckAuth('1:1 채팅은 로그인 후 사용 가능합니다.');
    }, [])

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

        </ChattingBox>
    );
}

export default Chatting;

const ChattingBox = styled.div`
    height: 70vh;
    background-color: #f5f9ff;
    width: 50%;
    margin: 85px auto 30px auto;
    border: 2px solid #6f9fe7;
    border-radius: 20px;
    box-shadow: 1px 1px 3px #6f9fe7;
`;