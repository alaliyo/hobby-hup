import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../firebase";

interface transactionDataProps {
    id: number
    title: string;
    content: string;
    writer: string
    selected: string;
    price: number | string;
    imgs: string[];
    createdAt: string;
    like: number;
}

export function TransactionBuyDatas() {
    const [datas, setdata] = useState<transactionDataProps[]>([]);

    useEffect(() => {
        const q = query(
            collection(dbService, "transactionBuy"),
            orderBy("id", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const postsArr: any = snapshot.docs.map((doc) => ({
                ...doc.data(),
            }));
            setdata(postsArr);
        });
    }, []);
    
    return datas;
}