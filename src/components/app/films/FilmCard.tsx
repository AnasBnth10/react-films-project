import { Button, Card } from "react-bootstrap";
import './FilmCard.scss';
import AddOrRemoveButton from "../../common/buttons/AddOrRemoveButton";
import ViewButton from "../../common/buttons/ViewButton";
import { User } from "../models/user-model";
import FilmCardButtons from "../../common/buttons/button-group/FilmCardButtons";
import { LikeOrDislikeFilm } from "../helper/movies.helper";
import { Movie } from "../models/movie-model";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../../db/UserFavoriteFilms";
import Skeleton from "react-loading-skeleton";
import CustomSkeleton from "../../common/skeleton/CustomSkeleton";


interface IProps {
    movie: Movie
    isFavoriteFilmsPage: boolean
}

const FilmCard: React.FC<IProps> =  ({
    movie,
    isFavoriteFilmsPage
}) => {

  const [user,setUser] = useRecoilState(userState);
  const movieDetailsLink = "/film/" + movie.imdbID;
  const [isPresentInList, setIsPresentInList] = useState(checkIsPresentInList());
  let isLoading = true;
  
  useEffect(() => {
    console.log(user);
    setIsPresentInList(checkIsPresentInList());
  }, [user]);

  function checkIsPresentInList() {
    return user.favoriteMovies.some(favoriteMovie => favoriteMovie.imdbID === movie.imdbID);

  }
  
    return (
      
        <Card className="film-card" >
      <Card.Img variant="top" alt="" src={movie.Poster} />
      <Card.Body className="film-card-body" >
        <Card.Title><a href={movieDetailsLink}>{movie.Title || <CustomSkeleton/>}</a></Card.Title>
        <Card.Text>
         {(movie.Type + " - " + movie.Year) || <CustomSkeleton/>}
        </Card.Text>
        <FilmCardButtons setUser={setUser} movie={movie} isPresentInList={isPresentInList} isFavoriteFilmsPage={isFavoriteFilmsPage} />
      </Card.Body>
    </Card>
    ) 
}

export default FilmCard;
