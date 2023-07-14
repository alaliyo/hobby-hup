import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link, LinkProps } from "react-router-dom";
import styled from "styled-components";
import useHeaderScroll from "../../hooks/useHeaderScroll";
import { authService } from '../../firebase';
import EmptyImg from '../../imgs/EmptyImg.png';
import { useWindowWidth } from '../../hooks/WindowWidthTracker';
import OffenNav from './OffenNav';

interface userObjProps {
    photoURL?: string;
}

interface HeaderProps {
    loggedIn: boolean;
    userObj: userObjProps;
}

function Header({ loggedIn, userObj }: HeaderProps) {
    const location = useLocation();
    const windowWidth = useWindowWidth(); 
    const [pageUrl, setPageUrl] = useState('');
    
    useHeaderScroll({
        target: HeaderBox,
        restoreClassName: "header-top",
        changeClassName: "header-scroll",
        scrollValue: 50,
    });

    const onLogOutClick = () => {
        authService.signOut();
        alert("로그아웃 되었습니다.")
        window.location.href="/"
    }

    useEffect(() => {
        setPageUrl(location.pathname.split('/')[1])
    }, [location])
    
    return(
        <HeaderBox>
            <HeaderWidth>
                {windowWidth >= 650 ? (<>
                    <LinkBox>
                        <LinkStyled to={'/'} active={pageUrl === '' ? 'true' : 'false'}>
                            HobbyHub
                        </LinkStyled>
                        
                        {pageUrl === 'login' ? null : <>
                            <LinkStyled to={'/transaction/buy'} active={pageUrl === 'transaction' ? 'true' : 'false'}>
                                재능거래
                            </LinkStyled>
                            
                            <LinkStyled to={'/share'} active={pageUrl === 'share' ? 'true' : 'false'}>
                                취미공유
                            </LinkStyled>

                            <LinkStyled to={'/notice'} active={pageUrl === 'notice' ? 'true' : 'false'}>
                                공지
                            </LinkStyled>
                            
                            {/* <LinkStyled to={'/gathering'} active={pageUrl === 'gathering' ? 'true' : 'false'}>
                                모임
                            </LinkStyled> */}
                        </>}
                    </LinkBox>
                    
                    <LogInBox>
                        {loggedIn ? (<>
                            <ProufailImgBox to={'/my-page/transaction/my-post'} active={pageUrl === 'my-page' ? 'true' : 'false'}>
                                <ProufailImg src={ userObj.photoURL ? userObj.photoURL : EmptyImg } />
                            </ProufailImgBox>
                            <LinkStyled to={'/'} onClick={onLogOutClick}>
                                로그아웃
                            </LinkStyled>
                        </>) : (
                            <LinkStyled to={'/login'} active={pageUrl === 'login' ? 'true' : 'false'}>
                                로그인
                            </LinkStyled>
                        )}
                    </LogInBox>
                </>) : (<>
                    <LinkBox>
                        <LinkStyled to={'/'} active={pageUrl === '' ? 'true' : 'false'}>
                            HobbyHub
                        </LinkStyled>
                    </LinkBox>
                    <OffenNav loggedIn={loggedIn}/>
                </>)}
            </HeaderWidth>
        </HeaderBox>
    );
}

export default Header;

interface CustomLinkProps extends LinkProps {
    active?: string;
}

const HeaderBox = styled.header`
    width: 100%;
    height: 70px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    background-color: #ffffff;

    &.header-top {
        height: 70px;
        transition: height 0.3s ease-in-out;
    }
    &.header-scroll {
        height: 50px;
        box-shadow: 1px 1px 5px #d4d4d4;
        transition: height 0.3s ease-in-out;
    }
`;

const HeaderWidth = styled.div`
    width: 1024px;
    height: 100%;
    margin: 0 auto;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 1024px) {
        width: 100%;
    }

    nav {
        display: flex;
        align-items: center;
    }
`;

const LinkStyled = styled(Link)<CustomLinkProps>`
    color: ${p => p.active === 'true' ? '#6f9fe7' : '#6b6b6b' };
    font-size: 20px;
    font-weight: 900;
    text-decoration: none;

    &:hover {
        color: #6f9fe7;
        transition: .3s;
    }

    @media screen and (max-width: 650px){
        font-size: 18px;
    }
`;

const ProufailImgBox = styled(Link)<CustomLinkProps>`
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

const ProufailImg = styled.img`
    width: 34px;
    height: 34px;
    border-radius: 18px;
`;

const LinkBox = styled.nav`
    a {
        margin-right: 15px;
    }
`;

const LogInBox = styled.nav`
    a {
        margin-left: 15px;
    }
`