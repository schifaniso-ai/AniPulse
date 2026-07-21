import React, {useEffect, useState} from "react";
import {getTrendingAnime} from "../Api/anilist";
import styled from "styled-components";

const Section = styled.section`
  padding: 60px 8%;
  background: #222831;
  color: white;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const Card = styled.div`
  background: #151515;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(255, 255, 255, 0.08);
  }
`;

const Poster = styled.img`
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
`;

const Info = styled.div`
  padding: 12px;

  h3 {
    font-size: 14px;
    margin: 0 0 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    font-size: 12px;
    color: #aaa;
    margin: 0;
  }
`;


function Trending(){
const [anime,setAnime] = useState([]);

useEffect(()=>{

    getTrendingAnime()
    .then(data=>{
        setAnime(data)
    })

},[]);

return (

<Section>
<h2>Trending Anime</h2>

<Grid>
{
anime.map(item=>(
<Card key={item.id}>
<Poster 
src={item.coverImage.large}
alt={item.title.romaji}
/>

<Info>
<h3>
{item.title.romaji}
</h3>

<p>
Rating: {item.averageScore}
</p>
</Info>

</Card>

))

}

</Grid>

</Section>

)

}

export default Trending;
