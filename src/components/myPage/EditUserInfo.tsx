import { useEffect, useState } from "react";
import styled from "styled-components";
import { storage, authService, dbService } from '../../firebase';
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Button, Form } from "react-bootstrap";
import Filter from 'bad-words';
import useKFilter from "../../hooks/KFilter";
import { collection, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";

interface userObj {
    displayName: string;
    email: string;
    photoURL: any;
}

interface EditUserInfoProps {
    userObj: userObj;
}

function EditUserInfo({ userObj }: EditUserInfoProps) {
    const [nickname, setNickname] = useState(userObj.displayName);
    const [image, setImage] = useState<File | null>(null);
    const { kFilter, checkKFilter } = useKFilter(); // 한글 비속어 hook
    const [nicknames, setNicknames] = useState<any[]>([]);
    const filter = new Filter();

    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
        
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    
    const handleImageUpload = async () => {
        try {
            const user = authService.currentUser;
            if (image && user) {
                const storageRef = ref(storage, image.name);
                await uploadBytes(storageRef, image);
                const newImageURL = await getDownloadURL(storageRef);
                await updateProfile(user, {
                    photoURL: newImageURL,
                });
                alert('프로필 이미지가 변경되었습니다.');
            }
        } catch (error) {
            alert('이미지 업로드에 실패했습니다.');
        }
    };

    useEffect(() => {
        const q = query(collection(dbService, "usersNickname"));
        return onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => doc.data());
            const arr = data.map((e) => e.nickname);
            setNicknames(arr);
        });
    }, [nickname]) 
    
    const handleNicknameUpdate = async () => {
        try {
            const user = authService.currentUser;
            const nicknameRegExp = /^(?=.*[a-zA-Z0-9ㄱ-ㅎ가-힣])[0-9a-zA-Zㄱ-ㅎ가-힣]{2,12}$/;
            checkKFilter(nickname);
            
            if (!(nicknameRegExp.test(nickname))) {
                return alert("닉네임 규칙을 확인해 주세요.");
            } else if (kFilter) {
                return alert(`닉네임(${nickname})에 비속어가 있습니다.`);
            } else if (filter.isProfane(nickname)) {
                return alert(`닉네임(${nickname})에 비속어가 있습니다.`);
            } else if (nicknames.includes(nickname)) {
                return alert("사용중인 닉네임 입니다."); // 중복 없음
            }
            if (user) {
                await updateProfile(user, {
                    displayName: nickname,
                });
                const queryRef = query(collection(dbService, "usersNickname"), where("email", "==", userObj.email));
                const querySnapshot = await getDocs(queryRef);
                querySnapshot.forEach((doc) => {
                    const docRef = doc.ref;
                    updateDoc(docRef, {
                    nickname: nickname,
                    });
                });
                alert('닉네임이 변경되었습니다.');
            }
            
        } catch (error) {
            alert('닉네임 업데이트에 실패했습니다.');
        }
    };
    

    return(
        <div>
            <GroupStyle>
                <LabelStyle column sm="0">
                    아이디
                </LabelStyle>
                <LabelStyle column>
                    {userObj.email}
                </LabelStyle>
            </GroupStyle>

            <GroupStyle direction="horizontal" gap={3}>
                <LabelStyle column sm="0">
                    닉네임
                </LabelStyle>
                <InputStyle
                    type="text"
                    value={nickname}
                    maxLength={12}
                    placeholder='한글, 영어, 숫자 2~12자만 가능'
                    onChange={handleNicknameChange}
                />
                <Button 
                    variant="light"
                    size="sm"
                    onClick={handleNicknameUpdate}
                >
                    변경
                </Button>
            </GroupStyle>

            <GroupStyle>
                <LabelStyle column sm="0">
                    이미지
                </LabelStyle>
                <InputStyle
                    type="file"
                    onChange={handleImageChange}
                />
                <Button
                    variant="light"
                    size="sm"
                    onClick={handleImageUpload}
                >
                    변경
                </Button>
            </GroupStyle>
            
        </div>
    );
}
export default EditUserInfo;

const GroupStyle = styled(Form.Group)`
    width: 100%;
    display: flex;
    margin-bottom: 10px;
`;

const LabelStyle = styled(Form.Label)`
    width: 100px;
`;

const InputStyle = styled(Form.Control)`
    width: 65%;
`;