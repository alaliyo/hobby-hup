import { onAuthStateChanged } from "firebase/auth";
import { authService } from "../firebase";
import { NavigateFunction } from "react-router-dom";

export const checkToken = (navigate: NavigateFunction) => {
    
    onAuthStateChanged(authService, (user) => {
        if (user) {
        user.getIdToken()
            .then((token) => {
            })
            .catch((error) => {
                alert(`${error} 서버 에러입니다. 다시 시도해주세요.`);
            });
        } else {
            alert('로그인 후 사용 가능합니다.');
            navigate("/");
        }
    });
};