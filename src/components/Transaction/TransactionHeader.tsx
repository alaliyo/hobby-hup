import { useState } from "react";
import styled from "styled-components";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

function TransactionHeader() {
    const [location, setLocation] = useState('판매');

    const locationChamg = (text: string) => {
        setLocation(text);
    }

    return(
        <Header>
            <Dropdown>
                <DropdownToggl id="dropdown-basic">
                    {location}
                </DropdownToggl>

                <DropdownMenu>
                    <LinkBox to="buy" onClick={() => locationChamg('판매')}>판매</LinkBox>
                    <LinkBox to="sell" onClick={() => locationChamg('구매')}>구매</LinkBox>
                </DropdownMenu>
            </Dropdown>
        </Header>
    );
}

export default TransactionHeader;

const Header = styled.header`
    height: 100px;
    border-bottom: 2px solid gray;
`;

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