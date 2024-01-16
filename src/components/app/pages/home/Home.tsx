import {useEffect, useState} from "react";
import Layout from "../../../common/layout/Layout"
import PopularMoviesCarousel from "../../carousel/PopularMoviesCarousel";
import {Movies as MoviesModel} from "../../models/movie-model";
import {FilmsApiService} from "../../../../services/film.service";
import {useRecoilValue} from "recoil";
import {userState} from "../../../../atoms/UserFavoriteFilms";
import {User} from "../../models/user-model";
import {initializeHomePageMovies} from "../../helper/movies.helper";
import Skeleton from "react-loading-skeleton";
import "./Home.scss";
import CustomSkeleton from "../../../common/skeleton/CustomSkeleton";
import CarouselErrorComponent from "../../errors/CarouselErrorComponent";

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
        setIsLoadingRow1] = useState(true);
    const [isLoadingRow2,
        setIsLoadingRow2] = useState(true);
    const [isLoadingRow3,
        setIsLoadingRow3] = useState(true);
    const [errorRow1,
        setErrorRow1] = useState(false);
    const [errorRow2,
        setErrorRow2] = useState(false);
    const [errorRow3,
        setErrorRow3] = useState(false);

    useEffect(() => {
        initializeHomePageMovies(setFirstRowMovies, setSecondRowMovies, setThirdRowMovies, setIsLoadingRow1, setIsLoadingRow2, setIsLoadingRow3,setErrorRow1,setErrorRow2,setErrorRow3);
    }, []);
    return (
        <Layout>
            <h1>Home</h1>

            <div className="home-paragraphs">
                <p className="home-paragraph">
                    Explore the fascinating world of movies on our platform. Discover the latest
                    releases, browse through a curated selection, and find hidden gems that match
                    your taste. Our carefully crafted carousels showcase a variety of genres,
                    ensuring there's something for every movie enthusiast. From heartwarming dramas
                    to thrilling action-packed adventures, you're bound to discover your next
                    favorite film here.
                </p>
                <br/>

                <p className="home-paragraph">
                    Don't forget to interact with our content! Use the thumbs up to show your
                    appreciation for movies you love, and we'll keep track of your favorites on your
                    personalized{' '}
                    <a href="/favorite-films">Favorites Page</a>. Keep an eye on your watchtime and
                    explore insightful statistics about your viewing habits.Looking for something
                    specific? Head over to our
                    <a href="/search">Search Page</a>
                    to find detailed information about any movie. Get a quick overview, check out
                    the cast and crew, and read reviews before deciding what to watch next.
                </p>
                <br/>

                <p className="home-paragraph">
                    Join our movie-loving community today and embark on a cinematic journey like
                    never before!
                </p>
                <br/>
                <br/>
            </div>
            <div style={{
                backgroundColor: "red"
            }}></div>

            <> <h2>Indiana Jones</h2>
            <CarouselErrorComponent
                isLoading={isLoadingRow1}
                isFavoriteFilmsPage={false}
                error={errorRow1}
                movies={FirstRowMovies
                ?.Search || []}/> 
            <br/>
            <h2>Star Wars</h2>
            <CarouselErrorComponent
                isLoading={isLoadingRow2}
                isFavoriteFilmsPage={false}
                error={errorRow2}
                movies={SecondRowMovies
                ?.Search || []}/> 
            <br/>
            <h2>The Matrix</h2>
            <CarouselErrorComponent
                isLoading={isLoadingRow3}
                isFavoriteFilmsPage={false}
                error={errorRow3}
                movies={ThirdRowMovies
                ?.Search || []}/> 

        </>
        :
    <></>

</Layout>
    )
}

export default Home;
