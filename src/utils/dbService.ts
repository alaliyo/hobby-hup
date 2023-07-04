import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../firebase";

interface transactionDataProps {
    email: string;
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

// Buy date get
export function TransactionBuyDatas() {
    const [buyBatas, setBuyBatas] = useState<transactionDataProps[]>([]);
    
    useEffect(() => {
        const q = query(
            collection(dbService, "transactionBuy"),
            orderBy("id", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const postsArr: any = snapshot.docs.map((doc) => ({
                ...doc.data(),
            }));
            setBuyBatas(postsArr);
        });
    }, []);
    
    return buyBatas;
}

// Buy max id
export function BuyDatasMaxId() {
    const datas = TransactionBuyDatas();
    const [buyMaxId, setBuyMaxId] = useState<any>(0);

    useEffect(() => {
        if(datas.length > 0) {
            setBuyMaxId(datas[0].id);
        }
    }, [datas])
    
    return buyMaxId;
}

// Sell date get
export function TransactionSellDatas() {
    const [sellDatas, setSellData] = useState<transactionDataProps[]>([]);
    
    useEffect(() => {
        const q = query(
            collection(dbService, "transactionSell"),
            orderBy("id", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const postsArr: any = snapshot.docs.map((doc) => ({
                ...doc.data(),
            }));
            setSellData(postsArr);
        });
    }, []);
    
    return sellDatas;
}

// Sell max id
export function SellDatasMaxId() {
    const datas = TransactionSellDatas();
    const [sellMaxId, setSellMaxId] = useState<any>(0);

    useEffect(() => {
        if(datas.length > 0) {
            setSellMaxId(datas[0].id);
        }
    }, [datas])
    
    return sellMaxId;
}

interface LikeDataProps {
    id: string;
    likeArr: string[];
}

// Like data get
export function LikeData() {
    const [likeArr, setLikeArr] = useState<LikeDataProps[]>([]);

    useEffect(() => {
        const q = query(
            collection(dbService, "transactionLike"),
            orderBy("id", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const postsArr: any = snapshot.docs.map((doc) => ({
                ...doc.data(),
            }));
            setLikeArr(postsArr);
        });
    }, []);

    return likeArr;
}

