import { authService, dbService } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { Form, FormLabel, FormControl, Button } from "react-bootstrap";
import { doc, setDoc } from "firebase/firestore";
import { NoticeData, NoticeDataProp } from "../../utils/dbService";

function NoticeWrite() {
    const navigate = useNavigate(); // 이동
    const user = authService.currentUser; // 유저 정보
    const [title, setTitle] = useState(""); // 제목
    const [version, setVersion] = useState(""); // 버전
    const [content, setContent] = useState(""); // 내용
    const noticeData: NoticeDataProp[] = NoticeData(); // 데이터 
    
    // 클라이언트에게 data 받기
    const textChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name, value },
        } = e;
        if (name === 'title') {
            setTitle(value);
        } else if (name === 'version') {
            setVersion(value);
        } else if (name === 'content') {
            setContent(value);
        }
    };

    // admin 확인
    const Checkadmin = () => {
        if (!user) {
            navigate(-1);
        } else if (user.email !== "des321321@naver.com") {
            navigate(-1);
        }
    };

    //notice post
    const handleNoticeUpdate = async (e: any) => {
        e.preventDefault();
        
        try {
            if (user && user.email === "des321321@naver.com") {

                // post 줄 바꿈 \\으로 변환
                const LineBreaks = content.replace(/\n/g, '\\n');
                const today = new Date()
                const year = today.getFullYear().toString().slice(2, 4);
                const month = today.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
                const date = today.getDate();
                const createdAt = `${year}.${month}.${date}`

                await setDoc(doc(dbService, 'notice', version), {
                        id: noticeData[0].id + 1,
                        title: title,
                        version: `v${version}`,
                        content: LineBreaks,
                        createdAt: createdAt,
                    }
                );
                alert('게시물이 업로드 되었습니다.')
                navigate("/notice");
            }
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        Checkadmin();
    });

    return(
        <WriteBox>
            <Title>
                공지 작성
            </Title>
            <hr />
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <FormLabel>제목</FormLabel>
                <FormControl
                    type="text"
                    placeholder="제목을 입력해주세요."
                    name='title'
                    onChange={textChange}
                    value={title}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <FormLabel>버전</FormLabel>
                <FormControl
                    type="text"
                    placeholder="버전을 입력해주세요."
                    name='version'
                    onChange={textChange}
                    value={version}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <FormLabel>내용</FormLabel>
                <Form.Control
                    as="textarea"
                    rows={10}
                    placeholder="내용을 입력해주세요."
                    style={{
                        resize: 'none',
                        fontSize: '15px'
                    }}
                    name='content'
                    onChange={textChange}
                    value={content}
                />
            </Form.Group>

            <BtnBox>
                <Button 
                    variant="outline-secondary"
                    onClick={handleNoticeUpdate}
                >
                    완료
                </Button>
            </BtnBox>
        </WriteBox>
    );
}

export default NoticeWrite;

const WriteBox = styled.div`
    
`;

const Title = styled.h2`
    font-weight: 900;
    text-align : center;
`;

const BtnBox = styled.div`
    text-align : end;
`