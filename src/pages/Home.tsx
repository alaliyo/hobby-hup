import { useEffect, useState } from "react";
import styled from "styled-components";
import Explanations from "../components/home/Explanations";
import { PageBody } from "./PageStyled";
import { useWindowWidth } from '../hooks/WindowWidthTracker'
import mainImg1 from '../imgs/mainImg1.png'
import mainImg2 from '../imgs/mainImg2.png'
import mainImg3 from '../imgs/mainImg3.png'


function Home() {
    const [imgsSize, setImgsSize] = useState('');
    const [lastImgSize, setLastImgSize] = useState('');
    const windowWidth = useWindowWidth();

    useEffect(() => {
        if (windowWidth > 800) {
            setImgsSize("300px");
            setLastImgSize("350px");
        } else if (windowWidth > 650) {
            setImgsSize("250px");
            setLastImgSize("300px");
        } else if (windowWidth > 450) {
            setImgsSize("200px");
            setLastImgSize("250px");
        } else if (windowWidth > 350) {
            setImgsSize("150px");
            setLastImgSize("200px");
        }
    }, [windowWidth]);

    return(
        <PageBody>
            <Title>HobbyHup을 소개합니다~</Title>
            <Explanations 
                className="box1"
                height={0}
                imgUrl={mainImg1}
                imgPosition ="baseline"
                imgSize={imgsSize}
                location="right"
                backColor="white"
                text1="나의 재능을"
                text2="판매하고"
            />

            <Explanations
                className="box2"
                height={225}
                imgUrl={mainImg2}
                imgPosition="end"
                imgSize={imgsSize}
                location="left"
                backColor="white"
                text1="자유롭게 취미를"
                text2="공유하는"
            />

            <Explanations 
                className="box3"
                height={450}
                imgPosition="center"
                imgSize={lastImgSize}
                location=""
                backColor="#c6dfff"
                imgUrl={mainImg3}
            />
        </PageBody>
    );
}

export default Home;

const Title = styled.h1`
    font-weight: 900;
    padding: 30px 0px;
    display: flex;
    justify-content: center;

    @media screen and (max-width: 800px) {
        font-size: 30px;
    }

    @media screen and (max-width: 650px) {
        font-size: 26px;
    }

    @media screen and (max-width: 450px) {
        font-size: 23px;
    }

    @media screen and (max-width: 350px) {
        font-size: 20px;
    }
`

// const [urls, setUrls] = useState<string[]>([]);

    // useEffect(() => {
    //     const fetchUrls = async () => {
    //     try {
    //         const resultUrls = await HomeImgs();
    //         setUrls(resultUrls);
    //     } catch (error) {
    //         // 오류 처리
    //         alert('서버에러 새로고침 해주세요' + error);
    //     }
    //     };

    //     fetchUrls();
    // }, []);