import { useEffect, useState } from "react";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

const CvForm = () => {
    const navigate = useNavigate();
    const [experienceFields, setExperienceFields] = useState([{ id: 1 }]);
    const [educationFields, setEducationFields] = useState([{ id: 1 }]);
    const [qualificationFields, setQualificationFields] = useState([{ id: 1 }]);
    const [formData, setFormData] = useState({
        name: "",
        jobtitle: "",
        experiences: [],
        education: [],
        qualifications: []
    });
    useEffect(() => {
        console.log(formData);
    }, [formData]);
    const handleAddExperienceField = () => {
        if (experienceFields.length < 10) {
            const newId = experienceFields[experienceFields.length - 1].id + 1;
            setExperienceFields([...experienceFields, { id: newId }]);
        }
    };

    const handleRemoveExperienceField = (id) => {
        setExperienceFields(experienceFields.filter(field => field.id !== id));
    };
    const handleAddEducationField = () => {
        if (educationFields.length < 10) {
            const newId = educationFields[educationFields.length - 1].id + 1;
            setEducationFields([...educationFields, { id: newId }]);
        }
    };

    const handleRemoveEducationField = (id) => {
        setEducationFields(educationFields.filter(field => field.id !== id));
    };
    const handleAddQualificationField = () => {
        if (qualificationFields.length < 10) {
            const newId = qualificationFields[qualificationFields.length - 1].id + 1;
            setQualificationFields([...qualificationFields, { id: newId }]);
        }
    };

    const handleRemoveQualificationField = (id) => {
        setQualificationFields(qualificationFields.filter(field => field.id !== id));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const jobtitle = form.jobtitle.value;

        // Collect experience data
        const experiences = experienceFields.map(field => ({
            experienceStart: form[`experienceStart_${field.id}`].value,
            experienceEnd: form[`experienceEnd_${field.id}`].value,
            jobtitle: form[`jobtitle_${field.id}`].value,
            companyName: form[`companyName_${field.id}`].value,
            location: form[`location_${field.id}`].value,
            professionalSummary: form[`professionalSummary_${field.id}`].value
        }));

        // Collect education data
        const education = educationFields.map(field => ({
            eduPassDate: form[`eduPassDate_${field.id}`].value,
            schoolName: form[`schoolName_${field.id}`].value,
            edulocation: form[`edulocation_${field.id}`].value,
            degree: form[`degree_${field.id}`].value,
            major: form[`major_${field.id}`].value,
            curricularActivity: form[`curricularActivity_${field.id}`].value,
            additionalNotes: form[`additionalNotes_${field.id}`].value
        }));

        // Collect qualification data
        const qualifications = qualificationFields.map(field => ({
            year: form[`year_${field.id}`].value,
            technicalSkills: form[`technicalSkills_${field.id}`].value,
            additionalQualifications: form[`additionalQualifications_${field.id}`].value
        }));

        // Update formData state with all collected data
        setFormData({
            name,
            jobtitle,
            experiences,
            education,
            qualifications
        });
        console.log(formData);
        // Construct query parameters
        const queryParams = new URLSearchParams({
            name,
            jobtitle,
            experiences: JSON.stringify(experiences),
            education: JSON.stringify(education),
            qualifications: JSON.stringify(qualifications)
        }).toString();

        // Navigate to the PdfDownload component with query parameters
        navigate(`/pdf?${queryParams}`);
    };

    return (
        <>
            <div className='w-4/5'>
                <form onSubmit={handleSubmit}>
                    <div className='flex w-full '>
                        <div className='w-2/6 bg-customRed'>
                            hi
                        </div>

                        <div className='w-4/6 '>
                            <div className="bg-customgray w-full mt-24 p-8">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder='Full Name'
                                    className="w-2/3 px-4 py-2 border-b-2 border-gray-400 outline-none ml-20 bg-customgray"
                                    style={{ 'fontSize': '22px' }}
                                />
                                <input
                                    type="text"
                                    id="job-title"
                                    name="jobtitle"
                                    placeholder='Job Title'
                                    className="w-2/3 px-4 py-2 border-b-2 border-gray-400 outline-none ml-20 bg-customgray"
                                />
                            </div>
                            <h1 className="text-xl font-bold mt-20 ml-10 mb-5">Professional experience</h1>
                            <div className="bg-customgray mx-10 py-5">
                                {experienceFields.map((field, index) => (
                                    <div className="" key={field.id}>
                                        <div className="bg-customgray mt-5 p-8 -mb-4 flex">
                                            <input
                                                type="date"
                                                id={`experienceStart_${field.id}`}
                                                name={`experienceStart_${field.id}`}
                                                className=" py-2  ml-14 bg-customgray"
                                            />
                                            <input
                                                type="date"
                                                id={`experienceEnd_${field.id}`}
                                                name={`experienceEnd_${field.id}`}
                                                className=" py-2  ml-20 bg-customgray"
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            id={`jobtitle_${field.id}`}
                                            name={`jobtitle_${field.id}`}
                                            placeholder='Job Title'
                                            className="w-9/12 px-4 py-2 border-b-2 border-gray-400 outline-none ml-20 bg-customgray"

                                        />
                                        <input
                                            type="text"
                                            id={`companyName_${field.id}`}
                                            name={`companyName_${field.id}`}
                                            placeholder='Company Name'
                                            className="w-9/12 px-4 py-2 border-b-2 border-gray-400 outline-none ml-20 bg-customgray mt-4"

                                        />
                                        <input
                                            type="text"
                                            id={`location_${field.id}`}
                                            name={`location_${field.id}`}
                                            placeholder='Location'
                                            className="w-9/12 px-4 py-2 border-b-2 border-gray-400 outline-none ml-20 bg-customgray mt-4"

                                        />
                                        <input
                                            type="text"
                                            id={`professionalSummary_${field.id}`}
                                            name={`professionalSummary_${field.id}`}
                                            placeholder='Professional Summary'
                                            className="w-9/12 px-4 py-2 border-b-2 border-gray-400 outline-none ml-20 bg-customgray mt-16"

                                        />
                                        <div className="flex justify-center mt-5 gap-4">
                                            {index === experienceFields.length - 1 && experienceFields.length < 10 && (
                                                <button type="button" onClick={handleAddExperienceField}>
                                                    <CiCirclePlus className="text-4xl" />
                                                </button>
                                            )}
                                            {experienceFields.length > 1 && (
                                                <button type="button" onClick={() => handleRemoveExperienceField(field.id)}>
                                                    <CiCircleMinus className="text-4xl" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <h1 className="text-xl font-bold mt-20 ml-10 mb-5">Education</h1>
                            <div className="bg-customgray mx-10 py-5">
                                {educationFields.map((field, index) => (
                                    <div className="" key={field.id}>

                                        <input
                                            type="date"
                                            id={`eduPassDate_${field.id}`}
                                            name={`eduPassDate_${field.id}`}
                                            className=" py-2  ml-14 bg-customgray"
                                        />


                                        <input
                                            type="text"
                                            id={`schoolName_${field.id}`}
                                            name={`schoolName_${field.id}`}
                                            placeholder='School/University Name'
                                            className="w-9/12 px-4 py-2 border-b-2 border-gray-400 outline-none ml-20 bg-customgray"

                                        />
                                        <input
                                            type="text"
                                            id={`edulocation_${field.id}`}
                                            name={`edulocation_${field.id}`}
                                            placeholder='Location'
                                            className="w-9/12 px-4 py-2 border-b-2 border-gray-400 outline-none ml-20 bg-customgray mt-4"

                                        />
                                        <input
                                            type="text"
                                            id={`degree_${field.id}`}
                                            name={`degree_${field.id}`}
                                            placeholder='Degree Obtained'
                                            className="w-9/12 px-4 py-2 border-b-2 border-gray-400 outline-none ml-20 bg-customgray mt-4"

                                        />
                                        <input
                                            type="text"
                                            id={`major_${field.id}`}
                                            name={`major_${field.id}`}
                                            placeholder='Major/Field of Study'
                                            className="w-9/12 px-4 py-2 border-b-2 border-gray-400 outline-none ml-20 bg-customgray mt-4"

                                        />
                                        <input
                                            type="text"
                                            id={`curricularActivity_${field.id}`}
                                            name={`curricularActivity_${field.id}`}
                                            placeholder='Extracurricular Activities (optional)'
                                            className="w-9/12 px-4 py-2 border-b-2 border-gray-400 outline-none ml-20 bg-customgray mt-4"

                                        />
                                        <input
                                            type="text"
                                            id={`additionalNotes_${field.id}`}
                                            name={`additionalNotes_${field.id}`}
                                            placeholder='Additional Notes (optional)'
                                            className="w-9/12 px-4 py-2 border-b-2 border-gray-400 outline-none ml-20 bg-customgray mt-4"

                                        />
                                        <div className="flex justify-center mt-5 gap-4">
                                            {index === educationFields.length - 1 && educationFields.length < 10 && (
                                                <button type="button" onClick={handleAddEducationField}>
                                                    <CiCirclePlus className="text-4xl" />
                                                </button>
                                            )}
                                            {educationFields.length > 1 && (
                                                <button type="button" onClick={() => handleRemoveEducationField(field.id)}>
                                                    <CiCircleMinus className="text-4xl" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <h1 className="text-xl font-bold mt-20 ml-10 mb-5">Qualifications</h1>
                            <div className="bg-customgray mx-10 py-5">
                                {qualificationFields.map((field, index) => (
                                    <div className="" key={field.id}>

                                        <input
                                            type="text"
                                            id={`year_${field.id}`}
                                            name={`year_${field.id}`}
                                            placeholder='Year'
                                            className="w-9/12 px-4 py-2 border-b-2 border-gray-400 outline-none ml-20 bg-customgray"

                                        />
                                        <input
                                            type="text"
                                            id={`technicalSkills_${field.id}`}
                                            name={`technicalSkills_${field.id}`}
                                            placeholder='Technical skills'
                                            className="w-9/12 px-4 py-2 border-b-2 border-gray-400 outline-none ml-20 bg-customgray mt-4"

                                        />
                                        <input
                                            type="text"
                                            id={`additionalQualifications_${field.id}`}
                                            name={`additionalQualifications_${field.id}`}
                                            placeholder='Additional Qualifications'
                                            className="w-9/12 px-4 py-2 border-b-2 border-gray-400 outline-none ml-20 bg-customgray mt-16"

                                        />

                                        <div className="flex justify-center mt-5 gap-4">
                                            {index === qualificationFields.length - 1 && qualificationFields.length < 10 && (
                                                <button type="button" onClick={handleAddQualificationField}>
                                                    <CiCirclePlus className="text-4xl" />
                                                </button>
                                            )}
                                            {qualificationFields.length > 1 && (
                                                <button type="button" onClick={() => handleRemoveQualificationField(field.id)}>
                                                    <CiCircleMinus className="text-4xl" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                    </div>
                </form>

            </div>

        </>
    );
};

export default CvForm;