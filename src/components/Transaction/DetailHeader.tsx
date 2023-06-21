import { useState } from "react";
import styled from "styled-components";
import EmptyImg from '../../imgs/EmptyImg.png';
import { Button } from "react-bootstrap";

function DetailHeader() {
    const [writerImg, setWriterImg] = useState('');

    return(
        <DetailHeaderbox>
            <InfoBox>
                <PostInfo>
                    <WriterImg src={writerImg ? '' : EmptyImg} />
                    <WriterNickname>작성자</WriterNickname>
                </PostInfo>
                <PostInfo>
                    <Info>♥: {0}</Info>
                    <Info>조회수: {0}</Info>
                    <Info>{'23.06.05'}</Info>
                </PostInfo>
            </InfoBox>
            <InfoBox>
                <PostTitle>{'제목'}</PostTitle>
                <PostInfo>
                    <Category>판매</Category>
                    <ChattingBtn variant="outline-secondary">1:1 채팅</ChattingBtn>
                </PostInfo>
                
            </InfoBox>
            <InfoBox>
                <Price>가격: {'1,000'}원</Price>
                <Info>주소: 경남 양산시 서창동</Info>
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