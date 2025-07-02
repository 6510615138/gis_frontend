import React, { useState, useEffect } from 'react';


const ProvinceSearchBox = ({ lst, setLst, coordinates, coorSet, baseUrl = 'http://localhost:8000' }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('province');//['province','district','subdistrict']
    const [results, setResults] = useState([]);//fetch data result 
    const [selected, setSelected] = useState(null);//user select province
    const [loading, setLoading] = useState(false);

    // Debounce search input
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedSearchTerm(searchTerm), 200);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    // Fetch search results
    useEffect(() => {
        setSelected(null);
        if (!debouncedSearchTerm) {
            setResults([]);
            return;
        }

        const url = `${baseUrl}/${searchType}?search=${debouncedSearchTerm}`;
        setLoading(true);
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setResults(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching:', err);
                setResults([]);
                setLoading(false);
            });
    }, [debouncedSearchTerm, searchType]);

    const lstAddItem = (object) => {
        if (lst && !lst.includes(object)) {
            setLst([...lst, object]);
        }
        };
    const lstRemoveItem = (codeToRemove) => {
        const updatedList = lst.filter(item => item.code !== codeToRemove);
        setLst(updatedList);
    };
    const isAlreadyAdded = selected && lst?.includes(selected);

    return (
        <div className=" max-w-[425px]">
 

            <h2 className="text-lg font-semibold mb-2">Search Location</h2>

            {/* Search Type Dropdown */}
            <div className="mb-3">
                <label htmlFor="type-select" className="mr-2 text-sm">Search by:</label>
                <select
                    id="type-select"
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="border rounded px-2 py-1"
                >
                    <option value="province">Province</option>
                    <option value="district">District</option>
                    <option value="subdistrict">Subdistrict</option>
                </select>
            </div>

            {/* Search Input */}
            <div className="relative w-full mb-2">
                <input
                    type="text"
                    placeholder={`Search for a ${searchType}...`}
                    value={selected ? selected.name : searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        if (selected) setSelected(null);
                    }}
                    className="w-full p-[10px] px-[20px] rounded-3xl bg-white border border-gray-400 text-black"
                />
                {searchTerm && (
                    <button
                        onClick={() => setSearchTerm('')}
                        className="absolute right-4 top-[10px] text-gray-400 hover:text-black"
                        aria-label="Clear search"
                    >
                        ✕
                    </button>
                )}
            </div>

            {/* Search Results */}
            {loading && <p className="text-sm text-gray-500">Searching...</p>}
            {!loading &&debouncedSearchTerm &&results.length===0 && <p className="text-sm text-red-500">No results found.</p>}
            {!loading && results.length > 0 && !selected && (
                <ul
                    className="max-h-[250px] mt-1 overflow-y-auto rounded-2xl bg-white border border-gray-300 transition-all"
                    onMouseLeave={() => setResults([])}
                >
                    {results.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => setSelected(item)}
                            className="flex justify-between items-center px-5 py-2 cursor-pointer hover:bg-blue-tcct hover:text-white text-black border-b border-gray-100"
                        >
                            <span>{item.name}</span>
                        </li>
                    ))}
                </ul>
            )}

            {/* Selected Item Actions */}
            {selected && (
                <div className="mt-3 p-3 bg-white text-black rounded-2xl shadow border border-gray-300 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <p className="font-medium">{selected.name} (Code: {selected.code})</p>
                        <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-black text-xl">
                            ✕
                        </button>
                    </div>
                    <div className="flex gap-3">
                        {/* Locate (placeholder only) */}
                        <div className="flex items-center gap-1 text-xs px-2 py-1 border rounded-2xl text-black hover:text-white hover:bg-blue-tcct cursor-pointer">
                            <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 3a9 9 0 0 0-9 9c0 6.27 9 13 9 13s9-6.73 9-13a9 9 0 0 0-9-9Zm0 12a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" clipRule="evenodd" />
                            </svg>
                            <span>Locate</span>
                        </div>

                        {/* Add */}
                        <div
                            onClick={() => !isAlreadyAdded && lstAddItem(selected)}
                            className={`flex items-center gap-1 text-xs px-2 py-1 rounded-2xl ${isAlreadyAdded ? 'bg-green-300 cursor-not-allowed' : 'text-black hover:bg-blue-tcct hover:text-white cursor-pointer border'}`}
                        >
                            <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                            </svg>
                            <span>{isAlreadyAdded ? 'Added' : 'Add'}</span>
                        </div>
                    </div>
                </div>
            )}
            {lst && 
            (<div className="mb-2 text-sm text-gray-800">
                {lst?.map((item, index) => (
                    <div className="mt-3 p-3 bg-white text-black rounded-2xl shadow border border-gray-300 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <p className="font-medium">{item.name} (Code: {item.code})</p>
                        <button onClick={()=>lstRemoveItem(item.code)} className="text-gray-400 hover:text-black text-xl">
                            ✕
                        </button>
                    </div>
                    <div className="flex gap-3">
                        {/* Locate (placeholder only) */}
                        <div className="flex items-center gap-1 text-xs px-2 py-1 border rounded-2xl text-black hover:text-white hover:bg-blue-tcct cursor-pointer">
                            <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 3a9 9 0 0 0-9 9c0 6.27 9 13 9 13s9-6.73 9-13a9 9 0 0 0-9-9Zm0 12a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" clipRule="evenodd" />
                            </svg>
                            <span>Locate</span>
                        </div>

                    </div>
                </div>
                ))}
            </div>
            )
            }

        </div>
    );
};

export default ProvinceSearchBox;
