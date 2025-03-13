import { Navigation } from './components/Navigation'
import { Main } from './components/Main'
import { SearchBar } from './components/SearchBar'
import { NumberOfResults } from './components/NumberOfResults'
import { useEffect, useState } from 'react'
import { Box } from './components/box'
import { List } from './components/list'
import { ListElement } from './components/list-element'
import { Summary } from './components/summary'
import { Loader } from './components/loader'
import { ErrorMessage } from './components/error-message'
import { MovieDetails } from './components/movieDetails'

const KEY = '5211c462'

export default function App() {
    const [query, setQuery] = useState('')
    const [movies, setMovies] = useState([])
    const [watched, setWatched] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [selectedId, setSelectedId] = useState(null)

    useEffect(() => {
        const controller = new AbortController()

        async function fetchMovies() {
            try {
                setIsLoading(true)
                setError('')

                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                    { signal: controller.signal }
                )

                if (!res.ok) throw new ErrorMessage('Something went wrong')

                const data = await res.json()

                if (data.Response === 'False')
                    throw new Error('Movie not found!')

                setMovies(data.Search)
                setError('')
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message)
                }
            } finally {
                setIsLoading(false)
            }
        }

        if (query.length < 3) {
            setMovies([])
            setError('')
            return
        }

        fetchMovies()

        return () => {
            controller.abort()
        }
    }, [query])

    function handleSelectMovie(id) {
        setSelectedId(selectedId === id ? null : id)
    }

    function handleCloseMovie() {
        setSelectedId(null)
    }

    function handleAddWatched(movie) {
        setWatched((watched) => [...watched, movie])
    }

    function handleRemoveWatched(id) {
        setWatched((watched) => watched.filter((movie) => movie.imdbID !== id))
    }

    return (
        <>
            <Navigation>
                <SearchBar query={query} setQuery={setQuery} />
                <NumberOfResults movies={movies} />
            </Navigation>
            <Main>
                <Box>
                    {isLoading && <Loader />}
                    {!isLoading && !error && (
                        <List>
                            {movies?.map((movie) => (
                                <ListElement
                                    movie={movie}
                                    onSelectMovie={handleSelectMovie}
                                />
                            ))}
                        </List>
                    )}
                    {error && <ErrorMessage message={error} />}
                </Box>
                <Box>
                    {selectedId ? (
                        <MovieDetails
                            selectedId={selectedId}
                            onClose={handleCloseMovie}
                            KEY={KEY}
                            onAddWatched={handleAddWatched}
                            watchedList={watched}
                        />
                    ) : (
                        <>
                            <Summary watched={watched} />
                            <List>
                                {watched?.map((movie) => (
                                    <ListElement
                                        movie={movie}
                                        watchedBox={true}
                                        onDeleteWatched={handleRemoveWatched}
                                    />
                                ))}
                            </List>
                        </>
                    )}
                </Box>
            </Main>
        </>
    )
}
