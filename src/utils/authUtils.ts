import { onAuthStateChanged } from "firebase/auth";
import { authService, dbService } from "../firebase";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";

// 로그인 확인 함수
export const CheckAuth = (text: string, url: string, check: boolean) => {
    onAuthStateChanged(authService, (user) => {
        if (!user) {
            check && alert(`로그인 후 ${text}`);
            window.location.href = `${url}`;
        }
    });
};


// 유저 프로필 data type
export interface UserObj {
    photoURL: any | undefined | null;
    displayName: string;
    email: string;
}

export interface UserInfoProps {
    userObj: UserObj;
}

// user date get
export function UserNicknameData() {
    const [usersData, setUsersData] = useState<UserObj[]>([]);
    
    useEffect(() => {
        const q = query(
            collection(dbService, "usersNickname"),
        );
        onSnapshot(q, (snapshot) => {
            const postsArr: any = snapshot.docs.map((doc) => ({
                ...doc.data(),
            }));
            setUsersData(postsArr);
        });
    }, []);
    
    return usersData;
}