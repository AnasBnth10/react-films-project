import {ChangeEvent, useEffect, useState} from "react";
import {FilmsApiService} from "../../../../services/film.service";
import SearchButton from "../../../common/buttons/SearchButton";
import Layout from "../../../common/layout/Layout";
import './SearchFilmPage.scss';
import {Movies as MoviesModel} from "../../models/movie-model";
import PopularMoviesCarousel from "../../carousel/PopularMoviesCarousel";
import FilmsList from "../../films/films-list/FilmsList";
import {useRecoilValue} from "recoil";
import {userState} from "../../../../atoms/UserFavoriteFilms";
import {User} from "../../models/user-model";
import CustomLoader from "../../../common/loader/CustomLoader";
import { SearchMovieError } from "../../models/movie-error-model";
import CustomSkeleton from "../../../common/skeleton/CustomSkeleton";

interface IProps {}

const SearchFilmPage : React.FC < IProps > = ({}) => {
    const [isLoadingPopularMovies,
        setIsLoadingPopularMovies] = useState(true);
    const [isLoadingSearchMovies,
        setIsLoadingSearchMovies] = useState(false);
    const [error,
        setError] = useState<SearchMovieError>();
    const [popularMovies,
        setPopularMovies] = useState < MoviesModel > ();
    const [searchMovies,
        setSearchMovies] = useState < MoviesModel > ();


    const [search,
        setSearch] = useState("");

    useEffect(() => {
        setIsLoadingPopularMovies(true);

        FilmsApiService
            .searchMoviesBySearch("Star Wars")
            .then(movies => {
                console.log(movies);
                setPopularMovies(movies);
            })
            .catch((errorResponse) => {
                console.log("check");
                console.log(errorResponse);})
            . finally(() => setIsLoadingPopularMovies(false));
    }, []);

    const onChangeSearchFieldHandler = (e : ChangeEvent < HTMLInputElement >) => {
        setSearch(e.target.value);
    }

    const onClickSearchBtnHandler = (e : React.MouseEvent < HTMLButtonElement >) => {
        //setError(false);
        setIsLoadingSearchMovies(true);

        FilmsApiService
            .searchMoviesBySearch(search)
            .then(response => {
                if (response.Response === "False") {
                    let errorMessage = "No errors";
                    if(response.Error === "Movie not found!")
                    {
                        errorMessage = "No movies found!";
                    }
                    else if(response.Error === "Too many results.")
                    {
                        errorMessage = "Too many results! Try refining your search to get more accurate results.";
                    }
                    const error = new SearchMovieError(response.Response,errorMessage);
                    setError(error);
                } else {
                    setError(undefined);
                    setSearchMovies(response);
                }
            })
            .catch(() => console.log(true))
            . finally(() => setIsLoadingSearchMovies(false));
    }

    return (
        <Layout>
            <header>
                <h1>Movie Search</h1>
                <input
                    type="text"
                    id="search-bar"
                    value={search}
                    onChange={onChangeSearchFieldHandler}
                    placeholder="Search for a movie by title..."/>
                <SearchButton onClick={onClickSearchBtnHandler}/>
            </header>

            <main>

                <div className="search-section">
                    {isLoadingSearchMovies && <CustomLoader loading={isLoadingSearchMovies}/>}
                    {!isLoadingSearchMovies && searchMovies?.Search && !error &&< FilmsList isFavoriteFilmsPage = {false}
                    movies = {
                        searchMovies
                            ?.Search || []
                    } />}
                    {!isLoadingSearchMovies && error && <p>{error.error}</p>}

                </div>
                 <div id="movie-list">

                    <h2>Popular Movie List</h2>
                    <p>Explore our collection of exciting movies.</p>
                    {!isLoadingPopularMovies ?
                    <PopularMoviesCarousel
                        isFavoriteFilmsPage={false}
                        movies={popularMovies
                        ?.Search || []
                        }/> : <CustomSkeleton width={1200} height={300}  />}
                </div> 

            </main>
        </Layout>
    )
}

export default SearchFilmPage;
