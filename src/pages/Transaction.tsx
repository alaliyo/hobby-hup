import styled from "styled-components";
import TransactionHeader from '../components/Transaction/TransactionHeader';
import { Outlet } from "react-router-dom";

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
`;