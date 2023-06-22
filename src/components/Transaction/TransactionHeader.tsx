import { useEffect, useState } from "react";
import styled from "styled-components";
import { Dropdown, InputGroup, Form } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import{ ButtonColor } from '../Common/ButtonStyle';

function TransactionHeader() {
    const [menuLocation, setMenuLocation] = useState('판매');
    const location = useLocation();
    const [pageUrl, setPageUrl] = useState('');

    const locationChamg = (text: string) => {
        setMenuLocation(text);
    }

    useEffect(() => {
        setPageUrl(location.pathname.split('/')[2] + location.pathname.split('/')[3])
    }, [location])
    
    return(
        <Header>
            <Dropdown>
                <DropdownToggl id="dropdown-basic">
                    {menuLocation}
                </DropdownToggl>

                <DropdownMenu>
                    <LinkBox to="buy" onClick={() => locationChamg('판매')}>판매</LinkBox>
                    <LinkBox to="sell" onClick={() => locationChamg('구매')}>구매</LinkBox>
                </DropdownMenu>
            </Dropdown>
            {
                pageUrl === 'buyundefined' || pageUrl === 'sellundefined' ? (<>
                    <InputGroupstyle>
                        <Form.Control
                            placeholder="내용을 입력해주세요"
                        />
                        <ButtonColor variant="outline-secondary" id="button-addon2">
                            검색
                        </ButtonColor>
                    </InputGroupstyle>
                    <Link to='/transaction/write'>
                        <ButtonColor variant="outline-secondary">작성하기</ButtonColor>
                    </Link>
                </>) : null
            }
            

            
        </Header>
    );
}

export default TransactionHeader;

const Header = styled.header`
    height: 70px;
    padding-bottom: 30px;
    border-bottom: 2px solid gray;
    display: flex;
    justify-content: space-between;
`;

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

const InputGroupstyle = styled(InputGroup)`
    width: 50%;
`;