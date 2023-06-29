import styled from "styled-components";

function Notice() {
    return(
        <NoticeBox>
            <h2>공지 페이지입니다.</h2>
            <h4>추후 업데이트됩니다.</h4>
        </NoticeBox>
    );
}

export default Notice;

const NoticeBox = styled.div`
    text-align : center;
    margin-top: 100px;
    margin-bottom: 100px;
`;