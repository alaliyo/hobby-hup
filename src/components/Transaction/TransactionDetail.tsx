import styled from "styled-components";
import DetailCarousels from "./DetailCarousels";
import DetailHeader from "./DetailHeader";
import DetailBody from "./DetailBody";
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from "react";
import { dbService } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import CommonSpinner from "../Common/CommonSpinner";

interface transactionDataProps {
    id: number
    title: string;
    content: string;
    writer: string
    selected: string;
    price: number | string;
    imgs: string[];
    createdAt: string;
    like: number;
}

function TransactionDetail() {
    const location = useLocation();
    const [catedory, setCatedory] = useState('');
    const [postUrl, setPostUrl] = useState('');
    const [detailData, setDetailData] = useState<transactionDataProps>()
    
    useEffect(() => {
        const UrlArr = location.pathname.split('/')
        const detailUrl = `${UrlArr[2]}Id${UrlArr[3]}`;

        setCatedory(UrlArr[2]);
        setPostUrl(detailUrl);
        
    }, [location]);
    
    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(dbService, "transactionBuy", postUrl);
            const snapshot = await getDoc(docRef);
            if (snapshot.exists()) {
                const postData = snapshot.data() as transactionDataProps;
                setDetailData(postData);
            } else {
                // 문서가 존재하지 않을 때 처리
            }
        };

        if (postUrl) {
            fetchData();
        }
    }, [postUrl]);
    
    return(
        <DetailBox>
            {detailData ? (<>
                <DetailCarousels />
                <DetailHeader />
                <DetailBody />
            </>) : <CommonSpinner />
            }
        </DetailBox>
    );
}

export default TransactionDetail;

const DetailBox = styled.div`
    margin: 10px 10%;
    padding: 10px;
`;