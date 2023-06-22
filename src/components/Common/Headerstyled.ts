import { Link, LinkProps } from "react-router-dom";
import styled from "styled-components";

interface CustomLinkProps extends LinkProps {
    active?: string;
}

export const HeaderBox = styled.header`
    width: 100%;
    height: 70px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: #ffffff;
    &.header-top {
        height: 70px;
        transition: height 0.3s ease-in-out;
    }
    &.header-scroll {
        height: 50px;
        transition: height 0.3s ease-in-out;
    }
`;

export const HeaderWidth = styled.div`
    width: 1024px;
    height: 100%;
    margin: 0 auto;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 1024px){
        width: 100%;
    }
    nav {
        display: flex;
        align-items: center;
    }
`;

export const LinkStyled = styled(Link)<CustomLinkProps>`
    color: ${p => p.active === 'true' ? '#6f9fe7' : '#6b6b6b' };
    font-size: 19px;
    font-weight: 900;
    text-decoration: none;
    &:hover {
        color: #6f9fe7;
        transition: .3s;
    }
`;

export const ProufailImgBox = styled(Link)<CustomLinkProps>`
    font-size: 19px;
    font-weight: 900;
    text-decoration: none;
    border-radius: 20px;
    border: 3px solid ${p => p.active === 'true' ? '#6f9fe7' : '#8b8b8b' };
    &:hover {
        border: 3px solid #6f9fe7;
        transition: .3s;
    }
`;

export const ProufailImg = styled.img`
    width: 34px;
    height: 34px;
    border-radius: 18px;
`;

export const LinkBox = styled.nav`
    a {
        margin-right: 15px;
    }
`;

export const LogInBox = styled.nav`
    a {
        margin-left: 15px;
    }
`