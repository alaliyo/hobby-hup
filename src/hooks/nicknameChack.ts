import { dbService } from "../firebase";
import { query, collection, onSnapshot } from "firebase/firestore";

export const fetchNicknames = (nickname: string): any => {
    const q = query(collection(dbService, "usersNickname"));
    return onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        const nicknames = data.map((e) => e.nickname);
        nicknames.includes(nickname);
    });
};