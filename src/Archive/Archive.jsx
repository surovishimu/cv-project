import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { FaSearch, FaEye } from "react-icons/fa";

const Archive = () => {
    const [archivedPdfList, setArchivedPdfList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        // Fetch archived data from the server
        fetch('https://cv-server-iota.vercel.app/archive')
            .then(response => response.json())
            .then(data => {

                setArchivedPdfList(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch archived data:", error);
                setLoading(false);
            });
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center w-4/5 h-screen">
                <RingLoader color={'#B0272E'} loading={loading} size={150} />
            </div>
        );
    }

    const filteredArchivedPdfList = archivedPdfList.filter(cv =>
        cv.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full bg-[#C3202B] min-h-screen flex flex-col">
            <div className="flex justify-between items-center px-5 py-3">
                <h2 className="text-2xl font-bold text-white">Archived CVs</h2>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by name"
                        className="px-4 py-2 pr-10 rounded-md outline-none"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <FaSearch className="absolute right-3 top-3 text-gray-400" />
                </div>
            </div>
            <div className="overflow-x-auto px-5">
                {filteredArchivedPdfList.length === 0 ? (
                    <p className="flex justify-center items-center h-screen text-white mt-5">No archived data found</p>
                ) : (
                    <table className="w-full rounded-lg border-collapse border bg-white bg-gradient-to-br from-gray-400 to-gray-600">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2 border border-white">#</th>
                                <th className="px-4 py-2 border border-white">Name</th>
                                <th className="px-4 py-2 border border-white">CV Creator</th>
                                <th className="px-4 py-2 border border-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredArchivedPdfList.map((cv, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 border border-white text-xl font-semibold text-center">{index + 1}</td>
                                    <td className="px-4 py-2 border border-white text-xl font-semibold text-center">{cv.name}</td>
                                    <td className="px-4 py-2 border border-white text-xl font-semibold text-center">
                                        {cv.user ? cv.user.username.split(' ')[0] : ''}
                                    </td>
                                    <td className="px-4 py-2 flex justify-center gap-5 items-center border border-white">
                                        {/* View Button */}
                                        <Link to={`/archiveCensoredCv/${cv._id}`}>
                                            <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center justify-center">
                                                Censored<FaEye className="ml-1" />
                                            </button>
                                        </Link>
                                        <Link to={`/archiveCVDetails/${cv._id}`}>
                                            <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center justify-center">
                                                Uncensored<FaEye className="ml-1" />
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Archive;
