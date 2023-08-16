import styled from "styled-components";
import ListCard from "./ListCard";

function ListBody() {
    return(
        <ListBodyBox>
            <ListCard />
        </ListBodyBox>
    );
}

export default ListBody;

const ListBodyBox = styled.div`
    padding: 20px;
`;