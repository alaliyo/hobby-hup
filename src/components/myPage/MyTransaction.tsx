import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import TransactionMyPost from "./TransactionMyPost";
import TransactionLike from "./TransactionLike";

// interface transactionDataProps {
//     id: number
//     title: string;
//     content: string;
//     email: string;
//     writer: string
//     writerProfile: string;
//     selected: string;
//     price: number | string;
//     imgs: string[];
//     createdAt: string;
//     route: string;
// }

// interface userObj {
//     photoURL: any | undefined;
//     displayName: string;
//     email: string;
// }

// interface UserInfoProps {
//     userObj: userObj;
// }

function MyTransaction() {
    const location = useLocation();
    const [changUrl, setChangUrl] = useState('');

    useEffect(() => {
        setChangUrl(location.pathname.split("/")[3]);
    }, [location.pathname])
    
    return(
        <MyTransactionBox>
            {changUrl === 'my-post' ? (
                <TransactionMyPost />
            ) : <TransactionLike />}
        </MyTransactionBox>
    );
}

export default MyTransaction;

const MyTransactionBox = styled.div`
    padding: 10px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    overflow: auto;

    @media screen and (max-width: 900px) {
        padding: 10px 5px;
    }

    @media screen and (max-width: 650px) {
        padding: 7px 0px;
    }

    @media screen and (max-width: 450px) {
        display: block;
    }

    @media screen and (max-width: 350px) {
        padding: 0px;
    }
`;