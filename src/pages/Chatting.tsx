import { useEffect, useRef, useState } from "react";
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

// 채팅 data get
interface contentsProp {
    contentsId: number;
    email: string;
    content: string;
    createdAt: string;
}

interface ChattingDataProp {
    id: number;
    participations: string[];
    createdAt: string;
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
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
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
            } else if (inputValue.length < 1) {
                return;
            }

            await updateDoc(docRef, {
                content: arrayUnion({
                    contentsId: chattiongData?.content.length,
                    email: userObj.email,
                    content: inputValue,
                    createdAt: new Date().toString(),
                })
            });
            
            setInputValue('');
        } catch (error) {
            alert("새로고침 후 다시 시도해 주세요" + error);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleChattingPost(e)
        }
    };

    // 로그인 확인
    useEffect(() => {
        CheckAuth('1:1 채팅은 로그인 후 사용 가능합니다.');
    }, [])

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

    useEffect(() => {
        const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        };
        // 메시지가 업데이트될 때마다 스크롤을 자동으로 아래로 이동
        scrollToBottom();
    }, [chattiongData]);
    console.log(chattiongData);
    return(
        <ChattingBox>
            <Header>
                {writerData && <>
                    <OpponentImg src={writerData.photoURL ? writerData.photoURL : EmptyImg}/>
                    <OpponentName>{writerData.displayName}</OpponentName>
                </>}
            </Header>
            <Body>
                {chattiongData && chattiongData.content.map((e, i) => (
                    <ChatBox key={i} emailChack={e.email === userObj.email}>
                        <DateBox>{new Date(e.createdAt).getDate()}</DateBox>
                        <ContentBox emailChack={e.email === userObj.email}>
                            <ContentBubble emailChack={e.email === userObj.email}>
                                <p>{e.content}</p>
                            </ContentBubble>
                        </ContentBox>
                    </ChatBox>
                ))}
                <div ref={messagesEndRef} />
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
`

const OpponentName = styled.p`
    font-size: 21px;
    font-weight: 900;
`;

const Body = styled.div`
    height: 510px;
    overflow: auto;

    ::-webkit-scrollbar {
        display: none;
    }
`

interface CustomLinkProps {
    emailChack?: boolean;
}

const ChatBox = styled.div<CustomLinkProps>`
    display: flex;
    justify-content: ${e => e.emailChack ? "flex-end" : "flex-start"};
`;

const DateBox = styled.div`
    display: flex;
    align-items: end;
`;

const ContentBox = styled.div<CustomLinkProps>`
    padding: 3px 5px;
    margin-left: ${e => e.emailChack ? '0' : '15px'};
    margin-right: ${e => e.emailChack ? '15px' : '0'};
`

const ContentBubble = styled.div<CustomLinkProps>`
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
    margin-top: 10px;
`

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