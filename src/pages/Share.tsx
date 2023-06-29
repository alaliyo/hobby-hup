import styled from "styled-components";

function Share() {
    return(
        <ShareBox>
            <h2>취미 공유 페이지입니다.</h2>
            <h4>추후 업데이트됩니다.</h4>
        </ShareBox>
    );
}

export default Share;

const ShareBox = styled.div`
    text-align : center;
    margin-top: 100px;
    margin-bottom: 100px;
`;