import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getRecentlyUpdated } from "../Api/anilist";
import { SkeletonEpisode } from "./ui/Skeleton";

const Section = styled.section`
  padding: 50px 8%;
  background: #1a1a2e;
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

  h2 {
    font-family: "Sora", sans-serif;
    font-size: 26px;
    font-weight: 700;
  }

  .filters {
    display: flex;
    gap: 6px;

    button {
      padding: 6px 16px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: transparent;
      color: #8892a4;
      font-family: "Inter", sans-serif;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;

      &.active {
        background: rgba(226, 34, 39, 0.15);
        border-color: #e22227;
        color: #e22227;
      }

      &:hover:not(.active) {
        border-color: rgba(255, 255, 255, 0.2);
        color: #f8fafc;
      }
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;

    h2 {
      font-size: 22px;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(226, 34, 39, 0.06);
    border-color: rgba(226, 34, 39, 0.2);
    transform: translateY(-2px);
  }

  .thumb {
    position: relative;
    width: 100px;
    height: 70px;
    border-radius: 8px;
    overflow: hidden;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .ep-badge {
      position: absolute;
      bottom: 4px;
      right: 4px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      font-size: 10px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
    }
  }

  .details {
    flex: 1;
    min-width: 0;

    h4 {
      font-size: 13px;
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
      font-size: 11px;
      color: #8892a4;

      .type {
        background: rgba(226, 34, 39, 0.12);
        color: #e22227;
        padding: 2px 6px;
        border-radius: 4px;
        font-weight: 600;
        text-transform: uppercase;
        font-size: 10px;
      }

      .score {
        color: #ffd369;
      }
    }

    .progress-bar {
      margin-top: 6px;
      height: 3px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 2px;
      overflow: hidden;

      .fill {
        height: 100%;
        background: #e22227;
        border-radius: 2px;
        transition: width 0.3s ease;
      }
    }
  }
`;

const formatType = (f) => {
  if (!f) return "";
  return f.replace("_", " ");
};

function LatestEpisodes() {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    getRecentlyUpdated()
      .then((data) => setAnime(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === "All"
    ? anime
    : anime.filter((a) => a.format === filter);

  return (
    <Section>
      <Header>
        <h2>Latest Episodes</h2>
        <div className="filters">
          {["All", "SUB", "DUB"].map((f) => (
            <button
              key={f}
              className={filter === f ? "active" : ""}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </Header>

      <Grid>
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <SkeletonEpisode key={i}>
                <div />
                <div className="lines">
                  <div style={{ height: 14, width: "80%", background: "rgba(255,255,255,0.06)", borderRadius: 6 }} />
                  <div style={{ height: 10, width: "50%", background: "rgba(255,255,255,0.04)", borderRadius: 6 }} />
                </div>
              </SkeletonEpisode>
            ))
          : filtered.slice(0, 16).map((item) => (
              <Card key={item.id}>
                <div className="thumb">
                  <img src={item.coverImage.large} alt={item.title.romaji} />
                  {item.nextAiringEpisode && (
                    <span className="ep-badge">
                      EP {item.nextAiringEpisode.episode}
                    </span>
                  )}
                </div>
                <div className="details">
                  <h4>{item.title.romaji}</h4>
                  <div className="meta">
                    <span className="type">{formatType(item.format)}</span>
                    {item.averageScore && (
                      <span className="score">★ {item.averageScore}%</span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
      </Grid>
    </Section>
  );
}

export default LatestEpisodes;
