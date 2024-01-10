import {useEffect, useState} from "react";
import Layout from "../../../common/layout/Layout"
import PopularMoviesCarousel from "../../carousel/PopularMoviesCarousel";
import {Movies as MoviesModel} from "../../models/movie-model";
import {FilmsApiService} from "../../../../services/film.service";
import {useRecoilValue} from "recoil";
import {userState} from "../../../../db/UserFavoriteFilms";
import {User} from "../../models/user-model";
import { initializeHomePageMovies } from "../../helper/movies.helper";
import Skeleton from "react-loading-skeleton";
import "./Home.scss";
import CustomSkeleton from "../../../common/skeleton/CustomSkeleton";

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
    const [isLoadingRow1,
        setIsLoadingRow1] = useState(false);
    const [isLoadingRow2,
        setIsLoadingRow2] = useState(false);
    const [isLoadingRow3,
        setIsLoadingRow3] = useState(false);
            const [isLoading,
                setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        initializeHomePageMovies(setFirstRowMovies,setSecondRowMovies,setThirdRowMovies,setIsLoadingRow1,setIsLoadingRow2,setIsLoadingRow3);
        
        setIsLoading(false);

    }, []);
    return (
        <Layout>
            <h1>Home</h1>

            <div className="home-paragraphs">
            <p className="home-paragraph">
        Explore the fascinating world of movies on our platform. Discover the latest releases,
        browse through a curated selection, and find hidden gems that match your taste.
        Our carefully crafted carousels showcase a variety of genres, ensuring there's something
        for every movie enthusiast. From heartwarming dramas to thrilling action-packed adventures,
        you're bound to discover your next favorite film here.
      </p>
      <br/>
     
      <p className="home-paragraph">
        Don't forget to interact with our content! Use the thumbs up to show your appreciation for
        movies you love, and we'll keep track of your favorites on your personalized{' '}
        <a href="/favorites">Favorites Page</a>. Keep an eye on your watchtime and explore insightful
        statistics about your viewing habits.Looking for something specific? Head over to our <a href="/search">Search Page</a> to find
        detailed information about any movie. Get a quick overview, check out the cast and crew,
        and read reviews before deciding what to watch next.
      </p>
      <br/>
      
      <p className="home-paragraph">
        Join our movie-loving community today and embark on a cinematic journey like never before!
      </p>
      <br/>
      <br/>
      </div>
      <div style={{backgroundColor:"red"}}>
        
      </div>
            {!isLoading ?
            <>
            <h2>Indiana Jones</h2>
            {!isLoadingRow1 ? <PopularMoviesCarousel isFavoriteFilmsPage={false} movies={FirstRowMovies?.Search || []} /> : <CustomSkeleton /> }
            <br/>
            <h2>Star Wars</h2>
            {!isLoadingRow2 ? <PopularMoviesCarousel isFavoriteFilmsPage={false} movies={SecondRowMovies?.Search || []} /> : <CustomSkeleton />}
            <br/>
            <h2>The Matrix</h2>
            {!isLoadingRow3 ? <PopularMoviesCarousel isFavoriteFilmsPage={false} movies={ThirdRowMovies?.Search || []} /> : <CustomSkeleton />}
            
            </> : <></>  
            }
        </Layout>
    )
}

export default Home;
