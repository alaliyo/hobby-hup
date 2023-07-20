import { Link } from "react-router-dom";
import styled from "styled-components";
import PostNickname from "../../hooks/PostNickname";
import EmptyImg from '../../imgs/EmptyImg.png';

interface PostProps {
    postId: number;
    otherPartyId: string;
    lastContent: string | false | null;
    lastCreatedAt: Date | false;
}

function ChattingPost({postId, otherPartyId, lastContent, lastCreatedAt}: PostProps) {
    const writerData = PostNickname(otherPartyId); // 작성자 닉네임, 프로필 이미지

    return(
        <MyChattingsBox to={`/chatting/${postId}`}>
            <OtherPartyImg src={writerData?.photoURL ? writerData.photoURL :  EmptyImg} />

            <div>
                <OtherPartyNicknName>{writerData?.displayName}</OtherPartyNicknName>
                <LastContent>{
                    lastContent && lastContent.length > 26 ?
                        lastContent.slice(0, 25) + '...' :
                        lastContent
                }</LastContent>
            </div>
            <DateBox>
                <span>{`${lastCreatedAt}`.split(' ')[0]}</span>
                <br />
                <span>{`${lastCreatedAt}`.split(' ')[1]}</span>
            </DateBox>
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

    @media screen and (max-width: 450px) {
        width: 40px;
        height: 40px;
    }
`;

const OtherPartyNicknName = styled.p`
    font-weight: 900;
    margin-bottom: 3px;

    @media screen and (max-width: 450px) {
        font-size: 16px;
        margin-bottom: 0;
    }
`;

const DateBox = styled.div`
    color: gray;
    font-weight: 900;
    margin-left: auto;
    margin-right: 10px;
    text-align: right;
    bottom: 0;

    @media screen and (max-width: 450px) {
        font-size: 14px;
        margin-right: 5px;
    }
`;

const LastContent = styled.span`
    @media screen and (max-width: 450px) {
        font-size: 14px;
    }
`;