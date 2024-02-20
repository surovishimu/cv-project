import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';

const PdfDownload = () => {
    const location = useLocation();
    const { search } = location;
    const formData = Object.fromEntries(new URLSearchParams(search));
    const contentRef = useRef(null);

    console.log(formData.experiences); // Add this line for debugging

    return (
        <div className='w-4/5'>
            <div className="flex flex-col items-center h-screen">
                <div className="flex w-full">
                    <div className='bg-customRed w-2/6'>
                        <h1>photo</h1>
                    </div>
                    <div className='w-4/6' ref={contentRef}>
                        <div className='bg-customgray w-full mt-24 px-20 py-8'>
                            <p className='font-bold text-5xl'>{formData.name}</p>
                            <p className='font-semibold text-2xl'>{formData.jobtitle}</p>
                            {/* Render experiences only if it's an array */}
                            {Array.isArray(formData.experiences) && formData.experiences.map((experience, index) => (
                                <div key={index} className="mt-5 p-8 -mb-4 flex">
                                    <input
                                        type="date"
                                        value={experience.experienceStart}
                                        className="py-2 ml-14 bg-customgray"
                                        readOnly
                                    />
                                    <input
                                        type="date"
                                        value={experience.experienceEnd}
                                        className="py-2 ml-20 bg-customgray"
                                        readOnly
                                    />
                                    <div className="w-full">
                                        <p className="text-lg font-semibold">{experience.jobtitle}</p>
                                        <p>{experience.companyName}</p>
                                        <p>{experience.location}</p>
                                        <p>{experience.professionalSummary}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <button>Download PDF</button>
                </div>
            </div>
        </div>
    );
};

export default PdfDownload;
