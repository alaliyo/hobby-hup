import styled from "styled-components";
import TransactionHeader from '../components/Transaction/TransactionHeader';
import { Outlet, useLocation } from "react-router-dom";
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
    const location = useLocation();
    const firstBuyDatas: TransactionDataProps[] = TransactionBuyDatas();
    const firstSellData: TransactionDataProps[] = TransactionSellDatas();
    const [buyData, setBuyData] = useState<TransactionDataProps[]>();
    const [sellData, setSellData] = useState<TransactionDataProps[]>();
    
    const handleSearch = (searchResult: TransactionDataProps[]) => {
        location.pathname === "/transaction/buy" ?
            setBuyData(searchResult) : 
            setSellData(searchResult)
    };
    
    return(
        <TransactionBox>
            <TransactionHeader
                buyData={firstBuyDatas}
                sellData={firstSellData}
                handleSearch={handleSearch}
                pathname={location.pathname}
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

    @media screen and (max-width: 650px){
        padding: 15px 10px;
    }

    @media screen and (max-width: 450px){
        padding: 15px 0px;
    }
`;