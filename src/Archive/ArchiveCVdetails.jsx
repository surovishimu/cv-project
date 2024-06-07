import { Link, useLoaderData } from "react-router-dom";
import { HiPhone } from "react-icons/hi";
import { FaEdit, FaLinkedin } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { IoIosMail } from "react-icons/io";
import blankImg from '../Image/blankProfile.png'
import { FaDownload } from "react-icons/fa";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



const ArchiveCVdetails = () => {

    const PdfInfo = useLoaderData();
    console.log(PdfInfo);
    const { name, jobtitle, experiences, education, qualifications, imageUrl, profileDescription, location, phoneNumber, emailAddress, linkedinProfile, skillsData, languagesData, achievementsAndAwards, experienceTitle, profileDescription2, customFieldTitle, customData } = PdfInfo;


    const breakString = (str, maxLength) => {
        return str.length > maxLength ? str.match(new RegExp('.{1,' + maxLength + '}', 'g')).join('\n') : str;
    };



    const generatePdf = async () => {
        const content = document.getElementById('pdf-content');
        const contentHeight = content.scrollHeight;
        const contentWidth = content.clientWidth;
        const pdf = new jsPDF({
            orientation: 'portrait', // Set the orientation to portrait
            unit: 'px', // Use pixels as the unit
            format: [contentWidth, contentHeight] // A4 page size in pixels (approximately)
        });

        try {
            // Convert content to canvas using html2canvas
            const canvas = await html2canvas(document.getElementById('pdf-content'), {
                // Adjust scale as needed for better quality
                useCORS: true, // Enable CORS support for images
                scrollX: 0,
                scrollY: -window.scrollY,
                logging: false
            });

            // Convert canvas to image data URL
            const imgData = canvas.toDataURL('image/png', 1.0);

            // Add image to PDF
            pdf.addImage(imgData, 'png', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());

            // Save PDF
            pdf.save(`${name}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };



    return (
        <div className='w-4/5 flex justify-center items-start'>
            <div id="pdf-content" className="pdf-container w-full  bg-slate-50" > {/* Set a fixed width for the container */}
                <div className="flex">

                    {/* left side content */}
                    <div className="w-2/5 pb-10 mx-auto bg-[#C3202B]">
                        {/* image field */}
                        <div>
                            {imageUrl ? (
                                <img src={imageUrl} alt="Profile" className="rounded-full object-cover w-44 h-44 mx-auto mt-20 mb-10" />
                            ) : (
                                <img src={blankImg} alt="Profile" className="rounded-full object-cover w-52 h-52 mx-auto mt-10" />
                            )}
                        </div>

                        {/* profile description */}
                        {profileDescription && (
                            <div className='w-11/12 mx-auto px-4'>
                                <h1 className='text-white font-semibold uppercase text-center mt-5' style={{ letterSpacing: '4px', fontSize: '18px' }}>Profile</h1>
                                <div className="mt-5 text-white mx-auto position-relative" style={{ width: 'fit-content', fontSize: '15px' }}>
                                    <p className="pb-12 text-center">{profileDescription}</p>
                                    {profileDescription && <hr className="w-1/2  mx-auto " />}
                                </div>
                            </div>
                        )}



                        {/* skills field */}
                        {skillsData && skillsData.some(skill => skill.name.trim() !== '') && (
                            <div className='w-11/12 px-6 mx-auto pb-5'>
                                <h1 className='font-semibold uppercase text-center mt-14 -mb-2 text-white' style={{ letterSpacing: '4px', fontSize: '18px' }}>Relevant Skills</h1>
                                <ul className="mt-10 list-disc text-lg mb-14" style={{ width: 'fit-content', fontSize: '16px' }}>
                                    {skillsData.map((skill, index) => (
                                        skill.name.trim() !== '' && (
                                            <li key={index} className="text-white flex items-center" style={{ wordWrap: 'break-word' }}>
                                                <span className="mr-2">&#8226;</span>
                                                <span>{skill.name}</span>
                                            </li>
                                        )
                                    ))}
                                </ul>
                                <hr className="w-1/2 mx-auto " />
                            </div>
                        )}



                        {/* language skills field */}
                        {languagesData && languagesData.length > 0 && (
                            <div className=' w-11/12 px-6 mx-auto pb-5'>
                                <h1 className='text-white font-semibold  uppercase text-center mt-10 mb-10' style={{ letterSpacing: '4px', fontSize: '18px' }}>Language Skills</h1>
                                <div className="mb-14">
                                    {languagesData.map((languageSkill, index) => (
                                        <div key={index} className="mt-3 flex justify-between items-center px-14">
                                            <h1 className="text-white font-thin mb-2" style={{ fontSize: '17px' }}>{languageSkill.name}</h1>
                                            <div className='bg-white rounded-full w-1/2 mt-4'>
                                                <div className='bg-gray-400 h-3 rounded-full ' style={{ width: `${languageSkill.level}%` }}></div>
                                            </div>

                                        </div>

                                    ))}

                                </div>
                                <hr className="w-1/2 mx-auto " />
                            </div>
                        )}


                        {/* contact Information */}
                        <div className='flex justify-center items-center w-full px-6 mb-10 mt-10'>
                            <div className="text-center">
                                {/* Check if any of the fields has a value before rendering the header and sections */}
                                {(location || phoneNumber || emailAddress || linkedinProfile) && (
                                    <>


                                        {/* Location */}
                                        {location && (
                                            <div className='flex flex-col justify-center items-center mx-auto mb-8'>
                                                <HiLocationMarker className="text-white text-3xl mb-2" />
                                                <p className="text-white " style={{ fontSize: '17px' }}>{location}</p>
                                            </div>
                                        )}


                                        {/* Phone Number */}
                                        {phoneNumber && (
                                            <div className='flex flex-col justify-center items-center mt-5 mx-auto mb-8'>
                                                <HiPhone style={{ color: 'white' }} className="text-3xl mb-2" />
                                                <p style={{ color: 'white', fontSize: '17px' }}>{phoneNumber}</p>
                                            </div>
                                        )}


                                        {/* Email Address */}
                                        {emailAddress && (
                                            <div className='flex flex-col justify-center items-center mt-5 mx-auto mb-8'>
                                                <IoIosMail style={{ color: 'white' }} className="text-3xl mb-2" />
                                                <p className="text-white text-xl" style={{ whiteSpace: 'pre-wrap', fontSize: '17px' }}>{breakString(emailAddress, 28)}</p>
                                            </div>
                                        )}

                                        {/* LinkedIn Profile */}
                                        {linkedinProfile && (
                                            <div className='flex flex-col justify-center items-center mt-5 mx-auto mb-5'>
                                                <FaLinkedin style={{ color: 'white' }} className="text-3xl mb-2" />
                                                <p className="text-white text-xl px-7" style={{ fontSize: '17px' }}>{linkedinProfile}</p>
                                            </div>
                                        )}

                                    </>
                                )}
                            </div>
                        </div>





                    </div>



                    {/* right side content */}
                    <div className="w-3/5 ">

                        {/* name and title */}
                        <div className="bg-[#EFF0F2] mt-24 p-8 flex flex-col -space-y-2">
                            <p className="mb-4 text-zinc-900" style={{ fontWeight: 'bold', fontSize: '45px' }}>{name}</p>
                            <p className="text-2xl mb-4">{jobtitle}</p>
                        </div>

                        {/* right side profile description */}
                        {profileDescription2 && (
                            <div className='w-full px-4'>
                                <h1 className='uppercase mt-10 ml-5' style={{ letterSpacing: '4px', fontSize: '18px', fontWeight: 'bold' }}>Profile summary</h1>
                                <div className="relative">
                                    <div className="absolute left-7 top-3 bottom-10 bg-[#0d9488]" style={{ width: '2px' }}></div>
                                    <div>
                                        <p
                                            className="mt-7 text-[#0c0a09] pb-4 w-10/12 ml-12"
                                            style={{ fontSize: '15px' }}
                                            dangerouslySetInnerHTML={{ __html: profileDescription2.replace(/\n/g, '<br />') }}
                                        >
                                        </p>
                                    </div>
                                    <div className="absolute top-2 w-5 h-5 bg-white border-2 border-[#0d9488] rounded-full" style={{ left: '19px' }}></div>
                                </div>
                            </div>
                        )}


                        {/* professional experience */}
                        <div className=''>
                            <h1 className='uppercase ml-10 mt-10' style={{ letterSpacing: '4px', fontSize: '18px', fontWeight: 'bold' }}>Professional Experience</h1>
                            <div className="mx-10  p-8 relative">
                                <div className="absolute left-2 top-16 bottom-10 bg-[#0d9488]  " style={{ width: '2px' }}></div>
                                {experiences.map((experience, index) => (
                                    <div key={index} className="relative pl-0">
                                        <div className="absolute top-4 w-5 h-5 bg-white border-2 border-[#0d9488] rounded-full" style={{ left: '-33.7px' }}></div>
                                        {/* Display start and end dates as plain text */}
                                        {experience.experienceStart && (
                                            <p className="pt-1 mb-2 uppercase -ml-2" style={{ fontSize: '17px', fontWeight: 'bold' }}>
                                                {experience.experienceStart} - {experience.present ? 'Present' : experience.experienceEnd}
                                            </p>
                                        )}

                                        {/* Display other details */}
                                        {experience.location && (
                                            <p className="font-bold -ml-2 leading-2 mb-1" style={{ fontSize: '15px' }}>
                                                {experience.companyName && `${experience.companyName}${experience.location ? ', ' : ''}`}
                                                {experience.location}
                                            </p>
                                        )}
                                        {experience.experienceJobTitle && (
                                            <p className='-ml-2' style={{ fontSize: '15px' }}>{experience.experienceJobTitle}</p>
                                        )}
                                        {/* If there's no professional summary, add margin */}
                                        {!experience.professionalSummary && (
                                            <div style={{ marginBottom: '30px' }}></div>
                                        )}
                                        {experience.professionalSummary && (
                                            <div className="mt-2 mb-10 -ml-2 text-gray-500 " style={{ fontSize: '15px' }} dangerouslySetInnerHTML={{ __html: `<ul><li>${experience.professionalSummary.replace(/\n/g, '</li><li>')}</li></ul>` }} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* Achievements */}
                        {achievementsAndAwards && achievementsAndAwards.length > 0 && achievementsAndAwards.some(achievement => achievement && typeof achievement === 'string' && achievement.trim() !== '') && (
                            <div>
                                <h1 className='text-lg font-bold uppercase ml-10 mt-5 -mb-3' style={{ letterSpacing: '4px', fontSize: '18px', fontWeight: 'bold' }}>Achievements and Awards</h1>
                                <div className="mt-5 p-8 relative">
                                    <div className="ml-8 text-lg">
                                        <div className="absolute left-12 top-16 bottom-5 bg-[#0d9488]" style={{ width: '2px' }}> </div>
                                        {achievementsAndAwards.map((achievement, index) => (
                                            achievement && typeof achievement === 'string' && achievement.trim() !== '' && (
                                                <div key={index} className="flex items-center mt-4" style={{ fontSize: '16px' }}>
                                                    {/* Circle before each achievement */}
                                                    <div className="w-5 h-5 bg-white absolute  border-2 border-[#0d9488] rounded-full" style={{ left: '39px' }}></div>
                                                    <span className="mb-5 font-semibold">{achievement}</span>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}



                        {/* education field */}

                        {education.some(item => {
                            for (const key in item) {
                                if (item[key] !== '') {
                                    return true;
                                }
                            }
                            return false;
                        }) && (
                                <div className="">
                                    <h1 className='uppercase mb-1 ml-12 mt-10' style={{ letterSpacing: '4px', fontSize: '18px', fontWeight: 'bold' }}>Educational path</h1>
                                    <div className="mx-10  p-8 relative">
                                        <div className="absolute left-2 top-12 bottom-10 bg-[#0d9488]  w-0.5"></div>
                                        {education.map((educationItem, index) => {
                                            let hasData = false;
                                            for (const key in educationItem) {
                                                if (educationItem[key] !== '') {
                                                    hasData = true;
                                                    break;
                                                }
                                            }
                                            if (hasData) {
                                                return (
                                                    <div key={index} className='mb-10 relative pl-1'>
                                                        {/* Green circle */}
                                                        <div className="absolute top-3 w-5 h-5 bg-white border-2 border-[#0d9488] rounded-full" style={{ left: '-33.7px' }}></div>
                                                        {/* Display start and end dates as plain text */}
                                                        {educationItem.eduPassDate && educationItem.eduEndDate && (
                                                            <p className="pt-1 mb-2 uppercase -ml-2" style={{ fontSize: '17px', fontWeight: 'bold' }}>
                                                                {educationItem.eduPassDate} - {educationItem.eduEndDate}
                                                            </p>
                                                        )}
                                                        {!educationItem.eduPassDate && educationItem.eduEndDate && (
                                                            <p className="pt-1 mb-2 uppercase -ml-2" style={{ fontSize: '17px', fontWeight: 'bold' }}>
                                                                {educationItem.eduEndDate}
                                                            </p>
                                                        )}
                                                        {educationItem.eduPassDate && !educationItem.eduEndDate && (
                                                            <p className="pt-1 mb-2 uppercase -ml-2" style={{ fontSize: '17px', fontWeight: 'bold' }}>
                                                                {educationItem.eduPassDate}
                                                            </p>
                                                        )}
                                                        {/* Render other education details */}
                                                        {(educationItem.schoolName || educationItem.edulocation) && (
                                                            <p className="font-bold -ml-2 leading-2 mb-1" style={{ fontSize: '16px' }}>{educationItem.schoolName}{educationItem.edulocation ? `, ${educationItem.edulocation}` : ''}</p>
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
                                                            <p className="mt-2  -ml-2 text-gray-500 " style={{ fontSize: '15px' }}>{educationItem.curricularActivity}</p>
                                                        )}
                                                        {educationItem.additionalNotes && (
                                                            <p className="mt-2 mb-10 -ml-2 text-gray-500 " style={{ fontSize: '15px' }}>{educationItem.additionalNotes}</p>
                                                        )}
                                                    </div>
                                                );
                                            } else {
                                                return null;
                                            }
                                        })}
                                    </div>
                                </div>
                            )}




                        {/* qualification field */}
                        {qualifications.some(qualification => qualification && Object.values(qualification).some(value => value !== '')) && (
                            <div>
                                <h1 className='uppercase mt-10 ml-12' style={{ letterSpacing: '4px', fontSize: '18px', fontWeight: 'bold' }}>{experienceTitle}</h1>
                                <div className="mx-10 p-8 relative" style={{ width: '100%' }}>
                                    <div className="absolute left-2 top-12 bottom-10 bg-[#0d9488] w-0.5"></div>
                                    {qualifications.map((qualification, index) => (
                                        Object.values(qualification).some(value => value !== '') && (
                                            <div key={index} className='relative mb-10 pl-1'>
                                                <div className="absolute top-4 w-5 h-5 bg-white border-2 border-[#0d9488] rounded-full" style={{ left: '-33.7px' }}></div>
                                                {qualification.year && (
                                                    <p className="pt-1 mb-2 uppercase -ml-2" style={{ fontSize: '17px', fontWeight: 'bold' }}>{qualification.year}</p>
                                                )}
                                                {qualification.technicalSkills && (
                                                    <p className="text-lg  font-bold -ml-2" style={{ maxWidth: '80%', wordWrap: 'break-word', fontSize: '16px' }}>{qualification.technicalSkills}</p>
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

                        {/* custom field */}

                        {customData && customData.length > 0 && customFieldTitle && (
                            <div>
                                <h1 className='uppercase mt-10 ml-12' style={{ letterSpacing: '4px', fontSize: '18px', fontWeight: 'bold' }}>{customFieldTitle}</h1>
                                <div className="mx-10 py-5 px-5 relative" style={{ width: '100%' }}>
                                    <div className="absolute left-2 top-20 bottom-4 bg-[#0d9488] w-0.5"></div>
                                    {customData.map((data, index) => (
                                        <div key={index} className="pt-8 relative pl-2">
                                            <div className="absolute top-12 w-5 h-5 bg-white border-2 border-[#0d9488] rounded-full" style={{ left: '-20.7px' }}></div>
                                            {data.date && (
                                                <p className="pt-1 mb-2 uppercase" style={{ fontSize: '17px', fontWeight: 'bold' }}>{data.date}</p>
                                            )}
                                            {data.title && (
                                                <p className="text-lg font-bold" style={{ maxWidth: '80%', wordWrap: 'break-word', fontSize: '16px' }}>{data.title}</p>
                                            )}
                                            {data.subtitle && (
                                                <p>{data.subtitle}</p>
                                            )}
                                            {/* Add more fields as needed */}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}


                    </div>
                </div>
            </div>

            <div>
                <div className="mt-4 flex justify-center">
                    <button className="bg-[#C3202B]  text-white font-bold py-2 px-4 rounded" onClick={generatePdf}><FaDownload /></button>
                </div>
                <div className="mt-4 flex justify-center">
                    <Link to={`/updatePdf/${PdfInfo._id}`}>
                        <button className="bg-[#C3202B]  text-white font-bold py-2 px-4 rounded" ><FaEdit /></button></Link>
                </div>
            </div>
        </div >
    );
};

export default ArchiveCVdetails;