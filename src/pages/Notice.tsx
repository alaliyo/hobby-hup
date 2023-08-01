import { Outlet } from "react-router-dom";
import styled from "styled-components";

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
`;