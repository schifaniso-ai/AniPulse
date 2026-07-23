import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaArrowUp } from "react-icons/fa";

const Btn = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(135deg, #e22227, #c7080c);
  color: white;
  font-size: 18px;
  cursor: pointer;
  z-index: 90;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(226, 34, 39, 0.35);
  transition: all 0.3s ease;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  pointer-events: ${({ visible }) => (visible ? "auto" : "none")};
  transform: translateY(${({ visible }) => (visible ? "0" : "20px")});

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(226, 34, 39, 0.5);
  }

  @media (max-width: 600px) {
    bottom: 20px;
    right: 20px;
    width: 42px;
    height: 42px;
    font-size: 16px;
    border-radius: 12px;
  }
`;

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Btn visible={visible} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <FaArrowUp />
    </Btn>
  );
}

export default ScrollToTop;
