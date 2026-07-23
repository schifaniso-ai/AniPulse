import React, {useState} from "react";
import styled from "styled-components";
import {
  FaPlayCircle,
  FaBell,
  FaBars,
  FaTimes,
  FaRandom,
} from "react-icons/fa";
import SignUpModal from "./SignUpModal";
import LoginModal from "./LoginModal";
import PrimaryButton from "./ui/PrimaryButton";
import SecondaryButton from "./ui/SecondaryButton";
import SearchBar from "./ui/SearchBar";

const Wrapper = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  min-height: 70px;
  padding: 0 5%;
  box-sizing: border-box;
  background: rgba(21, 21, 33, 0.92);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #f8fafc;
  font-family: "Sora", sans-serif;
  font-size: 1.4rem;
  font-weight: 800;
  min-width: 0;
  cursor: pointer;

  .icon {
    color: #e22227;
    font-size: 1.6rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.8rem;

  a {
    color: #8892a4;
    text-decoration: none;
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 14px;
    transition: color 0.3s;
    position: relative;

    &:hover {
      color: #f8fafc;
    }

    &::after {
      content: "";
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background: #e22227;
      border-radius: 1px;
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const Hamburger = styled.button`
  display: none;
  background: none;
  border: none;
  color: #f8fafc;
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: color 0.3s;

  &:hover {
    color: #e22227;
  }

  @media (max-width: 900px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const RandomBtn = styled.button`
  background: none;
  border: none;
  color: #8892a4;
  font-size: 16px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s;
  display: flex;
  align-items: center;

  &:hover {
    color: #e22227;
    background: rgba(226, 34, 39, 0.1);
  }

  @media (max-width: 500px) {
    display: none;
  }
`;

const BellButton = styled.button`
  position: relative;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  border: none;
  background: rgba(255, 255, 255, 0.05);
  color: #8892a4;
  cursor: pointer;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;

  &:hover {
    color: #f8fafc;
    background: rgba(255, 255, 255, 0.1);
  }

  .dot {
    position: absolute;
    top: 7px;
    right: 7px;
    width: 7px;
    height: 7px;
    background: #e22227;
    border-radius: 50%;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 0.6rem;

  @media (max-width: 600px) {
    .signin-btn {
      display: none;
    }
  }

  @media (max-width: 500px) {
    .signup-btn {
      display: none;
    }
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  z-index: 150;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  opacity: ${({ open }) => (open ? 1 : 0)};
  pointer-events: ${({ open }) => (open ? "auto" : "none")};
  transition: opacity 0.3s ease;
`;

const MobileClose = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  color: #f8fafc;
  font-size: 24px;
  cursor: pointer;
`;

const MobileNav = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  a {
    color: #d9e2ec;
    text-decoration: none;
    font-family: "Sora", sans-serif;
    font-size: 1.4rem;
    font-weight: 600;
    transition: color 0.3s;

    &:hover {
      color: #e22227;
    }
  }
`;

const MobileAuth = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 200px;
`;

const Navbar = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
    <Wrapper>
      <Logo>
        <FaPlayCircle className="icon" />
        <span>AniPulse</span>
      </Logo>

      <NavLinks>
        <a href="./Pages/Hero">Home</a>
        <a href="./Pages/Trending">Trending</a>
        <a href="./Pages/Genres">Genres</a>
        <a href="./Pages/WatchList">Watch List</a>
        <a href="./Pages/Downloads">Downloads</a>
      </NavLinks>

      <SearchBar />

      <RightSection>
        <RandomBtn title="Random Anime">
          <FaRandom />
        </RandomBtn>

        <BellButton>
          <FaBell />
          <span className="dot"></span>
        </BellButton>

        <AuthButtons>
          <SecondaryButton size="sm" className="signin-btn" onClick={()=>setShowLogin(true)}>Sign In</SecondaryButton>
          <PrimaryButton size="sm" className="signup-btn" onClick={()=>setShowSignUp(true)}>Sign Up</PrimaryButton>
        </AuthButtons>

        <Hamburger onClick={()=>setMobileOpen(true)}>
          <FaBars />
        </Hamburger>
      </RightSection>
    </Wrapper>

    <MobileMenu open={mobileOpen}>
      <MobileClose onClick={()=>setMobileOpen(false)}>
        <FaTimes />
      </MobileClose>
      <MobileNav>
        <a href="./Pages/Hero" onClick={()=>setMobileOpen(false)}>Home</a>
        <a href="./Pages/Trending" onClick={()=>setMobileOpen(false)}>Trending</a>
        <a href="./Pages/Genres" onClick={()=>setMobileOpen(false)}>Genres</a>
        <a href="./Pages/WatchList" onClick={()=>setMobileOpen(false)}>Watch List</a>
        <a href="./Pages/Downloads" onClick={()=>setMobileOpen(false)}>Downloads</a>
      </MobileNav>
      <MobileAuth>
        <SecondaryButton fullWidth onClick={()=>{ setMobileOpen(false); setShowLogin(true); }}>Sign In</SecondaryButton>
        <PrimaryButton fullWidth onClick={()=>{ setMobileOpen(false); setShowSignUp(true); }}>Sign Up</PrimaryButton>
      </MobileAuth>
    </MobileMenu>

    {showLogin && (
      <LoginModal
        onClose={()=>setShowLogin(false)}
        onSwitchToSignUp={()=>{ setShowLogin(false); setShowSignUp(true); }}
      />
    )}
    {showSignUp && (
      <SignUpModal
        onClose={()=>setShowSignUp(false)}
        onSwitchToLogin={()=>{ setShowSignUp(false); setShowLogin(true); }}
      />
    )}
    </>
  );
};

export default Navbar;
