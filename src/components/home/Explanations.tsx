import { useState } from "react";
import styled, { keyframes } from "styled-components";
import useHeaderScroll from "../../hooks/useHeaderScroll";

interface ExplanationsPorps {
  className: string;
  height: number;
  imgUrl: string;
  imgPosition: string;
  imgSize: string;
  location: boolean;
  text?: string;
  backColor?: string;
}

function Explanations({ className, height, imgUrl, imgPosition, imgSize, location, text, backColor }: ExplanationsPorps) {
  const [visible, setVisible] = useState(false);
  
    useHeaderScroll({
      target: `.${className}`,
      restoreClassName: "box",
      changeClassName: "visible",
      scrollValue: height,
      onEnter: () => setVisible(true),
    });
  
    return (
      <Ex className={className} visible={visible} backColor={backColor}>
        <Content position={imgPosition} location={location}>
          <Image src={imgUrl} visible={visible} imgSize={imgSize} location={location} />
          {text && <Text visible={visible}>{text}</Text>}
        </Content>
      </Ex>
    );
  }

export default Explanations;

interface ExProps {
  visible?: boolean;
  position?: string;
  imgSize?: string;
  location?: boolean;
  backColor?: string;
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
  height: 400px;
  opacity: 1;
  transition: opacity 0.5s ease;
  animation: ${(p) => (p.visible ? fadeInUp : "none")} 1s ease;
  background-color: ${(p) => p.visible ? p.backColor : 'none'};
`;

const Content = styled.div<ExProps>`
  display: flex;
  align-items: center;
  justify-content: ${p => p.position};
  height: 100%;
  flex-direction: ${p => p.location ? 'row' : 'row-reverse'};
  
`;

const Image = styled.img<ExProps>`
  width: ${p => p.imgSize};
  height: ${p => p.imgSize};
  display: ${(p) => p.visible ? 'bluck' : 'none'};
  margin-right: ${p => p.location ? '70px' : '0px'};
  margin-left: ${p => p.location ? '0px' : '70px'};
`;

const Text = styled.p<ExProps>`
  font-size: 40px;
  font-weight: 900;
  display: ${(p) => p.visible ? 'contents' : 'none'};
`;