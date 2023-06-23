import styled from "styled-components";
import { fadeInAnimation } from "../../pages/PageStyled";

export const Body = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    animation: ${fadeInAnimation} 0.15s ease-in;
`;