import { ChangeEvent, useEffect, useState } from "react";
import { FilmsApiService } from "../../../../helper/film.service";
import SearchButton from "../../../common/buttons/SearchButton";
import Layout from "../../../common/layout/Layout";
import './SearchFilmPage.scss';
import { SearchFilter } from "../../../../enum/SearchFilter";
import { Movie, Movies as MoviesModel } from "../../models/movie-model";
import FilmsList from "../../../films/films-list/FilmsList";
import { Carousel } from "react-bootstrap";
import PopularMoviesCarousel from "../../carousel/PopularMoviesCarousel";

interface IProps {

}

const SearchFilmPage: React.FC<IProps> = ({

}) => {
    const [isLoadingPopularMovies, setIsLoadingPopularMovies] = useState(true);
    const [isLoadingSearchMovies, setIsLoadingSearchMovies] = useState(true);
    const [error, setError] = useState(false);
    const [popularMovies, setPopularMovies] = useState<MoviesModel>();
    const [searchMovies, setSearchMovies] = useState<MoviesModel>();

    const [search,setSearch] = useState("");

    useEffect(() => {
        setIsLoadingPopularMovies(true);

        FilmsApiService.searchMoviesBySearch("Star Wars").then(
            movies => {
                setPopularMovies(movies)
            }
        ).catch(() => setError(true))
            .finally(() => setIsLoadingPopularMovies(false));
    }, []);

    const onChangeSearchFieldHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const onClickSearchBtnHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsLoadingSearchMovies(true);
        console.log("check");

        FilmsApiService.searchMoviesBySearch(search).then(
            response => {
                if(response.Response === "False")
                {
                    setError(true);
                }
                else {
                    setError(false);
                setSearchMovies(response);
                console.log(response);
                }
            }
        ).catch(() => setError(true))
            .finally(() => setIsLoadingSearchMovies(false));
    }



    return (
        <Layout>
            <header>
                <h1>Movie Search</h1>
                <input type="text" id="search-bar" value={search} onChange={onChangeSearchFieldHandler} placeholder="Search for a movie by title..." />
                <SearchButton onClick={onClickSearchBtnHandler} />
            </header>

            <main>
                <div>
                {!isLoadingSearchMovies && !error &&<FilmsList movies={searchMovies?.Search || []} />}
                {!isLoadingSearchMovies && error && <p>Error loading movies. Please try again.</p>}

                </div>
                {!isLoadingPopularMovies &&
                    <div id="movie-list">

                        <h2>Popular Movie List</h2>
                        <p>Explore our collection of exciting movies.</p>

                        <PopularMoviesCarousel movies={popularMovies?.Search || []} />
                    </div>
                }
            </main>
        </Layout>
    )
}

export default SearchFilmPage;