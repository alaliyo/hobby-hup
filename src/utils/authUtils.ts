import { onAuthStateChanged } from "firebase/auth";
import { authService } from "../firebase";

export const CheckToken = (text: string) => {
    onAuthStateChanged(authService, (user) => {
        if (user) {
        user.getIdToken()
            .then((token) => {
            })
            .catch((error) => {
                alert(`${error} 서버 에러입니다. 다시 시도해주세요.`);
            });
        } else {
            alert(`로그인 후 ${text}`);
            window.history.go(-1);
        }
    });
};