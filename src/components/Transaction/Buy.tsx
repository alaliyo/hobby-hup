import { useOutletContext } from 'react-router-dom'
import { TransactionBuyDatas } from "../../utils/dbService";
import PostCard from "./PostCard";
import { Body } from './styled';
import CommonSpinner from '../Common/CommonSpinner';

interface TransactionDataProps {
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

interface BuyData {
    buyData: Array<TransactionDataProps>;
}

function Buy() {
    const { buyData } = useOutletContext<BuyData>();
    
    return(
        <Body>
            {buyData.length > 0 ? buyData.map((data) => 
                <PostCard
                    key={`${data.id}`}
                    data={data}
                />
            ) : <CommonSpinner />}
        </Body>
    );
}

export default Buy;
