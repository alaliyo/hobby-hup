import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import { authService } from '../firebase';
import { Button, Form, Stack, Alert } from 'react-bootstrap';

interface LogInProps { //props 타입
    loggedIn: boolean
}

function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [account, setAccount] = useState(false);
    const [errors, setErrors] = useState("")
    const { loggedIn } = useOutletContext<LogInProps>(); //로그인 확인 여부
    const navigate = useNavigate();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name, value },
        } = e;
        
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "password2") {
            setPassword2(value);
        }
    };

    const onSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try {
            const auth = authService;
            console.log(auth);
            if (account) {
                if (password !== password2) {
                    return setErrors("비밀번호와 비밀번호 확인이 다릅니다.");   
                }
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
        } catch (error: any) {
            const message = error.message;
            if (message === "Firebase: Error (auth/invalid-email).") {
                setErrors("아이디를 이메일 형태로 입력해주세요");
            } else if (message === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
                setErrors("비밀번호를 6자리 이상 입력해 주세요");
            } else if (message === "Firebase: Error (auth/email-already-in-use).") {
                setErrors("이미 사용중인 아이디입니다.")
            } else if (message === "Firebase: Error (auth/user-not-found).") {
                setErrors("아이디가 없습니다."); 
            } else if (message === "Firebase: Error (auth/wrong-password).") {
                setErrors("비밀번호를 다시 확인해주세.")
            }
        }
    };

    const toggleAccount = () => setAccount(prev => !prev);

    useEffect(() => {
        if (loggedIn) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedIn])

    return(
        <div>
            <LogInBox>
                <Form onSubmit={onSubmit}>
                    <LoginTitle>{account ? "회원가입" : "로그인"}</LoginTitle>
                    {account && (<>
                        <Explanation>기존 이메일을 아이디로 사용해야 비밀번호 찾기가 가능합니다. </Explanation>
                        <Explanation>회원가입시 자동 로그인됩니다.</Explanation>
                        </>)}

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>아이디</Form.Label>
                        <Form.Control name="email" type="email" placeholder="아이디를 입력해주세요." required value={email} onChange={onChange} />
                        {account &&<Explanation>이메일 형태, 숫자, 영어 30자 이하만 가능합니다. </Explanation>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control name="password" type="password" placeholder="비밀번호를 입력해주세요." required value={password} onChange={onChange} />
                        {account &&<Explanation>숫자, 영어 6~16자만 가능합니다. </Explanation>}
                    </Form.Group>

                    {account && (
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>비밀번호 확인</Form.Label>
                            <Form.Control name="password2" type="password" placeholder="다시 비밀번호를 입력해주세요." required value={password2} onChange={onChange} />
                        </Form.Group>
                    )}

                    {errors !== '' && <Alert variant="danger">{errors}</Alert>}
                    
                    <Stack direction="horizontal">
                        <Button className='ms-auto' variant="light" type="submit" >
                            {account ? "가입" : "로그인"}
                        </Button>
                    </Stack>
                </Form>
                <br></br>
                <Stack gap={1}>
                    <Button className='ms-auto' variant="light" type="submit" onClick={toggleAccount}>
                        {account ? "로그인 페이지로" : "회원가입"}
                    </Button>
                </Stack>
            </LogInBox>
        </div>
    );
}

export default LogIn;

const LoginTitle = styled.h3`
    @media screen and (max-width: 768px) {
        font-size: 0;
    }
`

const LogInBox = styled.div`
    background-color: rgb(240, 240, 240);
    padding: 50px;
    width: 500px;
    margin: 0 auto;
    margin-top: 100px;
    border-radius: 20px;
    @media screen and (max-width: 768px) {
        width: 100vw;
        padding: 15px;
        margin: 0px;
        input {
            width:90vw;
        }
    }
`

const Explanation = styled.p`
    font-size: 12px;
    color: rgb(255, 90, 90);
    font-weight: 900;
    margin-bottom: 3px;
`