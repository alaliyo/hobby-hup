import styled from "styled-components";
import { Link } from 'react-router-dom';

type HeaderProps = {
    loggedIn: boolean;
}

function Header({ loggedIn }: HeaderProps) {

    return(
        <HeaderBox>
            <HeaderWidth>
                <LinkBox>
                    <Link to={'/'}>
                        Home
                    </Link>
                    <Link to={'/gathering'}>
                        Gathering
                    </Link>
                    <Link to={'/share'}>
                        Share
                    </Link>
                    <Link to={'/sell'}>
                        Sell
                    </Link>
                </LinkBox>
                <LogInBox>
                    {loggedIn ? (<>
                        <Link to={'/my-page'}>
                            MyPage
                        </Link>
                        <Link to={'/'}>
                            LogOut
                        </Link>
                    </>) : (
                        <Link to={'/login'}>
                            LogIn
                        </Link>
                    )}
                </LogInBox>
            </HeaderWidth>
        </HeaderBox>
    );
}

export default Header;

const HeaderBox = styled.header`
    height: 70px;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: #ffffff;
    border-bottom: 2px solid #979797;
`;

const HeaderWidth = styled.div`
    width: 1024px;
    height: 100%;
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
    a {
        color: #6b6b6b;
        font-size: 19px;
        font-weight: 900;
        text-decoration: none;
        &:hover {
            color: #6f9fe7;
            text-shadow: -1.8px 0 #000, 0 1.8px #000, 1.8px 0 #000, 0 -1.8px #000;
            transition: .4s;
        }
    }
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