import { Link, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { TransactionBuyDatas, TransactionSellDatas } from "../../utils/dbService";
import { Button } from "react-bootstrap";
import { deleteDoc, doc } from "firebase/firestore";
import { dbService } from "../../firebase";

interface transactionDataProps {
    id: number
    title: string;
    content: string;
    email: string;
    writer: string
    writerProfile: string;
    selected: string;
    price: number | string;
    imgs: string[];
    createdAt: string;
    route: string;
}

interface userObj {
    photoURL: any | undefined;
    displayName: string;
    email: string;
}

interface UserInfoProps {
    userObj: userObj;
}

function MyTransaction() {
    const { userObj } = useOutletContext<UserInfoProps>(); //user 정보
    const buyPost = TransactionBuyDatas(); // 판매 post
    const sellPost = TransactionSellDatas(); // 구매 post
    const [myPost, setMyPost] = useState<transactionDataProps[]>(); // 전체 my post

    // 게시물 delete
    const onDeleteClick = async(route: string) => {
        const ok = window.confirm("삭제하시겠습니까?");
        if (ok) {
            await deleteDoc(doc(
                dbService,
                route.slice(0, 3) === 'buy' ? 'transactionBuy' : 'transactionSell',
                route
            ));
            await deleteDoc(doc(
                dbService,
                'transactionComment',
                route
            ));
            await deleteDoc(doc(
                dbService,
                'transactionLick',
                route
            ));
        }
    };

    // my post 모으기
    useEffect(() => {
        let myBuydata = buyPost.filter((data: transactionDataProps) => data.email === userObj.email);
        let mySelldata = sellPost.filter((data: transactionDataProps) => data.email === userObj.email);
        const myPostArrPlus = [...myBuydata, ...mySelldata].sort((a, b) => b.id - a.id);
        setMyPost(myPostArrPlus)
    }, [buyPost, sellPost, userObj])
    
    return(
        <MyTransactionBox>
            {myPost && (
                myPost.map((mydata, i) => (
                    <MyPost key={i}>
                        <LinkStyle
                        to={mydata.route.slice(0, 3) === 'buy' ?
                            '/transaction/buy/' + mydata.id : '/transaction/sell/' + mydata.id} 
                        >
                            <FirstImg src={mydata.imgs[0]} alt="" />
                        </LinkStyle>
                        <div>
                            <LinkStyle
                            to={mydata.route.slice(0, 3) === 'buy' ?
                                '/transaction/buy/' + mydata.id : '/transaction/sell/' + mydata.id} 
                            >
                                <InfoData>
                                    <Title>제목: {mydata.title}</Title>
                                    <br />
                                    <Content>내용: {
                                        mydata.content.length <= 13 ?
                                        mydata.content : 
                                        mydata.content.replace(/\\n/g, '').slice(0, 13) + "..."
                                    }</Content>
                                    
                                    <span>구분: {mydata.route.slice(0, 3) === 'buy' ? "판매" : "구매"}</span>
                                    <Data>{mydata.createdAt}</Data>
                                </InfoData>
                            </LinkStyle>
                            <BtnBox>
                                <BtnStyle variant="outline-secondary">수정</BtnStyle>
                                <BtnStyle
                                    variant="outline-danger"
                                    
                                >
                                    삭제
                                </BtnStyle>
                            </BtnBox>
                        </div>
                    </MyPost>
                ))
            )}
        </MyTransactionBox>
    );
}

export default MyTransaction;

const MyTransactionBox = styled.div`
    padding: 10px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
`;

const MyPost = styled.div`
    height: 140px;
    width: 46%;
    display: flex;
    padding: 1%;
    margin: 2%;
    box-shadow: 1px 1px 5px gray, -1px -1px 5px gray;
    border-radius: 10px;
    &:hover {
        transition: 0.2s;
        transform: scale(1.05); /* 확대 효과 */
    }
`;

const LinkStyle = styled(Link)`
    text-decoration: none;
    color: black;
    font-size: 15px;
    &:hover {
        color: black;
    }
`;

const FirstImg = styled.img`
    height: 125px;
    width: 125px;
    border-radius: 10px;
    margin-right: 10px;
`;

const InfoData = styled.div`
    width: 100%;
`;

const Title = styled.span`
    margin-right: 10px;
    font-weight: 900;
`;

const Content = styled.span`
    display: block;
    margin-top: 5px;
    margin-bottom: 5px;
`;

const Data = styled.span`
    display: block;
    float: right;
    margin-right: 5px;
`;

const BtnBox = styled.div`
    margin-top: 7px;
    display: flex;
    justify-content: space-between;
`;

const BtnStyle = styled(Button)`
    margin-left: 7px;
    margin-right: 7px;
`;