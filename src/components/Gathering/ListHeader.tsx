import { Button } from "react-bootstrap";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

function ListHeader() {
    const navigate = useNavigate();

    const onNavigate = () => {
        navigate("/gathering/write");
    }

    return(
        <HeaderBox>
            <Button
                variant="outline-secondary"
                onClick={onNavigate}
            >모임 개설</Button>
        </HeaderBox>
    );
}

export default ListHeader;

const HeaderBox = styled.header`
    height: 100px;
    border-bottom: 2px solid #cccccc;
`;