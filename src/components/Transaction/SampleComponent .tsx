import { useState, ChangeEvent } from "react";
import { AddressData, addressArr } from '../../data/address';

function SampleComponent() {
    const [selectedCity, setSelectedCity] = useState<string>(""); // 선택된 시/도
    const [selectedDistrict, setSelectedDistrict] = useState<string>(""); // 선택된 구/군
  
    const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectedCity(event.target.value);
      setSelectedDistrict(""); // 시/도 변경 시 구/군 초기화
    };
    
    const handleDistrictChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectedDistrict(event.target.value);
    };
  
    return (
        <div>
            <select value={selectedCity} onChange={handleCityChange}>
            <option value="">시/도 선택</option>
            {addressArr.map((option: AddressData) => (
                <option key={option.province} value={option.province}>{option.province}</option>
            ))}
            </select>
    
            {selectedCity && !(selectedCity === '온라인') && !(selectedCity === '전국') && (
                <select value={selectedDistrict} onChange={handleDistrictChange}>
                    <option value="">구/군 선택</option>
                    {addressArr.find((option: AddressData) => option.province === selectedCity)?.districts.map((district) => (
                    <option key={district} value={district}>{district}</option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default SampleComponent;