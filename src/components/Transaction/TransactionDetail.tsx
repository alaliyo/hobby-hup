import styled from "styled-components";
import DetailCarousels from "./DetailCarousels";
import DetailHeader from "./DetailHeader";
import DetailBody from "./DetailBody";
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from "react";
import { TransactionBuyDetailData } from "../../utils/dbService";

function TransactionDetail() {
    const location = useLocation();
    const [catedory, setCatedory] = useState('');
    const [postUrl, setPostUrl] = useState('');
    const [detailData, setDetailData] = useState<any>()
    
    useEffect(() => {
        const UrlArr = location.pathname.split('/')
        const detailUrl = `${UrlArr[2]}Id${UrlArr[3]}`;

        setCatedory(UrlArr[2]);
        setPostUrl(detailUrl);
        
    }, [location]);
    
    return(
        <DetailBox>
            <DetailCarousels />
            <DetailHeader />
            <DetailBody />
        </DetailBox>
    );
}

export default TransactionDetail;

const DetailBox = styled.div`
    margin: 10px 10%;
    padding: 10px;
`;