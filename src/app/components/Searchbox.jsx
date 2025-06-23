import React, { useState, useEffect } from 'react';

const SearchBox = ({ url }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [result, setResults] = useState('');
    //debounce the search term
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 200); //delay

        //clear the timeout
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]); // Re-run effect only when searchTerm changes
    useEffect(() => {
        if (debouncedSearchTerm) {
            // API call here
            console.log('Performing search for:', debouncedSearchTerm);
            fetch(`http://localhost:8000/province/?search=${debouncedSearchTerm}`)
                .then((res) => {
                    if (!res.ok) throw new Error('Network response was not ok');
                    return res.json();
                })
                .then((data) => {
                    setResults(data);
                })
                .catch((err) => {
                    console.error('Error fetching data:', err);
                });

        } else {
            // Handle empty search term, e.g., clear results
            console.log('Search term cleared.');
        }
    }, [debouncedSearchTerm]); // Re-run effect only when debouncedSearchTerm changes

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleInputChange}
            />
            <p>Current search term: {searchTerm}</p>
            <p>Debounced search term: {debouncedSearchTerm}</p>
            <p>result : {JSON.stringify(result, null, 1)}</p>
        </div>
    );
};

export default SearchBox;


