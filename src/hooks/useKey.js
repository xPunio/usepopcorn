import { useEffect } from 'react'

export function useKey(key, callback) {
    useEffect(() => {
        function handleEscapeClose(e) {
            if (e.code.toLowerCase() === key.toLowerCase()) {
                callback()
            }
        }
        document.addEventListener('keydown', handleEscapeClose)
        return () => {
            document.removeEventListener('keydown', handleEscapeClose)
        }
    }, [callback, key])
}
