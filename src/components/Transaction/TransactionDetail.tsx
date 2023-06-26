import { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from 'react-router-dom'
import DetailCarousels from "./DetailCarousels";
import DetailHeader from "./DetailHeader";
import DetailBody from "./DetailBody";
import { dbService } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { CheckToken } from "../../utils/authUtils";
import { fadeInAnimation } from "../../pages/PageStyled";

interface transactionDataProps {
    id: number
    title: string;
    content: string;
    writer: string;
    writerProfile: string;
    selected: string;
    price: number | string;
    imgs: string[];
    createdAt: string;
    route: string;
}

function TransactionDetail() {
    const location = useLocation();
    const [catedory, setCatedory] = useState('');
    const [postDocument, setPostDocument] = useState('');
    const [datailData, setDatailData] = useState<transactionDataProps>()
    
    useEffect(() => {
        CheckToken('상세 게시물들을 볼 수 있습니다.');
    }, [])

    useEffect(() => {
        const UrlArr = location.pathname.split('/');
        const detailUrl = `${UrlArr[2]}Id${UrlArr[3]}`;

        setCatedory(UrlArr[2]);
        setPostDocument(detailUrl);
    }, [location]);
    
    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(
                dbService,
                catedory === "buy" ? "transactionBuy" : "transactionSell",
                postDocument
            );
            const snapshot = await getDoc(docRef);
            if (snapshot.exists()) {
                const postData = snapshot.data() as transactionDataProps;
                setDatailData(postData);
            }
        };

        if (postDocument) {
            fetchData();
        }
    }, [catedory, postDocument]);

    return(
        <DetailBox>
            {datailData && (<>
                <DetailCarousels
                    imgs = {datailData.imgs}
                />
                <DetailHeader
                    title = {datailData.title}
                    writer = {datailData.writer}
                    writerProfile = {datailData.writerProfile}
                    selected = {datailData.selected}
                    price = {datailData.price}
                    createdAt = {datailData.createdAt}
                    route = {datailData.route}
                    catedory = {catedory}
                />
                <DetailBody
                    content = {datailData.content}
                    route = {datailData.route}
                />
            </>)}
        </DetailBox>
    );
}

export default TransactionDetail;

const DetailBox = styled.div`
    margin: 10px 10%;
    padding: 10px;
    animation: ${fadeInAnimation} 0.5s ease-in;
`;