import styled, { keyframes } from "styled-components";
import {
  FaFire,
  FaPlayCircle,
  FaCalendarAlt,
  FaStar,
  FaVideo,
  FaListUl,
} from "react-icons/fa";

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-6px);
  }
`;

const Section = styled.section`
  padding: 60px 8%;
  background: #222831;
  color: white;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const Card = styled.div`
  background: #151515;
  padding: 16px;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-8px);
    background: #222;
    box-shadow: 0 12px 30px rgba(255, 255, 255, 0.08);
  }
`;

const Icon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(255, 255, 255, 0.06));
  color: #ff6b6b;
  font-size: 18px;
  box-shadow: 0 0 18px rgba(255, 107, 107, 0.2);
  animation: ${float} 2s ease-in-out infinite;
`;

const QuickAccess = () => {
  const items = [
    { title: "Trending Anime", icon: <FaFire /> },
    { title: "Continue Watching", icon: <FaPlayCircle /> },
    { title: "New Releases", icon: <FaCalendarAlt /> },
    { title: "Popular", icon: <FaStar /> },
    { title: "Movies", icon: <FaVideo /> },
    { title: "My List", icon: <FaListUl /> },
  ];

  return (
    <Section>
      <h2>Quick Access</h2>

      <Grid>
        {items.map((item) => (
          <Card key={item.title}>
            <Icon>{item.icon}</Icon>
            <h3>{item.title}</h3>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

export default QuickAccess;