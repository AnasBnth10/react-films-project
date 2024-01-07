import {useRecoilValue} from "recoil";
import {userState} from "../../../../db/UserFavoriteFilms";
import {User} from "../../models/user-model";
import {useEffect, useState} from "react";
import Layout from "../../../common/layout/Layout";
import "./FilmDetails.scss";
import { useParams } from "react-router-dom";
import { FilmsApiService } from "../../../../services/film.service";
import { Movie } from "../../models/movie-model";

interface IProps {}



const FilmDetails : React.FC < IProps > = ({}) => {

    const user : User = useRecoilValue(userState);
    const [movie,setMovie] = useState<Movie>();
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState(false);
    const {id} = useParams<{id?: string}>();

    useEffect(() => {
        setIsLoading(true);

        console.log(id);

        FilmsApiService.searchMovieByIMDBId(id || "").then(
            responseMovie => {
                console.log(responseMovie);
                setMovie(responseMovie);
            }
        ).catch(() => setError(true))
            .finally(() => setIsLoading(false));
    }, []);
    return (
        <Layout>
            <div className="movie-details-container">
                <div className="left-container">
                    <div className="poster-container">
                        <img
                            src={movie?.Poster}
                            alt={movie?.Title}
                            className="movie-poster"/>
                        <div className="info-box">
                            <p className="box-info"><span className="info-box-label">Runtime: </span> {movie?.Runtime}</p>
                            <p className="box-info"><span className="info-box-label">Genre: </span> {movie?.Genre}</p>
                            <p className="box-info"><span className="info-box-label">Release: </span> {movie?.Released}</p>
                            <p className="box-info"><span className="info-box-label">IMDb: </span> {movie?.imdbRating}</p>
                            
                        </div>
                    </div>
                </div>
                <div className="right-container">
                    <div className="details-container">
                        <h1>{movie?.Title}</h1>
                        <p className="sub-info">
                            2022 | 2h 30min | Action, Drama
                        </p>
                        <p className="sub-info">Directed by {movie?.Director}</p>
                        <p className="sub-info">Written by {movie?.Writer}</p>
                        <p className="sub-info"><span className="film-details-label">Starring: </span> {movie?.Actors}</p>
                        <div className="ratings-container">
                            <p className="rating"><span className="film-details-label">IMDb: </span> {movie?.imdbRating}</p>
                            <p className="votes">{movie?.imdbVotes} votes</p>
                        </div>
                        <div className="plot-container">
                            <h2>Plot</h2>
                            <p className="plot">
                                {movie?.Plot}
                            </p>
                        </div>
                    </div>
                    <div className="additional-details">
                        <div>
                            <h2>Additional Information</h2>
                            <p><span className="film-details-label">Rated: </span> {movie?.Rated}</p>
                            <p><span className="film-details-label">Released: </span> {movie?.Released}</p>
                            <p><span className="film-details-label">Language: </span>{movie?.Language}</p>
                            <p><span className="film-details-label">Country: </span> {movie?.Country}</p>
                            <p><span className="film-details-label">Awards: </span> {movie?.Awards}</p>
                            <p><span className="film-details-label">Metascore: </span> {movie?.Metascore}</p>
                        </div>
                    </div>
                    <div className="ratings-section">
                        <h2>Ratings</h2>
                        <p className="rating">Rotten Tomatoes: 90%</p>
                        <p className="rating">Metacritic: 85</p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default FilmDetails;
