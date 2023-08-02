import { useEffect, useState } from "react";
import styled from "styled-components";
import { dbService } from "../../firebase";
import { useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { NoticeDataProp } from "../../utils/dbService";

function NoticeDetail() {
    const [datailData, setDatailData] = useState<NoticeDataProp>()
    const location = useLocation().pathname;
    
    // firebass에서 상세 조회 date get
    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(dbService, 'notice', `id${location.split('/')[3]}`);
            const snapshot = await getDoc(docRef);
            if (snapshot.exists()) {
                const postData = snapshot.data() as NoticeDataProp;
                setDatailData(postData);
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
                        {datailData.content}
                    </DetailContent>
                </DetailBody>
            </>)}
        </DetailBox>
    );
}

export default NoticeDetail;

const DetailBox = styled.div`
    
`;

const DetailHeader = styled.div`

`;

const Title = styled.h2`
    font-weight: 900;
    text-align : center;
`;

const Date = styled.p`
    text-align: end;
    font-weight: 900;
    color: gray;
`;

const DetailBody = styled.div`
    width: 96%;
    margin: 0 auto;
    border-top: 2px solid gray;
    padding: 10px;
`;

const DetailContent = styled.span`
    font-size: 18px;
`;