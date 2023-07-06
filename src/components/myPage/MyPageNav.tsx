import { useEffect, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

function MyPageNav() {  
    const [category, setCategory] = useState('거래');
    const location = useLocation();
    const navigate = useNavigate();
    const [categoryUrl, setCategoryUrl] = useState('')
    
    const categoryChang = (text: string) => {
        setCategory(text);
    }

    const handlePostSwitching = (text: string) => {
        navigate(`/my-page/transaction/${text}`);
    }

    useEffect(() => {
        setCategoryUrl(location.pathname.split('/')[3]);
    }, [location])

    return(
        <div>
            <Dropdown>
                <DropdownToggl id="dropdown-basic">
                    {category}
                </DropdownToggl>

                <DropdownMenu>
                    <LinkBox to="transaction" onClick={() => categoryChang('거래')}>거래</LinkBox>
                    <LinkBox to="share" onClick={() => categoryChang('공유')}>공유</LinkBox>
                    <LinkBox to="chattings" onClick={() => categoryChang('채팅')}>채팅</LinkBox>
                    {/* <LinkBox to="gathering" onClick={() => locationChang('모임')}>모임</LinkBox> */}
                </DropdownMenu>

                <ButtonColor
                    variant="outline-secondary"
                    active={categoryUrl === 'my-post'}
                    onClick={() => handlePostSwitching('my-post')}
                >
                    내 글
                </ButtonColor>
                <ButtonColor
                    variant="outline-secondary"
                    active={categoryUrl === 'like'}
                    onClick={() => handlePostSwitching('like')}
                >
                    {category === "거래" ? "좋아요" : "스크랩"}
                </ButtonColor>
            </Dropdown>
        </div>
    );
}

export default MyPageNav;

const DropdownToggl = styled(Dropdown.Toggle)`
    background-color: white;
    color: black;
    font-size: 900;
    --bs-btn-border-color: gray;
    --bs-btn-active-bg: #6f9fe7;
    --bs-btn-active-border-color: #6f9fe7;
    :hover {
        background-color: #6f9fe7;
        border-color: #6f9fe7;
    }
`;

const DropdownMenu = styled(Dropdown.Menu)`
    --bs-dropdown-min-width: 70px;
    padding: 5px;
`;

const LinkBox = styled(Link)`
    font-size: 900;
    color: black;
    text-decoration: none;
    display: block;
    padding: 10px;
    :hover {
        text-decoration: underline;
        color: black;
    }
`;

const ButtonColor = styled(Button)`
    --bs-btn-hover-bg: #6f9fe7;
    --bs-btn-active-bg: #6f9fe7;
    --bs-btn-hover-border-color: #6f9fe7;
`;