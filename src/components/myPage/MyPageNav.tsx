import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

function MyPageNav() {  
    const [location, setLocation] = useState('거래');

    const locationChamg = (text: string) => {
        setLocation(text);
    }

    return(
        <div>
            <Dropdown>
                <DropdownToggl id="dropdown-basic">
                    {location}
                </DropdownToggl>

                <DropdownMenu>
                    <LinkBox to="transaction" onClick={() => locationChamg('거래')}>거래</LinkBox>
                    <LinkBox to="share" onClick={() => locationChamg('공유')}>공유</LinkBox>
                    <LinkBox to="gathering" onClick={() => locationChamg('모임')}>모임</LinkBox>
                </DropdownMenu>
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
    --bs-btn-active-bg: gray;
    --bs-btn-active-border-color: gray;
    :hover {
        background-color: gray;
        border-color: gray;
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