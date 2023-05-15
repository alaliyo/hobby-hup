import { Button, Form, Stack } from 'react-bootstrap';
import { LoginTitle, Explanation } from './LogInStyled';

interface RegisterFormProps {
    email: string;
    nickname: string;
    password: string;
    password2: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setNickname: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    setPassword2: React.Dispatch<React.SetStateAction<string>>;
    onSubmit: (e: React.FormEvent) => void;
}

function SignUpForm({
    email,
    nickname,
    password,
    password2,
    setEmail,
    setNickname,
    setPassword,
    setPassword2,
    onSubmit,
}: RegisterFormProps) {


    return(
        <>
            <Form onSubmit={onSubmit}>
                <LoginTitle>회원가입</LoginTitle>

                <Explanation>기존 이메일을 아이디로 사용해야 비밀번호 찾기가 가능합니다. </Explanation>
                <Explanation>회원가입시 자동 로그인됩니다.</Explanation>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>아이디</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="아이디를 입력해주세요."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        maxLength={30}    
                    />
                    <Explanation>이메일 형태, 숫자, 영어 30자 이하만 가능합니다.</Explanation>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>닉네임</Form.Label>
                    <Form.Control
                        name="nickname"
                        type="text"
                        placeholder="닉네임을 입력해주세요."
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        maxLength={12} 
                    />
                    <Explanation>한글, 영어, 숫자 2~12자만 가능합니다.</Explanation>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        placeholder="비밀번호를 입력해주세요."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        maxLength={16}
                    />
                    <Explanation>숫자, 영어, !@#$%^&* 포함 한 8~16자만 가능합니다.</Explanation>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>비밀번호 확인</Form.Label>
                    <Form.Control
                        name="password2"
                        type="password"
                        placeholder="다시 비밀번호를 입력해주세요."
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        maxLength={16}
                    />
                </Form.Group>

                <Stack direction="horizontal">
                    <Button className='ms-auto' variant="light" type="submit" >
                        가입
                    </Button>
                </Stack>
            </Form>

        </>
    )
}

export default SignUpForm;