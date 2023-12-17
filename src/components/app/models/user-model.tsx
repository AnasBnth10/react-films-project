import { FavoriteMovie } from "./movie-model";


export class User {
    constructor(public userName: string,
        public watchTime: string,
        public totalMoviesWatched: number,
        public favoriteMovies: FavoriteMovie[]) {

    }
}
