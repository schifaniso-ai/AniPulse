import React from "react";
import styled from "styled-components";
import {
  FaPlayCircle,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaDiscord,
} from "react-icons/fa";

const FooterWrapper = styled.footer`
  background: #0d0d17;
  color: #d9e2ec;
  padding: 60px 8% 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.04);

  @media (max-width: 600px) {
    padding: 40px 16px 20px;
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
`;

const Brand = styled.div`
  max-width: 300px;

  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #f8fafc;
    font-family: "Sora", sans-serif;
    font-size: 1.4rem;
    font-weight: 800;
    margin-bottom: 14px;

    .icon {
      color: #e22227;
      font-size: 1.6rem;
    }
  }

  p {
    font-size: 14px;
    line-height: 1.7;
    color: #55606e;
  }
`;

const Links = styled.div`
  display: flex;
  gap: 50px;
  flex-wrap: wrap;

  div {
    h4 {
      color: #f8fafc;
      font-family: "Sora", sans-serif;
      font-size: 14px;
      font-weight: 600;
      margin: 0 0 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        margin-bottom: 10px;

        a {
          color: #55606e;
          text-decoration: none;
          font-size: 13px;
          transition: color 0.3s ease;

          &:hover {
            color: #e22227;
          }
        }
      }
    }
  }
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  padding-top: 24px;

  p {
    font-size: 12px;
    color: #3a3a5c;
  }

  .socials {
    display: flex;
    gap: 10px;

    a {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.06);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #55606e;
      font-size: 14px;
      transition: all 0.3s ease;

      &:hover {
        background: #e22227;
        border-color: #e22227;
        color: white;
        transform: translateY(-2px);
      }
    }
  }
`;

function Footer() {
  return (
    <FooterWrapper>
      <Top>
        <Brand>
          <div className="logo">
            <FaPlayCircle className="icon" />
            <span>AniPulse</span>
          </div>
          <p>
            Your ultimate destination for anime streaming and discovery. Watch
            trending anime, track your favorites, and explore new series.
          </p>
        </Brand>

        <Links>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Trending</a></li>
              <li><a href="#">Popular</a></li>
              <li><a href="#">Genres</a></li>
              <li><a href="#">Schedule</a></li>
            </ul>
          </div>
          <div>
            <h4>Community</h4>
            <ul>
              <li><a href="#">Watch List</a></li>
              <li><a href="#">Downloads</a></li>
              <li><a href="#">Reviews</a></li>
              <li><a href="#">Forums</a></li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </Links>
      </Top>

      <Bottom>
        <p>&copy; 2026 AniPulse. All rights reserved.</p>
        <div className="socials">
          <a href="#"><FaDiscord /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaYoutube /></a>
          <a href="#"><FaFacebook /></a>
        </div>
      </Bottom>
    </FooterWrapper>
  );
}

export default Footer;
