import React, { useState, useEffect } from 'react';


const FactorySearchBox = ({ lst, set_factory_type, baseUrl, show=true, buttonSetAbove }) => {
    const [searchTerm, setSearchTerm] = useState('');//Store the raw user input
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');//debounced input updaye with delay to reduce resource
    const [results, setResults] = useState([]);    //store the data result from search  
    const [selected, setSelected] = useState(null);//user select province
    const [loading, setLoading] = useState(false); //loading state true when loading, just that.

    //Control the delay of the search deboucing machanism
    const SEARCH_DEBOUNCE_DALAY = 200 //miliseconds

    // Update factory type on upper level
    // trigger on {selected} change
    // set_factory_type should be a state set function from the upper level
    useEffect(() => {
        set_factory_type(selected)
    }, [selected]);

    // Debounce search input
    // trigger when {searchTerm} update
    // delay the input to save resource
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedSearchTerm(searchTerm), SEARCH_DEBOUNCE_DALAY);
        return () => clearTimeout(handler);
    }, [searchTerm]);


    // Fetch search results
    // trigger on {debouncedSearchTerm} update which depends on {searchTerm}
    useEffect(() => {
        setSelected(null);
        if (!debouncedSearchTerm) {
            setResults([]);
            return;
        }

        const url = `${baseUrl}/factory_type?type=${debouncedSearchTerm}`;
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
    }, [debouncedSearchTerm]);


    if (!show) {
        return <></>
    }

    return (
        <div className=" max-w-[425px]">

            <h2 className="text-lg font-semibold mb-2">Search Factory Type</h2>


            {/* Search Input */}
            <div className="relative w-full mb-2">
                <input
                    type="text"
                    placeholder={`Search for a type...`}
                    value={selected ? selected.type : searchTerm}
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
            {!loading && debouncedSearchTerm && results.length === 0 && <p className="text-sm text-red-500">No results found.</p>}
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
                            <span>{item.type}</span>
                        </li>
                    ))}
                </ul>
            )}

            {/* Selected Item Actions */}
            {selected && (
                <div className="mt-3 p-3 bg-white text-black rounded-2xl shadow border border-gray-300 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <p className="font-medium">{selected.type} ({selected.code})</p>
                        <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-black text-xl">
                            ✕
                        </button>
                    </div>
                    <div className="flex gap-3">
                    </div>
                </div>
            )}
            {lst &&
                (<div className="mb-2 text-sm text-gray-800">
                    {lst?.map((item, index) => (
                        <div className="mt-3 p-3 bg-white text-black rounded-2xl shadow border border-gray-300 flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <p className="font-medium">{item.type} (Code: {item.code})</p>
                                <button onClick={() => lstRemoveItem(item.code)} className="text-gray-400 hover:text-black text-xl">
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

export default FactorySearchBox;

