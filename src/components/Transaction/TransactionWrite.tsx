import { useState, ChangeEvent, useEffect } from "react";
import styled, { keyframes  } from "styled-components";
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService, dbService } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Filter from 'bad-words';
import { uploadImages } from '../../utils/storageService';
import AddressDrop from './AddressDrop';
import useKFilter from "../../hooks/KFilter";
import useCurrentDate from "../../hooks/currentDate";
import { BuyDatasMaxId, SellDatasMaxId } from "../../utils/dbService";
import { fadeInAnimation } from "../../pages/PageStyled";
import { CheckAuth } from "../../utils/authUtils";

interface transactionDataProps {
    id: number
    title: string;
    content: string;
    selected: string;
    price: number | null;
    imgs: string[];
    createdAt: string;
    route: string;
    writer: string;
}

function TransactionWrite() {
    const [title, setTitle] = useState("") // 제목
    const [content, setContent] = useState(""); // 내용
    const [imgs, setImgs] = useState<any>([]); // 이미지
    const [price, setPrice] = useState<number | null>(null); // 가격
    const [selected, setSelected] = useState('') // 주소
    const [category, setCategory] = useState('') // 판매 & 구매
    const [selectedCity, setSelectedCity] = useState(""); // 선택된 시/도
    const [selectedDistrict, setSelectedDistrict] = useState(""); // 선택된 구/군/시
    const currentDate = useCurrentDate(); // 현재 날짜
    const filter = new Filter(); // 영어 비속어 필터
    const buyMaxId = BuyDatasMaxId(); // 판메 postId 값
    const sellMaxId = SellDatasMaxId(); // 구매 postId 값
    const [loading, setLoading] = useState(false); //업로드 대기
    const navigate = useNavigate(); // 이동
    const titleKFilter = useKFilter(title); // 한글 제목 필터
    const contentKFilter = useKFilter(content); // 한글 내용 필터
    const user = authService.currentUser; //  유저 정보
    const location = useLocation(); // 링크 이동
    const [detailInquiry, setDetailInquiry] = useState(''); // 상세 조회 
    const [datailData, setDatailData] = useState<transactionDataProps | null>(null);
    
    // 클라이언트 DATA 받기
    const textChange = (e: ChangeEvent<HTMLInputElement> & ChangeEvent<HTMLSelectElement>) => {
        const {
            target: { name, value },
        } = e;
        if (name === 'title') {
            setTitle(value);
        } else if (name === 'content') {
            setContent(value);
        } else if (name === 'price') {
            setPrice(parseInt(value, 10));
        } else if (name === 'img') {
            const selectedImages = Array.from(e.target.files || []);
            setImgs(selectedImages);
        } else if (name === 'category') {
            setCategory(value);
        }
    };
    
    // 시/도 받는 이벤트
    const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(event.target.value);
        setSelectedDistrict("");
    };

    // 구/군/시 받는 이벤트
    const handleDistrictChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedDistrict(event.target.value);
    };
    
    // firebase data post
    const handlePostUpdate = async (e: any) => {
        e.preventDefault();

        try {
            if (title.length > 40) {
                return alert("제목은 40자 이하만 가능합니다.");
            } else if (titleKFilter) {
                return alert("제목에 비속어가 포함되어 있습니다.");
            } else if (filter.isProfane(title)) {
                return alert("제목에 비속어가 포함되어 있습니다.");
            } else if (contentKFilter) {
                return alert("내용에 비속어가 포함되어 있습니다.");
            } else if (filter.isProfane(content)) {
                return alert("내용에 비속어가 포함되어 있습니다.");
            } else if (selected.length < 1) {
                return alert("주소를 선택해주세요.");
            } else if (selectedCity !== '온라인' && selectedCity !== '전국' && selectedDistrict.length < 1) {
                return alert("구/군/시를 선택해주세요.");
            } else if (category === '') {
                return alert("판매 & 구매 중 선택해주세요.");
            }

            if (user) {
                setLoading(true); // 로딩 상태 활성화
                
                // 사진 업로드 비동기 호출
                const imageUrls = imgs && await uploadImages(
                    imgs, title, 5, 'transaction'
                );
                
                // post 줄 바꿈 \\으로 변환
                const LineBreaks = content.replace(/\n/g, '\\n');
                
                const categoryBoolen = category === '판매';
                await setDoc(doc(
                    dbService,
                    categoryBoolen ? "transactionBuy" : "transactionSell",
                    categoryBoolen ? `buyId${buyMaxId+1}` : `sellId${sellMaxId+1}`
                    ), {
                        id: categoryBoolen ? buyMaxId+1 : sellMaxId+1,
                        writer: user.email,
                        title: title,
                        content: LineBreaks,
                        createdAt: currentDate,
                        price: price,
                        selected: selected,
                        imgs: imageUrls,
                        route: categoryBoolen ? `buyId${buyMaxId+1}` : `sellId${sellMaxId+1}`,
                    }
                );
                alert('개시물이 업로드 되었습니다.')
                setLoading(false); // 로딩 상태 비활성화
                navigate("/transaction/buy");
            }
        } catch (error) {
            alert(error);
        }
    };

    // url에서 catedory 값 가져오기
    useEffect(() => {
        const url = location.pathname.split('/')[3];
        setDetailInquiry(url);
    }, [location]);

    // firebass에서 상세 조회 date get
    useEffect(() => {
        if (detailInquiry.includes('buy') || detailInquiry.includes('sell')) {
            const fetchData = async () => {
                const docRef = doc(
                    dbService,
                    detailInquiry.includes('buy') ? "transactionBuy" : "transactionSell",
                    detailInquiry
                );
                const snapshot = await getDoc(docRef);
                if (snapshot.exists()) {
                    const postData = snapshot.data() as transactionDataProps;
                    setDatailData(postData);
                }
            };
    
            fetchData();
        }
    }, [detailInquiry]);

    // 주소 합하기
    useEffect(() => {
        setSelected(`${selectedCity} ${selectedDistrict}`);
    }, [selectedCity, selectedDistrict]);

    useEffect(() => {
        CheckAuth("", '/', false);
        
        if (user && datailData) {
            if (user.email !== datailData.writer) {
                window.location.href = '/';
            }
        }
    }, [datailData, user]);

    useEffect(() => {
        if (datailData) {
            setTitle(datailData.title);
            setContent(datailData.content);
            setPrice(datailData.price);
            setCategory(detailInquiry.includes('buy') ? '판매' : '구매');
            setSelectedCity(datailData.selected.split(' ')[0]);
            setSelectedDistrict(datailData.selected.split(' ')[1]);
        }
    }, [datailData, detailInquiry]);

    return(
        <WriteBox>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <FormLabel>제목</FormLabel>
                    <FormControl
                        type="text"
                        placeholder="제목을 입력해주세요."
                        name='title'
                        onChange={textChange}
                        value={title}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <FormLabel>내용</FormLabel>
                    <Form.Control
                        as="textarea"
                        rows={10}
                        placeholder="내용을 입력해주세요."
                        style={{
                            resize: 'none',
                            fontSize: '15px'
                        }}
                        name='content'
                        onChange={textChange}
                        value={content}
                    />
                </Form.Group>

                <FormFlex>
                    <Form.Group controlId="formFile" className="mb-3">
                        <FormLabel>이미지</FormLabel>
                        <FormControl
                            type="file"
                            multiple
                            name="img"
                            onChange={textChange}
                        />
                    </Form.Group>
                

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <FormLabel>가격</FormLabel>
                        <FormControl
                            type="text"
                            placeholder="가격을 입력해주세요."
                            name="price"
                            onChange={textChange}
                            value={price !== null && price}
                        />
                    </Form.Group>
                </FormFlex>

                <FormFlex>
                    <div>
                        <FormLabel>주소</FormLabel>
                        <AddressDrop
                            selectedCity={selectedCity}
                            selectedDistrict={selectedDistrict}
                            handleCityChange={handleCityChange}
                            handleDistrictChange={handleDistrictChange}
                        />
                    </div>
                    <br />
                    <div>
                        <FormLabel>판매 & 구매</FormLabel>
                        <br />
                        <DropStyle name="category" onChange={textChange} value={category}>
                            <option value="">선택</option>
                            <option value="판매">판매</option>
                            <option value="구매">구매</option>
                        </DropStyle>
                    </div>
                </FormFlex>
                
                <div>
                    <BtnStyle
                        variant="outline-secondary"
                        type="button"
                        onClick={handlePostUpdate}
                    >
                        작성완료
                    </BtnStyle>
                </div>

                {loading &&
                    <SpinnerBox>
                        <h3>업로드 중입니다</h3>
                        <DotStyle animation={DotAnimation1}>•</DotStyle>
                        <DotStyle animation={DotAnimation2}>•</DotStyle>
                        <DotStyle animation={DotAnimation3}>•</DotStyle>
                    </SpinnerBox>
                }
            </Form>
        </WriteBox>
    );
}

export default TransactionWrite;

const WriteBox = styled.div`
    padding: 30px;
    animation: ${fadeInAnimation} 0.15s ease-in;
    margin-bottom: 40px;

    @media screen and (max-width: 650px) {
        padding: 20px;
        margin-bottom: 30px;
    }

    @media screen and (max-width: 450px){
        padding: 10px;
    }
`;

const FormLabel = styled(Form.Label)`
    font-size: 18px;
    font-weight: 900;

    @media screen and (max-width: 650px) {
        font-size: 16px;
    }

    @media screen and (max-width: 450px){
        font-size: 14px;
    }
`;

const FormControl = styled(Form.Control)`
    @media screen and (max-width: 450px){
        font-size: 15px;
    }
`;

const FormFlex = styled.div`
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 650px) {
        display: block
    }

    @media screen and (max-width: 450px){
        font-size: 14px;
    }

    div {
        width: 48%;

        @media screen and (max-width: 650px) {
            width: 100%;
        }
    }
`;

const BtnStyle = styled(Button)`
    float: right;

    @media screen and (max-width: 650px) {
        padding: 5px 8px;
        font-size: 15px;
    }

    @media screen and (max-width: 450px){
        padding: 5px;
        font-size: 13px;
    }
`;

const DropStyle = styled.select`
    height: 35px;
    width: 70px;
`;

const SpinnerBox = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const DotAnimation1 = keyframes`
    0%, 30% {
        transform: translateY(0);
    }
    15% {
        transform: translateY(-10px);
    }
`;

const DotAnimation2 = keyframes`
    15%, 45% {
        transform: translateY(0);
    }
    30% {
        transform: translateY(-10px);
    }
`;

const DotAnimation3 = keyframes`
    30%, 60% {
        transform: translateY(0);
    }
    45% {
        transform: translateY(-10px);
    }
`;

const DotStyle = styled.div<{ animation: any }>`
    width: 10px;
    font-weight: 900;
    margin-left: 5px;
    animation-duration: 1.8s;
    animation-iteration-count: infinite;
    animation-name: ${({ animation }) => animation};
`;