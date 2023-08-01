import styled from "styled-components";
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { authService } from "../../firebase";
import { NoticeData, NoticeDataProp } from "../../utils/dbService";

function NoticePostList() {
    const user = authService.currentUser; // 유저 정보
    const navigate = useNavigate(); // 이동
    const noticeData: NoticeDataProp[] = NoticeData();

    const handlePostWrite = () => {
        if (!user) {
            navigate(-1);
        } else if (user.email !== "des321321@naver.com") {
            navigate(-1);
        } else {
            navigate('/notice/write')
        }
    }

    // post로 이동
    const handlePostNavigate = (id: number) => {
        navigate(`/notice/detail/${id}`)
    };

    return (
        <div>
            <Header>
                <Title>공지</Title>
                {user && user.email === "des321321@naver.com" ?
                    <BtnStyle
                        variant="outline-secondary"
                        size="sm"
                        onClick={handlePostWrite}
                    > 글작성 </BtnStyle> : null
                }
            </Header>
            <Body>
                {noticeData ? noticeData.map(data => (
                    <NoticePostBox onClick={() => handlePostNavigate(data.id)}>
                        <TitleBox>
                            <PostTitle>{data.title}</PostTitle>
                            <PostDate>{data.createdAt}</PostDate>
                        </TitleBox>
                        <p>{data.content.replace(/\\n/g, "")}</p>
                    </NoticePostBox>
                )) : null}
            </Body>
        </div>
    );
}

export default NoticePostList;

const Header = styled.div`
    display: flex;
    justify-content: center;
`;

const Title = styled.h2`
    font-weight: 900;
`;

const BtnStyle = styled(Button)`
    height: 30px;
`;

const Body = styled.div`
    border-top: 2px solid #bbbbbb;
    margin: 10px 0;
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
        display: -webkit-box;
        -webkit-line-clamp: 1; /* 최대 3줄까지 보이도록 설정 (weight에 따라 조절) */
        -webkit-box-orient: vertical;
        overflow: hidden;
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