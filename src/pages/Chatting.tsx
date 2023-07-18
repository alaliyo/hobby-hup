import { useEffect, useState } from "react";
import { CheckAuth } from "../utils/authUtils";
import { useLocation } from 'react-router-dom';
import { authService, dbService } from "../firebase";
import styled from "styled-components";
import EmptyImg from '../imgs/EmptyImg.png';
import { Button, InputGroup, Form } from "react-bootstrap";
import PostNickname from "../hooks/PostNickname";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import useKFilter from "../hooks/KFilter";
import Filter from 'bad-words';

interface contentsProp {
    contentsId: number;
    email: string;
    content: string;
    createdAt: string;
}

interface ChattingDataProp {
    id: number;
    participations: string[];
    createdAt: Date;
    content: contentsProp[];
}

function Chatting() {
    const location = useLocation().pathname; // 주소 조회
    const [chattiongData, setChattiongData] = useState<ChattingDataProp| null>(null); // 현재 채팅 data
    const [userObj, setUserObj] = useState<any>(); // 사용 유저 정보
    const [opponentId, setOpponentId] = useState<string>(''); // 상대 유저 아이디
    const writerData = PostNickname(opponentId); // 작성자 닉네임, 프로필 이미지
    const [inputValue, setInputValue] = useState<string>(''); // input 값
    const KFilter = useKFilter(inputValue); // 한글 비속어 필터
    const filter = new Filter(); // 영어 비속어 필터
    console.log(chattiongData);
    // input value 추출
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    // 챙팅 data 로딩
    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(dbService, "chattings", `chattingId${location.split('/')[2]}`);
            const snapshot = await getDoc(docRef);
            if (snapshot.exists()) {
                const postData = snapshot.data() as ChattingDataProp;
                setChattiongData(postData);
            }
        };

        fetchData();
    }, [location, inputValue]);

    // 댓글 DB로
    const handleChattingPost = async (e: any) => {
        e.preventDefault();

        const docRef = doc(dbService, "chattings", `chattingId${location.split('/')[2]}`);
        try {
            if (KFilter) {
                return alert("비속어가 감지되었습니다.");
            } else if (filter.isProfane(inputValue)) {
                return alert("비속어가 감지되었습니다.");
            }

            const newDate = new Date();
            const year = newDate.getFullYear().toString().slice(2, 4);
            const month = newDate.getMonth() + 1;
            const date = newDate.getDate();
            const hours = newDate.getHours();
            const minutes = newDate.getMinutes();
            const contentLength = chattiongData?.content?.length ?? 0;

            await updateDoc(docRef, {
                content: arrayUnion({
                    contentsId: contentLength,
                    email: userObj.email,
                    content: inputValue,
                    createdAt: `${year}/${month}/${date} ${hours}:${minutes}`,
                })
            });
            setInputValue('');
        } catch (error) {
            alert("새로고침 후 다시 시도해 주세요" + error);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleChattingPost(e);
        }
    };

    // 로그인 확인
    useEffect(() => {
        CheckAuth('', '/', false);
    }, []);

    // 유저 정보 가져오기
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setUserObj(user);
            }
        })
    }, []);
    
    // 상대방 아이디 추출
    useEffect(() => {
        if (userObj) {
            const opponent = userObj.email === chattiongData?.participations[0] ?
                chattiongData?.participations[1] :
                chattiongData?.participations[0];

            if (opponent) {
                setOpponentId(opponent);
            }
        }
    }, [chattiongData, userObj]);
    
    return(
        <ChattingBox>
            <Header>
                {writerData && <>
                    <OpponentImg src={writerData.photoURL ? writerData.photoURL : EmptyImg}/>
                    <OpponentName>{writerData.displayName}</OpponentName>
                </>}
            </Header>

            <Body>
                {chattiongData && chattiongData.content ? (
                    chattiongData.content.map((e, i) => (
                        <ChatBox key={i} emailChack={e.email === userObj.email}>
                            <ContentBox emailChack={e.email === userObj.email}>
                                <ContenBubble emailChack={e.email === userObj.email}>
                                    <p>{e.content}</p>
                                </ContenBubble>
                            </ContentBox>
                            <ChatDate>{e.createdAt}</ChatDate>
                        </ChatBox>
                    ))
                ) : null}
            </Body>

            <Footer>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="내용을 입력해주세요."
                        aria-describedby="basic-addon2"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />

                    <Button
                        variant="secondary"
                        id="button-addon2"
                        onClick={handleChattingPost}
                    >
                        완료
                    </Button>
                </InputGroup>
            </Footer>
        </ChattingBox>
    );
}

export default Chatting;

const ChattingBox = styled.div`
    height: 650px;
    background-color: #98b9eb;
    width: 450px;
    margin: 85px auto 30px auto;
    border: 1px solid #999999;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 1px 1px 2px #d4d4d4, -1px -1px 2px #d6d6d6;

    @media screen and (max-width: 450px) {
        width: 100%;
    }
`;

const Header = styled.header`
    display: flex;
    height: 55px;
    padding-bottom: 60px;
`;

const OpponentImg = styled.img`
    height: 40px;
    width: 40px;
    border-radius: 50%;
    margin-right: 10px;
`;

const OpponentName = styled.p`
    font-size: 21px;
    font-weight: 900;
`;

const Body = styled.div`
    height: 510px;
    overflow: auto;
    padding: 5px 10px;
`;

interface CustomLinkProps {
    emailChack?: boolean;
}

const ChatBox = styled.div<CustomLinkProps>`
    display: flex;
    flex-direction: ${e => e.emailChack ? "row-reverse" : "row"};
`;

const ChatDate = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

const ContentBox = styled.div<CustomLinkProps>`
    display: flex;
    padding: 5px 10px;
`;

const ContenBubble = styled.div<CustomLinkProps>`
    background-color: ${e => e.emailChack ? "#fff9a9" : "#ffffff"};
    border-radius: 10px;
    color: #000000;
    padding: 10px;
    max-width: 200px;
    word-wrap: break-word;
    border-top-left-radius: ${e => e.emailChack ? "10px" : "0px"};
    border-top-right-radius: ${e => e.emailChack ? "0px" : "10px"};

    p {
        margin: 0;
    }
`;

const Footer = styled.footer`
    height: 60px;
`;

// const Profile = styled.div`
//     display: flex;
//     height: 30px;
// `;

// const ProfileImg = styled.img`
//     height: 30px;
//     width: 30px;
//     border-radius: 50%;
//     margin-right: 5px;
// `;

// const ProfileNickname = styled.p`
//     font-weight: 900;
// `;