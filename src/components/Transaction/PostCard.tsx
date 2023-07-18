import styled from "styled-components";
import { Card } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { authService } from "../../firebase";
import { useEffect, useState } from "react";
import { LikeData } from "../../utils/dbService";
import PostNickname from "../../hooks/PostNickname";
import HobbyHubImg from '../../imgs/HobbyHubImg.png';

interface transactionDataProps {
    id: number;
    title: string;
    selected: string;
    writer: string;
    imgs: string[];
    createdAt: string;
    route: string;
}

interface PostCardprops {
    data: transactionDataProps;
}

function PostCard({ data }: PostCardprops) {
    const user = authService.currentUser; // user 정보
    const likedata = LikeData(); // firebase Like date get
    const [like, setLike] = useState(0); // Like 수
    const navigate = useNavigate();
    const location = useLocation().pathname;
    const writerData = PostNickname(data.route.includes(location.split('/')[2]) ? data.writer : null); // 작성자 닉네임, 프로필 이미지
    
    // 로그인 후 디테일 페이지 접근
    const handleCardClick = () => {
        if (user) {
            navigate(`${data.id}`);
        } else {
            alert("상세페이지는 로그인 후 볼 수 있습니다.");
        }
    };
    
    // date 한글 표시 함수
    const formatDate = (dateString: string): string => {
        const currentDate = new Date();
        const dateParts = dateString.split('.'); // 날짜 문자열을 구분자로 분할
        const year = parseInt(dateParts[0]); // 년도
        const month = parseInt(dateParts[1]) - 1; // 월 (0부터 시작하므로 1을 빼줌)
        const day = parseInt(dateParts[2]); // 일
        const createdAt = new Date(2000 + year, month, day); // Date 객체 생성
        const timeDiff = Math.abs(currentDate.getTime() - createdAt.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        const diffYears = Math.floor(diffDays / 365);
        
        if (diffDays <= 1) {
            return "당일";
        } else if (diffDays <= 7) {
            return `${diffDays-1}일전`;
        } else if (diffDays <= 30) {
            const diffWeeks = Math.floor(diffDays / 7);
            return `${diffWeeks}주전`;
        } else if (diffDays <= 365) {
          const diffMonths = Math.floor(diffDays / 30);
            return `${diffMonths}달전`;
        } else {
            return `${diffYears}년전`;
        }
    };
    
    // date 한글 표시 호출
    const formattedDate = formatDate(data.createdAt);
    
    // Like 숫자료 변환
    useEffect(() => {
        if (likedata.filter(e => e.id === data.route)[0]) {
            setLike(likedata.filter(e => e.id === data.route)[0].likeArr.length)
        }
    }, [data.route, likedata]);
    
    return(
        <LinkStyle onClick={handleCardClick}>
            <CardStyle>
                <CardImg variant="top" src={data.imgs.length > 0 ? data.imgs[0] : HobbyHubImg} />
                <CardBody>
                    <CardTitle>{data.title.length < 15 ? data.title : data.title.slice(0, 16)+'...'}</CardTitle>

                    <InfoBox>
                        <CardText>
                            {data.selected}
                        </CardText>
                        <CardText>
                            {writerData && writerData.displayName}
                        </CardText>
                    </InfoBox>

                    <InfoBox>
                        <CardText>
                            <HeartColor>♥{like}</HeartColor>
                        </CardText>
                        <CardText>
                            {formattedDate}
                        </CardText>
                    </InfoBox>
                    
                </CardBody>
            </CardStyle>
        </LinkStyle>
    );
}

export default PostCard;

const LinkStyle = styled.a`
    color: black;
    text-decoration: none;
    margin: 8px;
    cursor: pointer;

    :hover {
        color: #4583e0;
        transition: .3s;
    }
    
    @media screen and (max-width: 710px) {
        margin: 0px;
    }
`;

const CardStyle = styled(Card)`
    margin: 15px;
    width: 17rem;

    @media screen and (max-width: 650px) {
        width: 42.7vw;
        margin: 10px;
    }

    @media screen and (max-width: 550px){
        width: 44vw;
        margin: 7px;
    }

    @media screen and (max-width: 450px){
        width: 80%;
        margin-left: 10%;
        margin-right: 10%;
    }

    @media screen and (max-width: 350px){
        width: 90%;
        margin-left: 5%;
        margin-right: 5%;
    }
`

const CardImg = styled(Card.Img)`
    height: 150px;
`

const CardBody = styled(Card.Body)`
    padding: 10px 10px 5px 10px;
`;

const CardTitle = styled(Card.Title)`
    font-weight: 900;
    font-size: 15px;

    @media screen and (max-width: 650px){
        font-size: 14px;
    }

    @media screen and (max-width: 500px){
        font-size: 15px;
    }

    @media screen and (max-width: 350px){
        font-size: 14px;
    }
`;

const CardText = styled(Card.Text)`
    margin-bottom: 3px;
    font-weight: 900;
    color: gray;
    font-size: 15px;

    @media screen and (max-width: 650px){
        font-size: 13px;
    }

    @media screen and (max-width: 500px){
        font-size: 15px;
    }

    @media screen and (max-width: 350px){
        font-size: 13px;
    }
`;

const InfoBox = styled.div`
    display: flex;
    justify-content: space-between;
`;

const HeartColor = styled.span`
    color: #6f9fe7;
`;