import { ChangeEvent } from "react";
import { AddressData, addressArr } from '../../data/address';
import styled from "styled-components";

interface SampleComponentProps {
    selectedCity: string;
    selectedDistrict: string;
    handleCityChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    handleDistrictChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

function SampleComponent({
    selectedCity,
    selectedDistrict,
    handleCityChange,
    handleDistrictChange
}: SampleComponentProps ) {
  
    return (
        <div>
            <SelectStyle value={selectedCity} onChange={handleCityChange}>
                <option value="">시/도 선택</option>
                {addressArr.map((option: AddressData) => (
                    <option key={option.province} value={option.province}>{option.province}</option>
                ))}
            </SelectStyle>
    
            {selectedCity && !(selectedCity === '온라인') && !(selectedCity === '전국') && (
                <SelectStyle value={selectedDistrict} onChange={handleDistrictChange}>
                    <option value="">구/군/시 선택</option>
                    {addressArr.find((option: AddressData) => option.province === selectedCity)?.districts.map((district) => (
                    <option key={district} value={district}>{district}</option>
                    ))}
                </SelectStyle>
            )}
        </div>
    );
};

export default SampleComponent;

const SelectStyle = styled.select`
    height: 35px;
    width: 120px;
`;