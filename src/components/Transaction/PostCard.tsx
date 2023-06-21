import { useState } from "react";
import { Card } from "react-bootstrap";
import HubImg from '../../imgs/HobbyHubImg.png';
import styled from "styled-components";
import { Link } from "react-router-dom";

interface transactionDataProps {
    title: string;
    selected: string;
    writer: string;
    imgs: string[];
    createdAt: string;
    like: number;
}

interface PostCardprops {
    data: transactionDataProps;
}

function PostCard({ data }: PostCardprops) {
    return(
        <LinkStyle to='/transaction/0'>
            <CardStyle style={{ width: '17rem' }}>
                <CardImg variant="top" src={data.imgs.length > 0 ? data.imgs[0] : HubImg} />
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
                            ♥: {data.like}
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

const LinkStyle = styled(Link)`
    color: black;
    text-decoration: none;
    :hover {
        color: #4583e0;
        transition: .3s;
    }
    margin: 8px;
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