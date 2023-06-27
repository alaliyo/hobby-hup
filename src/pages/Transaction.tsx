import styled from "styled-components";
import TransactionHeader from '../components/Transaction/TransactionHeader';
import { Outlet } from "react-router-dom";
import { fadeInAnimation } from "./PageStyled";
import { TransactionBuyDatas, TransactionSellDatas } from "../utils/dbService";

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
    const buyData: TransactionDataProps[] = TransactionBuyDatas();
    const sellData: TransactionDataProps[] = TransactionSellDatas();
    
    return(
        <TransactionBox>
            <TransactionHeader
                buyData={buyData}
                sellData={sellData}
            />
            <Outlet />
        </TransactionBox>
    );
}

export default Transaction;

const TransactionBox = styled.div`
    padding: 15px;
    animation: ${fadeInAnimation} 0.15s ease-in;
`;