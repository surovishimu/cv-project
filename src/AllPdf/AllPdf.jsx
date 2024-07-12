import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaSearch, FaTrash } from "react-icons/fa";
import swal from "sweetalert";
import { RingLoader } from "react-spinners";
import useAuth from "../hooks/useAuth";

// Utility function to get date from ObjectId
const getDateFromObjectId = (objectId) => {
    const timestamp = new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
    const day = timestamp.getDate().toString().padStart(2, '0');
    const month = (timestamp.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
    const year = timestamp.getFullYear();
    return `${day}-${month}-${year}`;
};

const AllPdf = () => {
    const [pdfList, setPdfList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        // Fetch data from the given URL
        fetch('https://cv-server-iota.vercel.app/userInfo')
            .then((response) => response.json())
            .then((data) => {
                // Sort data by creation date in descending order
                data.sort((a, b) => {
                    const dateA = new Date(parseInt(a._id.substring(0, 8), 16) * 1000);
                    const dateB = new Date(parseInt(b._id.substring(0, 8), 16) * 1000);
                    return dateB - dateA;
                });

                // Assign index starting from 1 based on sorted order
                const pdfListWithIndex = data.map((pdf, index) => ({ ...pdf, index: index + 1 }));
                setPdfList(pdfListWithIndex);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Failed to fetch data:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center w-4/5 h-screen">
                <RingLoader color={'#B0272E'} loading={loading} size={150} />
            </div>
        );
    }

    const handleDelete = async (id) => {
        try {
            const willMove = await swal({
                title: "Are you sure?",
                text: "You are about to move this CV to the archive.",
                icon: "warning",
                buttons: ["Cancel", "Move to Archive"],
                dangerMode: true,
            });

            if (willMove) {
                const cvToDelete = pdfList.find(pdf => pdf._id === id);

                const archiveResponse = await fetch(`https://cv-server-iota.vercel.app/archive`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(cvToDelete),
                });

                if (!archiveResponse.ok) {
                    throw new Error("Failed to move CV to archive.");
                }

                const deleteResponse = await fetch(`https://cv-server-iota.vercel.app/userInfo/${id}`, {
                    method: 'DELETE',
                });

                if (!deleteResponse.ok) {
                    throw new Error("Failed to delete CV from database.");
                }

                const remainingPdf = pdfList.filter((pdf) => pdf._id !== id);
                setPdfList(remainingPdf.map((pdf, index) => ({ ...pdf, index: index + 1 })));

                swal("Success!", "CV has been moved to the archive.", "success");
            }
        } catch (error) {
            console.error("Error handling CV:", error);
            swal("Error!", "Failed to move CV to archive. Please try again later.", "error");
        }
    };

    const filteredPdfInfo = pdfList
        .filter(cv => cv.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="w-4/5 bg-[#C3202B] min-h-screen">
            <div className="sticky top-0 bg-[#C3202B] z-50">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl mb-4 ml-5 font-bold text-white">Browse CV Collection</h2>
                    <div className="flex items-center mb-4 ml-2 mt-2">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by name"
                                className="px-4 py-2 pl-10 pr-4 mr-2 rounded-md outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto px-5 mt-8">
                {filteredPdfInfo.length === 0 ? (
                    <p className="flex justify-center items-center h-screen text-white mt-5">No data found</p>
                ) : (
                    <table className="w-full rounded-lg border-collapse border bg-white bg-gradient-to-br from-gray-400 to-gray-600 text-sm">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2 border border-white">#</th>
                                <th className="px-4 py-2 border border-white">Name</th>
                                <th className="px-4 py-2 border border-white">CV Creator</th>
                                <th className="px-4 py-2 border border-white">Creation Date</th>
                                <th className="px-4 py-2 border border-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPdfInfo.map((cv, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 border border-white text-center font-bold">{cv.index}</td>
                                    <td className="px-4 py-2 border border-white text-center font-bold">{cv.name}</td>
                                    <td className="px-4 py-2 border border-white text-center font-bold">
                                        {cv.user ? cv.user.username.split(' ')[0] : ''}
                                    </td>
                                    <td className="px-4 py-2 border border-white text-center font-bold">
                                        {getDateFromObjectId(cv._id)}
                                    </td>
                                    <td className="px-4 py-2 flex justify-center gap-5 items-center border border-white">
                                        <Link to={`/censoredCv/${cv._id}`}>
                                            <button className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center justify-center text-xs">
                                                Censored <FaEye className="ml-1" />
                                            </button>
                                        </Link>
                                        <Link to={`/pdfDetails/${cv._id}`}>
                                            <button className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center justify-center text-xs">
                                                Uncensored <FaEye className="ml-1" />
                                            </button>
                                        </Link>
                                        {user && user.email === 'fabio.admin@email.com' && (
                                            <button onClick={() => handleDelete(cv._id)} className="px-3 py-1 bg-red-500 hover:bg-[#C3202B] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center justify-center text-xs">
                                                <FaTrash className="mr-1" />
                                                Delete
                                            </button>
                                        )}
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
