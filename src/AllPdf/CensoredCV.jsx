import { Link, useLoaderData } from "react-router-dom";
import { HiPhone } from "react-icons/hi";
import { FaEdit, FaLinkedin } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { IoIosMail } from "react-icons/io";
import blankImg from '../Image/blankProfile.png'
import { FaDownload } from "react-icons/fa";
import { useState } from "react";

const CensoredCV = () => {

    const PdfInfo = useLoaderData();

    const { name, jobtitle, experiences, education, qualifications, imageUrl, profileDescription, location, phoneNumber, emailAddress, linkedinProfile, skillsData, languagesData, achievementsAndAwards, experienceTitle, profileDescription2, customData } = PdfInfo;



    const getInitials = (name) => {
        // Split the name into individual parts
        const parts = name.split(' ');

        // Extract the first letter of each part and capitalize it
        const initials = parts.map(part => part.charAt(0).toUpperCase());

        // Join the initials with periods and return
        return initials.join('. ') + '.';
    };


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
        <div className='w-4/5 flex justify-center items-start'>
            <div id="content-id" className="pdf-container w-full  bg-slate-50" > {/* Set a fixed width for the container */}
                <div className="flex">


                    {/* left side content */}
                    <div className="w-2/5 mx-auto bg-[#bd0811]">
                        {/* image field */}
                        <div>
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt="Profile"
                                    className="rounded-full object-cover w-44 h-44 mx-auto mt-20 mb-10"
                                    style={{ filter: 'blur(5px)' }} // Apply inline CSS for blur effect
                                />
                            ) : (
                                <img
                                    src={blankImg}
                                    alt="Profile"
                                    className="rounded-full object-cover w-52 h-52 mx-auto mt-10 mb-10"
                                />
                            )}
                        </div>



                        {/* profile description */}
                        {profileDescription && (
                            <div className='w-11/12 mx-auto px-4'>
                                <h1 className='text-white font-semibold uppercase text-center mt-5 ' style={{ letterSpacing: '4px', fontSize: '18px' }}>Profile</h1>
                                <div className=" mt-5 text-white mx-auto position-relative " style={{ width: 'fit-content', fontSize: '15px' }}>
                                    <p className="pb-12 text-center ">{profileDescription}</p>
                                    <div className="border-b-2 w-1/2 mx-auto"></div>
                                </div>
                            </div>
                        )}


                        {/* skills field */}
                        <div className=' w-11/12 px-6 mx-auto pb-5'>
                            <h1 className=' font-semibold  uppercase text-center mt-14 -mb-2 text-white' style={{ letterSpacing: '4px', fontSize: '18px' }}>Relevant Skills</h1>
                            <ul className="mt-10 list-disc  text-lg mb-14" style={{ width: 'fit-content', fontSize: '16px' }}>
                                {skillsData.map((skill, index) => (
                                    <li key={index} className="text-white flex items-center" style={{ wordWrap: 'break-word' }}>
                                        <span className="mr-2">&#8226;</span>
                                        <span>{skill.name}</span>
                                    </li>

                                ))}
                            </ul>
                            <div className="border-b-2 w-1/2 mx-auto"></div>
                        </div>


                        {/* language skills field */}
                        {languagesData && languagesData.length > 0 && (
                            <div className=' w-11/12 px-6 mx-auto pb-5'>
                                <h1 className='text-white font-semibold  uppercase text-center mt-9 mb-10' style={{ letterSpacing: '4px', fontSize: '18px' }}>Language Skills</h1>
                                <div className="mb-12">
                                    {languagesData.map((languageSkill, index) => (
                                        <div key={index} className="mt-3 flex justify-around items-center ">
                                            <h1 className="text-white font-thin mb-2" style={{ fontSize: '17px' }}>{languageSkill.name}</h1>
                                            <div className='bg-white rounded-full w-1/2 '>
                                                <div className='bg-gray-400 h-3 rounded-full ' style={{ width: `${languageSkill.level}%` }}></div>
                                            </div>

                                        </div>

                                    ))}

                                </div>
                                <div className="border-b-2 w-1/2 mx-auto"></div>
                            </div>
                        )}



                    </div>


                    {/* right side content */}
                    <div className="w-3/5 min-h-screen ">

                        {/* name and title */}
                        <div className="bg-slate-300 mt-24 p-8 flex flex-col -space-y-2">
                            <p className="mb-4 text-zinc-900" style={{ fontWeight: 'bold', fontSize: '45px' }}>{getInitials(name)}</p>
                            <p className="text-2xl mb-4 ">{jobtitle}</p>
                        </div>
                        {/* right side profile description */}
                        {profileDescription2 && (
                            <div className='w-full px-4'>
                                <h1 className=' uppercase  mt-10 ml-5 ' style={{ letterSpacing: '4px', fontSize: '18px', fontWeight: 'bold' }}>Profile summary</h1>
                                <div className="relative ">
                                    <div className="absolute left-6 top-1 bottom-10 bg-[#0d9488]" style={{ width: '2px' }}> </div>
                                    <div>  <p className="mt-7 text-[#0c0a09]  pb-10 w-10/12 ml-11 " style={{ fontSize: '15px' }}>{profileDescription2}</p>
                                    </div>
                                    <div className="absolute top-0 w-5 h-5 bg-white border-2 border-[#0d9488] rounded-full " style={{ left: '15px' }}></div>
                                </div>
                            </div>
                        )}




                        {/* professional experience */}
                        <div className=''>
                            <h1 className='uppercase ml-10 mt-10' style={{ letterSpacing: '4px', fontSize: '18px', fontWeight: 'bold' }}>Professional Experience</h1>
                            <div className="mx-10 p-8 relative">
                                <div className="absolute left-1 top-10 bottom-16 bg-[#0d9488]  " style={{ width: '2px' }}></div>
                                {experiences.map((experience, index) => (
                                    <div key={index} className="relative pl-0">
                                        <div className="absolute top-1 w-5 h-5 bg-white border-2 border-[#0d9488] rounded-full" style={{ left: '-37.7px' }}></div>
                                        {experience.experienceStart && (
                                            <p className=" pt-1 mb-2 uppercase -ml-2" style={{ fontSize: '17px', fontWeight: 'bold' }}>
                                                {experience.experienceStart} - {experience.present ? 'Present' : experience.experienceEnd}
                                            </p>
                                        )}
                                        {/* Display company name and location if end date is not "Present" */}
                                        {!experience.present && (
                                            <p className="font-bold -ml-1" style={{ fontSize: '15px' }}>
                                                <span className="font-bold -ml-1" >{experience.companyName}</span> {experience.location}
                                            </p>
                                        )}
                                        {/* Display location if end date is "Present" */}
                                        {experience.present && (
                                            <p className="-ml-2 font-bold" style={{ fontSize: '15px' }}>{experience.location}</p>
                                        )}
                                        {experience.experienceJobTitle && (
                                            <p className='-ml-2 ' style={{ fontSize: '15px' }}>{experience.experienceJobTitle}</p>
                                        )}
                                        {experience.professionalSummary && (
                                            <div className="mt-2 mb-10 -ml-2 text-gray-500 " style={{ fontSize: '15px' }} dangerouslySetInnerHTML={{ __html: `<ul><li>${experience.professionalSummary.replace(/\n/g, '</li><li>')}</li></ul>` }} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>


                        {achievementsAndAwards && achievementsAndAwards.length > 0 && achievementsAndAwards.some(achievement => achievement && typeof achievement === 'string' && achievement.trim() !== '') && (
                            <div className="-mt-4">
                                <h1 className='text-lg font-bold uppercase ml-10 mt-5 -mb-3' style={{ letterSpacing: '4px', fontSize: '18px', fontWeight: 'bold' }}>Achievements and Awards</h1>
                                <div className="mt-5 p-8 relative">
                                    <ul className="list-disc ml-8 text-lg">
                                        <div className="absolute left-12 top-10 bottom-5 bg-[#0d9488]" style={{ width: '2px' }}> </div>
                                        {achievementsAndAwards.map((achievement, index) => (
                                            // Add a conditional check to ensure achievement is a string and not null or undefined
                                            achievement && typeof achievement === 'string' && achievement.trim() !== '' && (
                                                <li key={index} className=" flex w-11/12" style={{ fontSize: '16px' }}>
                                                    <div className="absolute  top-8 w-5 h-5 bg-white border-2 border-[#0d9488] rounded-full" style={{ left: '39px' }}></div>
                                                    <span className="mr-2 text-xl">&#8226;</span>
                                                    <span>{achievement}</span>
                                                </li>
                                            )
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}



                        {/* education field */}
                        <div className="">
                            <h1 className='uppercase mb-1 ml-12 mt-10' style={{ letterSpacing: '4px', fontSize: '18px', fontWeight: 'bold' }}>Educational path</h1>
                            <div className="mx-10  p-8 relative">
                                <div className="absolute left-2 top-10 bottom-10 bg-[#0d9488]  w-0.5"></div>

                                {education.map((educationItem, index) => (
                                    <div key={index} className='mb-10 relative pl-1'>
                                        <div className="absolute top-1 w-5 h-5 bg-white border-2 border-[#0d9488] rounded-full" style={{ left: '-33.7px' }}></div>
                                        {/* Display start and end dates as plain text */}
                                        {educationItem.eduPassDate && educationItem.eduEndDate && (
                                            <p className=" pt-1 mb-2 uppercase -ml-2" style={{ fontSize: '17px', fontWeight: 'bold' }}>
                                                {educationItem.eduPassDate} - {educationItem.eduEndDate}
                                            </p>
                                        )}
                                        {/* Render other education details */}
                                        {(educationItem.schoolName || educationItem.edulocation) && (
                                            <p className=" font-bold -ml-2 leading-2 mb-1" style={{ fontSize: '16px' }}>{educationItem.schoolName}{educationItem.edulocation ? `, ${educationItem.edulocation}` : ''}</p>
                                        )}
                                        {educationItem.degree && educationItem.major && (
                                            <p className="-ml-2 " style={{ fontSize: '16px' }}> {educationItem.degree},  {educationItem.major}</p>
                                        )}

                                        {educationItem.degree && !educationItem.major && (
                                            <p className="-ml-2" style={{ fontSize: '16px' }}> {educationItem.degree}</p>
                                        )}

                                        {!educationItem.degree && educationItem.major && (
                                            <p className="-ml-2" style={{ fontSize: '16px' }}>{educationItem.major}</p>
                                        )}


                                        {educationItem.curricularActivity && (
                                            <p className="mt-2 mb-10 -ml-2 text-gray-500 " style={{ fontSize: '15px' }}>{educationItem.curricularActivity}</p>
                                        )}
                                        {educationItem.additionalNotes && (
                                            <p className="text-lg">{educationItem.additionalNotes}</p>
                                        )}
                                    </div>
                                ))}

                            </div>
                        </div>

                        {/* qualification field */}
                        {qualifications.some(qualification => qualification && Object.values(qualification).some(value => value !== '')) && (
                            <div>
                                <h1 className='uppercase mt-10 ml-12' style={{ letterSpacing: '4px', fontSize: '18px', fontWeight: 'bold' }}>{experienceTitle}</h1>
                                <div className="mx-10 p-8 relative" style={{ width: '100%' }}>
                                    <div className="absolute left-2 top-10 bottom-10 bg-[#0d9488] w-0.5"></div>
                                    {qualifications.map((qualification, index) => (
                                        Object.values(qualification).some(value => value !== '') && (
                                            <div key={index} className='relative mb-10 pl-1'>
                                                <div className="absolute top-1 w-5 h-5 bg-white border-2 border-[#0d9488] rounded-full" style={{ left: '-33.7px' }}></div>
                                                {qualification.year && (
                                                    <p className="pt-1 mb-2 uppercase -ml-2" style={{ fontSize: '17px', fontWeight: 'bold' }}>{qualification.year}</p>
                                                )}
                                                {qualification.technicalSkills && (
                                                    <p className="text-lg mb-8 font-bold -ml-2" style={{ maxWidth: '80%', wordWrap: 'break-word', fontSize: '16px' }}>{qualification.technicalSkills}</p>
                                                )}
                                                {qualification.additionalQualifications && (
                                                    <p className="-ml-2 text-gray-500 mb-8" style={{ maxWidth: '80%', wordWrap: 'break-word', fontSize: '15px' }}>{qualification.additionalQualifications}</p>
                                                )}
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Custom field section */}
                        {customData && customData.length > 0 && (
                            <div>
                                {customData.map((field, index) => (
                                    Object.values(field).some(value => value !== '') && (
                                        <div key={index} className="mx-10 p-8 relative" style={{ width: '100%' }}>
                                            <div className="absolute left-0 top-28 bottom-14 bg-green-500 w-0.5"></div>
                                            {field.title && <h1 className="text-lg font-bold uppercase ml-24 my-5" style={{ letterSpacing: '3px' }}>{field.title}</h1>}

                                            <div className='relative mb-10 pl-6'>
                                                <div className="absolute top-0 w-4 h-4 bg-white border border-green-500 rounded-full" style={{ left: '-38.7px' }}></div>
                                                <p className="text-lg " style={{ maxWidth: '80%', wordWrap: 'break-word' }}>{field.date}</p>
                                                <p className="text-lg mb-8" style={{ maxWidth: '80%', wordWrap: 'break-word' }}>{field.subtitle}</p>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div>
                <div className="mt-4 flex justify-center">
                    <button className="bg-[#bd0811]  text-white font-bold py-2 px-4 rounded" onClick={printPdf}><FaDownload /></button>
                </div>

            </div>
        </div >
    );
};

export default CensoredCV;
