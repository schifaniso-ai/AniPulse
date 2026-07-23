import styled, { css } from "styled-components";

const sizes = css`
  ${({ size }) => {
    switch (size) {
      case "sm":
        return css`
          padding: 8px 18px;
          font-size: 13px;
          border-radius: 8px;
        `;
      case "lg":
        return css`
          padding: 16px 36px;
          font-size: 16px;
          border-radius: 14px;
        `;
      default:
        return css`
          padding: 12px 28px;
          font-size: 14px;
          border-radius: 10px;
        `;
    }
  }}
`;

const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(135deg, #e22227, #c7080c);
  color: white;
  border: none;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  text-decoration: none;

  ${sizes}

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}

  ${({ pill }) =>
    pill &&
    css`
      border-radius: 999px;
    `}

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(226, 34, 39, 0.35);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export default PrimaryButton;
