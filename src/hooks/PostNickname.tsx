import {doc, getDoc } from "firebase/firestore";
import { dbService } from "../firebase";
import { useEffect, useState } from "react";

interface UserNicknameProps {
    photoURL: string | null;
    email: string;
    displayName: string;
}

const PostNickname = (writer: string) => {
    const [writerData, setWriterData] = useState<UserNicknameProps>();

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(dbService, "usersNickname", writer);
            const snapshot = await getDoc(docRef);
            if (snapshot.exists()) {
                const postData = snapshot.data() as UserNicknameProps;
                setWriterData(postData);
            }
        };

        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return writerData;
}

export default PostNickname;