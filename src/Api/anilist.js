import axios from "axios";

const ANILIST_URL = "https://graphql.anilist.co";

const apiPost = async (query, variables = {}) => {
  const response = await axios.post(ANILIST_URL, { query, variables });
  return response.data.data;
};

export const getHeroAnime = async () => {
  const query = `
    query {
      Page(page:1, perPage:5) {
        media(sort: TRENDING_DESC, type: ANIME) {
          id
          title { romaji }
          bannerImage
          description
          averageScore
        }
      }
    }
  `;
  const data = await apiPost(query);
  return data.Page.media;
};

export const getTrendingAnime = async () => {
  const query = `
    query {
      Page(page:1, perPage:10) {
        media(sort: TRENDING_DESC, type: ANIME) {
          id
          title { romaji }
          coverImage { large }
          description
          averageScore
          format
          episodes
          status
        }
      }
    }
  `;
  const data = await apiPost(query);
  return data.Page.media;
};

export const getPopularAnime = async () => {
  const query = `
    query {
      Page(page:1, perPage:10) {
        media(sort: POPULARITY_DESC, type: ANIME) {
          id
          title { romaji }
          coverImage { large }
          description
          averageScore
          genres
          episodes
          status
          popularity
          format
        }
      }
    }
  `;
  const data = await apiPost(query);
  return data.Page.media;
};

export const getRecentlyUpdated = async () => {
  const query = `
    query {
      Page(page:1, perPage:20) {
        media(sort: UPDATED_AT_DESC, type: ANIME, status: RELEASING) {
          id
          title { romaji }
          coverImage { large }
          bannerImage
          averageScore
          episodes
          nextAiringEpisode {
            episode
            timeUntilAiring
          }
          mediaListEntry {
            progress
          }
          format
          status
        }
      }
    }
  `;
  const data = await apiPost(query);
  return data.Page.media;
};

export const getTopAiring = async () => {
  const query = `
    query {
      Page(page:1, perPage:10) {
        media(sort: SCORE_DESC, type: ANIME, status: RELEASING) {
          id
          title { romaji }
          coverImage { large }
          averageScore
          episodes
          nextAiringEpisode {
            episode
          }
          format
          popularity
          genres
        }
      }
    }
  `;
  const data = await apiPost(query);
  return data.Page.media;
};

export const getUpcomingAnime = async () => {
  const query = `
    query {
      Page(page:1, perPage:10) {
        media(sort: POPULARITY_DESC, type: ANIME, status: NOT_YET_RELEASED) {
          id
          title { romaji }
          coverImage { large }
          averageScore
          episodes
          startDate { year month day }
          format
          genres
        }
      }
    }
  `;
  const data = await apiPost(query);
  return data.Page.media;
};

export const getCompletedAnime = async () => {
  const query = `
    query {
      Page(page:1, perPage:10) {
        media(sort: SCORE_DESC, type: ANIME, status: FINISHED) {
          id
          title { romaji }
          coverImage { large }
          averageScore
          episodes
          format
          genres
          popularity
        }
      }
    }
  `;
  const data = await apiPost(query);
  return data.Page.media;
};

export const searchAnime = async (searchTerm) => {
  const query = `
    query ($search: String) {
      Page(page:1, perPage:8) {
        media(search: $search, type: ANIME) {
          id
          title { romaji }
          coverImage { large }
          averageScore
          format
          episodes
          status
          genres
        }
      }
    }
  `;
  const data = await apiPost(query, { search: searchTerm });
  return data.Page.media;
};

export const getGenreAnime = async (genre) => {
  const query = `
    query ($genre: String) {
      Page(page:1, perPage:10) {
        media(genre: $genre, sort: POPULARITY_DESC, type: ANIME) {
          id
          title { romaji }
          coverImage { large }
          averageScore
          episodes
          format
          genres
          status
        }
      }
    }
  `;
  const data = await apiPost(query, { genre });
  return data.Page.media;
};
