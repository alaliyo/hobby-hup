import styled from "styled-components";

function NoticeDetail() {
    return(
        <DetailBox>
            <DetailHeader>
                <Title>제목</Title>
                <Date>23.7.28</Date>
            </DetailHeader>

            <DetailBody>
                <DetailContent>
                    123123123123123123123123
                </DetailContent>
            </DetailBody>
        </DetailBox>
    );
}

export default NoticeDetail;

const DetailBox = styled.div`
    
`;

const DetailHeader = styled.div`

`;

const Title = styled.h2`
    font-weight: 900;
    text-align : center;
`;

const Date = styled.p`
    text-align: end;
    font-weight: 900;
    color: gray;
`;

const DetailBody = styled.div`
    width: 96%;
    margin: 0 auto;
    border-top: 2px solid gray;
    padding: 10px;
`;

const DetailContent = styled.span`
    font-size: 18px;
`;