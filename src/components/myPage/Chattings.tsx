import styled from "styled-components";
import { ChattingData, ChattingDataProp } from "../../utils/dbService";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import CommonSpinner from "../Common/CommonSpinner";
import ChattingPost from "./ChattingPost";

interface userObj {
    photoURL: any | undefined;
    displayName: string;
    email: string;
}

interface UserInfoProps {
    userObj: userObj;
}

function MyChattings() {
    const chattingDatas = ChattingData(); // 채팅 data
    const { userObj } = useOutletContext<UserInfoProps>(); // user 정보
    const [myChattingRooms, setMyChattingRooms] = useState<ChattingDataProp[]>([]);
    console.log(myChattingRooms);
    useEffect(() => {
        const myChattingDatas = chattingDatas.filter(obj => obj.participations.includes(userObj.email))
        setMyChattingRooms(myChattingDatas);
    }, [chattingDatas, userObj.email])

    return(
        <MyChattingsBody>
            {myChattingRooms.length > 0 ? myChattingRooms.map((obj, i) => (
                <ChattingPost
                    key={i}
                    postId={obj.id}
                    otherPartyId={
                        obj.participations[0] === userObj.email ?
                        obj.participations[1] : obj.participations[0]
                    }
                    lastContent={obj.content.length > 0 && obj.content[obj.content.length - 1].content}
                />
            )) : <CommonSpinner />}
            
        </MyChattingsBody>
    );
}

export default MyChattings;

const MyChattingsBody = styled.div`
    padding: 10px;
`;