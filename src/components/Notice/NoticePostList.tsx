import styled from "styled-components";
import { authService } from "../../firebase";
import { Button } from "react-bootstrap";

function NoticePostList() {
    const user = authService.currentUser; // 유저 정보

    return (
        <div>
            <Title>공지</Title>
            {user && user.email === 'des321321@naver.com' ?
                <Button>공지 작성</Button> : null}
            <Body>
                <NoticePostBox>
                    <TitleBox>
                        <PostTitle>제목</PostTitle>
                        <PostDate>작성 날짜</PostDate>
                    </TitleBox>
                    <p>내용</p>
                </NoticePostBox>
            </Body>
        </div>
    );
}

export default NoticePostList;

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
    cursor: pointer;

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