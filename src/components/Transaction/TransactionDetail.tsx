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
    writer: string;
    writerProfile: string;
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
    const [datailData, setDatailData] = useState<transactionDataProps>()
    
    useEffect(() => {
        const UrlArr = location.pathname.split('/');
        const detailUrl = `${UrlArr[2]}Id${UrlArr[3]}`;

        setCatedory(UrlArr[2]);
        setPostUrl(detailUrl);
    }, [location]);
    
    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(
                dbService,
                catedory === "buy" ? "transactionBuy" : "transactionSell",
                postUrl
            );
            const snapshot = await getDoc(docRef);
            if (snapshot.exists()) {
                const postData = snapshot.data() as transactionDataProps;
                setDatailData(postData);
            }
        };

        if (postUrl) {
            fetchData();
        }
    }, [catedory, postUrl]);

    return(
        <DetailBox>
            {datailData ? (<>
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
                    like = {datailData.like}
                    catedory = {catedory}
                />
                <DetailBody
                    content = {datailData.content}
                />
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