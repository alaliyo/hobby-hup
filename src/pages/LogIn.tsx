import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
} from 'firebase/auth';
import { authService, dbService } from '../firebase';
import { addDoc, collection, onSnapshot, query } from 'firebase/firestore';
import { Alert } from 'react-bootstrap';
import Filter from 'bad-words';
import useKFilter from '../hooks/KFilter';
import { LogInBox, ChangeBut } from '../components/login/LogInStyled';
import LogInForm from '../components/login/LogInForm';
import SignUpForm from '../components/login/SignUpForm';

function LogIn() {
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [nicknames, setNicknames] = useState<string[]>([]); // 닉네임 배열
    const [account, setAccount] = useState(false); // 로그인 및 회원가입 컴퍼넌트 변환 값
    const [errors, setErrors] = useState("") // 에러 Alert 값
    const navigate = useNavigate();
    const { kFilter, checkKFilter } = useKFilter(); // 한글 비속어 hook

    const filter = new Filter();

    // 토큰 확인 로직
    const checkToken = () => {
        onAuthStateChanged(authService, (user) => {
        if (user) {
            user.getIdToken()
            .then((token) => {
                token && navigate("/");
            })
            .catch((error) => {
                alert(error);
            });
        }
        });
    };

    // 토큰 확인 호출
    checkToken();

    // 로그인 및 회원가입 기능
    const onSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        // 아이디 규칙
        const emailRegExp = /^(?=.*[a-zA-Z0-9]*@[a-zA-Z0-9]*.[a-zA-Z0-9])[0-9a-zA-Z@.]{10,30}$/;
        // 닉네임 규칙
        const nicknameRegExp = /^(?=.*[a-zA-Z0-9ㄱ-ㅎ가-힣])[0-9a-zA-Zㄱ-ㅎ가-힣]{2,12}$/;
        // 비밀번호 규칙
        const passwordRegExp = /^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,16}/;
        try {
            const auth = authService;
            const nicknameChank = nicknames.includes(nickname);
            checkKFilter(nickname);
            if (account) {
                if (!(emailRegExp.test(email))) {
                    return setErrors("아이디 규칙을 확인해 주세요");
                } else if (!(nicknameRegExp.test(nickname))) {
                    return setErrors("닉네임 규칙을 확인해 주세요.");
                } else if (nicknameChank) {
                    return setErrors("사용중인 닉네임 입니다."); // 중복 없음
                } else if (!(passwordRegExp.test(password))) {
                    return setErrors("비밀번호 규칙을 확인해 주세요");
                } else if (password !== password2) {
                    return setErrors("비밀번호와 비밀번호 확인이 다릅니다.");   
                } else if (kFilter) {
                    return setErrors(`닉네임(${nickname})에 비속어가 있습니다.`);
                } else if (filter.isProfane(nickname)) {
                    return setErrors(`닉네임(${nickname})에 비속어가 있습니다.`);
                  }
                await createUserWithEmailAndPassword(auth, email, password);
                const user = auth.currentUser;
                if (user) {await updateProfile(user, { displayName: nickname });}
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
                setErrors("비밀번호를 다시 확인해주세요.")
            } else if (message === "Firebase: Error (auth/missing-password).") {
                setErrors("비밀번호를 입력해 주세요.")
            }
        }

        if (account) {
            try {
                await addDoc(collection(dbService, 'usersNickname'), {
                    email: email,
                    nickname: nickname,
                });
            } catch (error) {
                alert('서버 에러입니다. 새로고침 후 다시 해주세요~')
            }
        }
    };

    // 로그인, 회원가임 컴퍼넌트 변경 함수
    const toggleAccount = () => setAccount(prev => !prev);

    // nickname GET
    useEffect(() => {
        const q = query(
            collection(dbService, "usersNickname"),
        );
        onSnapshot(q, (snapshot) => {
            const data: any = snapshot.docs.map((doc) => ({
                ...doc.data(),
            }));
            const nicknasmsArr = data.map((e: { nickname: string; }) => e.nickname)
            setNicknames(nicknasmsArr);
        });
    }, []);

    return(
        <div>
            <LogInBox>
                {account ?
                    <SignUpForm
                    email={email}
                    nickname={nickname}
                    password={password}
                    password2={password2}
                    setEmail={setEmail}
                    setNickname={setNickname}
                    setPassword={setPassword}
                    setPassword2={setPassword2}
                    onSubmit={onSubmit}
                />
                 : 
                <LogInForm 
                    email={email}
                    password={password}
                    setEmail={setEmail}
                    setPassword={setPassword}
                    onSubmit={onSubmit}
                />
                }
                <br></br>
                {errors !== '' && <Alert variant="danger">{errors}</Alert>}
                <ChangeBut onClick={toggleAccount}>
                    {account ? '로그인하러 가기' : '회원가입하러 가기'}
                </ChangeBut>
            </LogInBox>
        </div>
    );
}

export default LogIn;