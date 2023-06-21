import { useState, ChangeEvent, useEffect } from "react";
import styled from "styled-components";
import { Button, Form } from 'react-bootstrap';
import { authService, dbService } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import Filter from 'bad-words';
import { uploadImages } from '../../utils/storageService';
import AddressDrop from './AddressDrop';
import useKFilter from "../../hooks/KFilter";
import useCurrentDate from "../../hooks/currentDate";
import { UserDataObj } from "../../utils/authUtils";
import { BuyDatasMaxId, SellDatasMaxId } from "../../utils/dbService";

function TransactionWrite() {
    const [title, setTitle] = useState("") // 제목
    const [content, setContent] = useState(""); // 내용
    const [imgs, setImgs] = useState<any>([]); // 이미지
    const [price, setPrice] = useState<number>(); // 가격
    const [selected, setSelected] = useState('') // 주소
    const [category, setCategory] = useState('') // 판매 & 구매
    const [selectedCity, setSelectedCity] = useState(""); // 선택된 시/도
    const [selectedDistrict, setSelectedDistrict] = useState(""); // 선택된 구/군/시
    const { kFilter, checkKFilter } = useKFilter(); // 한글 비속어 hook
    const [titleKFilter, setTitleKFilter] = useState(true);
    const [contentKFilter, setContentKFilter] = useState(true); // 내용;
    const currentDate = useCurrentDate();
    const filter = new Filter();
    const userData = UserDataObj();
    const buyMaxId = BuyDatasMaxId();
    const sellMaxId = SellDatasMaxId();
    
    const textChange = (e: ChangeEvent<HTMLInputElement> & ChangeEvent<HTMLSelectElement>) => {
        const {
            target: { name, value },
        } = e;
        if (name === 'title') {
            setTitle(value);
            checkKFilter(value);
            setTitleKFilter(kFilter);
        } else if (name === 'content') {
            setContent(value);
            checkKFilter(value);
            setContentKFilter(kFilter);
        } else if (name === 'price') {
            setPrice(parseInt(value, 10));
        } else if (name === 'img') {
            const selectedImages = Array.from(e.target.files || []);
            setImgs(selectedImages);
        } else if (name === 'category') {
            setCategory(value);
        }
        //const LineBreaks = value.replace(/\n/g, '\\n'); // 줄 바꿈 문자를 \n으로 대체하여 저장
    };

    const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(event.target.value);
        setSelectedDistrict(""); // 시/도 변경 시 구/군 초기화
    };

    const handleDistrictChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedDistrict(event.target.value);
    };

    const handleNicknameUpdate = async (e: any) => {
        e.preventDefault();
        try {
            const user = authService.currentUser;
            
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
            } else if (imgs.length < 1) {
                return alert("이미지를 넣어주세요.");
            } else if (selected.length < 1) {
                return alert("주소를 선택해주세요.");
            } else if (category === '') {
                return alert("판매 & 구매 중 선택해주세요.");
            }

            if (user) {
                const imageUrls = await uploadImages(
                    imgs, title, 5, 'transaction'
                );
                
                const categoryBoolen = category === '판매';
                await setDoc(doc(
                    dbService,
                    categoryBoolen ? "transactionBuy" : "transactionSell",
                    categoryBoolen ? `buyId${buyMaxId+1}` : `sellId${sellMaxId+1}`
                    ), {
                        id: buyMaxId + 1,
                        email: userData.email,
                        writer: userData.displayName,
                        title: title,
                        content: content,
                        price: price,
                        selected: selected,
                        imgs: imageUrls,
                        like: 0,
                        createdAt: currentDate,
                    }
                );
                alert('개시물이 업로드 되었습니다.')
                window.location.href="/transaction/buy"
            }
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        setSelected(`${selectedCity} ${selectedDistrict}`);
    }, [selectedCity, selectedDistrict])
    
    return(
        <WriteBox>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <FormLabel>제목</FormLabel>
                    <Form.Control
                        type="text"
                        placeholder="제목을 입력해주세요."
                        name='title'
                        onChange={textChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <FormLabel>내용</FormLabel>
                    <Form.Control
                        as="textarea"
                        rows={10}
                        placeholder="내용을 입력해주세요."
                        style={{resize: 'none'}}
                        name='content'
                        onChange={textChange}
                    />
                </Form.Group>

                <FormFlex>
                    <Form.Group controlId="formFile" className="mb-3">
                        <FormLabel>이미지</FormLabel>
                        <Form.Control
                            type="file"
                            multiple
                            name="img"
                            onChange={textChange}
                        />
                    </Form.Group>
                

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <FormLabel>가격</FormLabel>
                        <Form.Control
                            type="number"
                            placeholder="가격을 입력해주세요."
                            name="price"
                            onChange={textChange}
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

                    <div>
                        <FormLabel>판매 & 구매</FormLabel>
                        <br />
                        <DropStyle name="category" onChange={textChange}>
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
                        onClick={handleNicknameUpdate}
                    >
                        작성완료
                    </BtnStyle>
                </div>
            </Form>
        </WriteBox>
    );
}

export default TransactionWrite;

const WriteBox = styled.div`
    padding: 30px;
`;

const FormLabel = styled(Form.Label)`
    font-size: 18px;
    font-weight: 900;
`;

const FormFlex = styled.div`
    display: flex;
    justify-content: space-between;
    div {
        width: 48%;
    }
`;

const BtnStyle = styled(Button)`
    float: right;
`;

const DropStyle = styled.select`
    height: 35px;
    width: 70px;
`;