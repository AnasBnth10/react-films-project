import { Movie } from "../components/app/models/movie-model";
import { User } from "../components/app/models/user-model";

export class UserService {

    public static getCurrentUserData(): User{
        
        const storedUserData = localStorage.getItem("currentUser");

        if (storedUserData) {
            const userData: User = JSON.parse(storedUserData);
            return userData;
        } else {
            const randomUserName = `AnasBnth`;
            const randomWatchTime = 0;
            const randomTotalMoviesWatched = 0;
            const randomFavoriteMovies: Movie[] = [{imdbID: "tt0076759", Title: "Star Wars: Episode IV - A New Hope",Poster:"https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_SX300.jpg",Year:"1977",Type:"Movie",Runtime:"121 min",Viewed:false,Genre:"Action, Adventure, Fantasy"}];

            const newUser = new User(
                randomUserName,
                randomWatchTime,
                randomTotalMoviesWatched,
                randomFavoriteMovies,
                []
            );

            localStorage.setItem("currentUser", JSON.stringify(newUser));

            return newUser;
        }
    }
}