import { useRecoilValue, useSetRecoilState } from "recoil";
import { graphDataState, userState } from "../../../../db/UserFavoriteFilms";
import AddOrRemoveButton from "../AddOrRemoveButton";
import ViewButton from "../ViewButton";
import "./FilmCardButtons.scss";
import { Movie } from "../../../app/models/movie-model";
import { LikeOrDislikeFilm, ViewOrUnviewFilm } from "../../../app/helper/movies.helper";
import { User } from "../../../app/models/user-model";
import ViewOrUnviewButton from "../ViewOrUnviewButton";

interface IProps {
    isPresentInList: boolean,
    isFavoriteFilmsPage: boolean,
    movie: Movie,
    setUser: (value: User) => void
    
}

const FilmCardButtons: React.FC<IProps> = ({
    isFavoriteFilmsPage,
    movie,
    setUser
    
}) => {
    const user = useRecoilValue(userState);
    const setGraphData = useSetRecoilState(graphDataState);

    const isPresentInUserList = user.favoriteMovies.some(favoriteMovie => favoriteMovie.imdbID === movie.imdbID)
    
    return (
    <div className="card-buttons">
        <AddOrRemoveButton  isPresentInList={isPresentInUserList} onClick={() => LikeOrDislikeFilm(movie,user,setUser)} />
        {isFavoriteFilmsPage &&
          <ViewOrUnviewButton isViewed={movie.Viewed} onClick={() => ViewOrUnviewFilm(movie,user, setUser,setGraphData) }/>}
          
        </div>
    )
}

export default FilmCardButtons;
