import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { fadeInAnimation } from "./PageStyled";

function Notice() {
    return(
        <OutletBox>
            <Outlet />
        </OutletBox>
    );
}

export default Notice;

const OutletBox = styled.div`
    width: 95%;
    margin: 100px auto 50px auto;
    animation: ${fadeInAnimation} 0.15s ease-in;

    @media screen and (max-width: 450px) {
        width: 100%;
        margin: 80px 0 30px 0;
    }
`;