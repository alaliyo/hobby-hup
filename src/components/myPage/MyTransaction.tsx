import { Link } from "react-router-dom";
import styled from "styled-components";

function MyTransaction() {
    return(
        <MyTransactionBox>
            <LinkStyle to="/">
                <MyPost>
                    <div>
                        <Num>1.</Num>
                        <Title>제목</Title>
                        <Content>내용</Content>
                    </div>
                    <div>
                        <Data>날짜</Data>
                    </div>
                </MyPost>
            </LinkStyle>
        </MyTransactionBox>
    );
}

export default MyTransaction;

const LinkStyle = styled(Link)`
    text-decoration: none;
    color: black;
`;

const MyTransactionBox = styled.div`
    padding: 10px;
    height: 100%;
`;

const MyPost = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 17px;
    
`;

const Num = styled.span`
    margin-right: 5px;
`;

const Title = styled.span`
    margin-right: 5px;
`;

const Content = styled.span`
    
`;

const Data =styled.span`
    
`;