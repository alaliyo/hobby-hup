import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import HobbyHubImg from '../../imgs/HobbyHubImg.png';

function ListCard() {
    const [count, setCount] = useState(0);

    const handleClickCount = () => {
        setCount(e => e + 1)
    }

    return(
        <Card onClick={handleClickCount}>
            <CardLink to={`Detail/0`}>
                <CardImgBox>
                    <CardImg src={HobbyHubImg}/>
                </CardImgBox>
                <CardImformation>
                    <Title>볼링 동호회 모집합니다 지역은 양산 입니다 많이 참여해 주세요~~</Title>
                    <TextBox>
                        <CardText>경남 양산시 서창동</CardText>
                        <FlexBox>
                            <CardText>스크랩 {0} </CardText>
                            <CardText>운영자</CardText>
                        </FlexBox>
                        <FlexBox>
                            <CardText>조회수 {count}</CardText>
                            <CardText>23.08.16</CardText>
                        </FlexBox>
                    </TextBox>
                </CardImformation>
            </CardLink>
        </Card>
    );
}

export default ListCard;

const Card = styled.div`
    width: 400px;
    height: 150px;
    box-shadow: 1px 1px 4px #cccccc, -1px -1px 4px #cccccc;
    border-radius: 10px;

    &:hover {
        transition: .3s;
        transform: scale(1.03);
    }
`;

const CardLink = styled(Link)`
    width: 100%;
    height: 100%;
    color: black;
    text-decoration: none;
    display: flex;

    &:hover {
        color: #000000;
    }
`;

const CardImgBox = styled.div`
    height: 100%;
    width: 45%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CardImg = styled.img`
    height: 90%;
    width: 90%;
    border-radius: 10px;
`;

const CardImformation = styled.div`
    height: 100%;
    width: 55%;
    padding: 10px 10px 10px 5px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;

    p {
        margin-bottom: 4px;
    }
`;

const Title = styled.p`
    font-size: 17px;
    font-weight: 900;
    color: #505050;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const TextBox = styled.div`
    font-weight: 900;
    color: #a1a1a1;
`

const CardText = styled.p`
`;

const FlexBox = styled.div`
    display: flex;
    justify-content: space-between;
`;