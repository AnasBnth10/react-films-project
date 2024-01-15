import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import './FilmCard.scss';
import AddOrRemoveButton from "../../common/buttons/AddOrRemoveButton";
import FilmCardButtons from "../../common/buttons/button-group/FilmCardButtons";
import { LikeOrDislikeFilm } from "../helper/movies.helper";
import { Movie } from "../models/movie-model";
import { useRecoilState } from "recoil";
import { userState } from "../../../atoms/UserFavoriteFilms";
import Skeleton from "react-loading-skeleton";
import CustomSkeleton from "../../common/skeleton/CustomSkeleton";

interface IProps {
    movie: Movie;
    isFavoriteFilmsPage: boolean;
}

const FilmCard: React.FC<IProps> = ({ movie, isFavoriteFilmsPage }) => {

    const [user, setUser] = useRecoilState(userState);
    const movieDetailsLink = "/film/" + movie.imdbID;
    const [isPresentInList, setIsPresentInList] = useState(checkIsPresentInList());
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsPresentInList(checkIsPresentInList());
    }, [user]);

    function checkIsPresentInList() {
        return user.favoriteMovies.some(favoriteMovie => favoriteMovie.imdbID === movie.imdbID);
    }

    return (
        !isLoading ? (
            <Card className="film-card">
                <Card.Img variant="top" alt="" src={movie.Poster} />
                <Card.Body className="film-card-body">
                    <Card.Title>
                        <a href={movieDetailsLink}>{movie.Title || <CustomSkeleton />}</a>
                    </Card.Title>
                    <div>
                        <Card.Text>
                            {("Released in " + movie.Year) || <CustomSkeleton />}
                        </Card.Text>
                        <FilmCardButtons
                            setIsLoading={setIsLoading}
                            setUser={setUser}
                            movie={movie}
                            isPresentInList={isPresentInList}
                            isFavoriteFilmsPage={isFavoriteFilmsPage}
                        />
                    </div>
                </Card.Body>
            </Card>
        ) : <CustomSkeleton width={250} height={380}/>
    );
};

export default FilmCard;
