import { useRecoilValue, useSetRecoilState } from "recoil";
import { graphDataState, userState } from "../../../../atoms/UserFavoriteFilms";
import AddOrRemoveButton from "../AddOrRemoveButton";
import "./FilmCardButtons.scss";
import { Movie } from "../../../app/models/movie-model";
import { LikeOrDislikeFilm, ViewOrUnviewFilm } from "../../../app/helper/movies.helper";
import { User } from "../../../app/models/user-model";
import ViewOrUnviewButton from "../ViewOrUnviewButton";

interface IProps {
    isPresentInList: boolean,
    isFavoriteFilmsPage: boolean,
    movie: Movie,
    setUser: (value: User) => void,
    setIsLoading: (value: boolean) => void,
    
}

const FilmCardButtons: React.FC<IProps> = ({
    isFavoriteFilmsPage,
    movie,
    setUser,
    setIsLoading
    
}) => {
    const user = useRecoilValue(userState);
    const setGraphData = useSetRecoilState(graphDataState);

    const isPresentInUserList = user.favoriteMovies.some(favoriteMovie => favoriteMovie.imdbID === movie.imdbID)
    
    return (
    <div className="card-buttons">
        <AddOrRemoveButton  isPresentInList={isPresentInUserList} onClick={() => LikeOrDislikeFilm(movie,user,setUser,setIsLoading,setGraphData)} />
        {isFavoriteFilmsPage &&
          <ViewOrUnviewButton isViewed={movie.Viewed} onClick={() => ViewOrUnviewFilm(movie,user, setUser,setGraphData) }/>}
          
        </div>
    )
}

export default FilmCardButtons;
