import { useEffect, useState } from "react";
import styled from "styled-components";
import { collection, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { authService, dbService } from '../../firebase';
import { Button, Form } from "react-bootstrap";
import Filter from 'bad-words';
import useKFilter from "../../hooks/KFilter";
import { uploadImages } from "../../utils/storageService";

interface userObj {
    displayName: string;
    email: string;
    photoURL: any;
}

interface EditUserInfoProps {
    userObj: userObj;
}

function EditUserInfo({ userObj }: EditUserInfoProps) {
    const [nickname, setNickname] = useState(userObj.displayName); // 유저 닉네임
    const [image, setImage] = useState<File[]>([]); // 이미지 받기
    const nicknameKFilter = useKFilter(nickname); // 한글 비속어 hook
    const [nicknames, setNicknames] = useState<any[]>([]); // firebase에서 유저 닉네임 배열
    const filter = new Filter(); // 영어 욕 필터
    
    // 유저에게 닉네임, 이미지 받기
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: {name, value},
        } = e;
        if (name === 'nickname') {
            setNickname(value);
        } else if (name === 'img') {
            const selectedImages = Array.from(e.target.files || []);
            setImage(selectedImages);
        }
    };
    
    const handleImageUpload = async () => {
        try {
            const user = authService.currentUser;

            if (image && user) {
                const storageRef = await uploadImages(
                    image, userObj.email, 1, "profileImg"
                );

                await updateProfile(user, {
                    photoURL: storageRef[0],
                });
                alert('프로필 이미지가 변경되었습니다.');
            }
        } catch (error) {
            alert('이미지 업로드에 실패했습니다.' + error);
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
            
            if (!(nicknameRegExp.test(nickname))) {
                return alert("닉네임 규칙을 확인해 주세요.");
            } else if (nicknameKFilter) {
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
                    name="nickname"
                    value={nickname}
                    maxLength={12}
                    placeholder='한글, 영어, 숫자 2~12자만 가능'
                    onChange={handleChange}
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
                    name="img"
                    placeholder="800KB, 가로, 세로 1024 이하, 확장자 jpg, png만 가능"
                    onChange={handleChange}
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
    @media screen and (max-width: 650px) {
        margin-bottom: 5px;
    }

    button {
        @media screen and (max-width: 450px) {
            font-size: 12px;
            padding: 2px;
        }
    }
`;

const LabelStyle = styled(Form.Label)`
    width: 70px;
    @media screen and (max-width: 650px) {
        width: 50px;
        font-size: 14px;
    }
    @media screen and (max-width: 450px) {
        width: 44px;
        font-size: 13px;
    }
`;

const InputStyle = styled(Form.Control)`
    width: 70%;
    font-size: 14px;
    @media screen and (max-width: 450px) {
        height: 32px;
        width: 65%;
        font-size: 12px;
    }
`;