import { useEffect, useState } from "react";

export const useFavorites = () => {
  const [currentFavorites, setCurrentFavorites] = useState<number[]>(() => JSON.parse(localStorage.getItem('favorites') ?? '[]'))

  useEffect(() => {
    const handler = () => {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
      setCurrentFavorites(favorites)
    }

    globalThis.addEventListener('storage', handler)

    return () => {
      globalThis.removeEventListener('storage', handler);
    }
  }, []);

  const addToFavorites= (id: number)=> {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')

    favorites.push(id)
    localStorage.setItem('favorites', JSON.stringify(favorites))

    setCurrentFavorites(favorites)
  }

  const removeFromFavorites = (id: number) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') ?? '[]')

    const updatedFavorites = favorites.filter((element: number) => element !== id)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))

    setCurrentFavorites(updatedFavorites)
  }

  const isFavorite = (id: number) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') ?? '[]')

    return favorites.includes(id)
  }

  return {
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    currentFavorites,
  }
}