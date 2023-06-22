import styled from "styled-components";
import EmptyImg from '../../imgs/EmptyImg.png';
import { Button } from "react-bootstrap";
import { HeartColor } from "./styled";

interface transactionDataProps {
    title: string;
    writer: string
    selected: string;
    price: number | string;
    createdAt: string;
    like: number;
    catedory: string;
    writerProfile: string;
}

function DetailHeader({
    title,
    writer,
    selected,
    price,
    createdAt,
    like,
    catedory,
    writerProfile
}: transactionDataProps) {
    return(
        <DetailHeaderbox>
            <InfoBox>
                <PostInfo>
                    <WriterImg src={writerProfile ? writerProfile : EmptyImg} />
                    <WriterNickname>{writer}</WriterNickname>
                </PostInfo>

                <PostInfo>
                    <Info>
                        <HeartColor>♥</HeartColor>
                        {like}
                    </Info>
                    
                    <Info>{createdAt}</Info>
                </PostInfo>
            </InfoBox>

            <InfoBox>
                <PostTitle>{title}</PostTitle>

                <PostInfo>
                    <Category>{catedory === 'buy' ? '판매' : '구매'}</Category>
                    <ChattingBtn variant="outline-secondary">1:1 채팅</ChattingBtn>
                </PostInfo>
            </InfoBox>

            <InfoBox>
                <Price>가격: {price}원</Price>

                <Info>주소: {selected}</Info>
            </InfoBox>
        </DetailHeaderbox>
    );
}

export default DetailHeader;

const DetailHeaderbox = styled.header`
    height: 160px;
    border-bottom: 2px solid #bbbbbb;
`;

const InfoBox = styled.div`
    height: 55px;
    padding: 5px;
    display: flex;
    justify-content: space-between;
`;

const PostInfo = styled.div`
    display: flex;
`;

const WriterImg = styled.img`
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin-right: 10px;
`;

const WriterNickname = styled.p`
    font-size: 25px;
    font-weight: 900;
    margin-top: 5px;
    margin-bottom: 0px;
`;

const Info = styled.p`
    color: gray;
    font-weight: 900;
    margin-top: 5px;
    margin-left: 10px;
    margin-bottom: 0px;
`;

const PostTitle = styled.p`
    margin-top: 5px;
    font-size: 25px;
    font-weight: 900;
`

const Category = styled.p`
    font-size: 18px;
    font-weight: 900;
    margin-top: 7px;
    color: gray;
`

const ChattingBtn = styled(Button)`
    margin-left: 10px;
    --bs-btn-hover-bg: #6f9fe7;
    --bs-btn-hover-border-color: #6f9fe7;
    --bs-btn-active-bg: #3e80e4;
    --bs-btn-active-border-color: #3e80e4;
`

const Price = styled.p`
    font-size: 20px;
    font-weight: 900;
`;