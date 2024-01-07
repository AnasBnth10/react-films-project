import { Card, Carousel, Col, Container, Row } from "react-bootstrap";
import FilmCard from "../FilmCard";
import './FilmsList.scss';
import { Movie } from "../../models/movie-model";
import { User } from "../../models/user-model";


interface IProps {
  movies: Movie[],
  isFavoriteFilmsPage: boolean
 
}

const FavoriteFilmsPage: React.FC<IProps> = ({
movies,
isFavoriteFilmsPage

}) => {
    
    return (
        
        <Container className="films-list">
          {movies.map((movie, index) => (             
            <FilmCard  isFavoriteFilmsPage={isFavoriteFilmsPage} movie={movie} />                     
          ))}       
      </Container>
    )
}

export default FavoriteFilmsPage;
