import Explanations from "../components/home/Explanations";
import { PageBody } from "./PageStyled";
import { HomeImgs } from '../utils/storageService';
import { useEffect, useState } from "react";

function Home() {
    const [urls, setUrls] = useState<string[]>([]);

    useEffect(() => {
        const fetchUrls = async () => {
        try {
            const resultUrls = await HomeImgs();
            setUrls(resultUrls);
        } catch (error) {
            // 오류 처리
            alert('서버에러 새로고침 해주세요' + error);
        }
        };

        fetchUrls();
    }, []);

    return(
        <PageBody>
            <Explanations 
                className="box1"
                height={0}
                imgUrl={urls[0]}
                imgPosition ="baseline"
                imgSize="300px"
                location={true}
                backColor="white"
                text="나의 재능을 판매하고"
            />

            <Explanations
                className="box2"
                height={200}
                imgUrl={urls[1]}
                imgPosition="end"
                imgSize="300px"
                location={false}
                backColor="white"
                text="자유롭게 취미를 공유하는"
            />

            <Explanations 
                className="box3"
                height={400}
                imgPosition="center"
                imgSize="400px"
                location={true}
                backColor="#c6dfff"
                imgUrl={urls[2]}
                text=""
            />
        </PageBody>
    );
}

export default Home;