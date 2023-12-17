import { FavoriteMovie } from "../components/app/models/movie-model";
import { User } from "../components/app/models/user-model";

export class UserService {

    public static getCurrentUserData(): User{
        
        const storedUserData = localStorage.getItem("currentUser");

        if (storedUserData) {
            const userData: User = JSON.parse(storedUserData);
            return userData;
        } else {
            const randomUserName = `AnasBnth`;
            const randomWatchTime = "0 minutes";
            const randomTotalMoviesWatched = 0;
            const randomFavoriteMovies: FavoriteMovie[] = [{id: "tt0076759"}];

            const newUser = new User(
                randomUserName,
                randomWatchTime,
                randomTotalMoviesWatched,
                randomFavoriteMovies
            );

            localStorage.setItem("currentUser", JSON.stringify(newUser));

            return newUser;
        }
    }
}