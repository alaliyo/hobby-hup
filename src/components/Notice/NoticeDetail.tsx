import { useEffect, useState } from "react";
import styled from "styled-components";
import { dbService } from "../../firebase";
import { useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { NoticeDataProp } from "../../utils/dbService";
import uselinesToBreaks from "../../hooks/uselinesToBreaks";
import { fadeInAnimation } from "../../pages/PageStyled";

function NoticeDetail() {
    const [datailData, setDatailData] = useState<NoticeDataProp>()
    const location = useLocation().pathname;
    const [formattedContent, setFormattedContent] = useState<React.ReactNode | null>(null);
    
    // firebass에서 상세 조회 date get
    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(dbService, 'notice', `id${location.split('/')[3]}`);
            const snapshot = await getDoc(docRef);
            if (snapshot.exists()) {
                const postData = snapshot.data() as NoticeDataProp;
                setDatailData(postData);
                setFormattedContent(uselinesToBreaks(postData.content));
            }
        };

        fetchData();
    }, []);
    
    return(
        <DetailBox>
            {datailData && (<>
                <DetailHeader>
                    <Title>{datailData.title}</Title>
                    <Date>{datailData.createdAt}</Date>
                </DetailHeader>

                <DetailBody>
                    <DetailContent>
                        {formattedContent}
                    </DetailContent>
                </DetailBody>
            </>)}
        </DetailBox>
    );
}

export default NoticeDetail;

const DetailBox = styled.div`
    animation: ${fadeInAnimation} 0.4s ease-in;
`;

const DetailHeader = styled.div`
    border-bottom: 2px solid gray;
    margin-bottom: 15px;

    @media screen and (max-width: 650px) {
        margin-bottom: 12px;
    }

    @media screen and (max-width: 450px) {
        margin-bottom: 6px;
    }
`;

const Title = styled.h2`
    font-weight: 900;
    text-align : center;

    @media screen and (max-width: 650px) {
        font-size: 22px;
    }

    @media screen and (max-width: 450px) {
        font-size: 18px;
    }
`;

const Date = styled.p`
    color: gray;
    text-align: end;
    font-size: 20px;
    font-weight: 900;
    margin-bottom: 5px;

    @media screen and (max-width: 650px) {
        font-size: 17px;
    }

    @media screen and (max-width: 450px) {
        font-size: 14px;
        margin-right: 10px;
    }
`;

const DetailBody = styled.div`
    width: 96%;
    margin: 0 auto;
    padding: 10px;

    @media screen and (max-width: 650px) {
        padding: 7px;
    }

    @media screen and (max-width: 450px) {
        font-size: 13px;
    }
`;

const DetailContent = styled.span`
    font-size: 18px;
    text-indent: 7px;

    @media screen and (max-width: 650px) {
        font-size: 14px;
        text-indent: 5px;
    }

    @media screen and (max-width: 450px) {
        font-size: 13px;
        text-indent: 4px;
    }
`;