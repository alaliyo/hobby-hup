import { useState, ChangeEvent } from "react";
import { Button, Form } from 'react-bootstrap';
import styled from "styled-components";
import AddressDrop from './AddressDrop';

function TransactionWrite() {
    const [selectedCity, setSelectedCity] = useState<string>(""); // 선택된 시/도
    const [selectedDistrict, setSelectedDistrict] = useState<string>(""); // 선택된 구/군

    const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(event.target.value);
        setSelectedDistrict(""); // 시/도 변경 시 구/군 초기화
    };

    const handleDistrictChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedDistrict(event.target.value);
    };
    
    return(
        <WriteBox>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <FormLabel>제목</FormLabel>
                    <Form.Control type="text" placeholder="제목을 입력해주세요." />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <FormLabel>내용</FormLabel>
                    <Form.Control
                        as="textarea"
                        rows={10}
                        placeholder="내용을 입력해주세요."
                        style={{resize: 'none'}} />
                </Form.Group>

                <FormFlex>
                    <Form.Group controlId="formFile" className="mb-3">
                        <FormLabel>이미지</FormLabel>
                        <Form.Control type="file" multiple />
                    </Form.Group>
                

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <FormLabel>가격</FormLabel>
                        <Form.Control type="number" placeholder="가격을 입력해주세요." />
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