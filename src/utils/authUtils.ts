import { onAuthStateChanged } from "firebase/auth";
import { authService } from "../firebase";

// 로그인 확인 함수
export const CheckAuth = (text: string) => {
    onAuthStateChanged(authService, (user) => {
        if (!user) {
            alert(`로그인 후 ${text}`);
            window.history.go(-1);
        }
    });
};