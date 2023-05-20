import { Form } from "react-bootstrap";
import styled from "styled-components";


interface userObj {
    displayName: string;
    email: string;
    photoURL: any;
}

interface EditUserInfoProps {
    userObj: userObj;
}

function EditUserInfo({ userObj }: EditUserInfoProps) {

    return(
        <Form>
            <GroupStyle>
                <LabelStyle column sm="0">
                    아이디
                </LabelStyle>
                <LabelStyle column>
                    {userObj.email}
                </LabelStyle>
            </GroupStyle>
            <GroupStyle>
                <LabelStyle column sm="0">
                    닉네임
                </LabelStyle>
                <Form.Control type="text" value={userObj.displayName} />
            </GroupStyle>
            <GroupStyle>
                <LabelStyle column sm="0">
                    이미지
                </LabelStyle>
                <Form.Control type="file" />
            </GroupStyle>
            <GroupStyle>
                <LabelStyle column sm="0">
                    비밀번호
                </LabelStyle>
                <Form.Control type="password"/>
            </GroupStyle>
        </Form>
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