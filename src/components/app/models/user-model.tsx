import { Genre } from "./genre-model";
import { Movie } from "./movie-model";


export class User {
    constructor(public userName: string,
        public watchTime: number,
        public totalMoviesWatched: number,
        public favoriteMovies: Movie[],
        public listOfGenres: Genre[]) {

    }
}
