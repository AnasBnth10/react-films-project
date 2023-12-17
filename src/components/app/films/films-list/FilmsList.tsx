import { Card, Carousel, Col, Container, Row } from "react-bootstrap";
import FilmCard from "../FilmCard";
import './FilmsList.scss';
import { Movie } from "../../models/movie-model";
import { User } from "../../models/user-model";


interface IProps {
  movies: Movie[],
  user: User
}

const FavoriteFilmsPage: React.FC<IProps> = ({
movies,
user
}) => {
    const cartes = [
        { titre: 'Carte 1', contenu: 'Contenu de la carte 1' },
        { titre: 'Carte 2', contenu: 'Contenu de la carte 2' },
        { titre: 'Carte 3', contenu: 'Contenu de la carte 3' },
        // Ajoutez autant d'objets que nécessaire
      ];
    return (
        
        <Container className="films-list">
          {movies.map((movie, index) => (             
            <FilmCard id={movie.imdbID} user={user} title={movie.Title} img={movie.Poster} year={movie.Year} type={movie.Type}/>                     
          ))}       
      </Container>
    )
}

export default FavoriteFilmsPage;
