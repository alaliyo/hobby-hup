import { Button, Form, InputGroup } from 'react-bootstrap';
import styled from 'styled-components';

interface postsData { //객체 타입
    postId: number;
    title: string;
    url?: string;
    date: string;
    bibleVerse?: string;
}

interface SearchProps {
    postsData: Array<postsData>;
    searchQuery: string;
    searchResult: any;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    setSearchResult: React.Dispatch<React.SetStateAction<any>>;
};

function Search({postsData, searchQuery, searchResult, setSearchQuery, setSearchResult}: SearchProps) {
    
    // 검색어 상태 갱신
    const handleSearchInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearchQuery(e.target.value);
    }; 

    // 검색 버튼 클릭 이벤트 핸들러
    const handleSearchButtonClick = () => {
        // 검색어를 포함하는 데이터 필터링
        const filteredData = postsData.filter((item: { title: string; date: string; }) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.date.toLowerCase().includes(searchQuery)
        );
        setSearchResult({ postsData: filteredData }); // 검색 결과를 searchResult 상태값에 저장
    };

    // Enter key를 누르면 여기에서 원하는 작업을 수행할 수 있습니다.
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearchButtonClick()
        }
    };

    const searchReset = () => {
        setSearchResult(undefined);
        setSearchQuery('');
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
                size="sm"
            >
                ⚲
            </Button>
            {searchResult && 
                <Button
                    onClick={searchReset}
                    variant="outline-secondary"
                    id="button-addon2"
                    size="sm"
                >전체</Button>
            }
        </InputBox>
    );
}

export default Search;

const InputBox = styled(InputGroup)`
    width: 350px;
    input {
        height: 30px;
    }
    button {
        font-size: 13px;
        font-weight: 900;
        height: 30px;
        padding: 0 15px;
        @media screen and (max-width: 650px) {
            padding: 0 10px;
            font-size: 11px;
        }
    }
    @media screen and (max-width: 650px) {
        padding-right: 10px;
        width: 60%;
    }
`;