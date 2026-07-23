import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaSearch, FaTimes } from "react-icons/fa";
import { searchAnime } from "../../Api/anilist";

const SearchWrapper = styled.div`
  position: relative;
  flex: 1;
  max-width: 360px;

  @media (max-width: 900px) {
    max-width: 100%;
    width: 100%;
    order: 3;
  }
`;

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 0 14px;
  transition: all 0.3s ease;

  &:focus-within {
    border-color: #e22227;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 0 3px rgba(226, 34, 39, 0.15);
  }

  .search-icon {
    color: #55606e;
    font-size: 14px;
    flex-shrink: 0;
  }

  &:focus-within .search-icon {
    color: #e22227;
  }
`;

const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #f8fafc;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  padding: 10px 12px;

  &::placeholder {
    color: #55606e;
  }
`;

const ClearBtn = styled.button`
  background: none;
  border: none;
  color: #55606e;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  transition: color 0.2s;

  &:hover {
    color: #e22227;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: #1a1a2e;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  overflow: hidden;
  z-index: 200;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
  max-height: 420px;
  overflow-y: auto;
  animation: fadeInUp 0.2s ease;
`;

const ResultItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  cursor: pointer;
  transition: background 0.2s;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(226, 34, 39, 0.08);
  }

  img {
    width: 40px;
    height: 56px;
    object-fit: cover;
    border-radius: 6px;
    flex-shrink: 0;
  }

  .info {
    flex: 1;
    min-width: 0;

    h4 {
      font-size: 13px;
      font-weight: 600;
      color: #f8fafc;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0;
    }

    .meta {
      font-size: 11px;
      color: #8892a4;
      margin-top: 2px;
      display: flex;
      gap: 8px;
      align-items: center;

      .type {
        background: rgba(226, 34, 39, 0.15);
        color: #e22227;
        padding: 1px 6px;
        border-radius: 4px;
        font-weight: 600;
        font-size: 10px;
        text-transform: uppercase;
      }
    }
  }
`;

const NoResults = styled.div`
  padding: 24px 16px;
  text-align: center;
  color: #55606e;
  font-size: 13px;
`;

const LoadingText = styled.div`
  padding: 16px;
  text-align: center;
  color: #8892a4;
  font-size: 13px;
`;

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.trim().length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }

    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const data = await searchAnime(query.trim());
        setResults(data);
        setOpen(true);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const formatType = (f) => {
    if (!f) return "";
    return f.replace("_", " ");
  };

  return (
    <SearchWrapper ref={wrapperRef}>
      <InputWrap>
        <FaSearch className="search-icon" />
        <Input
          placeholder="Search anime..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
        />
        {query && (
          <ClearBtn onClick={() => { setQuery(""); setResults([]); setOpen(false); }}>
            <FaTimes />
          </ClearBtn>
        )}
      </InputWrap>

      {open && (
        <Dropdown>
          {loading && <LoadingText>Searching...</LoadingText>}
          {!loading && results.length === 0 && (
            <NoResults>No anime found for "{query}"</NoResults>
          )}
          {!loading && results.map((anime) => (
            <ResultItem key={anime.id}>
              <img src={anime.coverImage.large} alt={anime.title.romaji} />
              <div className="info">
                <h4>{anime.title.romaji}</h4>
                <div className="meta">
                  {anime.format && <span className="type">{formatType(anime.format)}</span>}
                  {anime.episodes && <span>{anime.episodes} eps</span>}
                  {anime.averageScore && <span>★ {anime.averageScore}%</span>}
                </div>
              </div>
            </ResultItem>
          ))}
        </Dropdown>
      )}
    </SearchWrapper>
  );
}

export default SearchBar;
