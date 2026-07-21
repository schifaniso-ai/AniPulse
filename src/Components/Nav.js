import React from "react";
import styled from "styled-components";
import {
  FaPlayCircle,
  FaBell,
} from "react-icons/fa";

const Wrapper = styled.nav`
  width: 100%;
  min-height: 80px;
  padding: 0 1.5rem;
  box-sizing: border-box;
  background: #222831;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(85, 96, 110, 0.25);

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: #f8fafc;
  font-family: "Sora", sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  min-width: 0;
  max-width: 100%;

  .icon {
    color: #e22227;
    font-size: 1.8rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  min-width: 0;
  max-width: 100%;

  a {
    color: #d9e2ec;
    text-decoration: none;
    font-family: "Inter", sans-serif;
    font-weight: 500;
    transition: 0.3s;

    &:hover {
      color: #e22227;
    }
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 0;
  max-width: 100%;
  flex-wrap: wrap;
  justify-content: flex-end;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    gap: 0.5rem;
  }
`;

const BellButton = styled.button`
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: none;
  background: #222831;
  color: #f8fafc;
  cursor: pointer;
  font-size: 1rem;
  min-width: 0;
  max-width: 100%;

  .dot {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 8px;
    height: 8px;
    background: #e22227;
    border-radius: 50%;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 0.8rem;
  min-width: 0;
  max-width: 100%;

  button {
    padding: 0.7rem 1.2rem;
    border-radius: 12px;
    font-family: "Inter", sans-serif;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s;
  }

  .signin {
    background: transparent;
    border: 1px solid #55606e;
    color: #f8fafc;

    &:hover {
      border-color: #e22227;
      color: #e22227;
    }
  }

  .signup {
    background: linear-gradient(135deg, #e22227, #c7080c);
    border: none;
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(226, 34, 39, 0.35);
    }
  }

  @media (max-width: 600px) {
    .signin {
      display: none;
    }
  }

  @media (max-width: 500px) {
    .signup {
      display: none;
    }
  }
`;



const Navbar = () => {
  return (
    <Wrapper>
      <Logo>
        <FaPlayCircle className="icon" />
        <span>AniPulse</span>
      </Logo>

      <NavLinks>
        <a href="./Pages/Hero">Home</a>
        <a href="./Pages/Trending">Trending</a>
        <a href="./Pages/Genres">Genres</a>
        <a href='./Pages/WatchList'>Watch List</a>
        <a href="./Pages/Downloads">Downloads</a>
      </NavLinks>

      <RightSection>
        
        <BellButton>
          <FaBell />
          <span className="dot"></span>
        </BellButton>

        <AuthButtons>
          <button className="signin">Sign In</button>
          <button className="signup">Sign Up</button>
        </AuthButtons>
      </RightSection>
    </Wrapper>
  );
};

export default Navbar;