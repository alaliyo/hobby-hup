import { useState } from "react";
import styled, { keyframes } from "styled-components";
import useHeaderScroll from "../../hooks/useHeaderScroll";

interface ExplanationsPorps {
  className: string;
  height: number;
}

function Explanations({ className, height }: ExplanationsPorps) {
  const [visible, setVisible] = useState(false);
  
    useHeaderScroll({
      target: `.${className}`,
      restoreClassName: "box",
      changeClassName: "visible",
      scrollValue: height,
      onEnter: () => setVisible(true),
    });
  
    return <Ex className={className} visible={visible} />;
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