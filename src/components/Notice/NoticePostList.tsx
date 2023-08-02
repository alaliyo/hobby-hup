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
                    <NoticePostBox key={data.id} onClick={() => handlePostNavigate(data.id)}>
                        <TitleBox>
                            <PostTitle>{data.version} {data.title}</PostTitle>
                            <PostDate>{data.createdAt}</PostDate>
                        </TitleBox>
                        <PostContent>{data.content.replace(/\\n/g, "")}</PostContent>
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
    
    @media screen and (max-width: 650px) {
        font-size: 22px;
    }

    @media screen and (max-width: 450px) {
        font-size: 18px;
    }
`;

const BtnStyle = styled(Button)`
    height: 30px;

    @media screen and (max-width: 650px) {
        height: 25px;
        font-size: 11px;
    }

    @media screen and (max-width: 450px) {
        height: 22px;
        font-size: 10px;
    }
`;

const Body = styled.div`
    border-top: 2px solid #bbbbbb;
    margin: 10px 0;

    @media screen and (max-width: 450px) {
        margin: 5px 0;
    }
`;

const NoticePostBox = styled.div`
    padding: 7px 15px;
    border-bottom: 1px solid #d3e1ee;
    cursor: pointer;

    :hover {
        background-color: #f2f9ff;
    }

    p {
        margin-bottom: 5px;
    }
`

const TitleBox = styled.div`
    display: flex;
    justify-content: space-between;
`;

const PostTitle = styled.p`
    font-size: 18px;
    font-weight: 900;

    @media screen and (max-width: 650px) {
        font-size: 16px;
    }

    @media screen and (max-width: 450px) {
        font-size: 14px;
    }
`

const PostDate = styled.p`
    font-weight: 900;
    color: gray;
    display: flex;
    align-items: end;

    @media screen and (max-width: 650px) {
        font-size: 14px;
    }

    @media screen and (max-width: 450px) {
        font-size: 13px;
    }
`

const PostContent = styled.p`
    font-size: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;

    @media screen and (max-width: 650px) {
        font-size: 14px;
    }

    @media screen and (max-width: 450px) {
        font-size: 13px;
    }
`;