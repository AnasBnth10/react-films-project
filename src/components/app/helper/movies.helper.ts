import { FilmsApiService } from "../../../services/film.service";
import { Movie, Movies } from "../models/movie-model";

export const initializeHomePageMovies = async (setFirstRowMovies: (value: Movies | undefined) => void,setSecondRowMovies: (value: Movies | undefined) => void,setThirdRowMovies: (value: Movies | undefined) => void) => {
    const searchQueries = ["Star Wars", "Indiana Jones", "The Matrix"];

    const promises = searchQueries.map(query => FilmsApiService.searchMoviesBySearch(query).then(movies => {
        switch (query) {
            case "Indiana Jones":
                setFirstRowMovies(movies);
                break;
            case "Star Wars":
                setSecondRowMovies(movies);
                break;
            case "The Matrix":
                setThirdRowMovies(movies);
                break;
        }
    }).catch(() => {
        console.error(`Error fetching movies for "${query}"`);
    }));

    Promise
        .all(promises)
        .then(() => {
            console.log("All searches completed successfully");
        })
        .catch(() => {
            console.error("At least one search failed");
        })
        . finally(() => {
            console.log("All searches completed, including any errors");
        });
}