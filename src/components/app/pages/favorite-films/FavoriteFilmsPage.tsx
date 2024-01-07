import {Col, Container, Row} from "react-bootstrap";
import Layout from "../../../common/layout/Layout";
import './FavoriteFilmsPage.scss';
import {useEffect, useState} from "react";
import {FilmsApiService} from "../../../../services/film.service";
import {Movies as MoviesModel} from "../../models/movie-model";
import FilmsList from "../../films/films-list/FilmsList";
import UserStatistics from "../../films/statistics/UserStatistics";
import {User} from "../../models/user-model";
import {useRecoilValue} from "recoil";
import {userState} from "../../../../db/UserFavoriteFilms";

interface IProps {}

const FavoriteFilmsPage : React.FC < IProps > = ({}) => {

    const [isLoading,
        setIsLoading] = useState(true);
    const [error,
        setError] = useState(false);
    const [movies,
        setMovies] = useState < MoviesModel > ();
    const [data,
        setData] = useState({});
    const user : User = useRecoilValue(userState);

    useEffect(() => {
        setIsLoading(true);

        const doughnutChartColors: string[] = [
            "#4CAF50", // Green
            "#2196F3", // Blue
            "#FFC107", // Yellow
            "#E91E63", // Pink
            "#673AB7", // Purple
            "#FF5722", // Deep Orange
            "#9C27B0", // Deep Purple
            "#FF9800", // Orange
            "#00BCD4", // Cyan
            "#795548"  // Brown
          ];
          

        let _labels : string[] = [];
        let _data : number[] = [];
        user
            .listOfGenres
            .forEach(genre => {
                _labels.push(genre.name);
                _data.push(genre.watchTime);
            })

        setData({
            labels: _labels,
            datasets: [
                {
                    label: 'Watchtime',
                    data: _data,
                    backgroundColor: doughnutChartColors.slice(0,_labels.length),
                    hoverOffset: 4
                }
            ]
        })

        setIsLoading(false);

    }, []);

    return (
        <Layout>
            <h1>My Favorite Movies</h1>
            <p>
                Welcome to the My Favorite Movies page! Here, you can view and manage your list
                of favorite movies.
            </p>
            <div className="app-container">
                <section className="center-container">
                    <div style={{
                        padding: '20px'
                    }}>
                        <h2>Liked Films Collection</h2>
                        <FilmsList isFavoriteFilmsPage={true} movies={user.favoriteMovies || []}/>
                    </div>
                </section>

                {/* Conteneur à droite (beaucoup moins large) */}
                <aside className="right-container">
                    {/* Contenu du conteneur à droite */}
                    <div style={{
                        padding: '20px'
                    }}>
                        <h2>Viewing Statistics</h2>
                        {!isLoading && <UserStatistics data={data} user={user}/>}
                        {/* Mettez ici le contenu de votre aside */}
                    </div>
                </aside>
            </div>
        </Layout>
    )
}

export default FavoriteFilmsPage;
