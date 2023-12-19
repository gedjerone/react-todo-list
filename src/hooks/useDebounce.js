import { useEffect, useState } from 'react'

export const useDebounce = (value, delay) => {
    const [debounce, setDebounce] = useState(null)

    useEffect(() => {
        const timer = setTimeout(() => setDebounce(value), delay)
        return () => clearTimeout(timer)
    }, [value, delay])

    return debounce
}
