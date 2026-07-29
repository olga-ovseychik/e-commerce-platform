import { useFavorites } from "@/features/favorites/hooks/useFavorites.ts";
import { renderHook, waitFor } from "@testing-library/react";
import { act } from "@testing-library/react";

describe('useFavorites hook', () => {
  afterEach(() => {
    localStorage.clear();
  })

  test('should initialize with empty array when localStorage has no favorites', () => {
    localStorage.setItem('favorites', JSON.stringify([]));

    const {result} = renderHook(() => useFavorites());
    expect(result.current.currentFavorites).toEqual([])
  })

  test('should initialize with existing favorites from localStorage', () => {
    localStorage.setItem('favorites', JSON.stringify([1, 2, 3]));

    const {result} = renderHook(() => useFavorites());
    expect(result.current.currentFavorites).toEqual([1, 2, 3])
  })

  test('should add id to favorites when addToFavorites is called', () => {
    localStorage.setItem('favorites', JSON.stringify([1, 2, 3]));

    const {result} = renderHook(() => useFavorites());
    act(() => result.current.addToFavorites(4))
    expect(result.current.currentFavorites).toEqual([1, 2, 3, 4])
  })

  test('should persist favorites to localStorage when addToFavorites is called', () => {
    localStorage.setItem('favorites', JSON.stringify([1, 2, 3]));

    const {result} = renderHook(() => useFavorites());
    act(() => result.current.addToFavorites(4))

    const favorites = JSON.parse(localStorage.getItem('favorites') ?? '[]');
    expect(favorites).toEqual([1, 2, 3, 4])
  })

  test('should remove id to favorites when removeFromFavorites is called', () => {
    localStorage.setItem('favorites', JSON.stringify([1, 2, 3]));

    const {result} = renderHook(() => useFavorites());
    act(() => result.current.removeFromFavorites(2))
    expect(result.current.currentFavorites).toEqual([1, 3])
  })

  test('should update localStorage when removeFromFavorites is called', () => {
    localStorage.setItem('favorites', JSON.stringify([1, 2, 3]));

    const {result} = renderHook(() => useFavorites());
    act(() => result.current.removeFromFavorites(2))

    const favorites = JSON.parse(localStorage.getItem('favorites') ?? '[]');
    expect(favorites).toEqual([1, 3])
  })

  test('should return true when id is in favorites', () => {
    localStorage.setItem('favorites', JSON.stringify([1, 2, 3]));

    const {result} = renderHook(() => useFavorites());
    const isFav = result.current.isFavorite(1)
    expect(isFav).toBe(true)
  })

  test('should return false when id is not in favorites', () => {
    localStorage.setItem('favorites', JSON.stringify([1, 2, 3]));

    const {result} = renderHook(() => useFavorites());
    const isFav = result.current.isFavorite(4)
    expect(isFav).toBe(false)
  })

  test('should update currentFavorites when storage event fires', async () => {
    localStorage.setItem('favorites', JSON.stringify([1, 2, 3]));

    const {result} = renderHook(() => useFavorites());
    globalThis.dispatchEvent(new StorageEvent('storage', { key: 'favorites' }));

    await waitFor(() => {
      expect(result.current.currentFavorites).toEqual([1, 2, 3])
    })
  })

  test('should remove storage event listener on onmount', async () => {
    localStorage.setItem('favorites', JSON.stringify([1, 2, 3]));

    const {result, unmount} = renderHook(() => useFavorites());
    unmount();
    localStorage.setItem('favorites', JSON.stringify([1, 2, 3, 4]));
    globalThis.dispatchEvent(new StorageEvent('storage', { key: 'favorites' }));

    await waitFor(() => {
      expect(result.current.currentFavorites).toEqual([1, 2, 3])
    })
  })
})