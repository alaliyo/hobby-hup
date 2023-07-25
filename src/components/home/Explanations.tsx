import { useState } from "react";
import styled, { keyframes } from "styled-components";
import useHeaderScroll from "../../hooks/useHeaderScroll";

interface ExplanationsPorps {
  className: string;
  height: number;
  imgUrl: string;
  imgPosition: string;
  imgSize: string;
  location: string;
  text1?: string;
  text2?: string;
  backColor?: string;
}

function Explanations({ className, height, imgUrl, imgPosition, imgSize, location, text1, text2, backColor }: ExplanationsPorps) {
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
          {text1 && text2 && (
            <Text visible={visible}>
              {text1}
              <br />
              {text2}
            </Text>
          )}
        </Content>
      </Ex>
    );
  }

export default Explanations;

interface ExProps {
  visible?: boolean;
  position?: string;
  imgSize?: string;
  location?: string;
  backColor?: string;
}
  
const fadeInRight = keyframes`
  from {
    transform: translateX(50px);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const Ex = styled.div<ExProps>`
  height: 400px;
  opacity: 1;
  transition: opacity 0.5s ease;
  animation: ${(p) => (p.visible ? fadeInRight : "none")} 1.5s ease;
  background-color: ${(p) => p.visible ? p.backColor : 'none'};

  @media screen and (max-width: 800px){
    height: 350px;
  }

  @media screen and (max-width: 650px){
    height: 300px;
  }

  @media screen and (max-width: 450px){
    height: 250px;
  }

  @media screen and (max-width: 350px){
    height: 250px;
  }
`;

const Content = styled.div<ExProps>`
  display: flex;
  align-items: center;
  justify-content: ${p => p.position};
  height: 100%;
  flex-direction: ${p => p.location === 'right' ? 'row' : 'row-reverse'};
  
`;

const Image = styled.img<ExProps>`
  width: ${p => p.imgSize};
  height: ${p => p.imgSize};
  display: ${(p) => p.visible ? 'bluck' : 'none'};
  margin-right: ${p => p.location === 'right' ? '200px' : '0px'};
  margin-left: ${p => p.location === 'left' ? '180px' : '0px'};
  
  @media screen and (max-width: 800px){
    margin-right: ${p => p.location === 'right' ? '150px' : '0px'};
    margin-left: ${p => p.location === 'left' ? '130px' : '0px'};
  }

  @media screen and (max-width: 650px){
    margin-right: ${p => p.location === 'right' ? '80px' : '0px'};
    margin-left: ${p => p.location === 'left' ? '60px' : '0px'};
  }

  @media screen and (max-width: 450px){
    margin-right: ${p => p.location === 'right' ? '50px' : '0px'};
    margin-left: ${p => p.location === 'left' ? '40px' : '0px'};
  }

  @media screen and (max-width: 350px){
    margin-right: ${p => p.location === 'right' ? '20px' : '0px'};
    margin-left: ${p => p.location === 'left' ? '15px' : '0px'};
  }
`;

const fadeInUp = keyframes`
  from {
    transform: translateY(40px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Text = styled.p<ExProps>`
  font-size: 40px;
  font-weight: 900;
  display: ${(p) => p.visible ? 'bluck' : 'none'};
  animation: ${(p) => (p.visible ? fadeInUp : "none")} 1.5s ease;

  @media screen and (max-width: 800px) {
    font-size: 30px;
  }

  @media screen and (max-width: 650px) {
    font-size: 26px;
  }

  @media screen and (max-width: 450px) {
    font-size: 23px;
  }

  @media screen and (max-width: 350px) {
    font-size: 20px;
  }
`;