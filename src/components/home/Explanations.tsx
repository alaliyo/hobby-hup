import { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import useHeaderScroll from "../../hooks/useHeaderScroll";

interface ExplanationsPorps {
  className: string;
  height: number;
  imageUrl: string;
  text?: string;
}

function Explanations({ className, height, imageUrl, text }: ExplanationsPorps) {
  const [visible, setVisible] = useState(false);
  
    useHeaderScroll({
      target: `.${className}`,
      restoreClassName: "box",
      changeClassName: "visible",
      scrollValue: height,
      onEnter: () => setVisible(true),
    });
  
    return (
      <Ex className={className} visible={visible}>
        <Content>
          <ImageContainer>
            <Image src={imageUrl} alt="Image" />
          </ImageContainer>
          <Text>{text}</Text>
        </Content>
      </Ex>
    );
  }

export default Explanations;

interface ExProps {
  visible: boolean;
}
  
const fadeInUp = keyframes`
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Ex = styled.div<ExProps>`
  height: 500px;
  background-color: ${(p) => (p.visible ? "gray" : "white")};
  opacity: 1;
  transition: opacity 0.5s ease;
  animation: ${(p) => (p.visible ? fadeInUp : "none")} 0.5s ease;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #fff;
`;

// 각 섹션에 맞게 이미지 위치를 조절하는 스타일
const ImageContainer = styled.div`
  ${({ className }) =>
    className === "box1" &&
    css`
      /* box1 섹션의 이미지 위치 조절 */
      order: 2; /* 예시: box1 섹션은 텍스트 다음에 이미지가 오도록 설정 */
    `}

  ${({ className }) =>
    className === "box2" &&
    css`
      /* box2 섹션의 이미지 위치 조절 */
      order: 1; /* 예시: box2 섹션은 텍스트 전에 이미지가 오도록 설정 */
    `}
    
  /* 다른 섹션들에 대해서도 동일한 방식으로 스타일을 추가해주세요 */
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 16px;
`;

const Text = styled.p`
  font-size: 18px;
  text-align: center;
`;