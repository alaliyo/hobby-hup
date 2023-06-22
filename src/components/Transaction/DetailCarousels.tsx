import { Key, SetStateAction, useState } from 'react';
import { Carousel, Modal } from 'react-bootstrap';
import styled from 'styled-components';

function DetailCarousels({ imgs }: any) {
    const [index, setIndex] = useState(0);
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

    return (
        <>
            <CarouselStyld activeIndex={index} onSelect={handleSelect}>
                {imgs?.map((e: string, i: Key) => (
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
                <ModalHeader closeButton></ModalHeader>
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

const ModalHeader = styled(Modal.Header)`
    position: absolute;
    border-bottom: 0;
    width: 100%;
    float: right;
`;