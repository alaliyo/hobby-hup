import { Link } from "react-router-dom";
import styled from "styled-components";
import PostNickname from "../../hooks/PostNickname";
import EmptyImg from '../../imgs/EmptyImg.png';

interface PostProps {
    postId: number;
    otherPartyId: string;
    lastContent: string | false | null;
}

function ChattingPost({postId, otherPartyId, lastContent}: PostProps) {
    const writerData = PostNickname(otherPartyId); // 작성자 닉네임, 프로필 이미지
    console.log(writerData);
    return(
        <MyChattingsBox to={`/chatting/${postId}`}>
            <OtherPartyImg src={writerData?.photoURL ? writerData.photoURL :  EmptyImg} />

            <div>
                <OtherPartyNicknName>{writerData?.displayName}</OtherPartyNicknName>
                <span>{lastContent}</span>
            </div>
        </MyChattingsBox>
    );
}

export default ChattingPost;

const MyChattingsBox = styled(Link)`
    display: flex;
    text-decoration: none;
    color: black;
    margin-bottom: 10px;
    box-shadow: 2px 2px 3px #e0e0e0;

    :hover {
        color: #6f9fe7;
        transition: .3s;
    }
`;

const OtherPartyImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50px;
`;

const OtherPartyNicknName = styled.p`
    font-weight: 900;
    margin-bottom: 3px;
`;