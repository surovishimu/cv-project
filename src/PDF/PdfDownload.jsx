import { useState, useEffect } from 'react';
import { HiPhone, HiMail } from "react-icons/hi";
import { FaLinkedin } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { usePDF } from 'react-to-pdf';
const PdfDownload = () => {
    const [formData, setFormData] = useState(null);
    const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });
    useEffect(() => {
        fetch('http://localhost:5000/userInfo')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Assuming the data is an array of submitted form data and we want to display the most recent one
                if (data.length > 0) {
                    setFormData(data[data.length - 1]);
                }
            })
            .catch(error => {
                console.error('There was a problem fetching the data:', error);
            });
    }, []);

    if (!formData) {
        return <p>Loading...</p>;
    }
    function formatDate(dateString) {
        const date = new Date(dateString);
        const month = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
        const formattedDate = `${month}/${date.getFullYear()}`;
        return formattedDate;
    }



    const { name, jobtitle, experiences, education, qualifications, imageUrl, profileDescription, location, phoneNumber, emailAddress, linkedinProfile, skillsData, languageSkillsData } = formData;

    return (
        <div >
            <div ref={targetRef} className="max-w-screen-lg mx-auto " >
                <div className="flex ">
                    <div className="max-w-screen-lg mx-auto bg-customRed">
                        {/* image field */}
                        <div>
                            <img src={imageUrl} alt="Profile" className=" rounded-full object-cover w-44 h-44  mx-auto mt-20" />
                        </div>

                        {/* profile description */}
                        <div>
                            <h1 className='text-customgray font-semibold text-lg uppercase text-center mt-5'>Profile</h1>
                            <p className="text-lg mt-4 text-customgray w-1/2 mx-auto border-b border-customgray pb-2">{profileDescription}</p>
                        </div>
                        {/* skills field */}
                        <div className='border-b border-customgray w-1/2 mx-auto pb-5'>
                            <h1 className='text-customgray font-semibold text-lg uppercase text-center mt-14 -mb-2'>Skills</h1>
                            {skillsData.map((skill, index) => (
                                <div key={index} className="mt-5 ">
                                    <h1 className="text-white  text-start mb-2">{skill.name}</h1>
                                    <div className="flex items-center justify-start ">

                                        <div className='bg-white rounded-full w-full '>
                                            <div className='bg-gray-400 h-3 rounded-full ' style={{ width: `${skill.level}%` }}>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}

                        </div>
                        {/* language skills field */}
                        <div className='border-b border-customgray w-1/2 mx-auto pb-5'>
                            <h1 className='text-customgray font-semibold text-lg uppercase text-center mt-14 -mb-2'>Language Skills</h1>
                            <div className="">
                                {languageSkillsData.map((languageSkill, index) => (
                                    <div key={index} className="mt-5">

                                        <h1 className="text-white mb-2 text-start">{languageSkill.name}</h1>

                                        <div className='bg-white rounded-full w-full '>
                                            <div className='bg-gray-400 h-3 rounded-full ' style={{ width: `${languageSkill.level}%` }}>

                                            </div>
                                        </div>



                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* contact Information */}
                        <div className='flex justify-center items-center'>
                            <div className="text-center">
                                <h1 className='text-customgray font-semibold text-lg uppercase mt-14 mb-8'>Contact Information</h1>
                                <div className="flex items-center justify-start">
                                    <IoLocationOutline className="text-2xl mr-4 text-customgray" />
                                    <p className="text-xl font-semibold text-customgray mb-5">{location}</p>
                                </div>
                                <div className="flex items-center justify-start">
                                    <HiPhone className="text-2xl mr-4 text-customgray" />
                                    <p className="text-xl font-semibold text-customgray mb-5">{phoneNumber}</p>
                                </div>
                                <div className="flex items-center justify-start">
                                    <HiMail className="text-2xl mr-4 text-customgray" />
                                    <p className="text-xl font-semibold text-customgray mb-5">{emailAddress}</p>
                                </div>
                                <div className="flex items-center justify-start">
                                    <FaLinkedin className="text-2xl mr-4 text-customgray" />
                                    <p className="text-xl font-semibold text-customgray mb-5">{linkedinProfile}</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="w-4/6 ">

                        {/* name and title */}
                        <div className="bg-customgray mt-24 p-8 flex flex-col -space-y-2">
                            <p className="text-4xl mb-4 font-semibold">{name}</p>
                            <p className="text-xl font-semibold mb-4">{jobtitle}</p>
                        </div>

                        {/* professional experience */}
                        <div className=''>
                            <h1 className='text-lg font-bold uppercase mb-5 ml-24 mt-10' style={{ letterSpacing: '3px' }}>Professional Experience</h1>
                            <div className="mx-10  p-8 relative">

                                <div className="absolute left-0 top-5 bottom-10 bg-green-500  w-0.5"></div>
                                {experiences.map((experience, index) => (
                                    <div key={index} className="relative pl-6">
                                        <div className="absolute -left-10 top-0 w-4 h-4 bg-white border border-green-500 rounded-full"></div>
                                        {experience.experienceStart && experience.experienceEnd && (
                                            <p className="text-lg mb-2 font-bold">
                                                {formatDate(experience.experienceStart)} - {formatDate(experience.experienceEnd)}
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
                                            <p className="text-lg mb-10">{experience.professionalSummary}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>




                        {/* education field */}
                        <div>
                            <h1 className='text-lg font-bold uppercase mb-5 ml-24 mt-10' style={{ letterSpacing: '3px' }}>Education</h1>
                            <div className="mx-10  p-8 relative">

                                <div className="absolute left-0 top-5 bottom-10 bg-green-500  w-0.5"></div>
                                {education.map((educationItem, index) => (
                                    <div key={index} className='mb-10 relative pl-6'>
                                        <div className="absolute -left-10 top-0 w-4 h-4 bg-white border border-green-500 rounded-full"></div>

                                        {educationItem.eduPassDate && (
                                            <p className="text-lg  font-bold">{formatDate(educationItem.eduPassDate)}</p>
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
                            <h1 className='text-lg font-bold uppercase mb-5 ml-24 mt-10' style={{ letterSpacing: '3px' }}>Qualifications</h1>
                            <div className="mt-10 mx-10 p-8 relative">
                                <div className="absolute left-0 top-5 bottom-10 bg-green-500  w-0.5"></div>

                                {qualifications.map((qualification, index) => (
                                    <div key={index} className='relative mb-10 pl-6'>
                                        <div className="absolute -left-10 top-0 w-4 h-4 bg-white border border-green-500 rounded-full"></div>
                                        <p className="text-lg  font-bold">{qualification.year}</p>
                                        <p className="text-lg mb-8">{qualification.technicalSkills},{qualification.additionalQualifications}</p>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={() => toPDF()}>Download PDF</button>
        </div>
    );
};

export default PdfDownload;
