import {useRecoilValue} from "recoil";
import {userState} from "../../../../atoms/UserFavoriteFilms";
import {User} from "../../models/user-model";
import {useEffect, useState} from "react";
import Layout from "../../../common/layout/Layout";
import "./FilmDetails.scss";
import { useParams } from "react-router-dom";
import { FilmsApiService } from "../../../../services/film.service";
import { Movie } from "../../models/movie-model";
import Skeleton from "react-loading-skeleton";
import CustomSkeleton from "../../../common/skeleton/CustomSkeleton";


interface IProps {}



const FilmDetails : React.FC < IProps > = ({}) => {

    const user : User = useRecoilValue(userState);
    const [movie,setMovie] = useState<Movie>();
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState(false);
    const {id} = useParams<{id?: string}>();

    const renderDetailsInfo = (label: string,className: string, value?: string | number) => (
        <p className="box-info">
    {value ? (
      <>
        <span className={className}>{label}: </span>
        {value}
      </>
    ) : (
      <CustomSkeleton />
    )}

    
  </p>
      );

      const renderBoxInfo = (label: string, value?: string | number) => (
        value ? (
          <p className="info-box-line">
            <span className="info-box-label">{label} </span>
            {value}
          </p>
        ) : (
          <p>
            <CustomSkeleton />
          </p>
        )
      );

    useEffect(() => {
        setIsLoading(true);

        FilmsApiService.searchMovieByIMDBId(id || "").then(
            responseMovie => {
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
                            alt={movie?.Title }
                            className="movie-poster"/>
                        <div className="info-box">
                            {renderBoxInfo("Runtime: ",movie?.Runtime)}
                            {renderBoxInfo("Genre: ",movie?.Genre)}
                            {renderBoxInfo("Release: ",movie?.Released)}
                            {renderBoxInfo("IMDb: ",movie?.imdbRating)}
                            {renderBoxInfo("Box office: ",movie?.BoxOffice)}
                            
                            
                        </div>
                    </div>
                </div>
                <div className="right-container">
                    <div className="details-container">
                        <h1>{movie?.Title || <CustomSkeleton/>}</h1>
                        <p className="sub-info">
                            {movie?.Year ? (movie?.Year + "   |   " + movie?.Runtime + " | " + movie?.Genre) : <CustomSkeleton/>}
                            
                            
                        </p>
                        <p className="sub-info">{renderDetailsInfo("Directed By","film-details-label",movie?.Director)}</p>
                        <p className="sub-info">{renderDetailsInfo("Written By","film-details-label",movie?.Writer)}</p>
                        <p className="sub-info">{renderDetailsInfo("Starring","film-details-label",movie?.Actors)}</p>
                        <div className="ratings-container">
                            <p className="rating">{renderDetailsInfo("Rating","film-details-label",movie?.imdbRating)}</p>
                            <p className="votes">{renderDetailsInfo("Votes","film-details-label",movie?.imdbVotes)}</p>
                        </div>
                        <div className="plot-container">
                            <h2>Plot</h2>
                            <p className="plot">
                                {movie?.Plot || <CustomSkeleton/>}
                            </p>
                        </div>
                    </div>
                    <div className="additional-details">
                        <div>
                            <h2>Additional Information</h2>
                            <p>{renderDetailsInfo("Rated","film-details-label",movie?.Rated)}</p>
                            <p>{renderDetailsInfo("Released","film-details-label",movie?.Released)}</p>
                            <p>{renderDetailsInfo("Language","film-details-label",movie?.Language)}</p>
                            <p>{renderDetailsInfo("Country","film-details-label",movie?.Country)}</p>
                            <p>{renderDetailsInfo("Awards","film-details-label",movie?.Awards)}</p>
                            <p>{renderDetailsInfo("IMDb","film-details-label",movie?.imdbRating)}</p>
                        </div>
                    </div>
                    <div className="ratings-section">
                        <h2>Ratings</h2>
                        <p>{renderDetailsInfo("Metascore","film-details-label",movie?.Metascore)}</p>
                        <p>{renderDetailsInfo("IMDb rating","film-details-label",movie?.imdbRating)}</p>
                        <p>{movie?.imdbVotes ? <> <span className="film-details-label">{"IMDb votes: "}</span> {movie?.imdbVotes + " votes"} </>: <CustomSkeleton/>}</p>
                        {movie?.Ratings?.map((rating) =>(renderDetailsInfo(rating.Source,"film-details-label",rating.Value)))}
                        
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default FilmDetails;
