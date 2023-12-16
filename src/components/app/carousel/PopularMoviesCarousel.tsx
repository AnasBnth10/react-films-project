import { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { Movie } from "../models/movie-model";
import './PopularMoviesCarousel.scss';
import FilmCard from "../films/FilmCard";



interface IProps {
    movies: Movie[]
}

const PopularMoviesCarousel: React.FC<IProps> =  ({
    movies
}) => {

    useEffect(()=> {
        console.log(movies[0]);
    },[])
    return (
        <Carousel interval={5000} indicators={false}>         
        <Carousel.Item >
          <div className="films-row">
          {movies.slice(0,5).map((movie, index) => (             
            <FilmCard title={movie.Title} img={movie.Poster} year={movie.Year} type={movie.Type}/>                     
          ))}     
        </div>
        
        </Carousel.Item>
        <Carousel.Item >
        <div className="films-row">
          {movies.slice(5,10).map((movie, index) => (             
            <FilmCard title={movie.Title} img={movie.Poster} year={movie.Year} type={movie.Type}/>                     
          ))}     
        </div>
        
        </Carousel.Item>                  
      </Carousel>
    )
}

export default PopularMoviesCarousel;