import React, { useEffect, useState } from "react";

import { Button } from "./Button";

import { api } from "../services/api";

import '../styles/sidebar.scss';

interface SideBarProps {
  selectedGenre: GenreResponseProps,
  setSelectedGenre: any,
  selectedGenreId: number,
  setSelectedGenreId: any,
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function SideBar({
  selectedGenreId, 
  setSelectedGenreId,
  selectedGenre, 
  setSelectedGenre,
  ...rest}: SideBarProps
) {
  // Complete aqui

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
 
  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
     api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            id={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
  
    </nav>
  )
}
