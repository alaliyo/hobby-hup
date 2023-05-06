import { useLocation } from 'react-router-dom';
import { HeaderBox, HeaderWidth, LinkStyled, LinkBox, LogInBox } from './Headerstyled';
import useHeaderScroll from "../hooks/useHeaderScroll";
import { useEffect, useState } from 'react';
import { authService } from '../firebase';

type HeaderProps = {
    loggedIn: boolean;
}

function Header({ loggedIn }: HeaderProps) {
    const location = useLocation();
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
                <LinkBox>
                    <LinkStyled to={'/'} active={pageUrl === '' ? 'true' : 'false'}>
                        HobbyHub
                    </LinkStyled>
                    <LinkStyled to={'/share'} active={pageUrl === 'share' ? 'true' : 'false'}>
                        취미공유
                    </LinkStyled>
                    <LinkStyled to={'/sell'} active={pageUrl === 'sell' ? 'true' : 'false'}>
                        취미거래
                    </LinkStyled>
                    <LinkStyled to={'/gathering'} active={pageUrl === 'gathering' ? 'true' : 'false'}>
                        모임
                    </LinkStyled>
                </LinkBox>
                <LogInBox>
                    {loggedIn ? (<>
                        <LinkStyled to={'/my-page'} active={pageUrl === 'my-page' ? 'true' : 'false'}>
                            MyPage
                        </LinkStyled>
                        <LinkStyled to={'/'} onClick={onLogOutClick}>
                            LogOut
                        </LinkStyled>
                    </>) : (
                        <LinkStyled to={'/login'} active={pageUrl === 'login' ? 'true' : 'false'}>
                            LogIn
                        </LinkStyled>
                    )}
                </LogInBox>
            </HeaderWidth>
        </HeaderBox>
    );
}

export default Header;