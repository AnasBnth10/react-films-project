import { ChangeEvent, useEffect, useState } from "react";
import { FilmsApiService } from "../../../../services/film.service";
import SearchButton from "../../../common/buttons/SearchButton";
import Layout from "../../../common/layout/Layout";
import './SearchFilmPage.scss';
import { Movies as MoviesModel } from "../../models/movie-model";
import PopularMoviesCarousel from "../../carousel/PopularMoviesCarousel";
import FilmsList from "../../films/films-list/FilmsList";
import { useRecoilValue } from "recoil";
import { userState } from "../../../../db/UserFavoriteFilms";
import { User } from "../../models/user-model";

interface IProps {

}

const SearchFilmPage: React.FC<IProps> = ({

}) => {
    const [isLoadingPopularMovies, setIsLoadingPopularMovies] = useState(true);
    const [isLoadingSearchMovies, setIsLoadingSearchMovies] = useState(true);
    const [error, setError] = useState(false);
    const [popularMovies, setPopularMovies] = useState<MoviesModel>();
    const [searchMovies, setSearchMovies] = useState<MoviesModel>();
    const user: User= useRecoilValue(userState);

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
                {!isLoadingSearchMovies && !error &&<FilmsList isFavoriteFilmsPage={false} movies={searchMovies?.Search || []} />}
                {!isLoadingSearchMovies && error && <p>Error loading movies. Please try again.</p>}

                </div>
                {!isLoadingPopularMovies &&
                    <div id="movie-list">

                        <h2>Popular Movie List</h2>
                        <p>Explore our collection of exciting movies.</p>

                        <PopularMoviesCarousel isFavoriteFilmsPage={false}  movies={popularMovies?.Search || []} />
                    </div>
                }
            </main>
        </Layout>
    )
}

export default SearchFilmPage;
