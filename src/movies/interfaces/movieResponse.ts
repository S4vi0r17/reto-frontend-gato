export interface MovieResponse {
    dates:         Dates;
    page:          number;
    results:       Movie[];
    total_pages:   number;
    total_results: number;
}

export interface Dates {
    maximum: Date;
    minimum: Date;
}

export interface Movie {
    adult:             boolean;
    backdrop_path:     null | string;
    genre_ids:         number[];
    id:                number;
    original_language: string;
    original_title:    string;
    overview:          string;
    popularity:        number;
    poster_path:       string;
    release_date:      Date;
    title:             string;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;
}

export interface GenreResponse {
    genres: Genre[];
}

export interface Genre {
    id:   number;
    name: string;
}
