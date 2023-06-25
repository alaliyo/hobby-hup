import { TransactionSellDatas } from "../../utils/dbService";
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
    const datas: transactionDataProps[] | undefined = TransactionSellDatas();
    
    return(
        <Body>
            {datas && datas.map((data) => 
                <PostCard
                    key={`${data.id}`}
                    data={data}
                />
            )}
        </Body>
    );
}

export default Sell;

