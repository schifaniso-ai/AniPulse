import React, {useEffect, useState} from "react";
import {getHeroAnime} from "../Api/anilist";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import styled from "styled-components";
import PrimaryButton from "./ui/PrimaryButton";
import SecondaryButton from "./ui/SecondaryButton";
import {SkeletonBanner} from "./ui/Skeleton";

const HeroSection = styled.section`
  width: 100%;
  overflow: hidden;
  background: #151521;

  .swiper {
    height: 80vh;
    min-height: 500px;
    max-height: 700px;
  }

  .swiper-pagination {
    bottom: 30px !important;
  }

  .swiper-pagination-bullet {
    width: 30px;
    height: 4px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.3);
    opacity: 1;
    transition: all 0.3s ease;
  }

  .swiper-pagination-bullet-active {
    background: #e22227;
    width: 50px;
  }

  @media (max-width: 768px) {
    .swiper {
      height: 60vh;
      min-height: 400px;
    }
  }
`;

const HeroSlide = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
`;

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.85) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0.1) 100%
  );
`;

const BottomFade = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(to top, #151521 0%, transparent 100%);
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 550px;
  margin-left: 7%;
  animation: fadeInUp 0.6s ease;

  h1 {
    font-family: "Sora", sans-serif;
    font-size: clamp(28px, 5vw, 52px);
    margin-bottom: 14px;
    line-height: 1.1;
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
  }

  p {
    font-size: clamp(14px, 1.5vw, 16px);
    line-height: 1.7;
    color: #d9e2ec;
    margin-bottom: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .score {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
    padding: 6px 14px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #ffd369;
    margin-bottom: 20px;
  }

  .hero-buttons {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
    margin-left: 5%;

    .hero-buttons {
      flex-direction: column;
      max-width: 240px;
    }
  }
`;


function Hero() {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHeroAnime()
      .then((data) => setAnime(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <HeroSection>
        <SkeletonBanner />
      </HeroSection>
    );
  }

  return (
    <HeroSection>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
      >
        {anime.map((item) => (
          <SwiperSlide key={item.id}>
            <HeroSlide
              style={{
                backgroundImage: `url(${item.bannerImage})`,
                backgroundColor: "#1a1a2e",
                position: "relative",
              }}
            >
              <GradientOverlay />
              <BottomFade />
              <HeroContent>
                <h1>{item.title.romaji}</h1>
                <p>
                  {item.description
                    ?.replace(/<[^>]*>/g, "")
                    .slice(0, 200)}
                  ...
                </p>
                {item.averageScore && (
                  <div className="score">★ {item.averageScore}/100</div>
                )}
                <div className="hero-buttons">
                  <PrimaryButton pill size="lg">Watch Now</PrimaryButton>
                  <SecondaryButton pill size="lg">More Info</SecondaryButton>
                </div>
              </HeroContent>
            </HeroSlide>
          </SwiperSlide>
        ))}
      </Swiper>
    </HeroSection>
  );
}

export default Hero;
