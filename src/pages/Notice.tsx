import styled from "styled-components";

function Notice() {
    return(
        <NoticeBox>
            <Title>공지</Title>
            <Body>
                <NoticePostBox>
                    <TitleBox>
                        <PostTitle>제목</PostTitle>
                        <PostDate>작성 날짜</PostDate>
                    </TitleBox>
                    <p>내용</p>
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
    padding: 7px 15px;
    border-bottom: 1px solid #d3e1ee;

    :hover {
        background-color: #f2f9ff;
    }

    p {
        margin-bottom: 0;
    }
`

const TitleBox = styled.div`
    display: flex;
    justify-content: space-between;
`;

const PostTitle = styled.p`
    font-weight: 900;
`

const PostDate = styled.p`
    font-weight: 900;
    color: gray;
`