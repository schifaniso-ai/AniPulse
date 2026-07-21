import React, {useEffect,useState} from "react";
import {getHeroAnime} from "../Api/anilist";
import {Swiper,SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper/modules";
import "swiper/css";
import styled from "styled-components";

const HeroSection = styled.section`
  height: 80vh;
  width: 100%;
`;

const HeroSlide = styled.div`
  height: 80vh;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
`;

const HeroContent = styled.div`
  max-width: 600px;
  margin-left: 70px;
  color: white;

  h1 {
    font-size: 60px;
    margin-bottom: 20px;
  }

  p {
    font-size: 18px;
    line-height: 1.6;
  }
`;

const TrailerBtn = styled.button`
  padding: 14px 30px;
  margin-right: 15px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
`;


function Hero(){
const [anime,setAnime]=useState([]);
useEffect(()=>{

getHeroAnime()
.then(data=>{
setAnime(data)
})


},[]);

return (
<HeroSection>
<Swiper
modules={[Autoplay]}
autoplay={{
delay:4000,
disableOnInteraction:false
}}

loop={true}

>

{
anime.map(item=>(
<SwiperSlide key={item.id}>
<HeroSlide
style={{
backgroundImage:
`linear-gradient(
90deg,
rgba(0,0,0,.8),
rgba(0,0,0,.2)
),
url(${item.bannerImage})`
}}

>

<HeroContent>
<h1>
{item.title.romaji}
</h1>
<p>
{
item.description
?.replace(/<[^>]*>/g,"")
.slice(0,200)
}
...
</p>

<div>
⭐ {item.averageScore}/100
</div>

<TrailerBtn>
Watch Trailer
</TrailerBtn>

<TrailerBtn>
More Info
</TrailerBtn>

</HeroContent>

</HeroSlide>

</SwiperSlide>

))

}


</Swiper>


</HeroSection>

)


}


export default Hero;
