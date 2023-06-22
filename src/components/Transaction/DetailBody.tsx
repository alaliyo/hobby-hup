import { useState } from "react";
import styled from "styled-components";
import EmptyImg from '../../imgs/EmptyImg.png';
import { Button, Form, InputGroup } from "react-bootstrap";

interface DetailBodyProps {
    content: string;
}


function DetailBody({ content }: DetailBodyProps) {
    const [writerImg, setWriterImg] = useState('');

    return(
        <div>
            <ContentsBox>
                <p>{content}</p>
            </ContentsBox>
            <CommentTitle>댓글</CommentTitle>
            <InputGroup className="mb-1">
                <Form.Control
                    placeholder="댓글을 입력해주세요."
                />
                <CommentBtn variant="outline-secondary" id="button-addon2">
                    완료
                </CommentBtn>
            </InputGroup>
            <CommentBox>
                <CommentDetail>
                    <CommentImg src={writerImg ? '' : EmptyImg} />
                    <CommentNickname>닉네임</CommentNickname>
                    <CommentContents>내용내용내용내용내용내용내용내용내용내용내용내용내용내용</CommentContents>
                    <CommentDate>23.06.05</CommentDate>
                </CommentDetail>
                <CommentDetail>
                    <CommentImg src={writerImg ? '' : EmptyImg} />
                    <CommentNickname>닉네임</CommentNickname>
                    <CommentContents>내용내용내용내용내용내용내용내용내용내용내용내용내용내용</CommentContents>
                    <CommentDate>23.06.05</CommentDate>
                </CommentDetail>
            </CommentBox>
        </div>
    );
}

export default DetailBody;

const ContentsBox = styled.div`
    padding: 10px;
    padding-bottom: 20px;
    border-bottom: 1px solid #bbbbbb;
`;

const CommentTitle = styled.p`
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 5px;
    font-weight: 900;
`;

const CommentBtn = styled(Button)`
    --bs-btn-hover-bg: #6f9fe7;
    --bs-btn-hover-border-color: #6f9fe7;
    --bs-btn-active-bg: #3e80e4;
    --bs-btn-active-border-color: #3e80e4;
`;

const CommentBox = styled.div`
    padding: 10px;
    margin-bottom: 20px;
`;

const CommentDetail = styled.div`
    display: flex;
    height: 20px;
    margin-bottom: 5px;
`;

const CommentImg = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 5px;
`

const CommentNickname = styled.p`
    font-weight: 900;
    margin-right: 5px;
`

const CommentContents = styled.p`
    width: 70%;
`;

const CommentDate = styled.p`
    margin-left: auto;
`;

