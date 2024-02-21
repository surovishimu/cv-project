import React, { useState, useEffect } from 'react';

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

    const { name, jobtitle, experiences, education, qualifications, imageUrl } = formData;

    return (
        <div className="w-4/5 ">
            <div className="flex ">
                <div>
                    <div className="w-2/6 bg-customRed ">
                        <img src={imageUrl} alt="Profile" className="w-44 h-44 rounded-full object-cover mx-auto mt-20" />
                    </div>
                    
                </div>

                <div className="w-4/6 ">
                    <div className="bg-customgray mt-24 p-8">
                        <p className="text-2xl mb-4">{name}</p>
                        <p className="text-2xl mb-4">{jobtitle}</p>
                    </div>
                    <div className="bg-customgray mx-10 mt-4 p-8">
                        {experiences.map((experience, index) => (
                            <div key={index}>
                                <p className="text-2xl mb-4">{experience.experienceStart}</p>
                                <p className="text-2xl mb-4">{experience.experienceEnd}</p>
                                <p className="text-2xl mb-4">{experience.experienceJobTitle}</p>
                                <p className="text-2xl mb-4">{experience.companyName}</p>
                                <p className="text-2xl mb-4">{experience.location}</p>
                                <p className="text-2xl mb-4">{experience.professionalSummary}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bg-customgray mx-10 mt-4 p-8">
                        {education.map((educationItem, index) => (
                            <div key={index}>
                                <p className="text-2xl mb-4">{educationItem.eduPassDate}</p>
                                <p className="text-2xl mb-4">{educationItem.schoolName}</p>
                                <p className="text-2xl mb-4">{educationItem.edulocation}</p>
                                <p className="text-2xl mb-4">{educationItem.degree}</p>
                                <p className="text-2xl mb-4">{educationItem.major}</p>
                                <p className="text-2xl mb-4">{educationItem.curricularActivity}</p>
                                <p className="text-2xl mb-4">{educationItem.additionalNotes}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bg-customgray mx-10 mt-4 p-8">
                        {qualifications.map((qualification, index) => (
                            <div key={index}>
                                <p className="text-2xl mb-4">{qualification.year}</p>
                                <p className="text-2xl mb-4">{qualification.technicalSkills}</p>
                                <p className="text-2xl mb-4">{qualification.additionalQualifications}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PdfDownload;
