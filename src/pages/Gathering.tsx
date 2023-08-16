import { Outlet } from "react-router-dom";
import styled from "styled-components";

function Gathering() {
    return(
        <GatheringBox>
            <Outlet />
        </GatheringBox>
    );
}

export default Gathering;

const GatheringBox = styled.div`
    height: 700px;
`;