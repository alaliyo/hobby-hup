import { Spinner } from "react-bootstrap";
import styled from "styled-components";

function CommonSpinner() {
    return(
        <SpinnerBox>
            <Spinner animation="border" />
        </SpinnerBox>
    );
}

export default CommonSpinner;

const SpinnerBox = styled.div`
    width: 100%;
    height: 100%;
    padding: 10% 50%;
`