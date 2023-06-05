import styled from "styled-components";
import DetailCarousels from "./DetailCarousels";
import DetailHeader from "./DetailHeader";
import DetailBody from "./DetailBody";

function TransactionDetail() {
    return(
        <DetailBox>
            <DetailCarousels />
            <DetailHeader />
            <DetailBody />
        </DetailBox>
    );
}

export default TransactionDetail;

const DetailBox = styled.div`
    margin: 10px 10%;
    padding: 10px;
`;