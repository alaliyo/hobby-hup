import styled from "styled-components";

function Footer() {
    return(
        <FooterBox>
            <FooterTextBox>
                <p>회사명: HobbyHub</p>
                <p>대표: 김성원</p>
                <p>전화번호: 055-000-0000</p>
                <p>주소: 경남 양산시</p>
            </FooterTextBox>
            <FooterTextBox>
                <p>버전: v1.0.0</p>
                <p>이메일: des321321@daum.net</p>
                <p>저작권: 도용을 금합니다.</p>
            </FooterTextBox>
        </FooterBox>
    );
}

export default Footer;

const FooterBox = styled.footer`
    width: 100%;
    height: max-content;
    padding: 20px;
    border-top: 2px solid #cccccc;
    display: grid;
    grid-template-columns: 5fr 5fr;

    @media screen and (max-width: 650px) {
        padding: 15px;
    }

    @media screen and (max-width: 510px) {
        padding: 10px;
    }

    @media screen and (max-width: 410px) {
        padding: 10px 5px;
    }
`;

const FooterTextBox = styled.div`
    p {
        color: gray;
        font-size: 15px;
        font-weight: 900;
        margin-bottom: 3px;

        @media screen and (max-width: 600px) {
            font-size: 13px;
            margin-bottom: 2px;
        }

        @media screen and (max-width: 450px) {
            font-size: 12px;
        }

        @media screen and (max-width: 350px) {
            font-size: 11px;
        }
    }
`;