import { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { Movie } from "../models/movie-model";
import './PopularMoviesCarousel.scss';
import FilmCard from "../films/FilmCard";
import { User } from "../models/user-model";
import { useRecoilValue } from "recoil";
import { userState } from "../../../db/UserFavoriteFilms";
import Skeleton from "react-loading-skeleton";



interface IProps {
    movies: Movie[],
    isFavoriteFilmsPage: boolean

}

const PopularMoviesCarousel: React.FC<IProps> =  ({
    movies,
    isFavoriteFilmsPage
}) => {

    return (
        <Carousel interval={3000} indicators={false}>         
        <Carousel.Item>
          <div className="films-row">
          {movies.slice(0,5).map((movie, index) => (             
            <FilmCard movie={movie} isFavoriteFilmsPage={isFavoriteFilmsPage}  />  || <Skeleton/>                  
          ))}     
        </div>
        
        </Carousel.Item>
        <Carousel.Item >
        <div className="films-row">
          {movies.slice(5,10).map((movie, index) => (             
            <FilmCard movie={movie} isFavoriteFilmsPage={isFavoriteFilmsPage}   />                     
          ))}     
        </div>
        
        </Carousel.Item>                  
      </Carousel>
    )
}

export default PopularMoviesCarousel;