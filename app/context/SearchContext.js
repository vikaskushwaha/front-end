'use client';

import React, { createContext, useContext, useState } from 'react';

// Create the context
const SearchContext = createContext(undefined);

// Provider component
export function SearchProvider({ children }) {
    const [searchResults, setSearchResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const value = {
        searchResults,
        setSearchResults,
        hasSearched,
        setHasSearched
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
}


export function useSearch() {
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
}