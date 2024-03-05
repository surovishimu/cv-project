import { useEffect, useState } from "react";
import { HiOutlineMinus, HiOutlineTrash, HiPlus } from "react-icons/hi";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { HiUser } from "react-icons/hi2";
import { HiOutlinePlus } from "react-icons/hi2";
import { HiLocationMarker, HiPhone, HiMail } from "react-icons/hi";
import { GrLinkedinOption } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import './style.css'
import { LuPlus } from "react-icons/lu";
import { useFormData } from "./FormDataProvider";
import swal from "sweetalert";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";


const CvForm = () => {
    const navigate = useNavigate();

    const { formData, setFormData } = useFormData();
    // qualification title change
    const [experienceTitle, setExperienceTitle] = useState('Qualifications');
    const handleExperienceTitleChange = (e) => {
        setExperienceTitle(e.target.value);
    };


    // function for skills
    const [skills, setSkills] = useState([{ id: 1, name: '' }]);

    const addSkillInput = () => {
        const newId = skills.length + 1;
        setSkills([...skills, { id: newId, name: '' }]);
    };

    const removeSkillInput = (idToRemove) => {
        setSkills(prevSkills => prevSkills.filter(skill => skill.id !== idToRemove));
    };

    const handleSkillChange = (id, value) => {
        const updatedSkills = skills.map(skill => {
            if (skill.id === id) {
                return { ...skill, name: value };
            }
            return skill;
        });
        setSkills(updatedSkills);
    };
    // function for language skill
    const [languages, setLanguages] = useState([
        { id: 1, name: 'English', level: 50 },
        { id: 2, name: 'German', level: 30 }
    ]);
    const [newLanguage, setNewLanguage] = useState('');

    const updateLanguageSkill = (id, field, value) => {
        const updatedLanguages = languages.map(language =>
            language.id === id ? { ...language, [field]: value } : language
        );
        setLanguages(updatedLanguages);
    };

    const handleAddLanguage = () => {
        if (newLanguage.trim() !== '') {
            setLanguages([...languages, { id: Date.now(), name: newLanguage, level: 0 }]);
            setNewLanguage('');
        }
    };

    const handleRemoveLanguage = (id) => {
        const updatedLanguages = languages.filter(language => language.id !== id);
        setLanguages(updatedLanguages);
    };


    // function for profile image

    const [imageUrl, setImageUrl] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setImageUrl(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const uploadImageToCloudinary = async () => {
        const formData = new FormData();
        formData.append("file", imageUrl);
        formData.append("upload_preset", "mycloud");

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
    // achivement field function
    const [achievementFields, setAchievementFields] = useState([
        { achievement: '' } // Initial field
    ]);

    const addAchievementField = () => {
        setAchievementFields(prevAchievementFields => [
            ...prevAchievementFields,
            { achievement: '' } // Add a new empty achievement field
        ]);
    };

    const removeAchievementField = (index) => {
        setAchievementFields(prevAchievementFields => {
            if (prevAchievementFields.length === 1) {
                return prevAchievementFields;
            }
            return prevAchievementFields.filter((_, idx) => idx !== index);
        });
    };

    // function for profile description
    const [value, setValue] = useState("");
    const [value2, setValue2] = useState("");
    const descriptionHandleChange = (event) => {
        setValue(event.target.value); // Update the state with the input value
    };
    const descriptionHandleChange2 = (event) => {
        setValue2(event.target.value); // Update the state with the input value
    };


    const [experienceFields, setExperienceFields] = useState([{ experienceStart: '', experienceEnd: '', experienceJobTitle: '', companyName: '', location: '', professionalSummary: '' }]);

    const [educationFields, setEducationFields] = useState([
        { eduPassDate: '', eduEndDate: '', schoolName: '', edulocation: '', degree: '', major: '', curricularActivity: '', additionalNotes: '' }
    ]);
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
    // professional experience textarea

    const handleTextareaKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default behavior of textarea
            const { selectionStart, value } = e.target;

            // Get the text before and after the cursor position
            const textBeforeCursor = value.slice(0, selectionStart);
            const textAfterCursor = value.slice(selectionStart);

            // Insert a new line with a bullet point at the current cursor position
            const newLineWithBullet = '- ' + textAfterCursor;
            const newValue = textBeforeCursor + '\n' + newLineWithBullet;

            // Set the new value of the textarea
            e.target.value = newValue;

            // Move the cursor to the end of the newly inserted line
            const newPosition = selectionStart + 3 + 1; // Move cursor after the bullet point and the new line character
            e.target.setSelectionRange(newPosition, newPosition);
        }
    };

    // function for custom field

    const [customFields, setCustomFields] = useState([{ name: "", value: "" }]);

    const handleCustomFieldChange = (index, field, value) => {
        const updatedCustomFields = [...customFields];
        updatedCustomFields[index][field] = value;
        setCustomFields(updatedCustomFields);
    };

    const addCustomField = () => {
        setCustomFields([...customFields, { title: "", date: "", subtitle: "" }]);
    };

    const removeCustomField = (index) => {
        const updatedCustomFields = [...customFields];
        updatedCustomFields.splice(index, 1);
        setCustomFields(updatedCustomFields);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if there are any language skills entered
        if (languages.length === 0) {
            // Display error message indicating that at least one language skill is required
            swal({
                title: "Error!",
                text: "Please enter at least one language skill.",
                icon: "error",
            });
            return; // Exit the function without proceeding to form submission
        }

        // Display confirmation dialog
        swal({
            title: "Are you sure?",
            text: "You are about to submit the form.",
            icon: "warning",
            buttons: ["Cancel", "Submit"],
            dangerMode: true,
        })
            .then(async (willSubmit) => {
                if (willSubmit) {
                    // Proceed with form submission
                    const imageUrl = await uploadImageToCloudinary();
                    // Gather form data from state variables
                    const name = e.target.name.value;
                    const jobtitle = e.target.jobtitle.value;
                    const profileDescription = e.target.profileDescription ? e.target.profileDescription.value : '';
                    const profileDescription2 = e.target.profileDescription2 ? e.target.profileDescription2.value : '';

                    const experiences = experienceFields.map(experience => ({
                        ...experience,
                        // Set the end date to "Present" if the "Present" status is selected
                        experienceEnd: experience.present ? 'Present' : experience.experienceEnd
                    }));
                    const education = educationFields.map(education => ({ ...education }));
                    const qualifications = qualificationFields.map(qualification => ({ ...qualification }));
                    const location = e.target.location.value; // Get location from form input
                    const phoneNumber = e.target.phoneNumber.value; // Get phone number from form input
                    const emailAddress = e.target.emailAddress.value; // Get email address from form input
                    const linkedinProfile = e.target.linkedinProfile.value;
                    const skillsData = skills.map(skill => ({ name: skill.name, level: skill.level }));

                    const achievementsAndAwards = achievementFields.map(achievement => achievement.achievement);
                    const languagesData = languages.map(language => ({ name: language.name, level: language.level }));
                    const customData = customFields.map(field => ({
                        title: field.title,
                        date: field.date,
                        subtitle: field.subtitle
                    }));
                    const formData = {
                        name,
                        jobtitle,
                        profileDescription,
                        experiences,
                        education,
                        qualifications,
                        imageUrl,
                        location,
                        phoneNumber,
                        emailAddress,
                        linkedinProfile,
                        skillsData,
                        languagesData,
                        achievementsAndAwards,
                        experienceTitle,
                        profileDescription2,
                        customData
                    };

                    // Send form data to the server
                    try {
                        const response = await fetch('https://cv-server-iota.vercel.app/userInfo', {
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
                        setFormData(formData);
                        navigate('/allpdf');
                        swal({
                            title: "Success!",
                            text: "Your CV has been created successfully.",
                            icon: "success",
                        });
                    } catch (error) {
                        // Handle error here
                        console.error('There was a problem with your fetch operation:', error);
                    }
                }
            });
    };


    return (
        <>

            <div className='w-4/5 '>
                <form onSubmit={handleSubmit}>
                    <div className='w-full flex'>
                        {/* Left side */}
                        <div className='w-2/6 bg-customRed'>

                            {/* image field */}
                            <div>
                                <div className={`w-[129px] h-[128px] bg-white relative mx-auto my-16 ${imageUrl ? 'rounded-full' : 'rounded-full'}`}>
                                    <label htmlFor="image" className="cursor-pointer">
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
                                                <img src={imageUrl} alt="Selected" className="w-full h-full object-cover rounded-full" />
                                            ) : (
                                                <HiUser className="w-24 h-24 mx-auto text-[#a3a3a3] mt-[43px]" />
                                            )}
                                            <div className="bg-[#F1F1F1] rounded-full absolute right-1 top-24">
                                                <HiOutlinePlus className="m-2 text-[#525252] text-2xl" />
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>



                            {/* profile description */}
                            <div>
                                <h1 className="text-start font-semibold mb-3 text-2xl text-white ml-10">Profile</h1>
                                <div className="relative">
                                    <textarea

                                        name="profileDescription"
                                        className="bg-customRed border border-[#d4d4d8] text-white h-20 w-56 mx-auto pl-4 outline-none text-left ml-10 resize-none" // Added resize-none to prevent resizing
                                        placeholder="Profile Description"
                                        value={value}
                                        onChange={descriptionHandleChange}
                                        style={{ textIndent: "0" }} // Set text-indent to 0
                                    />

                                </div>
                            </div>


                            {/* skills field */}
                            <div className="px-4">
                                <h1 className="text-start font-semibold mb-3 text-2xl text-white ml-6 mt-8">Skills</h1>
                                {skills.map((skill, index) => (
                                    <div key={skill.id} className="mt-5 flex items-center">
                                        <input
                                            type="text"
                                            value={skill.name}
                                            onChange={e => handleSkillChange(skill.id, e.target.value)}
                                            placeholder="Add skill..."
                                            className="px-3 py-2 outline-none w-56 ml-6 border border-customgray bg-customRed text-customgray"
                                        />
                                        {index !== 0 && (
                                            <button
                                                type="button"
                                                onClick={() => removeSkillInput(skill.id)}
                                                className="text-customgray ml-2"
                                            >
                                                <HiOutlineMinus />
                                            </button>
                                        )}
                                        <button
                                            type="button"
                                            onClick={addSkillInput}
                                            className="ml-2 text-customgray"
                                        >
                                            <HiOutlinePlus />
                                        </button>
                                    </div>
                                ))}
                            </div>


                            {/* language skill field */}
                            <div>
                                <h1 className="text-2xl text-white font-semibold ml-10 mt-10">
                                    Language Skills
                                </h1>
                                <div className="p-2">
                                    {languages.map((language, index) => (
                                        <div key={index} className="mt-5">
                                            <h1 className="text-white mb-2 ml-5">{language.name}</h1>
                                            <div className="flex justify-center items-center">
                                                <button type="button" onClick={() => updateLanguageSkill(language.id, 'level', Math.max(language.level - 10, 0))}>
                                                    <HiOutlineMinus className="text-customgray mr-1" />
                                                </button>
                                                <div className="w-full h-3 relative flex items-center rounded-full">
                                                    <input

                                                        type="range"
                                                        value={language.level}
                                                        min={0}
                                                        max="100"
                                                        onChange={(e) => updateLanguageSkill(language.id, 'level', parseInt(e.target.value))}
                                                    />
                                                    <span
                                                        style={{ width: `${(language.level * 100) / 100}%` }}
                                                        className="h-3 bg-gray-400 absolute left-0 top-0 rounded-full"
                                                    />
                                                </div>
                                                <button type="button" onClick={() => updateLanguageSkill(language.id, 'level', Math.min(language.level + 10, 100))}>
                                                    <LuPlus className="text-customgray ml-1" />
                                                </button>
                                                <button type="button" onClick={() => handleRemoveLanguage(language.id)}>
                                                    <HiOutlineTrash className="text-customgray ml-3" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="mt-5 ml-5">
                                        <input
                                            type="text"
                                            value={newLanguage}
                                            onChange={(e) => setNewLanguage(e.target.value)}
                                            placeholder="Enter language name"
                                            className="px-3 py-2 outline-none w-56 ml-3 border border-customgray bg-customRed text-customgray"
                                        />
                                        <button type="button" onClick={handleAddLanguage}>
                                            <LuPlus className="text-customgray ml-1" />
                                        </button>
                                    </div>
                                </div>
                            </div>



                            {/* contact info */}
                            <div>
                                <h1 className="text-2xl text-white font-semibold ml-10 mt-10">Contact Information</h1>
                                <div className="ml-10 mt-5 relative">
                                    <input id="location" className="h-8 w-56 p-2 pl-8 bg-customRed border outline-none border-customgray text-white" type="text" placeholder="Location" name="location" />
                                    <HiLocationMarker className="absolute top-2 left-2 text-customgray" />
                                </div>
                                <div className="ml-10 mt-5 relative">
                                    <input id="phoneNumber" className="h-8 w-56 p-2 pl-8 bg-customRed border outline-none border-customgray text-white" type="text" placeholder="Phone Number" name="phoneNumber" />
                                    <HiPhone className="absolute top-2 left-2 text-customgray" />
                                </div>
                                <div className="ml-10 mt-5 relative">
                                    <input id="emailAddress" className="h-8 w-56 p-2 pl-8 bg-customRed border outline-none border-customgray text-white" type="text" placeholder="Email Address" name="emailAddress" />
                                    <HiMail className="absolute top-2 left-2 text-customgray" />
                                </div>
                                <div className="ml-10 mt-5 relative">
                                    <input id="linkedinProfile" className="h-8 w-56 p-2 pl-8 bg-customRed border outline-none border-customgray text-white" type="text" placeholder="Linkedin Profile" name="linkedinProfile" />
                                    <GrLinkedinOption className="absolute top-2 left-2 text-customgray" />
                                </div>
                            </div>

                        </div>

                        {/* right side  */}
                        <div className='w-4/6 '>
                            {/* name and title field */}
                            <div className="bg-customgray w-full mt-24 p-8">
                                <input
                                    required
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder='Full Name'
                                    className="w-2/3 px-4 py-2 border-b-2 border-gray-400 outline-none ml-20 bg-customgray"
                                    style={{ 'fontSize': '22px' }}
                                />
                                <input
                                    required
                                    type="text"
                                    id="jobtitle"
                                    name="jobtitle"
                                    placeholder='Job Title'
                                    className="w-2/3 px-4 py-2 border-b-2 border-gray-400 outline-none ml-20 bg-customgray"
                                />
                            </div>

                            {/*right side  profile description */}
                            <div>
                                <h1 className="text-xl font-bold mt-20 ml-10 mb-5">Profile</h1>
                                <textarea
                                    name="profileDescription2"
                                    className="bg-customgray border border-[#d4d4d8] mx-10 px-4 py-2 outline-none text-left resize-vertical"
                                    placeholder="Profile Description"
                                    value={value2}
                                    onChange={descriptionHandleChange2}
                                    style={{ width: 'calc(95% - 40px)' }} // Adjust width to match professional summary field
                                />
                            </div>



                            {/* Professional experience fiels */}
                            <div>
                                <h1 className="text-xl font-bold mt-20 ml-10 mb-5">Professional experience</h1>
                                <div className="bg-customgray mx-10 py-5 px-5">
                                    {experienceFields.map((experience, index) => (
                                        <div key={index} className="mb-4">
                                            <div className="flex items-center justify-between">
                                                {/* Start Date */}
                                                <div className="flex flex-col items-center justify-center">
                                                    <label htmlFor={`experienceStart_${index}`} className="mr-2">
                                                        Start Date:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id={`experienceStart_${index}`}
                                                        name={`experienceStart_${index}`}
                                                        value={experience.experienceStart}
                                                        onChange={(e) => handleChange(index, 'experienceStart', e.target.value, setExperienceFields)}
                                                        className="py-2 px-4 mb-2 mr-2 bg-customgray"
                                                        placeholder="M/Y(09/2024)"
                                                    />
                                                </div>
                                                {/* End Date */}
                                                <div className="flex flex-col items-center justify-center">
                                                    <label htmlFor={`experienceEnd_${index}`} className="mr-2">
                                                        End Date:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id={`experienceEnd_${index}`}
                                                        name={`experienceEnd_${index}`}
                                                        value={experience.experienceEnd}
                                                        onChange={(e) => handleChange(index, 'experienceEnd', e.target.value, setExperienceFields)}
                                                        className={`py-2 px-4 mb-2 mr-2 bg-customgray ${experience.present ? 'opacity-50 pointer-events-none' : ''}`}
                                                        placeholder="M/Y(09/2024)"
                                                        disabled={experience.present}
                                                    />
                                                </div>
                                                {/* Present Option */}
                                                <label className="checkbox-container mr-1">
                                                    Present
                                                    <input
                                                        type="checkbox"
                                                        checked={experience.present}
                                                        onChange={(e) => handleChange(index, 'present', e.target.checked, setExperienceFields)}
                                                    />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                            <input
                                                type="text"
                                                id={`experienceJobTitle_${index}`}
                                                name={`experienceJobTitle_${index}`}
                                                value={experience.experienceJobTitle}
                                                onChange={(e) => handleChange(index, 'experienceJobTitle', e.target.value, setExperienceFields)}
                                                placeholder='Job Title'
                                                className="w-11/12 px-4 py-2 mb-2 border-b-2 border-gray-400 outline-none bg-customgray "
                                            />
                                            <input
                                                type="text"
                                                id={`companyName_${index}`}
                                                name={`companyName_${index}`}
                                                value={experience.companyName}
                                                onChange={(e) => handleChange(index, 'companyName', e.target.value, setExperienceFields)}
                                                placeholder='Company Name'
                                                className="w-11/12 px-4 py-2 mb-2 border-b-2 border-gray-400 outline-none bg-customgray"
                                            />
                                            <input
                                                type="text"
                                                id={`location_${index}`}
                                                name={`location_${index}`}
                                                value={experience.location}
                                                onChange={(e) => handleChange(index, 'location', e.target.value, setExperienceFields)}
                                                placeholder='Location'
                                                className="w-11/12 px-4 py-2 mb-2 border-b-2 border-gray-400 outline-none bg-customgray"
                                            />
                                            <textarea
                                                id={`professionalSummary_${index}`}
                                                name={`professionalSummary_${index}`}
                                                value={experience.professionalSummary}
                                                onChange={(e) => handleChange(index, 'professionalSummary', e.target.value, setExperienceFields)}
                                                placeholder='Professional Summary'
                                                className="w-11/12 px-4 py-2 mb-4 border-b-2 border-gray-400 outline-none bg-customgray"
                                                onKeyDown={(e) => handleTextareaKeyDown(e, index)}
                                            />
                                            {/* buttons */}
                                            <div className="flex justify-center items-center mt-5">
                                                <button
                                                    type="button"
                                                    onClick={() => removeField(index, setExperienceFields)}
                                                    className="cursor-pointer mr-2 hover:text-customRed"
                                                    disabled={experienceFields.length === 1}
                                                >
                                                    <CiCircleMinus className="w-10 h-10" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => addField(setExperienceFields)}
                                                    className="cursor-pointer hover:text-customRed"
                                                >
                                                    <CiCirclePlus className="w-10 h-10" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Achievements and Awards field */}
                            <div className="">
                                <h1 className="text-xl font-bold mt-20 ml-10 mb-5">Achievements and Awards (If Any)</h1>
                                <div className="bg-customgray mx-10 py-5 px-5">
                                    {achievementFields.map((achievement, index) => (
                                        <div key={index} className="mb-4">
                                            <input
                                                type="text"
                                                id={`achievement_${index}`}
                                                name={`achievement_${index}`}
                                                value={achievement.achievement}
                                                onChange={(e) => handleChange(index, 'achievement', e.target.value, setAchievementFields)}
                                                placeholder='Achievements and Awards'
                                                className="w-11/12 px-4 py-4 mb-2 border-b-2 border-gray-400 outline-none bg-customgray"
                                            />
                                            {/* buttons */}
                                            <div className="flex justify-center items-center mt-5">
                                                <button type="button" onClick={() => removeAchievementField(index)} className="cursor-pointer mr-2 hover:text-customRed" disabled={achievementFields.length === 1}>
                                                    <CiCircleMinus className="w-10 h-10 " />
                                                </button>
                                                <button type="button" onClick={() => addAchievementField()} className="cursor-pointer hover:text-customRed">
                                                    <CiCirclePlus className="w-10 h-10 " />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>


                            {/* Education field */}
                            <div>
                                <h1 className="text-xl font-bold mt-20 ml-10 mb-5">Education</h1>
                                <div className="bg-customgray mx-10 py-5 px-5">
                                    {educationFields.map((education, index) => (
                                        <div key={index} className="mb-4">
                                            <div className="flex justify-between items-center">
                                                <input
                                                    type="text"
                                                    id={`eduPassDate_${index}`}
                                                    name={`eduPassDate_${index}`}
                                                    value={education.eduPassDate}
                                                    onChange={(e) => handleChange(index, 'eduPassDate', e.target.value, setEducationFields)}
                                                    placeholder='M/Y(09/2024)'
                                                    className="py-2 px-4 mb-2  bg-customgray"
                                                />
                                                <input
                                                    type="text"
                                                    id={`eduEndDate_${index}`}
                                                    name={`eduEndDate_${index}`}
                                                    value={education.eduEndDate}
                                                    onChange={(e) => handleChange(index, 'eduEndDate', e.target.value, setEducationFields)}
                                                    placeholder='M/Y(09/2024)'
                                                    className=" px-4 py-2 mb-2   outline-none bg-customgray"
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                id={`schoolName_${index}`}
                                                name={`schoolName_${index}`}
                                                value={education.schoolName}
                                                onChange={(e) => handleChange(index, 'schoolName', e.target.value, setEducationFields)}
                                                placeholder='School/University Name'
                                                className="w-11/12 px-4 py-2 mb-2 border-b-2 border-gray-400 outline-none bg-customgray"
                                            />
                                            <input
                                                type="text"
                                                id={`edulocation_${index}`}
                                                name={`edulocation_${index}`}
                                                value={education.edulocation}
                                                onChange={(e) => handleChange(index, 'edulocation', e.target.value, setEducationFields)}
                                                placeholder='Location'
                                                className="w-11/12 px-4 py-2 mb-2 border-b-2 border-gray-400 outline-none bg-customgray"
                                            />
                                            <input
                                                type="text"
                                                id={`degree_${index}`}
                                                name={`degree_${index}`}
                                                value={education.degree}
                                                onChange={(e) => handleChange(index, 'degree', e.target.value, setEducationFields)}
                                                placeholder='Degree Obtained'
                                                className="w-11/12 px-4 py-2 mb-2 border-b-2 border-gray-400 outline-none bg-customgray"
                                            />
                                            <input
                                                type="text"
                                                id={`major_${index}`}
                                                name={`major_${index}`}
                                                value={education.major}
                                                onChange={(e) => handleChange(index, 'major', e.target.value, setEducationFields)}
                                                placeholder='Major/Field of Study'
                                                className="w-11/12 px-4 py-2 mb-2 border-b-2 border-gray-400 outline-none bg-customgray"
                                            />
                                            <input
                                                type="text"
                                                id={`curricularActivity_${index}`}
                                                name={`curricularActivity_${index}`}
                                                value={education.curricularActivity}
                                                onChange={(e) => handleChange(index, 'curricularActivity', e.target.value, setEducationFields)}
                                                placeholder='Extracurricular Activity'
                                                className="w-11/12 px-4 py-2 mb-2 border-b-2 border-gray-400 outline-none bg-customgray"
                                            />
                                            <input
                                                type="text"
                                                id={`additionalNotes_${index}`}
                                                name={`additionalNotes_${index}`}
                                                value={education.additionalNotes}
                                                onChange={(e) => handleChange(index, 'additionalNotes', e.target.value, setEducationFields)}
                                                placeholder='Additional Notes'
                                                className="w-11/12 px-4 py-2 mb-4 border-b-2 border-gray-400 outline-none bg-customgray"
                                            />

                                            {/* buttons */}
                                            <div className="flex justify-center items-center mt-5">

                                                <button type="button" onClick={() => removeField(index, setEducationFields)} className=" cursor-pointer mr-2 hover:text-customRed" disabled={educationFields.length === 1}>
                                                    <CiCircleMinus className="w-10 h-10 " />
                                                </button>
                                                <button type="button" onClick={() => addField(setEducationFields)} className="cursor-pointer hover:text-customRed">
                                                    <CiCirclePlus className="w-10 h-10 " />
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>

                            {/* Qualifications field */}
                            <div>
                                <h1 className="text-xl font-bold mt-20 ml-10 mb-5">
                                    <select
                                        className="border-none bg-transparent focus:outline-none"
                                        onChange={handleExperienceTitleChange}
                                        value={experienceTitle}
                                    >
                                        <option value="qualifications">Qualifications</option>
                                        <option value="Work History">Work History</option>
                                        <option value="projects">Projects</option>
                                        <option value="certifications">Certifications</option>
                                        <option value="Network and Memberships">Network and Memberships</option>
                                        {/* Add more options as needed */}
                                    </select>
                                </h1>
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
                                                className="w-11/12 px-4 py-2 mb-2 border-b-2 border-gray-400 outline-none bg-customgray"
                                            />
                                            <input
                                                type="text"
                                                id={`technicalSkills_${index}`}
                                                name={`technicalSkills_${index}`}
                                                value={qualification.technicalSkills}
                                                onChange={(e) => handleChange(index, 'technicalSkills', e.target.value, setQualificationFields)}
                                                placeholder='Technical skills'
                                                className="w-11/12 px-4 py-2 mb-2 border-b-2 border-gray-400 outline-none bg-customgray"
                                            />
                                            <input
                                                type="text"
                                                id={`additionalQualifications_${index}`}
                                                name={`additionalQualifications_${index}`}
                                                value={qualification.additionalQualifications}
                                                onChange={(e) => handleChange(index, 'additionalQualifications', e.target.value, setQualificationFields)}
                                                placeholder='Additional Qualifications'
                                                className="w-11/12 px-4 py-2 mb-4 border-b-2 border-gray-400 outline-none bg-customgray"
                                            />


                                            <div className="flex justify-center items-center mt-5">

                                                <button type="button" onClick={() => removeField(index, setQualificationFields)} className=" cursor-pointer mr-2 hover:text-customRed" disabled={qualificationFields.length === 1}>
                                                    <CiCircleMinus className="w-10 h-10 " />
                                                </button>
                                                <button type="button" onClick={() => addField(setQualificationFields)} className="cursor-pointer hover:text-customRed">
                                                    <CiCirclePlus className="w-10 h-10 " />
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>

                            {/* Custom Fields */}
                            <div className="bg-customgray mx-10 py-5 px-5 relative mt-20">

                                {customFields.map((customField, index) => (
                                    <div key={index} className="pt-8 relative">
                                        <input
                                            type="text"
                                            id={`title_${index}`}
                                            name={`title_${index}`}
                                            placeholder="Title"
                                            value={customField.title}
                                            onChange={(e) => handleCustomFieldChange(index, 'title', e.target.value)}
                                            className="w-11/12 px-4 py-2 mb-2 border-b-2 border-gray-400 outline-none bg-customgray"
                                        />

                                        <input
                                            type="text"
                                            id={`date_${index}`}
                                            name={`date_${index}`}
                                            placeholder="Date"
                                            value={customField.date}
                                            onChange={(e) => handleCustomFieldChange(index, 'date', e.target.value)}
                                            className="w-11/12 px-4 py-2 mb-2 border-b-2 border-gray-400 outline-none bg-customgray"
                                        />

                                        <input
                                            type="text"
                                            id={`subtitle_${index}`}
                                            name={`subtitle_${index}`}
                                            placeholder="Subtitle"
                                            value={customField.subtitle}
                                            onChange={(e) => handleCustomFieldChange(index, 'subtitle', e.target.value)}
                                            className="w-11/12 px-4 py-2 mb-4 border-b-2 border-gray-400 outline-none bg-customgray"
                                        />

                                        <div className="flex justify-center items-center mt-5">
                                            <button type="button" onClick={() => removeCustomField(index)} className="cursor-pointer mr-2 hover:text-customRed" disabled={customFields.length === 1}>
                                                <CiCircleMinus className="w-10 h-10 " />
                                            </button>
                                            <button type="button" onClick={() => addCustomField()} className="cursor-pointer hover:text-customRed">
                                                <CiCirclePlus className="w-10 h-10 " />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                            </div>




                        </div>
                    </div>


                    {/* submit button */}
                    <div className="mt-4 flex justify-center">

                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Generate CV</button>
                    </div>
                </form >

            </div >

        </>
    );
};

export default CvForm;