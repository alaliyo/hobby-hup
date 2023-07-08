import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export const Post = styled.div`
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
    @media screen and (max-width: 900px) {
        height: 130px;
        width: 47%;
        padding: 5px;
        margin: 1.5%;
    }

    @media screen and (max-width: 650px) {
        height: 110px;
        width: 47%;
    }

    @media screen and (max-width: 450px) {
        height: 110px;
        width: 310px;
        margin: 15px auto;
    }

    @media screen and (max-width: 350px) {
        width: 96%;
    }
`;

export const ImgLink = styled(Link)`
    width:40%;
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
    @media screen and (max-width: 900px) {
        height: 120px;
    }
    @media screen and (max-width: 650px) {
        height: 100px;
    }
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

    @media screen and (max-width: 900px) {
        font-size: 14px;
    }

    @media screen and (max-width: 800px) {
        font-size: 13px;
    }

    @media screen and (max-width: 660px) {
        font-size: 12px;
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
    @media screen and (max-width: 650px) {
        margin-top: 4px;
        margin-bottom: 4px;
    }
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
    @media screen and (max-width: 650px) {
        margin-top: 7px;
    }
`;

export const BtnStyle = styled(Button)`
    margin-right: 5px;
    @media screen and (max-width: 900px) {
        margin-right: 4px;
        font-size: 14px;
    }
    @media screen and (max-width: 650px) {
        font-size: 12px;
        padding: 4px 10px;
    }
`;