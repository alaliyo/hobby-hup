import { useState } from "react";
import { addressArr } from '../data/address';

const SampleComponent = () => {
    const [selectedCity, setSelectedCity] = useState(""); // 선택된 시/도
    const [selectedDistrict, setSelectedDistrict] = useState(""); // 선택된 구/군
    console.log(selectedCity, selectedDistrict)
    const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(event.target.value);
        setSelectedDistrict(""); // 시/도 변경 시 구/군 초기화
    };

    const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDistrict(event.target.value);
    };

    return (
        <div>
        <select value={selectedCity} onChange={handleCityChange}>
            <option value="">시/도 선택</option>
            {addressArr.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>

        {selectedCity && !(selectedCity === '온라인') && !(selectedCity === '전국') && (
            <select value={selectedDistrict} onChange={handleDistrictChange}>
            <option value="">구/군 선택</option>
            {addressArr.find((option) => option.value === selectedCity)?.options?.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
            </select>
        )}
        </div>
    );
};

export default SampleComponent;