export function ListElement({
    movie,
    watchedBox = false,
    onSelectMovie = () => {},
    onDeleteWatched = null,
}) {
    return (
        <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            {!watchedBox ? (
                <div>
                    <p>
                        <span>🗓</span>
                        <span>{movie.Year}</span>
                    </p>
                </div>
            ) : (
                <div>
                    <p>
                        <span>⭐️</span>
                        <span>{movie.imdbRating}</span>
                    </p>
                    <p>
                        <span>🌟</span>
                        <span>{movie.userRating}</span>
                    </p>
                    <p>
                        <span>⏳</span>
                        <span>{movie.runtime} min</span>
                    </p>
                    <button
                        className={'btn-delete'}
                        onClick={() => onDeleteWatched(movie.imdbID)}
                    >
                        X
                    </button>
                </div>
            )}
        </li>
    )
}
