import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import MyTransactionPost from "./MyTransactionPost";

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
                <MyTransactionPost />
            ) : null}
        </MyTransactionBox>
    );
}

export default MyTransaction;

const MyTransactionBox = styled.div`
    padding: 10px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start
`;