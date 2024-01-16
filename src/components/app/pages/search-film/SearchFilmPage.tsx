import {ChangeEvent, useEffect, useState} from "react";
import {FilmsApiService} from "../../../../services/film.service";
import SearchButton from "../../../common/buttons/SearchButton";
import Layout from "../../../common/layout/Layout";
import './SearchFilmPage.scss';
import {Movies as MoviesModel} from "../../models/movie-model";
import PopularMoviesCarousel from "../../carousel/PopularMoviesCarousel";
import FilmsList from "../../films/films-list/FilmsList";
import CustomLoader from "../../../common/loader/CustomLoader";
import { SearchMovieError } from "../../models/movie-error-model";
import CustomSkeleton from "../../../common/skeleton/CustomSkeleton";
import CarouselErrorComponent from "../../errors/CarouselErrorComponent";

interface IProps {}

const SearchFilmPage : React.FC < IProps > = ({}) => {
    const [isLoadingPopularMovies,
        setIsLoadingPopularMovies] = useState(true);
    const [isLoadingSearchMovies,
        setIsLoadingSearchMovies] = useState(false);
    const [searchError,
        setSearchError] = useState<SearchMovieError>();
        const [popularMoviesError,
            setPopularMoviesError] = useState(false);
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
        setIsLoadingSearchMovies(true);

        let errorMessage = "Something went wrong while getting movies.";
        
        if(search === ""){
            errorMessage = "Search input is empty! Please fill in a value..."
        }
        FilmsApiService
            .searchMoviesBySearch(search)
            .then(response => {
                if (response.Response === "False") {
                    
                    if(response.Error === "Movie not found!")
                    {
                        errorMessage = "No movies found!";
                    }
                    else if(response.Error === "Too many results.")
                    {
                        errorMessage = "Too many results! Try refining your search to get more accurate results.";
                    }
                    const error = new SearchMovieError(response.Response,errorMessage);
                    setSearchError(error);
                } else {
                    setSearchError(undefined);
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
                    {!isLoadingSearchMovies && searchMovies?.Search && !searchError &&< FilmsList isFavoriteFilmsPage = {false}
                    movies = {
                        searchMovies
                            ?.Search || []
                    } />}
                    {!isLoadingSearchMovies && searchError && <p>{searchError.error}</p>}

                </div>
                 <div id="movie-list">

                    <h2>Popular Movie List</h2>
                    <p>Explore our collection of exciting movies.</p>
                    <CarouselErrorComponent isLoading={isLoadingPopularMovies} isFavoriteFilmsPage={false} error={popularMoviesError} movies={popularMovies?.Search || []}/>
                </div> 

            </main>
        </Layout>
    )
}

export default SearchFilmPage;
