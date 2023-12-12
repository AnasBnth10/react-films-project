import { SearchFilter } from "../enum/SearchFilter";
import { Movie, Movies } from "../../src/components/app/models/movie-model";

export class FilmsApiService {

    private static api= process.env.REACT_APP_API;
    private static apiKey= process.env.REACT_APP_API_KEY;


public static async searchMoviesBySearch(searchString: string): Promise<Movies>{
    

    const url = `${this.api}?s=${searchString}&type=movie&apikey=${this.apiKey}`;

    const response = await fetch(url);
    if (response.ok) {
        return response.json();
    }
    console.log("error");
    throw new Error('Something went wrong while getting movies');
}

public static async searchMovieByTitle(title: string): Promise<Movies>{
    const api= process.env.REACT_APP_API;
    const apiKey= process.env.REACT_APP_API_KEY;

    const url = `${this.api}?t=${title}&type=movie&apikey=${this.apiKey}`;

    const response = await fetch(url);
    if (response.ok) {
        return response.json();
    }
    console.log("error");
    throw new Error('Something went wrong while getting movies');
}

}


