import React, {useEffect, useState} from "react";
import {getPopularAnime} from "../Api/anilist";
import styled from "styled-components";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination, Autoplay} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {SkeletonCard} from "./ui/Skeleton";

const Section = styled.section`
  padding: 50px 8%;
  background: #1a1a2e;
  color: white;

  .swiper-pagination-bullet {
    background: #e22227;
    opacity: 0.3;
  }

  .swiper-pagination-bullet-active {
    opacity: 1;
  }

  @media (max-width: 600px) {
    padding: 40px 16px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;

  h2 {
    font-family: "Sora", sans-serif;
    font-size: 26px;
    font-weight: 700;
  }

  .nav-buttons {
    display: flex;
    gap: 8px;

    button {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: transparent;
      color: #8892a4;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      transition: all 0.3s ease;

      &:hover {
        background: #e22227;
        border-color: #e22227;
        color: white;
      }
    }
  }
`;

const CardWrapper = styled.div`
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  height: 360px;
  background: #151521;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.08);
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(0, 0, 0, 0.3) 40%,
      transparent 100%
    );
  }

  .type-badge {
    position: absolute;
    top: 12px;
    left: 12px;
    background: rgba(226, 34, 39, 0.9);
    color: white;
    padding: 3px 8px;
    border-radius: 6px;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .card-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;

    h3 {
      font-size: 15px;
      font-weight: 600;
      margin: 0 0 8px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .meta {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: #aaa;
      margin-bottom: 6px;

      .status-badge {
        background: #e22227;
        color: white;
        padding: 2px 8px;
        border-radius: 4px;
        font-weight: 600;
        font-size: 10px;
      }
    }

    .genres {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
      margin-bottom: 6px;

      span {
        font-size: 10px;
        color: #8892a4;
        border: 1px solid rgba(255, 255, 255, 0.08);
        padding: 2px 6px;
        border-radius: 4px;
      }
    }

    .rating {
      font-size: 13px;
      color: #ffd369;
      font-weight: 600;
    }
  }
`;

const formatType = (f) => {
  if (!f) return "";
  return f.replace("_", " ");
};

function Popular() {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPopularAnime()
      .then((data) => setAnime(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <Section>
      <Header>
        <h2>Popular Anime</h2>
        <div className="nav-buttons">
          <button className="pop-prev">&lt;</button>
          <button className="pop-next">&gt;</button>
        </div>
      </Header>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{ prevEl: ".pop-prev", nextEl: ".pop-next" }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        spaceBetween={16}
        breakpoints={{
          0: { slidesPerView: 1.3 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
      >
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <SwiperSlide key={i}>
                <SkeletonCard height="360px" />
              </SwiperSlide>
            ))
          : anime.map((item) => (
              <SwiperSlide key={item.id}>
                <CardWrapper>
                  <img src={item.coverImage.large} alt={item.title.romaji} />
                  <div className="overlay"></div>
                  {item.format && (
                    <span className="type-badge">{formatType(item.format)}</span>
                  )}
                  <div className="card-content">
                    <h3>{item.title.romaji}</h3>
                    <div className="meta">
                      <span className="status-badge">{item.status}</span>
                      <span>{item.episodes} eps</span>
                    </div>
                    <div className="genres">
                      {item.genres?.slice(0, 2).map((g, i) => (
                        <span key={i}>{g}</span>
                      ))}
                    </div>
                    {item.averageScore && (
                      <span className="rating">★ {item.averageScore}%</span>
                    )}
                  </div>
                </CardWrapper>
              </SwiperSlide>
            ))}
      </Swiper>
    </Section>
  );
}

export default Popular;
