import { Button, Form, Stack } from 'react-bootstrap';
import { LoginTitle } from './LogInStyled';
import GoogleSignUp from './GoogleSignUp';
import FindPassword from './FindPassword';

interface LoginFormProps {
    email: string;
    password: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    onSubmit: (e: React.FormEvent) => void;
}
  

function LogInForm({
    email,
    password,
    setEmail,
    setPassword,
    onSubmit,
}: LoginFormProps) {
    return(<>
        <Form onSubmit={onSubmit}>
            <LoginTitle>로그인</LoginTitle>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>아이디</Form.Label>
                <Form.Control
                    name="email"
                    type="email"
                    placeholder="아이디를 입력해주세요."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={30}  
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control 
                    type="password"
                    name="password"
                    placeholder="비밀번호를 입력해주세요."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    maxLength={16}
                />
            </Form.Group>
            
            <Stack direction="horizontal">
                <div>
                    <GoogleSignUp />
                </div>
                <Button className='ms-auto' variant="light" type="submit" >
                    로그인
                </Button>
            </Stack>
        </Form>
        <Stack direction="horizontal">
            <FindPassword />
        </Stack>
    </>);
}

export default LogInForm;