import axios from "axios";

const ANILIST_URL = "https://graphql.anilist.co";

export const getTrendingAnime = async () => {

    const query = `
    query {
        Page(page:1, perPage:10) {
            media(sort: TRENDING_DESC, type: ANIME) {
                id
                title {
                    romaji
                }
                coverImage {
                    large
                }
                description
                averageScore
            }
        }
    }
    `;

    const response = await axios.post(
        ANILIST_URL,
        {
            query: query
        }
    );

    return response.data.data.Page.media;
};

export const getHeroAnime = async () => {

    const query = `
    query {
        Page(page:1, perPage:5) {
            media(sort: TRENDING_DESC, type: ANIME) {
                id
                title {
                    romaji
                }
                bannerImage
                description
                averageScore
            }
        }
    }
    `;

    const response = await axios.post(
        ANILIST_URL,
        {
            query: query
        }
    );

    return response.data.data.Page.media;
};
