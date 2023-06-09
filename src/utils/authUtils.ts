import { onAuthStateChanged } from "firebase/auth";
import { authService, dbService } from "../firebase";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";

// 로그인 확인 함수
export const CheckAuth = (text: string) => {
    onAuthStateChanged(authService, (user) => {
        if (!user) {
            alert(`로그인 후 ${text}`);
            window.history.go(-1);
        }
    });
};

interface UserNicknameProps {
    photoURL: string | null;
    email: string;
    displayName: string;
}

// Buy date get
export function UserNicknameData() {
    const [usersData, setUsersData] = useState<UserNicknameProps[]>([]);
    
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