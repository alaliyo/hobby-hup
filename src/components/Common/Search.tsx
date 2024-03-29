import { Button, Form, InputGroup } from 'react-bootstrap';
import styled from 'styled-components';
import { UserNicknameData } from '../../utils/authUtils';

interface TransactionDataProps {
    id: number
    title: string;
    content: string;
    writer: string
    selected: string;
    price: number | string;
    imgs: string[];
    createdAt: string;
    route: string;
}

interface SearchProps {
    postsData: Array<TransactionDataProps>;
    searchQuery: string;
    searchResult: any;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    setSearchResult: React.Dispatch<React.SetStateAction<any>>;
};

function Search({postsData, searchQuery, searchResult, setSearchQuery, setSearchResult}: SearchProps) {
    const userNicknameData = UserNicknameData();
    console.log(postsData);
    // 검색어 상태 갱신
    const handleSearchInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearchQuery(e.target.value);
    }; 

    // 검색 버튼 클릭 이벤트 핸들러
    const handleSearchButtonClick = () => {
        // 검색어를 포함하는 데이터 필터링
        const filteredData = postsData.filter((item: {
            title: string;
            writer: string;
            createdAt: string;
            selected: string;
        }) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            userNicknameData.filter(date => date.email === item.writer)[0]
                .displayName.toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            item.selected.toLowerCase().includes(searchQuery) ||
            item.createdAt.toLowerCase().includes(searchQuery)
        );
        // 검색 결과를 searchResult 상태값에 저장
        setSearchResult(filteredData); 
    };

    // Enter key를 누르면 여기에서 원하는 작업을 수행할 수 있습니다.
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearchButtonClick()
        }
    };

    return(
        <InputBox className="mb-3">
            <Form.Control
                onChange={handleSearchInputChange}
                onKeyDown={handleKeyDown}
                placeholder="검색"
                aria-describedby="basic-addon2"
                value={searchQuery}
            />
            <Button 
                onClick={handleSearchButtonClick}
                variant="outline-secondary"
                id="button-addon2"
                
            >
                검색{/*⚲*/}
            </Button>
        </InputBox>
    );
}

export default Search;

const InputBox = styled(InputGroup)`
    width: 60%;

    @media screen and (max-width: 650px) {
        padding-right: 10px;
        width: 50%;
    }
    
    input {
        height: 35px;

        @media screen and (max-width: 450px) {
            height: 30px;
            font-size: 12px;
        }
    }
    button {
        font-size: 15px;
        font-weight: 900;
        height: 35px;
        padding: 0 10px;

        @media screen and (max-width: 650px) {
            padding: 0 10px;
            font-size: 12px;
        }

        @media screen and (max-width: 450px) {
            height: 30px;
            width: 40px;
            padding: 0 5px;
            font-size: 11px;
        }
    }
`;