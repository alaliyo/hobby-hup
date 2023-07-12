
import styled from "styled-components";
import PostNickname from "../../hooks/PostNickname";
import EmptyImg from '../../imgs/EmptyImg.png';

interface CommentProps {
    id: number;
    writer: string;
    content: string;
    contentAt: string;
}

interface CommentDetailProps {
    data: CommentProps;
    user: any;
    handleCommentDel: any;
}

function CommentDetail({data, user, handleCommentDel}: CommentDetailProps) {
    const writerData = PostNickname(data.writer);

    return(
        <CommentBox key={data.id}>
            <CommentImg src={writerData?.photoURL ? writerData.photoURL : EmptyImg} />
            <CommentNickname>{writerData?.displayName}</CommentNickname>
            <CommentContents>{data.content}</CommentContents>
            <CommentDate>{data.contentAt}</CommentDate>
            {user?.email === data.writer && 
                <DelBtm
                    onClick={() => handleCommentDel(data.id)}
                >⨉</DelBtm>
            }
        </CommentBox>
    );
}

export default CommentDetail;

const CommentBox = styled.div`
    display: flex;
    margin-bottom: 8px;
    margin-top: 8px;
    @media screen and (max-width: 650px){
        margin-bottom: 7px;
        margin-top: 7px;
    }

    @media screen and (max-width: 450px){
        margin-bottom: 6px;
        margin-top: 6px;
    }
`;

const CommentImg = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 5px;
    border-radius: 50%;

    @media screen and (max-width: 650px) {
        width: 26px;
        height: 26px;
        margin-right: 4px;
    }

    @media screen and (max-width: 450px) {
        width: 22px;
        height: 22px;
        margin-right: 3px;
    }
`

const CommentNickname = styled.span`
    font-weight: 900;
    margin-right: 5px;
    
    @media screen and (max-width: 650px) {
        font-size: 15px;
        margin-right: 4px;
    }

    @media screen and (max-width: 450px) {
        font-size: 13px;
        margin-right: 3px;
    }
`

const CommentContents = styled.span`
    width: 67%;
    overflow-wrap: break-word;
    
    @media screen and (max-width: 650px) {
        font-size: 15px;
        width: 70%;
    }

    @media screen and (max-width: 550px) {
        font-size: 15px;
        width: 62%;
    }

    @media screen and (max-width: 450px) {
        font-size: 13px;
        width: 65%;
    }

    @media screen and (max-width: 400px) {
        font-size: 13px;
        width: 61%;
    }

    @media screen and (max-width: 350px) {
        font-size: 13px;
        width: 54%;
    }

    @media screen and (max-width: 300px) {
        font-size: 13px;
        width: 46%;
    }
`;

const CommentDate = styled.span`
    margin-left: auto;
    
    @media screen and (max-width: 650px) {
        font-size: 15px;
    }

    @media screen and (max-width: 450px) {
        font-size: 13px;
    }
`;

const DelBtm = styled.button`
    height: 24px;
    width: 24px;
    color: #ff8282;
    background-color: white;
    font-weight: 900;
    padding: 0;
    border: 0;

    &:hover {
        color: red;
    }
    
    @media screen and (max-width: 650px) {
        height: 22px;
        width: 22px;
        font-size: 15px;
    }

    @media screen and (max-width: 450px) {
        height: 20px;
        width: 20px;
        font-size: 13px;
    }
`;