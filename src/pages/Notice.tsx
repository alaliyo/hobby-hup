import styled from "styled-components";

function Notice() {
    return(
        <NoticeBox>
            <Title>공지</Title>
            <Body>
                <NoticePostBox>
                    <p>제목</p>
                    <p>내용</p>
                    <p>작성 날짜</p>
                </NoticePostBox>
            </Body>
        </NoticeBox>
    );
}

export default Notice;

const NoticeBox = styled.div`
    margin-top: 100px;
    margin-bottom: 50px;
`;

const Title = styled.h2`
    font-weight: 900;
    text-align : center;
`

const Body = styled.div`
    width: 90%;
    border-top: 2px solid #bbbbbb;
    margin: 10px auto;
    height: 100px;
`;

const NoticePostBox = styled.div`
    padding: 5px 10px;

    :hover {
        background-color: #e1edf8;
    }

    p {
        font-weight: 900;
        margin-bottom: 0;
    }
`