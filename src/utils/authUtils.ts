import { onAuthStateChanged } from "firebase/auth";
import { authService } from "../firebase";
import { useEffect, useState } from "react";

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
            alert(`로그인 후 ${text} 볼 수 있습니다.`);
            window.history.go(-1);
        }
    });
};

export function UserDataObj() {
    const [data, setData] = useState<any>();

    // 유저 정보 가져오기
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setData(user);
            }
        })
    }, [])

    return data;
}