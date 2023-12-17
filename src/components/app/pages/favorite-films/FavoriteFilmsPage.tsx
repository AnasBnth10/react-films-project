import { Col, Container, Row } from "react-bootstrap";
import Layout from "../../../common/layout/Layout";
import './FavoriteFilmsPage.scss';
import { useEffect, useState } from "react";
import { FilmsApiService } from "../../../../services/film.service";
import { Movies as MoviesModel } from "../../models/movie-model";
import FilmsList from "../../films/films-list/FilmsList";
import UserStatistics from "../../films/statistics/UserStatistics";
import { User } from "../../models/user-model";
import { useRecoilValue } from "recoil";
import { userState } from "../../../../db/UserFavoriteFilms";



interface IProps {

}

const FavoriteFilmsPage: React.FC<IProps> = ({

}) => {

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [movies, setMovies] = useState<MoviesModel>();
    const user: User = useRecoilValue(userState);

    useEffect(() => {
        setIsLoading(true);

        FilmsApiService.searchMoviesBySearch("Batman").then(
            movies => {
                setMovies(movies)
            }
        ).catch(() => setError(true))
        .finally(() => setIsLoading(false));
    }, []);

    


    return (
        <Layout>
            <h1>My Favorite Movies</h1>
            <p>
                Welcome to the My Favorite Movies page! Here, you can view and manage your list of favorite movies.
            </p>
            <div className="app-container">
                <section className="center-container">
                    <div style={{ padding: '20px' }}>
                        <h2>Liked Films Collection</h2>
                        <FilmsList user={user} movies={movies?.Search || []}/>
                    </div>
                </section>

                {/* Conteneur à droite (beaucoup moins large) */}
                <aside className="right-container">
                    {/* Contenu du conteneur à droite */}
                    <div style={{ padding: '20px' }}>
                        <h2>Viewing Statistics</h2>
                        <UserStatistics user={user} />
                        {/* Mettez ici le contenu de votre aside */}
                    </div>
                </aside>
            </div>
        </Layout>
    )
}

export default FavoriteFilmsPage;
