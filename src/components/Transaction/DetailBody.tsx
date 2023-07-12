import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Form, InputGroup } from "react-bootstrap";
import Filter from 'bad-words';
import uselinesToBreaks from "../../hooks/uselinesToBreaks";
import useKFilter from "../../hooks/KFilter";
import { authService, dbService } from "../../firebase";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import useCurrentDate from "../../hooks/currentDate";
import CommentDetail from "./CommentDetail";

interface DetailBodyProps {
    content: string;
    route: string;
}

interface CommentProps {
    id: number;
    writer: string;
    content: string;
    contentAt: string;
}

function DetailBody({ content, route }: DetailBodyProps) {
    const formattedContent = uselinesToBreaks(content); // 게시물 내용 줄바꿈
    const [comment, setComment] = useState(''); // 뎃글
    const commentKFilter = useKFilter(comment); // 한글 비속어 hook
    const filter = new Filter(); // 영어 비속어 필터
    const currentDate = useCurrentDate(); // 현재 날짜
    const [postComments, setPostComments] = useState<CommentProps[]>(); // 댓글
    const user = authService.currentUser; // user 정보
    const docRef = doc(dbService, "transactionComment", route); // firebase DB 경로
    
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

        try {
            const docSnap = await getDoc(docRef);
            
            if (comment.length >= 200) {
                return alert("뎃글은 200자 이하만 가능합니다.");
            } else if (comment.length <= 2) {
                return alert("3글자 이상 작성해야합니다.");
            } else if (commentKFilter) {
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
                        writer: user.email,
                        content: comment,
                        contentAt: currentDate,
                    })
                });
            } else {
                // 문서가 존재하지 않아 추가
                await setDoc(docRef, {
                    comments: [{
                        id: 0, 
                        writer: user.email,
                        content: comment,
                        contentAt: currentDate,
                    }],
                });
            }
            
            alert("댓글 작성되었습니다.");
            setComment("");
        }
        catch (error) {
            alert("새로고침 후 다시 시도해 주세요" + error );
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const snapshot = await getDoc(docRef);
            if (snapshot.exists()) {
                const postData = snapshot.data();
                if(postData.comments.length > 0) {
                    const sortedComments = postData.comments.sort(
                        (a: {id: number}, b:{id: number}) => b.id - a.id);
                    setPostComments(sortedComments);
                }
            }
        };

        if (route) {
            fetchData();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comment, route]);

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

                // 댓글 삭제 후 postComments 업데이트
                    setPostComments((prevComments) =>
                    prevComments?.filter((comment) => comment.id !== commentId)
                );
            }
        } catch (error) {
            alert("댓글 삭제에 실패했습니다." + error);
        }
    };

    return(
        <div>
            <ContentsBox>
                {formattedContent}
            </ContentsBox>
            <CommentTitle>댓글</CommentTitle>
            <InputBox className="mb-1">
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
            </InputBox>
            <CommentBox>
                {postComments ? postComments.map((data, i) =>
                    <CommentDetail
                        key={i}
                        data={data}
                        user={user}
                        handleCommentDel={handleCommentDel}
                    />
                ) : null}
            </CommentBox>
        </div>
    );
}

export default DetailBody;

const ContentsBox = styled.div`
    font-size: 18px;
    padding: 6px;
    padding-bottom: 10px;
    border-bottom: 1px solid #bbbbbb;
    
    @media screen and (max-width: 650px){
        font-size: 16px;
        padding: 5px;
        padding-bottom: 8px;
    }

    @media screen and (max-width: 450px){
        font-size: 14px;
        padding: 4px;
        padding-bottom: 6px;
    }
`;

const CommentTitle = styled.p`
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 5px;
    font-weight: 900;

    @media screen and (max-width: 450px){
        margin-left: 5px;
        margin-top: 5px;
        font-size: 14px;
    }
`;

const InputBox = styled(InputGroup)`
    width: 100%;

    @media screen and (max-width: 650px) {
        padding-right: 10px;
        padding-left: 10px;
    }
    
    input {
        height: 35px;

        @media screen and (max-width: 450px) {
            height: 30px;
            font-size: 12px;
        }
    }
`;

const CommentBtn = styled(Button)`
    position: fixed;
    z-index: 1;
    --bs-btn-hover-bg: #6f9fe7;
    --bs-btn-hover-border-color: #6f9fe7;
    --bs-btn-active-bg: #3e80e4;
    --bs-btn-active-border-color: #3e80e4;
    font-size: 15px;
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
`;

const CommentBox = styled.div`
    padding: 10px;
    margin-bottom: 20px;

    @media screen and (max-width: 650px) {
        padding: 7px;
        margin-bottom: 15px;
    }

    @media screen and (max-width: 450px) {
        padding: 4px;
        margin-bottom: 10px;
    }
`;