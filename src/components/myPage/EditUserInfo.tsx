import { useState } from "react";
import styled from "styled-components";
import { storage, authService } from '../../firebase';
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Button, Form } from "react-bootstrap";

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
                alert('프로필이 변경되었습니다.');
            }
        } catch (error) {
            alert('이미지 업로드에 실패했습니다.');
        }
    };
    
    const handleNicknameUpdate = async () => {
        try {
            const user = authService.currentUser;
            if (user) {
                await updateProfile(user, {
                    displayName: nickname,
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