import { Navigation } from './components/Navigation'
import { Main } from './components/Main'
import { SearchBar } from './components/SearchBar'
import { NumberOfResults } from './components/NumberOfResults'
import { useState } from 'react'
import { Box } from './components/box'
import { List } from './components/list'
import { ListElement } from './components/list-element'
import { Summary } from './components/summary'
import { Loader } from './components/loader'
import { ErrorMessage } from './components/error-message'
import { MovieDetails } from './components/movieDetails'
import { useMovies } from './hooks/useMovies'
import { useLocalStorage } from './hooks/useLocalStorage'

const KEY = process.env.REACT_APP_API_KEY

export default function App() {
    const [query, setQuery] = useState('')
    const [selectedId, setSelectedId] = useState(null)
    const { movies, isLoading, error } = useMovies(query, handleCloseMovie)
    const [watched, setWatched] = useLocalStorage([], 'watched')

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
