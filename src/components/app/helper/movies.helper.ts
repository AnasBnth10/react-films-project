import { FilmsApiService } from "../../../services/film.service";
import { Genre } from "../models/genre-model";
import { Movie, Movies } from "../models/movie-model";
import { User } from "../models/user-model";

const setAllLoadings = (
  setIsLoading1: (value: boolean) => void,
  setIsLoading2: (value: boolean) => void,
  setIsLoading3: (value: boolean) => void,
  value: boolean
) => {
  setIsLoading1(value);
  setIsLoading2(value);
  setIsLoading3(value);
};

export const initializeHomePageMovies = async (
  setFirstRowMovies: (value: Movies | undefined) => void,
  setSecondRowMovies: (value: Movies | undefined) => void,
  setThirdRowMovies: (value: Movies | undefined) => void,
  setIsLoading1: (value: boolean) => void,
  setIsLoading2: (value: boolean) => void,
  setIsLoading3: (value: boolean) => void
) => {
  setAllLoadings(setIsLoading1, setIsLoading2, setIsLoading3, true);

  const searchQueries = ["Star Wars", "Indiana Jones", "The Matrix"];

  const handleMoviesSet = (query: string, movies: Movies) => {
    switch (query) {
      case "Indiana Jones":
        setFirstRowMovies(movies);
        setIsLoading1(false);
        break;
      case "Star Wars":
        setSecondRowMovies(movies);
        setIsLoading2(false);
        break;
      case "The Matrix":
        setThirdRowMovies(movies);
        setIsLoading3(false);
        break;
    }
  };

  const fetchMovies = async (query: string) => {
    try {
      const movies = await FilmsApiService.searchMoviesBySearch(query);
      handleMoviesSet(query, movies);
    } catch (error) {
      console.error(`Error fetching movies for "${query}"`, error);
    }
  };

  await Promise.all(searchQueries.map(fetchMovies))
    .then(() => console.log("All searches completed successfully"))
    .catch(() => console.error("At least one search failed"))
    .finally(() => {
      console.log("All searches completed, including any errors");
      setAllLoadings(setIsLoading1, setIsLoading2, setIsLoading3, false);
    });
};

export const LikeOrDislikeFilm = async (
  movie: Movie,
  user: User,
  setUser: (value: User) => void
) => {
  const favoriteMovies = user.favoriteMovies;
  const isMovieInList = favoriteMovies.some(
    (favoriteMovie) => favoriteMovie.imdbID === movie.imdbID
  );

  let updatedUser: User;

  if (!isMovieInList) {
    try {
      const responseMovie = await FilmsApiService.searchMovieByIMDBId(
        movie.imdbID || ""
      );
      const newFavoriteMovies = [...favoriteMovies, responseMovie];

      updatedUser = {
        ...user,
        favoriteMovies: newFavoriteMovies,
      };

    } catch (error) {
      console.error("Error searching movie by IMDB ID", error);
      return;
    }
  } else {
    const newFavoriteMovies = favoriteMovies.filter(
      (favoriteMovie) => favoriteMovie.imdbID !== movie.imdbID
    );

    updatedUser = {
      ...user,
      favoriteMovies: newFavoriteMovies,
    };
    
  }

  setUser(updatedUser);
  localStorage.setItem("currentUser", JSON.stringify(updatedUser));
};

export const ViewOrUnviewFilm = (movie: Movie, user: User, setUser: (value: User) => void) => {
  const updatedUser = { ...user };
  const isMovieViewed: boolean = movie.Viewed;

  let totalWatchTime: number = user.watchTime;
  let totalMoviesWatched: number = user.totalMoviesWatched;

  let formattedRunTime = parseInt(movie.Runtime);

  let genres = movie.Genre;
  let formattedListOfGenre = genres?.split(", ");

  let _userListOfGenre: Genre[] = [...updatedUser.listOfGenres];

  if (isMovieViewed) {
    if (formattedListOfGenre) {
      formattedListOfGenre.forEach((movieGenre) => {
        let userGenre = _userListOfGenre.find(
          (userGenre) => userGenre.name === movieGenre
        );

        if (userGenre) {
          const genreWatchTime = userGenre.watchTime - formattedRunTime;
          const updatedGenre = new Genre(userGenre.name, genreWatchTime);

          if (genreWatchTime <= 0) {
            _userListOfGenre = _userListOfGenre.filter(
              (_userGenre) => _userGenre.name !== userGenre?.name
            );
          }

          _userListOfGenre = _userListOfGenre.map((genre) =>
            genre.name === userGenre?.name ? updatedGenre : genre
          );
        }
      });
    }

    totalWatchTime -= formattedRunTime;
    totalMoviesWatched--;
  } else {
    formattedListOfGenre?.forEach((movieGenre) => {
      let userGenre = _userListOfGenre.find(
        (genre) => genre.name === movieGenre
      );

      if (userGenre) {
        const genreWatchTime = userGenre.watchTime + formattedRunTime;
        const updatedGenre = new Genre(userGenre.name, genreWatchTime);

        _userListOfGenre = _userListOfGenre.map((genre) =>
          genre.name === userGenre?.name ? updatedGenre : genre
        );
      } else {
        let newGenre = new Genre(movieGenre, formattedRunTime);
        _userListOfGenre.push(newGenre);
      }
    });

    totalWatchTime += formattedRunTime;
    totalMoviesWatched++;
  }

  updatedUser.listOfGenres = _userListOfGenre;
  updatedUser.favoriteMovies = updatedUser.favoriteMovies.map((m) =>
    m.imdbID === movie.imdbID
      ? {
          ...m,
          Viewed: !movie.Viewed,
        }
      : m
  );

  updatedUser.watchTime = totalWatchTime;
  updatedUser.totalMoviesWatched = totalMoviesWatched;

  setUser(updatedUser);
  localStorage.setItem("currentUser", JSON.stringify(updatedUser));
};
