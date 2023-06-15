import { useState, ChangeEvent, useEffect } from "react";
import { Button, Form } from 'react-bootstrap';
import styled from "styled-components";
import AddressDrop from './AddressDrop';
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";



function TransactionWrite() {
    const [title, setTitle] = useState("") // 제목
    const [content, setContent] = useState(""); // 내용
    const [imgs, setImgs] = useState<FileList | null>(); // 이미지
    const [price, setPrice] = useState<number>(); // 가격
    const [selected, setSelected] = useState('') // 주소
    const [selectedCity, setSelectedCity] = useState(""); // 선택된 시/도
    const [selectedDistrict, setSelectedDistrict] = useState(""); // 선택된 구/군/시
    
    const textChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name, value },
        } = e;
        if (name === 'title') {
            setTitle(value);
        } else if (name === 'content') {
            setContent(value);
        } else if (name === 'price') {
            setPrice(parseInt(value, 10));
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
    
    const uploadImage = async (images: any): Promise<any> => {
        const imageUrlPromises: Promise<string>[] = [];
        const allowedExtensions = ['.jpg', '.png', 'jpeg'];
        const fileExtension = images.map((e: { name: string; }) => e.name.substring(e.name.lastIndexOf('.')).toLowerCase());

        if (fileExtension.length > 5) {
            alert('이미지는 5장 이하만 가능합니다.');
            return;
        }

        for (const e of fileExtension) {
            if (!allowedExtensions.includes(e)) {
                alert('확장자는 jpg, png만 지원합니다.');
                return;
            }
        }

        const date = new Date()
        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            const storageRef = ref(storage, `transaction/${date.getFullYear()} ${date.getMonth()}/${date.getDate()} ${title+i}.png`);
            try {
                await uploadBytes(storageRef, image);
                const imageUrlPromise = getDownloadURL(storageRef);
                imageUrlPromises.push(imageUrlPromise);
            } catch (error) {
                console.error('에러가 발생했습니다. 새로고침 후 다시 시도해주세요.');
                throw new Error('이미지 업로드 중 오류가 발생했습니다.');
            }
        }

        const imageUrls = await Promise.all(imageUrlPromises);
        return imageUrls;
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

                
                <FormLabel>주소</FormLabel>
                <AddressDrop
                    selectedCity={selectedCity}
                    selectedDistrict={selectedDistrict}
                    handleCityChange={handleCityChange}
                    handleDistrictChange={handleDistrictChange}
                />
                
                <br />
                <div>
                    <BtnStyle variant="outline-secondary" type="button">
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