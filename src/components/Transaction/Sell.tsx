import { useOutletContext } from 'react-router-dom'
import PostCard from "./PostCard";
import { Body } from './styled';
import styled from 'styled-components';
import { TransactionDataProps } from '../../utils/dbService';

interface SellData {
    sellData: Array<TransactionDataProps>;
}

function Sell() {
    const { sellData } = useOutletContext<SellData>();
    
    return(
        <Body>
            {sellData.length > 0 ? sellData.map((data) => 
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

export default Sell;

const PostNotDataBox = styled.div`
    height: 200px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const PostNotData = styled.p`
    font-size: 30px;
    font-weight: 900;
`;