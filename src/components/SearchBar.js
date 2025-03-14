import { useRef, useEffect } from 'react'

export function SearchBar({ query, setQuery }) {
    const inputElement = useRef(null)

    useEffect(() => {
        inputElement.current.focus()
    }, [])

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
