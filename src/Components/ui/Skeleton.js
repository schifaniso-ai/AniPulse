import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.04) 25%,
    rgba(255, 255, 255, 0.08) 50%,
    rgba(255, 255, 255, 0.04) 75%
  );
  background-size: 800px 100%;
  animation: ${shimmer} 1.5s infinite ease-in-out;
  border-radius: 8px;
`;

export const SkeletonCard = styled(SkeletonBase)`
  border-radius: 14px;
  height: ${({ height }) => height || "360px"};
  width: 100%;
`;

export const SkeletonCircle = styled(SkeletonBase)`
  border-radius: 50%;
  width: ${({ size }) => size || "40px"};
  height: ${({ size }) => size || "40px"};
  flex-shrink: 0;
`;

export const SkeletonLine = styled(SkeletonBase)`
  height: ${({ h }) => h || "14px"};
  width: ${({ w }) => w || "100%"};
  border-radius: 6px;
  margin-bottom: ${({ mb }) => mb || "8px"};
`;

export const SkeletonBanner = styled(SkeletonBase)`
  border-radius: 0;
  height: 80vh;
  width: 100%;
`;

export const SkeletonEpisode = styled.div`
  display: flex;
  gap: 14px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);

  ${SkeletonBase} {
    border-radius: 10px;
    width: 120px;
    height: 70px;
    flex-shrink: 0;
  }

  .lines {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
  }
`;
