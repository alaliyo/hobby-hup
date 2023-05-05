import { useLocation, useNavigate } from 'react-router-dom';
import { HeaderBox, HeaderWidth, LinkStyled, LinkBox, LogInBox } from './Headerstyled';
import useHeaderScroll from "../hooks/useHeaderScroll";
import { useEffect, useState } from 'react';

type HeaderProps = {
    loggedIn: boolean;
}

function Header({ loggedIn }: HeaderProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const [pageUrl, setPageUrl] = useState('');

    useHeaderScroll({
        target: HeaderBox,
        restoreClassName: "header-top",
        changeClassName: "header-scroll",
        scrollValue: 50,
    });

    const onLogOutClick = () => {
        alert("로그아웃 되었습니다.")
        navigate("/");
    };

    useEffect(() => {
        setPageUrl(location.pathname.split('/')[1])
    }, [location])
    
    return(
        <HeaderBox>
            <HeaderWidth>
                <LinkBox>
                    <LinkStyled to={'/'} isActive={pageUrl === ''}>
                        HobbyHub
                    </LinkStyled>
                    <LinkStyled to={'/share'} isActive={pageUrl === 'share'}>
                        취미공유
                    </LinkStyled>
                    <LinkStyled to={'/sell'} isActive={pageUrl === 'sell'}>
                        취미거래
                    </LinkStyled>
                    <LinkStyled to={'/gathering'} isActive={pageUrl === 'gathering'}>
                        모임
                    </LinkStyled>
                </LinkBox>
                <LogInBox>
                    {loggedIn ? (<>
                        <LinkStyled to={'/my-page'} isActive={pageUrl === 'my-page'}>
                            MyPage
                        </LinkStyled>
                        <LinkStyled to={'/'} onClick={onLogOutClick}>
                            LogOut
                        </LinkStyled>
                    </>) : (
                        <LinkStyled to={'/login'} isActive={pageUrl === 'login'}>
                            LogIn
                        </LinkStyled>
                    )}
                </LogInBox>
            </HeaderWidth>
        </HeaderBox>
    );
}

export default Header;