import styled from "styled-components"

export const LoginTitle = styled.h3`
    @media screen and (max-width: 768px) {
        font-size: 0;
    }
`

export const LogInBox = styled.div`
    background-color: #bdd3f5;
    padding: 50px;
    width: 500px;
    margin: 0 auto;
    margin-top: 100px;
    border-radius: 20px;
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
        color: rgb(62, 123, 255);
    }
`;