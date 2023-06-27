import styled from "styled-components";
import { Button } from "react-bootstrap";
import EmptyImg from '../../imgs/EmptyImg.png';
import { useEffect, useState } from "react";
import { authService, dbService } from "../../firebase";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

interface transactionDataProps {
    title: string;
    writer: string
    selected: string;
    price: number | string;
    createdAt: string;
    route: string;
    catedory: string;
    writerProfile: string;
}

function DetailHeader({
    title,
    writer,
    selected,
    price,
    createdAt,
    catedory,
    writerProfile,
    route
}: transactionDataProps) {
    const [likeArr, setLikeArr] = useState<string[]>([]); //like user Arr
    const user = authService.currentUser; // user 정보
    const userEmail = user?.email;

    const handleLikeCount = async (e: any) => {
        e.preventDefault();
        
        const docRef = doc(
            dbService,
            "transactionLike",
            route
        ); // firebase DB 경로
      
        try {
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                // data에 아이디 없을 시 추가
                if (userEmail && !likeArr.includes(userEmail)) {
                    const updatedArr = [...likeArr, userEmail];
                    setLikeArr(updatedArr);
                    await updateDoc(docRef, {
                        id: route,
                        likeArr: arrayUnion(userEmail)
                    });
                } else if (userEmail && likeArr.includes(userEmail)) {
                    // data에 아이디 있을 시 삭제
                    const updatedArr = likeArr.filter((id) => id !== userEmail);
                    setLikeArr(updatedArr);
                    await updateDoc(docRef, {
                        id: route,
                        likeArr: updatedArr
                    });
                }
            } else {
                // data가 없을 시 생성
                if (userEmail) {
                    await setDoc(docRef, {
                        id: route,
                        likeArr: [userEmail]
                    });
                    setLikeArr([userEmail]);
                }
            }
        } catch (error) {
            alert("새로고침 후 다시 시도해 주세요" + error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(dbService, "transactionLike", route);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const likeArr = docSnap.data().likeArr;
                setLikeArr(likeArr);
            }
        };
    
        fetchData();
    }, [route]);

    return(
        <DetailHeaderbox>
            <InfoBox>
                <PostInfo>
                    <WriterImg src={writerProfile ? writerProfile : EmptyImg} />
                    <WriterNickname>{writer}</WriterNickname>
                </PostInfo>

                <PostInfo>
                    <HeartInfo onClick={handleLikeCount}>♥{likeArr.length}</HeartInfo>
                    
                    <Info>{createdAt}</Info>
                </PostInfo>
            </InfoBox>

            <InfoBox>
                <PostTitle>{title}</PostTitle>

                <PostInfo>
                    <Category>{catedory === 'buy' ? '판매' : '구매'}</Category>
                    <ChattingBtn variant="outline-secondary">1:1 채팅</ChattingBtn>
                </PostInfo>
            </InfoBox>

            <InfoBox>
                <Price>가격: {price}원</Price>

                <Info>주소: {selected}</Info>
            </InfoBox>
        </DetailHeaderbox>
    );
}

export default DetailHeader;

const DetailHeaderbox = styled.header`
    height: 160px;
    border-bottom: 2px solid #bbbbbb;
`;

const InfoBox = styled.div`
    height: 55px;
    padding: 5px;
    display: flex;
    justify-content: space-between;
`;

const PostInfo = styled.div`
    display: flex;
`;

const WriterImg = styled.img`
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin-right: 10px;
`;

const WriterNickname = styled.p`
    font-size: 25px;
    font-weight: 900;
    margin-top: 5px;
    margin-bottom: 0px;
`;

const Info = styled.p`
    color: gray;
    font-weight: 900;
    margin-top: 5px;
    margin-left: 10px;
    margin-bottom: 0px;
    :hover {
        transition: .3s;
        
    }
`;

const HeartInfo = styled.p`
    font-size: 17px;
    font-weight: 900;
    margin-top: 3px;
    margin-left: 10px;
    margin-bottom: 0px;
    color: #6f9fe7;
    cursor: pointer;
    
    :hover {
        margin-top: -2px;
        font-size: 20px;
        transition: .3s;
    }
`;

const PostTitle = styled.p`
    margin-top: 5px;
    font-size: 25px;
    font-weight: 900;
`;

const Category = styled.p`
    font-size: 18px;
    font-weight: 900;
    margin-top: 7px;
    color: gray;
`;

const ChattingBtn = styled(Button)`
    margin-left: 10px;
    --bs-btn-hover-bg: #6f9fe7;
    --bs-btn-hover-border-color: #6f9fe7;
    --bs-btn-active-bg: #3e80e4;
    --bs-btn-active-border-color: #3e80e4;
`;

const Price = styled.p`
    font-size: 20px;
    font-weight: 900;
`;