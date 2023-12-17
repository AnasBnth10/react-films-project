import { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { Movie } from "../models/movie-model";
import './PopularMoviesCarousel.scss';
import FilmCard from "../films/FilmCard";
import { User } from "../models/user-model";
import { useRecoilValue } from "recoil";
import { userState } from "../../../db/UserFavoriteFilms";



interface IProps {
    movies: Movie[],
    user: User
}

const PopularMoviesCarousel: React.FC<IProps> =  ({
    movies,
    user
}) => {

    user = useRecoilValue(userState);

    useEffect(()=> {
        console.log(movies[0]);
    },[])
    return (
        <Carousel interval={3000} indicators={false}>         
        <Carousel.Item >
          <div className="films-row">
          {movies.slice(0,5).map((movie, index) => (             
            <FilmCard id={movie.imdbID} user={user} title={movie.Title} img={movie.Poster} year={movie.Year} type={movie.Type}/>                     
          ))}     
        </div>
        
        </Carousel.Item>
        <Carousel.Item >
        <div className="films-row">
          {movies.slice(5,10).map((movie, index) => (             
            <FilmCard id={movie.imdbID} user={user} title={movie.Title} img={movie.Poster} year={movie.Year} type={movie.Type}/>                     
          ))}     
        </div>
        
        </Carousel.Item>                  
      </Carousel>
    )
}

export default PopularMoviesCarousel;