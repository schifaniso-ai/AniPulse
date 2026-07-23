import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getTopAiring, getUpcomingAnime, getCompletedAnime } from "../Api/anilist";
import { SkeletonCard, SkeletonLine } from "./ui/Skeleton";

const Section = styled.section`
  padding: 50px 8%;
  background: #222831;
  color: white;

  @media (max-width: 600px) {
    padding: 40px 16px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 12px;

  h2 {
    font-family: "Sora", sans-serif;
    font-size: 26px;
    font-weight: 700;
  }

  .tabs {
    display: flex;
    gap: 4px;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 10px;
    padding: 4px;

    button {
      padding: 8px 20px;
      border-radius: 8px;
      border: none;
      background: transparent;
      color: #8892a4;
      font-family: "Inter", sans-serif;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;

      &.active {
        background: #e22227;
        color: white;
      }

      &:hover:not(.active) {
        color: #f8fafc;
      }
    }
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const RankItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(226, 34, 39, 0.06);
    border-color: rgba(226, 34, 39, 0.15);
    transform: translateX(4px);
  }

  .rank {
    font-family: "Sora", sans-serif;
    font-size: 20px;
    font-weight: 800;
    color: ${({ rank }) => (rank <= 3 ? "#e22227" : "#55606e")};
    min-width: 36px;
    text-align: center;
  }

  .poster {
    width: 48px;
    height: 66px;
    border-radius: 8px;
    overflow: hidden;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .info {
    flex: 1;
    min-width: 0;

    h4 {
      font-size: 14px;
      font-weight: 600;
      color: #f8fafc;
      margin: 0 0 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .meta {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: #8892a4;
      flex-wrap: wrap;

      .type-badge {
        background: rgba(226, 34, 39, 0.12);
        color: #e22227;
        padding: 2px 6px;
        border-radius: 4px;
        font-weight: 600;
        text-transform: uppercase;
        font-size: 10px;
      }

      .ep-count {
        color: #55606e;
      }
    }
  }

  .genres {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;

    span {
      font-size: 10px;
      color: #8892a4;
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 2px 6px;
      border-radius: 4px;
    }
  }
`;

const SkeletonRank = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
`;

const formatType = (f) => {
  if (!f) return "";
  return f.replace("_", " ");
};

function MostViewed() {
  const [tab, setTab] = useState("Airing");
  const [airing, setAiring] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getTopAiring(), getUpcomingAnime(), getCompletedAnime()])
      .then(([a, u, c]) => {
        setAiring(a);
        setUpcoming(u);
        setCompleted(c);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const data = tab === "Airing" ? airing : tab === "Upcoming" ? upcoming : completed;

  return (
    <Section>
      <Header>
        <h2>Top Charts</h2>
        <div className="tabs">
          {["Airing", "Upcoming", "Completed"].map((t) => (
            <button
              key={t}
              className={tab === t ? "active" : ""}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </Header>

      <List>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <SkeletonRank key={i}>
                <SkeletonLine w="36px" h="20px" mb="0" />
                <div style={{ width: 48, height: 66, borderRadius: 8, flexShrink: 0 }}>
                  <SkeletonCard height="66px" />
                </div>
                <div style={{ flex: 1 }}>
                  <SkeletonLine w="60%" h="14px" mb="6px" />
                  <SkeletonLine w="40%" h="10px" mb="0" />
                </div>
              </SkeletonRank>
            ))
          : data.map((item, i) => (
              <RankItem key={item.id} rank={i + 1}>
                <span className="rank">{String(i + 1).padStart(2, "0")}</span>
                <div className="poster">
                  <img src={item.coverImage.large} alt={item.title.romaji} />
                </div>
                <div className="info">
                  <h4>{item.title.romaji}</h4>
                  <div className="meta">
                    <span className="type-badge">{formatType(item.format)}</span>
                    {item.episodes && (
                      <span className="ep-count">{item.episodes} eps</span>
                    )}
                    {item.nextAiringEpisode && (
                      <span>EP {item.nextAiringEpisode.episode} airing</span>
                    )}
                    {item.startDate && item.startDate.year && (
                      <span>{item.startDate.year}</span>
                    )}
                  </div>
                </div>
                {item.genres && (
                  <div className="genres">
                    {item.genres.slice(0, 2).map((g, j) => (
                      <span key={j}>{g}</span>
                    ))}
                  </div>
                )}
              </RankItem>
            ))}
      </List>
    </Section>
  );
}

export default MostViewed;
