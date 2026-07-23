import React from "react";
import styled, { keyframes } from "styled-components";
import {
  FaFire,
  FaClock,
  FaStar,
  FaFilm,
  FaListUl,
  FaDownload,
} from "react-icons/fa";

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

const Section = styled.section`
  padding: 50px 8%;
  background: #151521;

  @media (max-width: 600px) {
    padding: 40px 16px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 28px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  transition: all 0.4s ease;

  &:hover {
    background: rgba(226, 34, 39, 0.06);
    border-color: rgba(226, 34, 39, 0.2);
    transform: translateY(-6px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
  }

  .icon-wrap {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    background: ${({ color }) => color || "rgba(226, 34, 39, 0.12)"};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    color: ${({ iconColor }) => iconColor || "#e22227"};
    animation: ${float} 3s ease-in-out infinite;
    animation-delay: ${({ delay }) => delay || "0s"};
  }

  h4 {
    font-size: 13px;
    font-weight: 600;
    color: #f8fafc;
    text-align: center;
    margin: 0;
  }

  @media (max-width: 500px) {
    padding: 20px 12px;

    .icon-wrap {
      width: 48px;
      height: 48px;
      font-size: 18px;
    }

    h4 {
      font-size: 12px;
    }
  }
`;

const items = [
  { icon: <FaFire />, label: "Trending", color: "rgba(226, 34, 39, 0.12)", iconColor: "#e22227", delay: "0s" },
  { icon: <FaClock />, label: "Continue Watching", color: "rgba(59, 130, 246, 0.12)", iconColor: "#3b82f6", delay: "0.3s" },
  { icon: <FaStar />, label: "Top Rated", color: "rgba(255, 211, 105, 0.12)", iconColor: "#ffd369", delay: "0.6s" },
  { icon: <FaFilm />, label: "Movies", color: "rgba(168, 85, 247, 0.12)", iconColor: "#a855f7", delay: "0.9s" },
  { icon: <FaListUl />, label: "My List", color: "rgba(34, 197, 94, 0.12)", iconColor: "#22c55e", delay: "1.2s" },
  { icon: <FaDownload />, label: "Downloads", color: "rgba(251, 146, 60, 0.12)", iconColor: "#fb923c", delay: "1.5s" },
];

function QuickAccess() {
  return (
    <Section>
      <Grid>
        {items.map((item, i) => (
          <Card key={i} color={item.color} iconColor={item.iconColor} delay={item.delay}>
            <div className="icon-wrap">{item.icon}</div>
            <h4>{item.label}</h4>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}

export default QuickAccess;
