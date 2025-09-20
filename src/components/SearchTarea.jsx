import React, { useState, useEffect } from 'react'

export default function SearchTarea({ onSearch }) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(query)
    }, 500    )

    return () => clearTimeout(timeout)
  }, [query, onSearch])

  return (
    <input
      className='w-full p-2 border border-black bg-white rounded-xl shadow transition-all focus:outline-none focus:ring-2 focus:ring-blue-500'
      type="text"
      placeholder="Buscar titulo, descripción o estado..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}
