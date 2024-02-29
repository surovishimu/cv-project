import { useState, useEffect } from 'react';
import { HiPhone } from "react-icons/hi";
import { FaLinkedin } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { IoIosMail } from "react-icons/io";
import blankImg from '../Image/blankProfile.png'
import { ClipLoader, RingLoader } from 'react-spinners';

const PdfDownload = () => {
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://cv-server-iota.vercel.app/userInfo')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.length > 0) {
                    setFormData(data[data.length - 1]);
                }
                setLoading(false); // Set loading to false when data is fetched
            })
            .catch(error => {
                console.error('There was a problem fetching the data:', error);
                setLoading(false); // Set loading to false on error
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <RingLoader color={'#B0272E'} loading={loading} size={150} />
            </div>
        );
    }
    function formatDate(dateString) {
        const date = new Date(dateString);
        const month = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
        const formattedDate = `${month}/${date.getFullYear()}`;
        return formattedDate;
    }


    const { name, jobtitle, experiences, education, qualifications, imageUrl, profileDescription, location, phoneNumber, emailAddress, linkedinProfile, skillsData, languagesData, achievementsAndAwards, experienceTitle } = formData;
    const printPdf = () => {
        const content = document.getElementById('content-id');
        if (content) {
            const originalBody = document.body.innerHTML;
            const htmlContent = content.innerHTML;

            // Temporarily replace the body content with the content to print
            document.body.innerHTML = htmlContent;

            // Print the content
            window.print();

            // Restore the original body content
            document.body.innerHTML = originalBody;
        }
    };





    return (
        <div>
            <div id="content-id" className="max-w-screen-lg mx-auto pdf-container h-full bg-slate-50" >
                <div className="flex ">
                    <div className="w-2/6  pb-10   mx-auto bg-customRed">
                        {/* image field */}
                        <div>
                            {imageUrl ? (
                                <img src={imageUrl} alt="Profile" className="rounded-full object-cover w-44 h-44 mx-auto mt-20" />
                            ) : (
                                <img src={blankImg} alt="Profile" className="rounded-full object-cover w-52 h-52 mx-auto mt-8" />
                            )}
                        </div>

                        {/* profile description */}
                        <div className='w-full px-4'>
                            <h1 className='text-customgray font-semibold text-lg uppercase text-center mt-5'>Profile</h1>
                            <p className="text-lg mt-4 text-customgray  mx-auto border-b border-customgray pb-10 text-center">{profileDescription}</p>
                        </div>

                        {/* skills field */}
                        <div className='border-b border-customgray w-11/12 px-6 mx-auto pb-5'>
                            <h1 className='text-customgray font-semibold text-lg uppercase text-center mt-14 -mb-2'>Skills</h1>
                            <ul className="mt-5 list-disc ml-4 text-lg mb-8">
                                {skillsData.map((skill, index) => (
                                    <li key={index} className="text-white mb-2 flex items-center" style={{ wordWrap: 'break-word' }}>
                                        <span className="mr-2">&#8226;</span>
                                        <span>{skill.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>


                        {/* language skills field */}
                        {languagesData && languagesData.length > 0 && (
                            <div className='border-b border-customgray w-11/12 px-6 mx-auto pb-5'>
                                <h1 className='text-customgray font-semibold text-lg uppercase text-center mt-14 -mb-2'>Language Skills</h1>
                                <div className="mb-8">
                                    {languagesData.map((languageSkill, index) => (
                                        <div key={index} className="mt-5">
                                            <h1 className="text-white mb-2 text-start">{languageSkill.name}</h1>
                                            <div className='bg-white rounded-full w-full '>
                                                <div className='bg-gray-400 h-3 rounded-full ' style={{ width: `${languageSkill.level}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}



                        {/* contact Information */}
                        <div className='flex justify-center items-center w-full px-6 mb-10'>
                            <div className="text-center max-w-md">
                                <h1 className='text-customgray font-semibold uppercase text-lg mt-14 mb-8'>Contact Information</h1>
                                <div className='flex flex-col justify-center items-center mb-2'>
                                    <HiLocationMarker className=" text-customgray text-3xl -mb-1" />
                                    <p className=" text-customgray text-xl">{location}</p>

                                </div>
                                <hr />
                                <div className='flex flex-col justify-center items-center mt-5 mb-2'>
                                    <HiPhone className=" text-customgray text-3xl -mb-1" />
                                    <p className=" text-customgray text-xl">{phoneNumber}</p>

                                </div>
                                <hr />
                                <div className='flex flex-col justify-center items-center mt-5 mb-2'>
                                    <IoIosMail className=" text-customgray text-3xl -mb-1" />
                                    <p className="text-customgray text-xl"> {emailAddress}</p>

                                </div>
                                <hr />
                                <div className='flex flex-col justify-center items-center mt-5 mb-2'>
                                    <FaLinkedin className=" text-customgray text-3xl -mb-1" />
                                    <p className="text-customgray text-xl">{linkedinProfile}</p>

                                </div>
                                <hr />
                            </div>
                        </div>



                    </div>

                    <div className="w-4/6 min-h-screen ">

                        {/* name and title */}
                        <div className="bg-customgray mt-24 p-8 flex flex-col -space-y-2">
                            <p className="text-4xl mb-4 font-semibold">{name}</p>
                            <p className="text-xl font-semibold mb-4">{jobtitle}</p>
                        </div>



                        {achievementsAndAwards && achievementsAndAwards.length > 0 && achievementsAndAwards.some(achievement => achievement.trim() !== '') && (
                            <div>
                                <h1 className='text-lg font-bold uppercase ml-24 mt-10' style={{ letterSpacing: '3px' }}>Achievements and Awards</h1>
                                <div className="mt-5 p-8 relative">
                                    <ul className="list-disc ml-24 text-lg">
                                        <div className="absolute left-11 top-10 bottom-5 bg-green-500  w-0.5"></div>
                                        {achievementsAndAwards.map((achievement, index) => (
                                            <li key={index} className="text-lg flex items-center">
                                                <div className="absolute  top-8 w-4 h-4 bg-white border border-green-500 rounded-full" style={{ left: '37px' }}></div>
                                                { }
                                                <span className="mr-2 text-xl">&#8226;</span>
                                                <span>{achievement}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}






                        {/* professional experience */}
                        <div className=''>
                            <h1 className='text-lg font-bold uppercase mb-5 ml-24 mt-10' style={{ letterSpacing: '3px' }}>Professional Experience</h1>
                            <div className="mx-10  p-8 relative">
                                <div className="absolute left-0 top-10 bottom-10 bg-green-500  w-0.5"></div>
                                {experiences.map((experience, index) => (
                                    <div key={index} className="relative pl-6">
                                        <div className="absolute top-1 w-4 h-4 bg-white border border-green-500 rounded-full" style={{ left: '-38.7px' }}></div>

                                        {experience.experienceStart && (
                                            <p className="text-lg mb-2 font-bold">
                                                {formatDate(experience.experienceStart)} - {experience.present ? 'Present' : formatDate(experience.experienceEnd)}
                                            </p>
                                        )}
                                        {experience.location && (
                                            <p className="text-lg font-bold">{experience.location}</p>
                                        )}
                                        {experience.experienceJobTitle && (
                                            <p className="text-lg">{experience.experienceJobTitle}</p>
                                        )}
                                        {experience.companyName && (
                                            <p className="text-lg">{experience.companyName}</p>
                                        )}
                                        {experience.professionalSummary && (
                                            <div className="text-lg mb-10 ml-2 " dangerouslySetInnerHTML={{ __html: `<ul><li>${experience.professionalSummary.replace(/\n/g, '</li><li>')}</li></ul>` }} />
                                        )}

                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* education field */}
                        <div>
                            <h1 className='text-lg font-bold uppercase mb-5 ml-24 mt-5' style={{ letterSpacing: '3px' }}>Education</h1>
                            <div className="mx-10  p-8 relative">

                                <div className="absolute left-0 top-10 bottom-10 bg-green-500  w-0.5"></div>
                                {education.map((educationItem, index) => (
                                    <div key={index} className='mb-10 relative pl-6'>
                                        <div className="absolute top-1 w-4 h-4 bg-white border border-green-500 rounded-full" style={{ left: '-38.7px' }}></div>

                                        {educationItem.eduPassDate && educationItem.eduEndDate && (
                                            <p className="text-lg font-bold">
                                                {formatDate(educationItem.eduPassDate)} - {formatDate(educationItem.eduEndDate)}
                                            </p>
                                        )}
                                        {(educationItem.schoolName || educationItem.edulocation) && (
                                            <p className="text-lg mb-2 font-bold">{educationItem.schoolName}{educationItem.edulocation ? `, ${educationItem.edulocation}` : ''}</p>
                                        )}
                                        {educationItem.degree && (
                                            <p className="text-lg">Degree: {educationItem.degree}</p>
                                        )}
                                        {educationItem.major && (
                                            <p className="text-lg">Graduation: {educationItem.major}</p>
                                        )}
                                        {educationItem.curricularActivity && (
                                            <p className="text-lg">Specialization: {educationItem.curricularActivity}</p>
                                        )}
                                        {educationItem.additionalNotes && (
                                            <p className="text-lg">{educationItem.additionalNotes}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* qualification field */}
                        <div>
                            <h1 className='text-lg font-bold uppercase  ml-24 my-5' style={{ letterSpacing: '3px' }}>{experienceTitle}</h1>
                            <div className="mx-10 p-8 relative" style={{ width: '100%' }}>
                                <div className="absolute left-0 top-10 bottom-10 bg-green-500 w-0.5"></div>
                                {qualifications.map((qualification, index) => (
                                    <div key={index} className='relative mb-10 pl-6'>
                                        <div className="absolute top-1 w-4 h-4 bg-white border border-green-500 rounded-full" style={{ left: '-38.7px' }}></div>
                                        <p className="text-lg font-bold">{qualification.year}</p>
                                        <p className="text-lg mb-8" style={{ maxWidth: '80%', wordWrap: 'break-word' }}>{qualification.technicalSkills}, {qualification.additionalQualifications}</p>
                                    </div>
                                ))}
                            </div>


                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 flex justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={printPdf}>Generate PDF</button>
            </div>

        </div >
    );
};

export default PdfDownload;