import { SetStateAction, useEffect, useState } from 'react';
import { Carousel, Modal } from 'react-bootstrap';
import styled from 'styled-components';

function DetailCarousels() {
    const [index, setIndex] = useState(0);
    const [imgArr, setImgArr] = useState<string[]>();
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string>('');

    const handleSelect = (selectedIndex: SetStateAction<number>) => {
        setIndex(selectedIndex);
    };

    const openModal = (image: string) => {
        setSelectedImage(image);
        setShowModal(true);
    };
    
    const closeModal = () => {
    setShowModal(false);
    };

    useEffect(() => {
        setImgArr([
            'https://cdn.pixabay.com/photo/2015/05/04/10/16/vegetables-752153_1280.jpg',
            'https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032_1280.jpg',
            'https://cdn.pixabay.com/photo/2013/06/09/06/07/meat-123668_1280.jpg',
            'https://cdn.pixabay.com/photo/2017/07/27/17/30/tray-2546077_1280.jpg',
        ])
    }, []);

    return (
        <>
            <CarouselStyld activeIndex={index} onSelect={handleSelect}>
                {imgArr?.map((e, i) => (
                    <CarouselItem key={i} onClick={() => openModal(e)}>
                        <img
                            className="d-block w-100"
                            src={e}
                            alt="이미지 오류 새로고침하세요."
                        />
                    </CarouselItem>
                ))}
            </CarouselStyld>
        
            <ModalStyle show={showModal} onHide={closeModal} centered>
                <img src={selectedImage} alt="이미지 오류 새로고침하세요." />
            </ModalStyle>
        </>
        
    );
}

export default DetailCarousels;

const CarouselStyld = styled(Carousel)`
    margin-bottom: 10px;
    .carousel-indicators {
        button {
            height: 20px;
            width: 20px;
            border-radius: 50%;
            margin-left: 5px;
            margin-right: 5px;
        }
    }
`;

const CarouselItem = styled(Carousel.Item)`
    height: 400px;
    img {
        height: 100%;
        object-fit: cover;
        object-position: center;
    }
`;

const ModalStyle = styled(Modal)`
    --bs-modal-width: 80%;
`;