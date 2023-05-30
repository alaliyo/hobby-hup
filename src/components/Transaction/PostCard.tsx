import { useState } from "react";
import { Card } from "react-bootstrap";
import HubImg from '../../imgs/HobbyHubImg.png';
import styled from "styled-components";
import { Link } from "react-router-dom";

function PostCard() {
    const [image, setImage] = useState('');

    return(
        <Link to='/'>
            <CardStyle style={{ width: '13rem' }}>
                <Card.Img variant="top" src={image ? image : HubImg} />
                <Card.Body>
                    <Card.Title>제목</Card.Title>
                    <Card.Text>
                        내용
                    </Card.Text>
                </Card.Body>
            </CardStyle>
        </Link>
    );
}

export default PostCard;

const CardStyle = styled(Card)`
    margin: 15px;
`