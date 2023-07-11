import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { TransactionBuyDatas, TransactionSellDatas } from "../../utils/dbService";
import { deleteDoc, doc } from "firebase/firestore";
import { dbService } from "../../firebase";
import { 
    Post, ImgLink, FirstImg, InfoData, InfoLink,
    Title, Content, Data, BtnBox, BtnStyle
} from './TransactionCordStyle';
import { useWindowWidth } from "../../hooks/WindowWidthTracker";

interface transactionDataProps {
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

interface userObj {
    photoURL: any | undefined;
    displayName: string;
    email: string;
}

interface UserInfoProps {
    userObj: userObj;
}

function TransactionMyPost() {
    const { userObj } = useOutletContext<UserInfoProps>(); //user 정보
    const buyPost = TransactionBuyDatas(); // 판매 post
    const sellPost = TransactionSellDatas(); // 구매 post
    const [myPost, setMyPost] = useState<transactionDataProps[]>(); // 전체 my post
    const windowWidth = useWindowWidth();

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
                'transactionLike',
                route
            ));
            alert('삭제되었습니다.')
        }
    };

    // my post 모으기
    useEffect(() => {
        let myBuydata = buyPost.filter((data: transactionDataProps) => data.writer === userObj.email);
        let mySelldata = sellPost.filter((data: transactionDataProps) => data.writer === userObj.email);
        const myPostArrPlus = [...myBuydata, ...mySelldata].sort((a, b) => Number(`20${b.createdAt}`) - Number(`20${a.createdAt}`));
        setMyPost(myPostArrPlus)
    }, [buyPost, sellPost, userObj])

    return(
        <>
        {myPost && (
            myPost.map((mydata, i) => (
                <Post key={i}>
                    <ImgLink
                    to={mydata.route.slice(0, 3) === 'buy' ?
                        '/transaction/buy/' + mydata.id : '/transaction/sell/' + mydata.id} 
                    >
                        <FirstImg src={mydata.imgs[0]} alt="" />
                    </ImgLink>
                    <InfoData>
                        <InfoLink
                        to={mydata.route.slice(0, 3) === 'buy' ?
                            '/transaction/buy/' + mydata.id : '/transaction/sell/' + mydata.id} 
                        >
                            <Title>제목: {
                                650 >= windowWidth && windowWidth >= 450 ? (
                                    mydata.title.length <= 7 ? 
                                    mydata.title : 
                                    mydata.title.replace(/\\n/g, '').slice(0, 7) + ".."
                                ) : (
                                    mydata.title.length <= 10 ? 
                                    mydata.title : 
                                    mydata.title.replace(/\\n/g, '').slice(0, 10) + ".."
                                )
                            }</Title>
                            <br />
                            <Content>내용: {
                                650 >= windowWidth && windowWidth >= 450 ? (
                                    mydata.content.length <= 7 ? 
                                    mydata.content : 
                                    mydata.content.replace(/\\n/g, '').slice(0, 7) + ".."
                                ) : (
                                    mydata.content.length <= 10 ? 
                                    mydata.content : 
                                    mydata.content.replace(/\\n/g, '').slice(0, 10) + ".."
                                )
                            }</Content>
                            <span>구분: {mydata.route.slice(0, 3) === 'buy' ? "판매" : "구매"}</span>
                            <Data>{mydata.createdAt}</Data>
                        </InfoLink>
                        <BtnBox>
                            <BtnStyle variant="outline-secondary">수정</BtnStyle>
                            <BtnStyle
                                variant="outline-danger"
                                onClick={() => onDeleteClick(mydata.route)}
                            >
                                삭제
                            </BtnStyle>
                        </BtnBox>
                    </InfoData>
                </Post>
            ))
        )}
        </>
    );
}
    

export default TransactionMyPost