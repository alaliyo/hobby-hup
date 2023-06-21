import { NavigateFunction } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { authService } from "../firebase";
import { useEffect, useState } from "react";

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