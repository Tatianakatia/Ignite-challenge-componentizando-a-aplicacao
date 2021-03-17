import { useEffect, useState } from "react";

import { MovieCard } from '../components/MovieCard';

import { api } from "../services/api";

import '../styles/content.scss';

interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}
  
export function Content() {
  // Complete aqui
  const [selectedGenreId, setSelectedGenreId] = useState(1);   

  const [movies, setMovies] = useState<MovieProps[]>([]);
  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });
  }, [selectedGenreId]);

  return (
    <div >
      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard 
              title={movie.Title} 
              poster={movie.Poster} 
              runtime={movie.Runtime} 
              rating={movie.Ratings[0].Value} 
            />
          ))}
        </div>
      </main>
    </div>
  )
}