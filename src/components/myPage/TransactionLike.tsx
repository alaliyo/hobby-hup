import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
    Post, ImgLink, FirstImg, InfoData, 
    InfoLink, Title, Content, Data
} from './TransactionCordStyle';
import { LikeData, TransactionBuyDatas, TransactionDataProps, TransactionSellDatas } from '../../utils/dbService';
import styled from 'styled-components';
import { useWindowWidth } from '../../hooks/WindowWidthTracker';
import { UserInfoProps } from '../../utils/authUtils';
import HobbyHubImg from '../../imgs/HobbyHubImg.png';

function TransactionLike() {
    const { userObj } = useOutletContext<UserInfoProps>(); //user 정보
    const buyPost = TransactionBuyDatas(); // 판매 post
    const sellPost = TransactionSellDatas(); // 구매 post
    const likeData= LikeData() // like data
    const [myLikePost, setMyLikePost] = useState<TransactionDataProps[]>(); // 전체 my post
    const windowWidth = useWindowWidth(); // 웹 크기 값

    useEffect(() => {
        if (likeData.length > 0) {
            const filteredData = likeData.filter((obj) =>
                obj.likeArr.some((e) => e === userObj.email)
            );
            
            const allPost = [...buyPost, ...sellPost].sort((a, b) => 
                Number(`20${b.createdAt}`) - Number(`20${a.createdAt}`)
            );

            const LikePosts = allPost.filter(obj => filteredData.some((e: { id: string; }) => obj.route === e.id))
            setMyLikePost(LikePosts);
        }
        
    }, [buyPost, likeData, sellPost, userObj.email]);

    return(
        <>
            {myLikePost !== undefined && (
                myLikePost.map((data, i) => (
                    <Post key={i}>
                        <ImgLink
                        to={data.route.slice(0, 3) === 'buy' ?
                            '/transaction/buy/' + data.id : '/transaction/sell/' + data.id} 
                        >
                            <FirstImg src={data.imgs[0] ? data.imgs[0] : HobbyHubImg } alt="" />
                        </ImgLink>
                        <InfoData>
                            <InfoLink
                            to={data.route.slice(0, 3) === 'buy' ?
                                '/transaction/buy/' + data.id : '/transaction/sell/' + data.id} 
                            >
                                <Title>제목: {
                                    650 >= windowWidth && windowWidth >= 450 ? (
                                        data.title.length <= 10 ? 
                                        data.title : 
                                        data.title.replace(/\\n/g, '').slice(0, 10) + ".."
                                    ) : (
                                        data.title.length <= 10 ? 
                                        data.title : 
                                        data.title.replace(/\\n/g, '').slice(0, 10) + ".."
                                    )
                                }</Title>
                                <br />
                                <Contentstyle>내용: {
                                    650 >= windowWidth && windowWidth >= 450 ? (
                                        data.content.length <= 28 ? 
                                        data.content : 
                                        data.content.replace(/\\n/g, '').slice(0, 28) + ".."
                                    ) : (
                                        data.content.length <= 35 ?
                                        data.content : 
                                        data.content.replace(/\\n/g, '').slice(0, 35) + ".."
                                    )
                                }</Contentstyle>
                                <span>구분: {data.route.slice(0, 3) === 'buy' ? "판매" : "구매"}</span>
                                <Data>{data.createdAt}</Data>

                            </InfoLink>
                        </InfoData>
                    </Post>
                ))
            )}
        </>
    );
}

export default TransactionLike;

const Contentstyle = styled(Content)`
    height: 70px;
    @media screen and (max-width: 900px) {
        height: 65px;
    }
    @media screen and (max-width: 800px) {
        height: 70px;
    }
    @media screen and (max-width: 650px) {
        height: 55px;
    }
` ;