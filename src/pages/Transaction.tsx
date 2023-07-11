import styled from "styled-components";
import TransactionHeader from '../components/Transaction/TransactionHeader';
import { Outlet, useLocation } from "react-router-dom";
import { fadeInAnimation } from "./PageStyled";
import { TransactionBuyDatas, TransactionSellDatas } from "../utils/dbService";
import { useState } from "react";
import { UserNicknameData } from "../utils/authUtils";

interface TransactionDataProps {
    id: number
    title: string;
    content: string;
    writer: string
    selected: string;
    price: number | string;
    imgs: string[];
    createdAt: string;
    route: string;
}

function Transaction() {
    const location = useLocation();
    const firstBuyDatas: TransactionDataProps[] = TransactionBuyDatas(); // data 첫 호출
    const firstSellData: TransactionDataProps[] = TransactionSellDatas(); // date 첫 호출
    const [buyData, setBuyData] = useState<TransactionDataProps[]>(); // 검색 후
    const [sellData, setSellData] = useState<TransactionDataProps[]>(); // 검색 후
    const userNicknameData = UserNicknameData(); // 유저 닉네임 data

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
                    userNicknameData: userNicknameData,
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