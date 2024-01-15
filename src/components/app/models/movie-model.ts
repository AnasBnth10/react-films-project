import React from "react";

export class Movies {
  constructor(
    public Search: Movie[],
    public totalResults: string,
    public Response: string,
    public Error?: string | undefined
  ) {}
}

export class  Movie {
  // Constructor 1
  constructor(
    public Title: string,
    public Year: string,
    public Poster: string,
    public imdbID: string,
    public Type: string,
    public Viewed: boolean,
    public Runtime: string,
    public Rated?: string,
    public Released?: string,
    public Genre?: string,
    public Director?: string,
    public Writer?: string,
    public Actors?: string,
    public Plot?: string,
    public Language?: string,
    public Country?: string,
    public Awards?: string,
    public Ratings?: { Source: string; Value: string }[],
    public Metascore?: string,
    public imdbRating?: string,
    public imdbVotes?: string,
    public DVD?: string,
    public BoxOffice?: string,
    public Production?: string,
    public Website?: string,
    public Response?: string
  ) {}
 
}
