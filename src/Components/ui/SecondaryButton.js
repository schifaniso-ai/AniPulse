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

const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: transparent;
  color: #f8fafc;
  border: 1px solid #55606e;
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
    border-color: #e22227;
    color: #e22227;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export default SecondaryButton;
