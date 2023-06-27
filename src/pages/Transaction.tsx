import styled from "styled-components";
import TransactionHeader from '../components/Transaction/TransactionHeader';
import { Outlet } from "react-router-dom";
import { fadeInAnimation } from "./PageStyled";
import { TransactionBuyDatas, TransactionSellDatas } from "../utils/dbService";
import { useState } from "react";

interface TransactionDataProps {
    id: number
    title: string;
    content: string;
    writer: string
    writerProfile: string;
    selected: string;
    price: number | string;
    imgs: string[];
    createdAt: string;
    route: string;
}

function Transaction() {
    const firstBuyDatas: TransactionDataProps[] = TransactionBuyDatas();
    const firstSellData: TransactionDataProps[] = TransactionSellDatas();
    const [buyData, setBuyData] = useState<TransactionDataProps[]>();
    const [sellData, setSellData] = useState<TransactionDataProps[]>();
    
    const handleSearch = (searchResult: TransactionDataProps[]) => {
        setBuyData(searchResult);
    };

    return(
        <TransactionBox>
            <TransactionHeader
                buyData={firstBuyDatas}
                sellData={firstSellData}
                handleSearch={handleSearch}
            />
            <Outlet
                context={{
                    buyData: buyData ? buyData : firstBuyDatas,
                    sellData: sellData ? sellData : firstSellData,
                }}
            />
        </TransactionBox>
    );
}

export default Transaction;

const TransactionBox = styled.div`
    padding: 15px;
    animation: ${fadeInAnimation} 0.15s ease-in;
`;