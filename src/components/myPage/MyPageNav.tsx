import { useEffect, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

function MyPageNav() {  
    const [category, setCategory] = useState('거래');
    const location = useLocation().pathname;
    const navigate = useNavigate();
    const [categoryUrl, setCategoryUrl] = useState('')
    
    const categoryChang = (text: string) => {
        setCategory(text);
    }

    const handlePostSwitching = (text: string) => {
        navigate(
            category === "거래" ? `/my-page/transaction/${text}` : `/my-page/share/${text}`
        );
    }

    useEffect(() => {
        setCategoryUrl(location.split('/')[3]);
    }, [location])

    return(
        <div>
            <Dropdown>
                <DropdownToggl id="dropdown-basic">
                    {category}
                </DropdownToggl>

                <DropdownMenu>
                    <LinkBox to="transaction/my-post" onClick={() => categoryChang('거래')}>거래</LinkBox>
                    <LinkBox to="share/my-post" onClick={() => categoryChang('공유')}>공유</LinkBox>
                    <LinkBox to="chattings" onClick={() => categoryChang('채팅')}>채팅</LinkBox>
                    {/* <LinkBox to="gathering" onClick={() => locationChang('모임')}>모임</LinkBox> */}
                </DropdownMenu>

                {!(category === '채팅') && <>
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
                </>}
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
    @media screen and (max-width: 650px) {
        font-size: 14px;
        padding: 7px;
    }
`;

const DropdownMenu = styled(Dropdown.Menu)`
    --bs-dropdown-min-width: 50px;
    padding: 5px;
    @media screen and (max-width: 650px) {
        font-size: 14px;
    }
    
    a {
        @media screen and (max-width: 650px) {
            padding: 8px;
        }
    }
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
    --bs-btn-hover-bg: #7ea9e9;
    --bs-btn-active-bg: #7ea9e9;
    --bs-btn-hover-border-color: #7ea9e9;
    --bs-btn-active-border-color: #7ea9e9;
    border: 2px solid #bdbdbd;
    border-bottom: 0;
    border-radius: 7px 7px 0px 0px;
    @media screen and (max-width: 650px) {
        font-weight: 900;
        font-size: 14px;
        padding: 7px;
    }
`;