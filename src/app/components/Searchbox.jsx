import React, { useState, useEffect } from 'react';

const SearchBox = ({ baseUrl = 'http://localhost:8000' }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('province'); // province, district, subdistrict
    const [results, setResults] = useState([]);
    const [selected, setSelected] = useState(null);

    // Debounce search input
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 100);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    // Fetch results from backend
    useEffect(() => {
        if (debouncedSearchTerm) {
            const url = `${baseUrl}/${searchType}?search=${debouncedSearchTerm}`;
            console.log('Fetching from:', url);
            fetch(url)
                .then((res) => res.json())
                .then((data) => setResults(data))
                .catch((err) => console.error('Error fetching:', err));
        } else {
            setResults([]);
            setSelected(null);
        }
    }, [debouncedSearchTerm, searchType]);

    return (
        <div className='w-[600px] h-min absolute top-0.5 left-50  z-1800 bg-white'>
            <h2>Search Location</h2>
            <div style={{ marginBottom: 10 }}>
                <label htmlFor="type-select">Search by: </label>
                <select
                    id="type-select"
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                >
                    <option value="province">Province</option>
                    <option value="district">District</option>
                    <option value="subdistrict">Subdistrict</option>
                </select>
            </div>

            <input
                type="text"
                placeholder={`Search for a ${searchType}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
            />

            {results.length > 0 && (
                <ul style={{ border: '1px solid #ccc', marginTop: 5, padding: 0 }}>
                    {results.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => setSelected(item)}
                            style={{
                                listStyle: 'none',
                                padding: 8,
                                cursor: 'pointer',
                                backgroundColor: selected?.code === item.code ? '#f0f0f0' : '#fff',
                                borderBottom: '1px solid #eee'
                            }}

                            className='flex justify-between'
                        >
                            {item.name}
                            <div className='flex flex-row gap-3'>
                                <div className='flex flex-row text-xs align-middle'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                                        <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                                    </svg>
                                    <p>Locate</p>

                                </div>
                                <div className='flex flex-row text-xs align-middle'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                        <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                                    </svg>
                                    <p className='align-middle'>
                                        Add to focus area
                                    </p>

                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {selected && (
                <div style={{ marginTop: 20 }}>
                    <strong>Selected {searchType}:</strong>
                    <p>{selected.name} (Code: {selected.code})</p>
                </div>
            )}
        </div>
    );
};

export default SearchBox;
