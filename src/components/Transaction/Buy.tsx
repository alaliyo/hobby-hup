import { useOutletContext } from 'react-router-dom'
import PostCard from "./PostCard";
import { Body } from './styled';
import styled from 'styled-components';

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
            ) : (
                <PostNotDataBox>
                    <PostNotData>게시물이 없습니다.</PostNotData>
                </PostNotDataBox>
            )}
        </Body>
    );
}

export default Buy;

const PostNotDataBox = styled.div`
    height: 200px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PostNotData = styled.p`
    font-size: 30px;
    font-weight: 900;
`;