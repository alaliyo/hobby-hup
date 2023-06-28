import styled from "styled-components";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { authService,  } from "../../firebase";
import { useEffect, useState } from "react";
import { LikeData } from "../../utils/dbService";

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
    const likedata = LikeData();
    const [like, serLike] = useState(0);
    const navigate = useNavigate();
    
    const handleCardClick = () => {
        if (user) {
            navigate(`${data.id}`);
        } else {
            alert("상세페이지는 로그인 후 볼 수 있습니다.");
        }
    };
    
    const formatDate = (dateString: string): string => {
        const currentDate = new Date();
        const createdAt = new Date('20' + dateString);
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
    
    const formattedDate = formatDate(data.createdAt);
    
    useEffect(() => {
        if (likedata.filter(e => e.id === data.route)[0]) {
            serLike(likedata.filter(e => e.id === data.route)[0].likeArr.length)
        }
    }, [data.route, likedata])
    
    return(
        <LinkStyle onClick={handleCardClick}>
            <CardStyle style={{  }}>
                <CardImg variant="top" src={data.imgs[0]} />
                <CardBody>
                    <CardTitle>{data.title}</CardTitle>

                    <InfoBox>
                        <CardText>
                            {data.selected}
                        </CardText>
                        <CardText>
                            {data.writer}
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

    @media screen and (max-width: 660px) {
        width: 40vw;
    }

    @media screen and (max-width: 500px){
        display: block;
        width: 94%;
    }

    @media screen and (max-width: 450px){
        display: block;
        width: 94%;
        margin-left: 3%;
        margin-right: 3%;
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

    @media screen and (max-width: 650px){
        font-size: 16px;
    }

    @media screen and (max-width: 500px){
        font-size: 20px;
    }

    @media screen and (max-width: 350px){
        font-size: 18px;
    }
`;

const CardText = styled(Card.Text)`
    margin-bottom: 3px;
    font-weight: 900;
    color: gray;

    @media screen and (max-width: 650px){
        font-size: 14px;
    }

    @media screen and (max-width: 500px){
        font-size: 16px;
    }

    @media screen and (max-width: 350px){
        font-size: 14px;
    }
`;

const InfoBox = styled.div`
    display: flex;
    justify-content: space-between;
`;

const HeartColor = styled.span`
    color: #6f9fe7;
`;