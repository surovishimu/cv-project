import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { FaEye, FaSearch, FaTrash } from "react-icons/fa";
import swal from "sweetalert";

const AllPdf = () => {
    const [pdfList, setPdfList] = useState(useLoaderData());
    const [searchTerm, setSearchTerm] = useState("");

    // Function to handle delete action
    const handleDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "You are about to delete this CV.",
            icon: "warning",
            buttons: ["Cancel", "Delete"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`http://localhost:5000/userInfo/${id}`, {
                        method: 'DELETE',
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            console.log(data);
                            // Filter out the deleted item from the list
                            const remainingPdf = pdfList.filter((pdf) => pdf._id !== id);
                            setPdfList(remainingPdf);
                        })
                        .catch((error) => {
                            console.error("Error deleting CV:", error);
                            // Display error message if deletion fails
                            swal("Error!", "Failed to delete CV. Please try again later.", "error");
                        });
                } else {
                    // User clicked Cancel, do nothing
                    return;
                }
            });
    };

    // Filter CVs based on search term and reverse the order
    const filteredPdfInfo = pdfList
        .filter(cv =>
            cv.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .reverse();

    return (
        <div className="w-4/5 bg-customRed min-h-screen">
            <div className="flex justify-between items-center ">
                <h2 className="text-2xl mb-4 ml-5 font-bold text-white">Browse CV Collection</h2>
                <div className="flex items-center mb-4 ml-2 mt-2">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by name"
                            className="px-4 py-2 pl-10 pr-4 rounded-md outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto px-5">
                {filteredPdfInfo.length === 0 ? (
                    <p className="flex justify-center items-center h-screen text-white mt-5">No data found</p>
                ) : (
                    <table className="w-full rounded-lg border-collapse border bg-white bg-gradient-to-br from-gray-400 to-gray-600">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2 border border-white">#</th>
                                <th className="px-4 py-2 border border-white">Name</th>
                                <th className="px-4 py-2 border border-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPdfInfo.map((cv, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 border border-white text-xl font-semibold text-center">{index + 1}</td>
                                    <td className="px-4 py-2 border border-white text-xl font-semibold text-center">{cv.name}</td>
                                    <td className="px-4 py-2 flex justify-center gap-5 items-center border border-white">
                                        {/* Sensor View Button */}
                                        <Link to={`/pdfDetails/${cv._id}`}>
                                            <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center justify-center">
                                                Censored <FaEye className="ml-1" />
                                            </button>
                                        </Link>
                                        <Link to={`/uncensoredpdfDetails/${cv._id}`}>
                                            <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center justify-center">
                                                Uncensored <FaEye className="ml-1" />
                                            </button>
                                        </Link>
                                        {/* Delete Button */}
                                        <button onClick={() => handleDelete(cv._id)} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center justify-center">
                                            <FaTrash className="mr-1" />
                                            Delete
                                        </button>
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

export default AllPdf;
