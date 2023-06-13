import { useState } from "react";
import { Card } from "react-bootstrap";
import HubImg from '../../imgs/HobbyHubImg.png';
import styled from "styled-components";
import { Link } from "react-router-dom";

function PostCard() {
    const [image, setImage] = useState([]);

    return(
        <LinkStyle to='/transaction/0'>
            <CardStyle style={{ width: '17rem' }}>
                <Card.Img variant="top" src={image.length > 0 ? image[0] : HubImg} />
                <CardBody>
                    <Card.Title>제목</Card.Title>

                    <InfoBox>
                        <CardText>
                            조회수: {0}
                        </CardText>
                        <CardText>
                            작성자
                        </CardText>
                    </InfoBox>

                    <InfoBox>
                        <CardText>
                            🤍❤: {0}
                        </CardText>
                        <CardText>
                            날짜
                        </CardText>
                    </InfoBox>
                    
                </CardBody>
            </CardStyle>
        </LinkStyle>
    );
}

export default PostCard;

const LinkStyle = styled(Link)`
    color: black;
    text-decoration: none;
    :hover {
        color: #4583e0;
        transition: .3s;
    }
    margin: 8px;
`;

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