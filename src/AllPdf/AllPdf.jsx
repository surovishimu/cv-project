import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaSearch, FaTrash } from "react-icons/fa";
import swal from "sweetalert";
import { RingLoader } from "react-spinners";
import useAuth from "../hooks/useAuth";


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
                setPdfList(data);
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
    // Function to handle delete action

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
                // Step 1: Find the CV to be moved from the main list
                const cvToDelete = pdfList.find(pdf => pdf._id === id);

                // Step 2: Move the CV to the archive
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

                // Step 3: If archiving is successful, delete the CV from the userInfo database
                const deleteResponse = await fetch(`https://cv-server-iota.vercel.app/userInfo/${id}`, {
                    method: 'DELETE',
                });

                if (!deleteResponse.ok) {
                    throw new Error("Failed to delete CV from database.");
                }

                // Step 4: Update the UI by removing the CV from the main list
                const remainingPdf = pdfList.filter((pdf) => pdf._id !== id);
                setPdfList(remainingPdf);

                // Optionally inform the user that the CV has been moved to the archive
                swal("Success!", "CV has been moved to the archive.", "success");
            }
        } catch (error) {
            console.error("Error handling CV:", error);
            swal("Error!", "Failed to move CV to archive. Please try again later.", "error");
        }
    };



    // Filter CVs based on search term and reverse the order
    const filteredPdfInfo = pdfList
        .filter(cv =>
            cv.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .reverse();

    return (
        <div className="w-4/5 bg-[#C3202B] min-h-screen">
            <div className="flex justify-between items-center ">
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
            <div className="overflow-x-auto px-5">
                {filteredPdfInfo.length === 0 ? (
                    <p className="flex justify-center items-center h-screen text-white mt-5">No data found</p>
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
                            {filteredPdfInfo.map((cv, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 border border-white text-xl font-semibold text-center">{index + 1}</td>
                                    <td className="px-4 py-2 border border-white text-xl font-semibold text-center">{cv.name}</td>
                                    <td className="px-4 py-2 border border-white text-xl font-semibold text-center">
                                        {cv.user ? cv.user.username.split(' ')[0] : ''}
                                    </td>

                                    <td className="px-4 py-2 flex justify-center gap-5 items-center border border-white">
                                        {/* censor View Button */}
                                        <Link to={`/censoredCv/${cv._id}`}>
                                            <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center justify-center">
                                                Censored <FaEye className="ml-1" />
                                            </button>
                                        </Link>
                                        <Link to={`/pdfDetails/${cv._id}`}>
                                            <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center justify-center">
                                                Uncensored <FaEye className="ml-1" />
                                            </button>
                                        </Link>
                                        {/* Delete Button */}
                                        {user && user.email === 'fabio.admin@email.com' && (
                                            <button onClick={() => handleDelete(cv._id)} className="px-4 py-2 bg-red-500 hover:bg-[#C3202B] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center justify-center">
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
