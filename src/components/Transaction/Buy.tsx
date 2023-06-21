import { TransactionBuyDatas } from "../../utils/dbService";
import PostCard from "./PostCard";
import { Body } from './styled';
import CommonSpinner from "../Common/CommonSpinner";

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

function Buy() {
    const datas: transactionDataProps[] = TransactionBuyDatas();
    
    return(
        <Body>
            {datas.length > 0 ? datas.map((data) => 
                <PostCard
                    key={`${data.id}`}
                    data={data}
                />
            ) : (
                <CommonSpinner />
            )}
        </Body>
    );
}

export default Buy;
