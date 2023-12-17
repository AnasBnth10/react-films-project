import {useEffect, useState} from "react";
import Layout from "../../../common/layout/Layout"
import PopularMoviesCarousel from "../../carousel/PopularMoviesCarousel";
import {Movies as MoviesModel} from "../../models/movie-model";
import {FilmsApiService} from "../../../../services/film.service";
import {useRecoilValue} from "recoil";
import {userState} from "../../../../db/UserFavoriteFilms";
import {User} from "../../models/user-model";
import { initializeHomePageMovies } from "../../helper/movies.helper";

interface IProps {}

const Home : React.FC < IProps > = ({}) => {
    const [FirstRowMovies,
        setFirstRowMovies] = useState < MoviesModel > ();
    const [SecondRowMovies,
        setSecondRowMovies] = useState < MoviesModel > ();
    const [ThirdRowMovies,
        setThirdRowMovies] = useState < MoviesModel > ();
    const [error,
        setError] = useState(false);
    const [isLoading,
        setIsLoading] = useState(false);
    const user : User = useRecoilValue(userState);

    useEffect(() => {
        setIsLoading(true);

        initializeHomePageMovies(setFirstRowMovies,setSecondRowMovies,setThirdRowMovies);
        
        setIsLoading(false);

    }, []);
    return (
        <Layout>
            <h1>Home</h1>
            {!isLoading &&
            <>
            <PopularMoviesCarousel movies={FirstRowMovies?.Search || []} user={user}/>
            <PopularMoviesCarousel movies={SecondRowMovies?.Search || []} user={user}/>
            <PopularMoviesCarousel movies={ThirdRowMovies?.Search || []} user={user}/>
            </>
            }
        </Layout>
    )
}

export default Home;
