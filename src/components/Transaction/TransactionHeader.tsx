import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Dropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { authService } from "../../firebase";
import Search from "../Common/Search";
import { BuyDatasMaxId, SellDatasMaxId, TransactionDataProps } from "../../utils/dbService";

interface TransactionHeaderProps {
    buyData: TransactionDataProps[];
    sellData: TransactionDataProps[];
    handleSearch: (searchResult: TransactionDataProps[]) => void;
    pathname: string;
}

function TransactionHeader({buyData, sellData, handleSearch, pathname}: TransactionHeaderProps) {
    const [menuLocation, setMenuLocation] = useState(
        pathname === "/transaction/buy" ? "판매" : "구매"
    ); // 메뉴 구분 값
    const location = useLocation();
    const [pageUrl, setPageUrl] = useState(''); // 상세 페이지 url
    const user = authService.currentUser; // 클라이언트 정보 SDK
    const [searchQuery, setSearchQuery] = useState(''); // 검색 글
    const [searchResult, setSearchResult] = useState<TransactionDataProps[] | null>(null); // 검색 결과 data
    const buyMaxId = BuyDatasMaxId(); // 판메 postId 값
    const sellMaxId = SellDatasMaxId(); // 구매 postId 값

    // 로그인 확인
    const locationChange = (text: string) => {
        setMenuLocation(text);
    }
    
    // buy, sell 구분
    useEffect(() => {
        setPageUrl(location.pathname.split('/')[2] + location.pathname.split('/')[3])
    }, [location])

    // 검색 data 넘기기
    useEffect(() => {
        setSearchResult(
            pathname === "/transaction/buy" ? buyData : sellData
        );
        setSearchQuery(pathname && '')
    }, [buyData, pathname, sellData]);

    // 검색 단어 넘기기
    useEffect(() => {
        if (searchResult) {
            handleSearch(searchResult);
        }
    }, [handleSearch, searchResult]);
    
    return(
        <Header>
            <Dropdown>
                <DropdownToggl id="dropdown-basic">
                    {menuLocation}
                </DropdownToggl>

                <DropdownMenu>
                    <LinkBox to="buy" onClick={() => locationChange('판매')}>판매</LinkBox>
                    <LinkBox to="sell" onClick={() => locationChange('구매')}>구매</LinkBox>
                </DropdownMenu>
            </Dropdown>
            {pageUrl === 'buyundefined' || pageUrl === 'sellundefined' ?
                (<>
                    <Search
                        postsData={pathname === '/transaction/buy' ? buyData : sellData}
                        searchQuery={searchQuery}
                        searchResult={searchResult}
                        setSearchQuery={setSearchQuery}
                        setSearchResult={setSearchResult}
                    />
                    {user ? (
                        <Link to={`/transaction/write/${buyMaxId}${sellMaxId}`}>
                            <ButtonColor variant="outline-secondary">작성하기</ButtonColor>
                        </Link>
                    ) : (
                        <div></div>
                    )}
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
    
    @media screen and (max-width: 650px) {
        height: 60px;
        padding-bottom: 20px;
    }

    @media screen and (max-width: 450px) {
        height: 50px;
        padding-bottom: 10px;
        padding-left:2%;
        padding-right: 2%;
    }
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

    @media screen and (max-width: 650px) {
        padding: 5px;
        width: 56px;
        font-size: 14px;
    }

    @media screen and (max-width: 450px) {
        padding: 3px;
        width: 50px;
        height: 30px;
        font-size: 12px;
    }
`;

const DropdownMenu = styled(Dropdown.Menu)`
    --bs-dropdown-min-width: 70px;
    padding: 5px;
    position: absolute;
    z-index: 1;

    @media screen and (max-width: 650px) {
        --bs-dropdown-min-width: 56px;
        padding: 2px;
        font-size: 14px;
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
    --bs-btn-hover-bg: #6f9fe7;
    --bs-btn-active-bg: #6f9fe7;
    --bs-btn-hover-border-color: #6f9fe7;

    @media screen and (max-width: 650px) {
        font-size: 14px;
        padding: 6px;
    }

    @media screen and (max-width: 450px) {
        font-size: 12px;
        padding: 5px;
    }
`;