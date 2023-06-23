import styled, {keyframes} from "styled-components";

export const fadeInAnimation = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const PageBody = styled.div`
    animation: ${fadeInAnimation} 0.15s ease-in;
`;