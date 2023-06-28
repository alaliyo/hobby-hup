import styled from "styled-components";
import { fadeInAnimation } from "../../pages/PageStyled";

export const Body = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    animation: ${fadeInAnimation} 0.15s ease-in;

    @media screen and (max-width: 710px){
        padding: 15px 10px;
    }

    @media screen and (max-width: 500px){
        display: block;
    }

    @media screen and (max-width: 450px){
        padding: 15px 0px;
    }
`;