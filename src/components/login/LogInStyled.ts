import styled from "styled-components"

export const LoginTitle = styled.h3`
    @media screen and (max-width: 768px) {
        font-size: 0;
    }
`

export const LogInBox = styled.div`
    padding: 30px;
    width: 500px;
    margin: 0 auto;
    margin-top: 100px;
    margin-bottom: 100px;
    border: 1px solid #838383;
    border-radius: 5px;

    @media screen and (max-width: 768px) {
        width: 100vw;
        padding: 15px;
        margin: 0px;
        input {
            width:90vw;
        }
    }
`

export const Explanation = styled.p`
    font-size: 12px;
    color: rgb(255, 90, 90);
    font-weight: 900;
    margin-bottom: 3px;
`

export const ChangeBut = styled.button`
    width: 100%;
    align-items: center;
    background-color: rgba(255, 255, 255, 0);
    color: rgb(66, 66, 66);
    font-weight: 900;
    border: none;
    :hover {
        color: #4ea9ff;
    }
`;