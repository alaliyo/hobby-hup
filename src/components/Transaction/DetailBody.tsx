import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Form, InputGroup } from "react-bootstrap";
import Filter from 'bad-words';
import EmptyImg from '../../imgs/EmptyImg.png';
import uselinesToBreaks from "../../hooks/uselinesToBreaks";
import useKFilter from "../../hooks/KFilter";
import { authService, dbService } from "../../firebase";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import useCurrentDate from "../../hooks/currentDate";

interface DetailBodyProps {
    content: string;
    route: string;
}

interface CommentProps {
    id: number;
    writer: string;
    writerProfile: string;
    content: string;
    contentAt: string;
}

function DetailBody({ content, route }: DetailBodyProps) {
    const formattedContent = uselinesToBreaks(content); // 게시물 내용 줄바꿈
    const [comment, setComment] = useState(''); // 뎃글
    const { kFilter, checkKFilter } = useKFilter(); // 한글 비속어 hook
    const filter = new Filter(); // 영어 비속어 필터
    const currentDate = useCurrentDate(); // 현재 날짜
    const [postComments, setPostComments] = useState<CommentProps[]>();
    const user = authService.currentUser; // user 정보
    const [delCheck, setDelCheck] = useState('');
    const docRef = doc(
        dbService,
        "transactionComment",
        route
    ); // firebase DB 경로
    
    // 클라이언트 뎃글 받기
    const commentonChange = (e: ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    };
    
    // input 엔터에 이벤트 호출
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleCommentUpdate(e);
        }
    };

    // 댓글 date post
    const handleCommentUpdate = async (e: any) => {
        e.preventDefault();
        checkKFilter(comment);

        try {
            const docSnap = await getDoc(docRef);
            
            if (comment.length >= 200) {
                return alert("뎃글은 200자 이하만 가능합니다.");
            } else if (comment.length <= 2) {
                return alert("3글자 이상 작성해야합니다.");
            } else if (kFilter) {
                return alert("제목에 비속어가 포함되어 있습니다.");
            } else if (filter.isProfane(comment)) {
                return alert("제목에 비속어가 포함되어 있습니다.");
            } else if (!user) {
                return alert("로그인 후 사용 가능합니다.");
            }

            if (docSnap.exists() && postComments) {
                // 문서가 존재하여 추가
                await updateDoc(docRef, {
                    comments: arrayUnion({
                        id: postComments.length > 0 ? postComments[0].id + 1 : 0,
                        writer: user.displayName,
                        writerProfile: user.photoURL,
                        content: comment,
                        contentAt: currentDate,
                    })
                });
            } else {
                // 문서가 존재하지 않아 추가
                await setDoc(docRef, {
                    comments: [{
                        id: 0, 
                        writer: user.displayName,
                        writerProfile: user.photoURL,
                        content: comment,
                        contentAt: currentDate,
                    }],
                });
            }
            
            alert("뎃글 작성되었습니다.");
            setComment("");
        }
        catch (error) {
            alert("새로고침 후 다시 시도해 주세요" + error );
        }
    };

    // comment Del
    const handleCommentDel = async (commentId: number) => {
        try {
            
            // eslint-disable-next-line no-restricted-globals
            const check = confirm("댓글을 삭제하시겠습니까?")
            
            if(check) {
                await updateDoc(docRef, {
                    comments: postComments?.filter((comment) => comment.id !== commentId),
                });
                alert("댓글이 삭제되었습니다.");
                setDelCheck('1');
            }
        } catch (error) {
            alert("댓글 삭제에 실패했습니다." + error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const snapshot = await getDoc(docRef);
            if (snapshot.exists()) {
                const postData = snapshot.data();
                const sortedComments = postData.comments.sort(
                    (a: {id: number}, b:{id: number}) => b.id - a.id);
                setPostComments(sortedComments);
            }
        };

        if (route) {
            fetchData();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comment, route, delCheck]);
    
    return(
        <div>
            <ContentsBox>
                {formattedContent}
            </ContentsBox>
            <CommentTitle>댓글</CommentTitle>
            <InputGroup className="mb-1">
                <Form.Control
                    type="text"
                    placeholder="댓글을 입력해주세요. 200자 이하만 가능"
                    onChange={commentonChange}
                    value={comment}
                    onKeyDown={handleKeyPress}
                />
                <CommentBtn
                    variant="outline-secondary"
                    id="button-addon2"
                    onClick={handleCommentUpdate}
                >
                    완료
                </CommentBtn>
            </InputGroup>
            <CommentBox>
                {postComments ? postComments.map(data =>
                    <CommentDetail key={data.id}>
                        <CommentImg src={data.writerProfile ? data.writerProfile : EmptyImg} />
                        <CommentNickname>{data.writer}</CommentNickname>
                        <CommentContents>{data.content}</CommentContents>
                        <CommentDate>{data.contentAt}</CommentDate>
                        {user?.displayName === data.writer && 
                            <DelBtm
                                onClick={() => handleCommentDel(data.id)}
                            >⨉</DelBtm>
                        }
                    </CommentDetail>
                ) : null}
            </CommentBox>
        </div>
    );
}

export default DetailBody;

const ContentsBox = styled.div`
    padding: 10px;
    padding-bottom: 20px;
    border-bottom: 1px solid #bbbbbb;
`;

const CommentTitle = styled.p`
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 5px;
    font-weight: 900;
`;

const CommentBtn = styled(Button)`
    position: fixed;
    z-index: 1;
    --bs-btn-hover-bg: #6f9fe7;
    --bs-btn-hover-border-color: #6f9fe7;
    --bs-btn-active-bg: #3e80e4;
    --bs-btn-active-border-color: #3e80e4;
`;

const CommentBox = styled.div`
    padding: 10px;
    margin-bottom: 20px;
`;

const CommentDetail = styled.div`
    display: flex;
    margin-bottom: 7px;
`;

const CommentImg = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 15px;
    margin-right: 5px;
`

const CommentNickname = styled.span`
    font-weight: 900;
    margin-right: 5px;

`

const CommentContents = styled.span`
    width: 70%;
`;

const CommentDate = styled.span`
    margin-left: auto;
`;

const DelBtm = styled.button`
    height: 24px;
    width: 24px;
    color: #ff8282;
    background-color: white;
    font-weight: 900;
    padding: 0;
    border: 0;

    &:hover {
        color: red;
    }
`;