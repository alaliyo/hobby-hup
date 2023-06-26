import styled from "styled-components";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { authService, dbService } from "../../firebase";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

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
    const [likeCount, setLikeCount] = useState<number>(0); // 좋아요 개수 상태
    const navigate = useNavigate();

    const handleCardClick = () => {
        if (user) {
            navigate(`${data.id}`);
        } else {
            alert("상세페이지는 로그인 후 볼 수 있습니다.");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(dbService, "transactionLike", data.route);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const likeArr = docSnap.data().likeArr;
                setLikeCount(likeArr.length);
            }
        };
    
        fetchData();
    }, [data.route]);

    return(
        <LinkStyle onClick={handleCardClick}>
            <CardStyle style={{ width: '17rem' }}>
                <CardImg variant="top" src={data.imgs[0]} />
                <CardBody>
                    <Card.Title>{data.title}</Card.Title>

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
                            <HeartColor>♥{likeCount}</HeartColor>
                        </CardText>
                        <CardText>
                            {data.createdAt}
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
    
`;

const CardImg = styled(Card.Img)`
    height: 150px;
`

const CardBody = styled(Card.Body)`
    padding: 10px 10px 5px 10px;
`;

const CardStyle = styled(Card)`
    margin: 15px;
`

const CardText = styled(Card.Text)`
    margin-bottom: 3px;
    font-weight: 900;
    color: gray;
`;

const InfoBox = styled.div`
    display: flex;
    justify-content: space-between;
`;

const HeartColor = styled.span`
    color: #6f9fe7;
`;