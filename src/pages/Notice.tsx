import styled from "styled-components";

function Notice() {
    return(
        <NoticeBox>
            <Title>공지 사항</Title>
            <Body></Body>
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
    padding: 10px;
`;