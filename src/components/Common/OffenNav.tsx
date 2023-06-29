import { useState  } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Offcanvas } from 'react-bootstrap';
import { authService } from '../../firebase';

interface OffcanvaProps {
    loggedIn: boolean;
}

function Offcanva({ loggedIn }: OffcanvaProps) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onClick = () => {
        setShow(false)
    }

    const onLogOutClick = () => {
        authService.signOut();
        alert("로그아웃 되었습니다.")
        window.location.href="/"
    }

    return(
        <>
        <OffcanvaBtn onClick={handleShow}>
            메뉴
        </OffcanvaBtn>
  
        <OffcanvaBox show={show} onHide={handleClose} placement='end'>
            <Offcanvas.Header closeButton>
                <LinkStyle to={'/'} onClick={onClick}>
                    HobbyHub
                </LinkStyle>
            </Offcanvas.Header>

            <Offcanvas.Body>
                <LinkStyle to={'/transaction/buy'} onClick={onClick}>
                    재능거래
                </LinkStyle>

                <LinkStyle to={'/share'} onClick={onClick}>
                    취미공유
                </LinkStyle>
                
                {loggedIn ? (<>
                    <LinkStyle to={'/my-page/transaction'} onClick={onClick}>
                        마이페이지
                    </LinkStyle>

                    <LinkStyle to={'/'} onClick={onLogOutClick}>
                        로그아웃
                    </LinkStyle>
                </>) : (
                    <LinkStyle to={'/login'} onClick={onClick}>
                        로그인
                    </LinkStyle>
                )}
            </Offcanvas.Body>
        </OffcanvaBox>
      </>
    );
}

export default Offcanva;

const OffcanvaBtn = styled(Button)`
    color: #6b6b6b;
    --bs-btn-bg: none;
    --bs-btn-border-color: none;
    --bs-btn-hover-bg: none;
    --bs-btn-hover-color: #6f9fe7;
    --bs-btn-active-bg: none;
    --bs-btn-active-color: #6f9fe7;
    font-weight: 900;
`;

const OffcanvaBox = styled(Offcanvas)`
    --bs-offcanvas-width: 50%;
    --bs-offcanvas-bg: #131313d6;

`;

const LinkStyle = styled(Link)`
    color: white;
    font-size: 18px;
    margin-bottom: 10px;
    display: block;
    text-decoration: none;
    :hover {
        color: white;
        font-weight: 900;
    }
`