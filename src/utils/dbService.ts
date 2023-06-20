import { useState } from "react";

interface transactionDataProps {
    title: string;
    content: string;
    selected: string;
    price: number | string;
    imgs: string[];
    createdAt: string;
    like: number;
}

export const transactionBuyDatas = () => {
    const [datas, setdata] = useState<transactionDataProps[]>();
    return
}
