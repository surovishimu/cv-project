import { useState, useEffect } from 'react';
import { HiPhone, HiMail } from "react-icons/hi";
import { FaLinkedin } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";


const PdfDownload = () => {
    const [formData, setFormData] = useState(null);

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
            <div className="max-w-screen-lg mx-auto ">
                <div className="flex ">
                    <div className='bg-customRed'>
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
                                    <h1 className="text-white  text-start">{skill.name}</h1>
                                    <div className="flex items-center justify-center ">
                                        <input
                                            type="range"
                                            min={0}
                                            max={100}
                                            value={skill.level}
                                            className="range range-xs "
                                            disabled // Disable editing
                                        />
                                        <span className="text-white ml-2">{skill.level}% </span> {/* Display the current value */}
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
                                        <input
                                            type="range"
                                            min={0}
                                            max={100}
                                            value={languageSkill.level}
                                            className="range range-xs "
                                            disabled
                                        />

                                        <span className="ml-2 text-white">{languageSkill.level}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* contact Information */}
                        <div className="mt-4 p-8 flex justify-center items-center">

                            <div>
                                <h1 className='text-customgray font-semibold text-lg uppercase mt-14 mb-8'>Contact Information </h1>
                                <div className="flex items-center mb-4">
                                    <IoLocationOutline className="text-2xl mr-2 text-customgray" />
                                    <p className="text-xl font-semibold text-customgray">{location}</p>
                                </div>
                                <div className="flex items-center mb-4">
                                    <HiPhone className="text-2xl mr-2 text-customgray" />
                                    <p className="text-xl font-semibold text-customgray">{phoneNumber}</p>
                                </div>
                                <div className="flex items-center mb-4">
                                    <HiMail className="text-2xl mr-2 text-customgray" />
                                    <p className="text-xl font-semibold text-customgray">{emailAddress}</p>
                                </div>
                                <div className="flex items-center">
                                    <FaLinkedin className="text-2xl mr-2 text-customgray" />
                                    <p className="text-xl font-semibold text-customgray">{linkedinProfile}</p>
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
                        <div className="mx-10 mt-4 p-8">
                            <h1 className='text-lg font-bold uppercase mb-10' style={{ letterSpacing: '3px' }}>Professional Experience</h1>
                            {experiences.map((experience, index) => (
                                <div key={index}>
                                    {experience.experienceStart && experience.experienceEnd && (
                                        <p className="text-lg mb-2 font-bold">
                                            {formatDate(experience.experienceStart)} - {formatDate(experience.experienceEnd)}
                                        </p>
                                    )}
                                    {experience.location && (
                                        <p className="text-lg font-bold ">{experience.location}</p>
                                    )}
                                    {experience.experienceJobTitle && (
                                        <p className="text-lg ">{experience.experienceJobTitle}</p>
                                    )}
                                    {experience.companyName && (
                                        <p className="text-lg ">{experience.companyName}</p>
                                    )}
                                    {experience.professionalSummary && (
                                        <p className="text-lg mb-10">{experience.professionalSummary}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* education field */}
                        <div className="mx-10  p-8 ">
                            <h1 className='text-lg font-bold uppercase mb-10' style={{ letterSpacing: '3px' }}>Education</h1>
                            {education.map((educationItem, index) => (
                                <div key={index} className='mb-10'>
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

                        {/* qualification field */}
                        <div className=" mx-10 p-8">
                            <h1 className='text-lg font-bold uppercase mb-10' style={{ letterSpacing: '3px' }}>Qualifications</h1>
                            {qualifications.map((qualification, index) => (
                                <div key={index}>
                                    <p className="text-lg  font-bold">{qualification.year}</p>
                                    <p className="text-lg mb-8">{qualification.technicalSkills},{qualification.additionalQualifications}</p>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PdfDownload;
