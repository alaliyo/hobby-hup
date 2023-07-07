import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
    MyPost, ImgLink, FirstImg, InfoData, InfoLink,
    Title, Content, Data, BtnBox, BtnStyle
} from './TransactionCordStyle';
import { LikeData, TransactionBuyDatas, TransactionSellDatas } from '../../utils/dbService';


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

function TransactionLike() {
    const { userObj } = useOutletContext<UserInfoProps>(); //user 정보
    const buyPost = TransactionBuyDatas(); // 판매 post
    const sellPost = TransactionSellDatas(); // 구매 post
    const likeData = LikeData()
    const [myLikePost, setMyLikePost] = useState<transactionDataProps[]>(); // 전체 my post
    console.log(likeData);
    useEffect(() => {
        const a = likeData.map(obj=> obj.likeArr.filter(e => e === userObj.email))
        console.log(a)
    }, [])
    return(
        <div>

        </div>
    );
}

export default TransactionLike;