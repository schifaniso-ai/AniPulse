import React from "react";
import styled from "styled-components";
import {FaSearch} from "react-icons/fa";

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.7rem 1rem;
  background: #222831;
  border: 1px solid #55606e;
  border-radius: 12px;
  width: 100%;
  max-width: 240px;
  min-width: 0;

  .search-icon {
    color: #e22227;
  }

  input {
    background: transparent;
    border: none;
    outline: none;
    color: #f8fafc;
    width: 100%;
    min-width: 0;
    font-family: "Inter", sans-serif;

    &::placeholder {
      color: #55606e;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

function SearchBar() {
  return (
    <SearchBox>
      <FaSearch className="search-icon" />
      <input type="text" placeholder="Search anime..." />
    </SearchBox>
  );
}

export default SearchBar;