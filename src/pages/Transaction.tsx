import styled from "styled-components";
import TransactionHeader from '../components/Transaction/TransactionHeader';
import { Outlet } from "react-router-dom";
import { fadeInAnimation } from "./PageStyled";

function Transaction() {
    return(
        <TransactionBox>
            <TransactionHeader />
            <Outlet />
        </TransactionBox>
    );
}

export default Transaction;

const TransactionBox = styled.div`
    padding: 15px;
    animation: ${fadeInAnimation} 0.15s ease-in;
`;