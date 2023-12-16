import { Card, Carousel, Col, Container, Row } from "react-bootstrap";
import FilmCard from "../FilmCard";
import './FilmsList.scss';
import { Movie } from "../../models/movie-model";


interface IProps {
  movies: Movie[]
}

const FavoriteFilmsPage: React.FC<IProps> = ({
movies
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
            <FilmCard title={movie.Title} img={movie.Poster} year={movie.Year} type={movie.Type}/>                     
          ))}       
      </Container>
    )
}

export default FavoriteFilmsPage;
