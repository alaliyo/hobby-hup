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
    margin-top: 100px;
    margin-bottom: 50px;
`;