import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export const MyPost = styled.div`
    height: 140px;
    width: 46%;
    display: flex;
    padding: 1%;
    margin: 2%;
    box-shadow: 1px 1px 5px gray, -1px -1px 5px gray;
    border-radius: 10px;
    &:hover {
        transition: 0.2s;
        transform: scale(1.05); /* 확대 효과 */
    }
`;

export const ImgLink = styled(Link)`
    width:40%;
    color: black;
    font-size: 15px;
    margin-right: 3%;
    text-decoration: none;
    &:hover {
        color: black;
    }
`;

export const FirstImg = styled.img`
    height: 125px;
    width: 100%;
    border-radius: 10px;
    margin-right: 10px;
`;

export const InfoData = styled.div`
    width: 57%;
`;

export const InfoLink = styled(Link)`
    display: block;
    text-decoration: none;
    color: black;
    font-size: 15px;
    &:hover {
        color: black;
    }
`;

export const Title = styled.span`
    margin-right: 10px;
    font-weight: 900;
`;

export const Content = styled.span`
    display: block;
    margin-top: 5px;
    margin-bottom: 5px;
`;

export const Data = styled.span`
    display: block;
    float: right;
    margin-right: 5px;
`;

export const BtnBox = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
`;

export const BtnStyle = styled(Button)`
    margin-right: 5px;
`;