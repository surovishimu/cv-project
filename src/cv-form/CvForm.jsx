import { useState } from "react";
import { LuPlus, LuPlusCircle } from "react-icons/lu";
import { HiOutlineMinus, HiOutlineMinusCircle } from "react-icons/hi";
import { HiUser } from "react-icons/hi2";
import { HiOutlinePlus } from "react-icons/hi2";
import { HiLocationMarker, HiPhone, HiMail } from "react-icons/hi";
import { GrLinkedinOption } from "react-icons/gr";


const CvForm = () => {
    const [skills, setSkills] = useState([
        { name: 'Communication Skill', level: 50 },
        { name: 'Team Leading', level: 70 },
        { name: 'Reasoning and Problem Solving', level: 60 },
        { name: 'Navigation Skills', level: 80 }
    ]);
    const [englishSkill, setEnglishSkill] = useState({ name: 'English', level: 50 });
    const [germanSkill, setGermanSkill] = useState({ name: 'German', level: 50 });


    // Function to update skill name or level
    const updateSkill = (index, field, value) => {
        const updatedSkills = [...skills];
        updatedSkills[index][field] = value;
        setSkills(updatedSkills);
    };
    const updateLanguageSkill = (language, field, value) => {
        if (language === 'English') {
            setEnglishSkill(prevSkill => ({ ...prevSkill, [field]: value }));
        } else if (language === 'German') {
            setGermanSkill(prevSkill => ({ ...prevSkill, [field]: value }));
        }
    };
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };
    const uploadImageToCloudinary = async () => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "mycloud"); // Replace with your Cloudinary upload preset

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/dh7r22hsh/image/upload", {
                method: "POST",
                body: formData
            });
            if (!response.ok) {
                throw new Error("Failed to upload image to Cloudinary");
            }
            const data = await response.json();
            setImageUrl(data.secure_url);
            return data.secure_url; // Return the secure URL of the uploaded image
        } catch (error) {
            console.error("Error uploading image to Cloudinary:", error);
            return null;
        }
    };

    const [value, setValue] = useState(""); // State to store the input value

    const descriptionHandleChange = (event) => {
        setValue(event.target.value); // Update the state with the input value
    };
    const [experienceFields, setExperienceFields] = useState([{ experienceStart: '', experienceEnd: '', experienceJobTitle: '', companyName: '', location: '', professionalSummary: '' }]);
    const [educationFields, setEducationFields] = useState([{ eduPassDate: '', schoolName: '', edulocation: '', degree: '', major: '', curricularActivity: '', additionalNotes: '' }]);
    const [qualificationFields, setQualificationFields] = useState([{ year: '', technicalSkills: '', additionalQualifications: '' }]);


    const addField = (setter) => {
        setter((prevFields) => [...prevFields, {}]);
    };

    const removeField = (index, setter) => {
        setter((prevFields) => prevFields.filter((_, i) => i !== index));
    };

    const handleChange = (index, field, value, setter) => {
        setter((prevFields) => {
            const updatedFields = [...prevFields];
            updatedFields[index][field] = value;
            return updatedFields;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const imageUrl = await uploadImageToCloudinary();
        // Gather form data from state variables
        const name = e.target.name.value;
        const jobtitle = e.target.jobtitle2.value;
        const experiences = experienceFields.map(experience => ({ ...experience }));
        const education = educationFields.map(education => ({ ...education }));
        const qualifications = qualificationFields.map(qualification => ({ ...qualification }));

        const formData = {
            name,
            jobtitle,
            experiences,
            education,
            qualifications,
            imageUrl
        };

        // Send form data to the server
        try {
            const response = await fetch('http://localhost:5000/userInfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Handle successful response here
            console.log('Form data submitted successfully!');
        } catch (error) {
            // Handle error here
            console.error('There was a problem with your fetch operation:', error);
        }
    };

    return (
        <>

            <div className='w-4/5'>
                <form onSubmit={handleSubmit}>
                    <div className='w-full flex'>
                        <div className='w-2/6 bg-customRed'>
                            <div>
                                <div className="w-[129px] h-[128px] bg-white rounded-full relative mx-auto my-16">
                                    <label htmlFor="image">
                                        <input
                                            type="file"
                                            id="image"
                                            name="image"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />

                                        <div className="w-[129px] h-[128px] bg-white rounded-full flex items-center justify-center relative">
                                            {imageUrl ? (
                                                <img src={imageUrl} alt="Selected" className="w-full h-full object-cover" />
                                            ) : (
                                                <HiUser className="w-24 h-24 mx-auto text-[#a3a3a3] mt-[43px]" />
                                            )}
                                            <div className="bg-[#F1F1F1] rounded-full absolute right-1 top-24">
                                                <HiOutlinePlus className="m-2 text-[#525252] text-2xl " />
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <h1 className=" text-start  font-semibold mb-3 text-2xl text-white  ml-10">Profile</h1>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder=""
                                    className="bg-customRed border border-[#d4d4d8] text-white h-20 w-56 mx-auto pl-4 outline-none text-left ml-10 "
                                    value={value}
                                    onChange={descriptionHandleChange}
                                    style={{ textIndent: "0" }} // Set text-indent to 0
                                />
                                {/* Render placeholder text only if input value is empty */}
                                {value === "" && (
                                    <div className="absolute bottom-0 left-0 text-gray-400 pl-12 pb-2"><small>Profile Description</small></div>
                                )}
                            </div>


                            <div>
                                <h1 className="text-2xl text-white font-semibold ml-10 mt-10">
                                    Skills
                                </h1>
                                <div className="ml-10">
                                    {skills.map((skill, index) => (
                                        <div key={index} className="mt-5">
                                            <h1 className="text-white mb-2">{skill.name}</h1>
                                            <button type="button" onClick={() => updateSkill(index, 'level', Math.max(skill.level - 10, 0))}>
                                                <HiOutlineMinus className="text-customgray mr-1" />
                                            </button>
                                            <input
                                                type="range"
                                                min={0}
                                                max="100"
                                                value={skill.level}
                                                className="range range-xs w-2/3"
                                                onChange={(e) => updateSkill(index, 'level', parseInt(e.target.value))}
                                            />
                                            <button type="button" onClick={() => updateSkill(index, 'level', Math.min(skill.level + 10, 100))}>
                                                <LuPlus className="text-customgray ml-1 " />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h1 className="text-2xl text-white font-semibold ml-10 mt-10">
                                    Language Skills
                                </h1>
                                <div className="ml-10">
                                    <div className="mt-5">
                                        <h1 className="text-white mb-2">English</h1>
                                        <button type="button" onClick={() => updateLanguageSkill('English', 'level', Math.max(englishSkill.level - 10, 0))}>
                                            <HiOutlineMinus className="text-customgray mr-1" />
                                        </button>
                                        <input
                                            type="range"
                                            min={0}
                                            max="100"
                                            value={englishSkill.level}
                                            className="range range-xs w-2/3"
                                            onChange={(e) => updateLanguageSkill('English', 'level', parseInt(e.target.value))}
                                        />
                                        <button type="button" onClick={() => updateLanguageSkill('English', 'level', Math.min(englishSkill.level + 10, 100))}>
                                            <LuPlus className="text-customgray ml-1" />
                                        </button>
                                    </div>
                                    <div className="mt-5">
                                        <h1 className="text-white mb-2">German</h1>
                                        <button type="button" onClick={() => updateLanguageSkill('German', 'level', Math.max(germanSkill.level - 10, 0))}>
                                            <HiOutlineMinus className="text-customgray mr-1" />
                                        </button>
                                        <input
                                            type="range"
                                            min={0}
                                            max="100"
                                            value={germanSkill.level}
                                            className="range range-xs w-2/3"
                                            onChange={(e) => updateLanguageSkill('German', 'level', parseInt(e.target.value))}
                                        />
                                        <button type="button" onClick={() => updateLanguageSkill('German', 'level', Math.min(germanSkill.level + 10, 100))}>
                                            <LuPlus className="text-customgray ml-1" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl text-white font-semibold ml-10 mt-10">Contact Information </h1>
                                <div className="ml-10 mt-5 relative">
                                    <input className="h-8 w-56 p-2 pl-8 bg-customRed border outline-none border-customgray" type="text" placeholder=" " />
                                    <HiLocationMarker className="absolute top-2 left-2 text-customgray" />
                                </div>
                                <div className="ml-10 mt-5 relative">
                                    <input className="h-8 w-56 p-2 pl-8 bg-customRed border outline-none border-customgray" type="text" placeholder=" " />
                                    <HiPhone className="absolute top-2 left-2 text-customgray" />
                                </div>
                                <div className="ml-10 mt-5 relative">
                                    <input className="h-8 w-56 p-2 pl-8 bg-customRed border outline-none border-customgray" type="text" placeholder=" " />
                                    <HiMail className="absolute top-2 left-2 text-customgray" />
                                </div>
                                <div className="ml-10 mt-5 relative">
                                    <input className="h-8 w-56 p-2 pl-8 bg-customRed border outline-none border-customgray" type="text" placeholder=" " />
                                    <GrLinkedinOption className="absolute top-2 left-2 text-customgray" />
                                </div>
                            </div>
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
                                    id="jobtitle2"
                                    name="jobtitle2"
                                    placeholder='Job Title'
                                    className="w-2/3 px-4 py-2 border-b-2 border-gray-400 outline-none ml-20 bg-customgray"
                                />
                            </div>
                            <h1 className="text-xl font-bold mt-20 ml-10 mb-5">Professional experience</h1>

                            {/* Professional experience fiels */}
                            <div className="bg-customgray mx-10 py-5 px-5">
                                {experienceFields.map((experience, index) => (
                                    <div key={index} className="mb-4">

                                        <input
                                            type="date"
                                            id={`experienceStart_${index}`}
                                            name={`experienceStart_${index}`}
                                            value={experience.experienceStart}
                                            onChange={(e) => handleChange(index, 'experienceStart', e.target.value, setExperienceFields)}
                                            className="py-2 px-4 mb-2 border-b-2 border-gray-400 outline-none bg-customgray"
                                        />
                                        <input
                                            type="date"
                                            id={`experienceEnd_${index}`}
                                            name={`experienceEnd_${index}`}
                                            value={experience.experienceEnd}
                                            onChange={(e) => handleChange(index, 'experienceEnd', e.target.value, setExperienceFields)}
                                            className="py-2 px-4 mb-2 border-b-2 border-gray-400 outline-none bg-customgray"
                                        />
                                        <input
                                            type="text"
                                            id={`jobTitle_${index}`}
                                            name={`jobTitle_${index}`}
                                            value={experience.jobTitle}
                                            onChange={(e) => handleChange(index, 'jobTitle', e.target.value, setExperienceFields)}
                                            placeholder='Job Title'
                                            className="w-9/12 px-4 py-2 mb-2 border-b-2 border-gray-400 outline-none bg-customgray"
                                        />
                                        <input
                                            type="text"
                                            id={`companyName_${index}`}
                                            name={`companyName_${index}`}
                                            value={experience.companyName}
                                            onChange={(e) => handleChange(index, 'companyName', e.target.value, setExperienceFields)}
                                            placeholder='Company Name'
                                            className="w-9/12 px-4 py-2 mb-2 border-b-2 border-gray-400 outline-none bg-customgray"
                                        />
                                        <input
                                            type="text"
                                            id={`location_${index}`}
                                            name={`location_${index}`}
                                            value={experience.location}
                                            onChange={(e) => handleChange(index, 'location', e.target.value, setExperienceFields)}
                                            placeholder='Location'
                                            className="w-9/12 px-4 py-2 mb-2 border-b-2 border-gray-400 outline-none bg-customgray"
                                        />
                                        <input
                                            type="text"
                                            id={`professionalSummary_${index}`}
                                            name={`professionalSummary_${index}`}
                                            value={experience.professionalSummary}
                                            onChange={(e) => handleChange(index, 'professionalSummary', e.target.value, setExperienceFields)}
                                            placeholder='Professional Summary'
                                            className="w-9/12 px-4 py-2 mb-4 border-b-2 border-gray-400 outline-none bg-customgray"
                                        />

                                        <div>

                                            <button type="button" onClick={() => removeField(index, setExperienceFields)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2" disabled={experienceFields.length === 1}>
                                                -
                                            </button>
                                            <button type="button" onClick={() => addField(setExperienceFields)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                                +
                                            </button>
                                        </div>
                                    </div>


                                ))}

                            </div>

                            {/* Education field */}
                            <div>
                                <h1 className="text-xl font-bold mt-20 ml-10 mb-5">Education</h1>
                                <div className="bg-customgray mx-10 py-5 px-5">
                                    {educationFields.map((education, index) => (
                                        <div key={index} className="mb-4">
                                            <input
                                                type="date"
                                                id={`eduPassDate_${index}`}
                                                name={`eduPassDate_${index}`}
                                                value={education.eduPassDate}
                                                onChange={(e) => handleChange(index, 'eduPassDate', e.target.value, setEducationFields)}
                                                className="py-2 px-4 mb-2 border-b-2 border-gray-400 outline-none bg-customgray"
                                            />
                                            <input
                                                type="text"
                                                id={`schoolName_${index}`}
                                                name={`schoolName_${index}`}
                                                value={education.schoolName}
                                                onChange={(e) => handleChange(index, 'schoolName', e.target.value, setEducationFields)}
                                                placeholder='School/University Name'
                                                className="w-9/12 px-4 py-2 mb-2 border-b-2 border-gray-400 outline-none bg-customgray"
                                            />
                                            <input
                                                type="text"
                                                id={`edulocation_${index}`}
                                                name={`edulocation_${index}`}
                                                value={education.edulocation}
                                                onChange={(e) => handleChange(index, 'edulocation', e.target.value, setEducationFields)}
                                                placeholder='Location'
                                                className="w-9/12 px-4 py-2 mb-2 border-b-2 border-gray-400 outline-none bg-customgray"
                                            />
                                            <input
                                                type="text"
                                                id={`degree_${index}`}
                                                name={`degree_${index}`}
                                                value={education.degree}
                                                onChange={(e) => handleChange(index, 'degree', e.target.value, setEducationFields)}
                                                placeholder='Degree Obtained'
                                                className="w-9/12 px-4 py-2 mb-2 border-b-2 border-gray-400 outline-none bg-customgray"
                                            />
                                            <input
                                                type="text"
                                                id={`major_${index}`}
                                                name={`major_${index}`}
                                                value={education.major}
                                                onChange={(e) => handleChange(index, 'major', e.target.value, setEducationFields)}
                                                placeholder='Major/Field of Study'
                                                className="w-9/12 px-4 py-2 mb-2 border-b-2 border-gray-400 outline-none bg-customgray"
                                            />
                                            <input
                                                type="text"
                                                id={`curricularActivity_${index}`}
                                                name={`curricularActivity_${index}`}
                                                value={education.curricularActivity}
                                                onChange={(e) => handleChange(index, 'curricularActivity', e.target.value, setEducationFields)}
                                                placeholder='Extracurricular Activity'
                                                className="w-9/12 px-4 py-2 mb-2 border-b-2 border-gray-400 outline-none bg-customgray"
                                            />
                                            <input
                                                type="text"
                                                id={`additionalNotes_${index}`}
                                                name={`additionalNotes_${index}`}
                                                value={education.additionalNotes}
                                                onChange={(e) => handleChange(index, 'additionalNotes', e.target.value, setEducationFields)}
                                                placeholder='Additional Notes'
                                                className="w-9/12 px-4 py-2 mb-4 border-b-2 border-gray-400 outline-none bg-customgray"
                                            />

                                            <div>

                                                <button type="button" onClick={() => removeField(index, setEducationFields)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2" disabled={educationFields.length === 1}>
                                                    -
                                                </button>
                                                <button type="button" onClick={() => addField(setEducationFields)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>

                            {/* Qualifications field */}
                            <div>
                                <h1 className="text-xl font-bold mt-20 ml-10 mb-5">Qualifications</h1>
                                <div className="bg-customgray mx-10 py-5 px-5 relative">
                                    {qualificationFields.map((qualification, index) => (
                                        <div key={index} className="pt-8 relative">
                                            <input
                                                type="text"
                                                id={`year_${index}`}
                                                name={`year_${index}`}
                                                value={qualification.year}
                                                onChange={(e) => handleChange(index, 'year', e.target.value, setQualificationFields)}
                                                placeholder='Year'
                                                className="w-9/12 px-4 py-2 mb-2 border-b-2 border-gray-400 outline-none bg-customgray"
                                            />
                                            <input
                                                type="text"
                                                id={`technicalSkills_${index}`}
                                                name={`technicalSkills_${index}`}
                                                value={qualification.technicalSkills}
                                                onChange={(e) => handleChange(index, 'technicalSkills', e.target.value, setQualificationFields)}
                                                placeholder='Technical skills'
                                                className="w-9/12 px-4 py-2 mb-2 border-b-2 border-gray-400 outline-none bg-customgray"
                                            />
                                            <input
                                                type="text"
                                                id={`additionalQualifications_${index}`}
                                                name={`additionalQualifications_${index}`}
                                                value={qualification.additionalQualifications}
                                                onChange={(e) => handleChange(index, 'additionalQualifications', e.target.value, setQualificationFields)}
                                                placeholder='Additional Qualifications'
                                                className="w-9/12 px-4 py-2 mb-4 border-b-2 border-gray-400 outline-none bg-customgray"
                                            />

                                            <div>
                                                <button type="button" onClick={() => removeField(index, setQualificationFields)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2" disabled={qualificationFields.length === 1}>
                                                    -
                                                </button>
                                                <button type="button" onClick={() => addField(setQualificationFields)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                </div>
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
