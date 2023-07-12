import {doc, getDoc } from "firebase/firestore";
import { dbService } from "../firebase";
import { useEffect, useState } from "react";

interface UserNicknameProps {
    photoURL: string | null;
    email: string;
    displayName: string;
}

const PostNickname = (writer: string | null) => {
    const [writerData, setWriterData] = useState<UserNicknameProps>();

    useEffect(() => {
        if (writer) {
            const fetchData = async () => {
                const docRef = doc(dbService, "usersNickname", writer);
                const snapshot = await getDoc(docRef);
                if (snapshot.exists()) {
                    const postData = snapshot.data() as UserNicknameProps;
                    setWriterData(postData);
                }
            };
    
            fetchData();
        }
        
    
    }, [writer]);

    return writerData;
}

export default PostNickname;