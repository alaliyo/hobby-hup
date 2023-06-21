import { TransactionSellDatas } from "../../utils/dbService";
import CommonSpinner from "../Common/CommonSpinner";
import PostCard from "./PostCard";
import { Body } from './styled';

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

function Sell() {
    const datas: transactionDataProps[] = TransactionSellDatas();

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

export default Sell;

