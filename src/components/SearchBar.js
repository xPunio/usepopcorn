import { useRef } from 'react'
import { useKey } from '../hooks/useKey'

export function SearchBar({ query, setQuery }) {
    const inputElement = useRef(null)

    function handleEnter() {
        inputElement.current.focus()
        setQuery('')
    }

    useKey('Enter', handleEnter)

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputElement}
        />
    )
}
