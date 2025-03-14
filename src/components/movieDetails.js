import { useEffect, useState, useRef } from 'react'
import { Rating } from './rating'
import { Loader } from './loader'
import { useKey } from '../hooks/useKey'
export function MovieDetails({
    selectedId,
    onClose,
    KEY,
    onAddWatched,
    watchedList,
}) {
    const [movie, setMovie] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [userRating, setUserRating] = useState('')

    const countRef = useRef(0)

    useEffect(() => {
        if (userRating) countRef.current++
    }, [userRating])

    const isInWatchedList = !watchedList.some(
        (watchedMovie) => watchedMovie.imdbID === movie.imdbID
    )
    const watchedMovieRating = watchedList.find(
        (watchedMovie) => watchedMovie.imdbID === selectedId
    )?.userRating

    useEffect(() => {
        async function getMovieDetails() {
            try {
                setIsLoading(true)
                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
                )

                const data = await res.json()
                setMovie(data)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        getMovieDetails()
    }, [selectedId, KEY])

    useKey('Escape', onClose)

    function handleAdd() {
        const newWatchedMovie = {
            ...movie,
            imdbRating: Number(movie.imdbRating),
            runtime: Number(movie.Runtime.split(' ').at(0)),
            userRating,
            countRatingDecisions: countRef.current,
        }
        onAddWatched(newWatchedMovie)
        onClose()
    }

    useEffect(() => {
        if (!movie.Title) return
        document.title = `Movie | ${movie.Title}`

        return () => {
            document.title = 'usePopcorn'
        }
    }, [movie])

    return (
        <div className="details">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <header>
                        <button className="btn-back" onClick={onClose}>
                            &larr;
                        </button>
                        <img src={movie.Poster} alt="Poster" />
                        <div className="details-overview">
                            <h2>{movie.Title}</h2>
                            <p>
                                {movie.Released} &bull; {movie.Runtime}
                            </p>
                            <p>{movie.Genre}</p>
                            <p>
                                <span>⭐</span>
                                {movie.imdbRating} IMDb Rating
                            </p>
                        </div>
                    </header>
                    <section>
                        <div className={'rating'}>
                            {isInWatchedList ? (
                                <>
                                    <Rating
                                        maxRating={10}
                                        size={24}
                                        onSetRating={setUserRating}
                                    />
                                    {userRating > 0 && (
                                        <button
                                            className={'btn-add'}
                                            onClick={handleAdd}
                                        >
                                            Add to list
                                        </button>
                                    )}
                                </>
                            ) : (
                                <p>
                                    You rated this movie {watchedMovieRating}⭐
                                </p>
                            )}
                        </div>
                        <p>
                            <em>{movie.Plot}</em>
                            <p>Starring {movie.Actors}</p>
                            <p>Directed by {movie.Director}</p>
                        </p>
                    </section>
                </>
            )}
        </div>
    )
}
