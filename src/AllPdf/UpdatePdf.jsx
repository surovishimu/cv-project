import { useEffect, useState } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { GrLinkedinOption } from "react-icons/gr";
import { HiLocationMarker, HiMail, HiOutlineMinus, HiOutlinePlus, HiOutlineTrash, HiPhone, HiUser } from "react-icons/hi";
import { useLoaderData, useNavigate } from "react-router-dom";
import swal from "sweetalert";



const UpdatePdf = () => {
    const navigate = useNavigate();
    const updatePdf = useLoaderData();
    const { _id, name, jobtitle, experiences, education, qualifications, imageUrl, profileDescription, location, phoneNumber, emailAddress, linkedinProfile, skillsData, languagesData, achievementsAndAwards, experienceTitle } = updatePdf;


    // image upload function---------------------

    const [imgUrl, setImageUrl] = useState(imageUrl);
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
        formData.append("file", imgUrl);
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
            return data.secure_url;
        } catch (error) {
            console.error("Error uploading image to Cloudinary:", error);
            return null;
        }
    };


    // function for skill----------------------

    const [skills, setSkills] = useState(skillsData.map((skill, index) => ({ id: index + 1, name: skill.name })));

    const addSkillInput = () => {
        const newId = Math.max(...skills.map(skill => skill.id), 0) + 1;
        setSkills(prevSkills => [...prevSkills, { id: newId, name: '' }]);
    };

    const removeSkillInput = (idToRemove) => {
        setSkills(prevSkills => prevSkills.filter(skill => skill.id !== idToRemove));
    };

    const handleSkillChange = (id, value) => {
        setSkills(prevSkills =>
            prevSkills.map(skill => {
                if (skill.id === id) {
                    return { ...skill, name: value };
                }
                return skill;
            })
        );
    };



    // function for language skill-------------------------

    const [languages, setLanguages] = useState(() => {
        if (languagesData) {
            return languagesData.map((language, index) => ({ ...language, id: index + 1 }));
        } else {
            return [];
        }
    });
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

    // function for achivement-----------------------

    const [achievementFields, setAchievementFields] = useState(() => {
        if (achievementsAndAwards && achievementsAndAwards.length > 0) {
            return achievementsAndAwards.map((achievement, index) => ({ id: index + 1, achievement: achievement }));
        } else {
            return [];
        }
    });

    const addAchievementField = () => {
        setAchievementFields(prevAchievementFields => [
            ...prevAchievementFields,
            { id: Date.now(), achievement: '' }
        ]);
    };

    const removeAchievementField = (id) => {
        setAchievementFields(prevAchievementFields => prevAchievementFields.filter(field => field.id !== id));
    };

    const handleAchievementChange = (id, value) => {
        setAchievementFields(prevAchievementFields =>
            prevAchievementFields.map(field => {
                if (field.id === id) {
                    return { ...field, achievement: value };
                }
                return field;
            })
        );
    };


    // function for professional experience ---------------------------
    const [experienceFields, setExperienceFields] = useState([]);
    useEffect(() => {
        if (experiences && experiences.length > 0) {
            setExperienceFields(experiences.map((experience, index) => ({
                ...experience,
                id: index, // Assign a unique ID for each experience field
                present: experience.experienceEnd === 'Present'
            })));
        } else {
            // If experiences data is not available, initialize with an empty array
            setExperienceFields([]);
        }
    }, [experiences]);

    const addExperienceField = () => {
        setExperienceFields(prevExperienceFields => [
            ...prevExperienceFields,
            { id: Date.now(), experienceStart: '', experienceEnd: '', experienceJobTitle: '', companyName: '', location: '', professionalSummary: '' }
        ]);
    };

    const removeExperienceField = (index) => {
        setExperienceFields(prevExperienceFields => prevExperienceFields.filter((_, i) => i !== index));
    };

    const handleExperienceChange = (index, fieldKey, value) => {
        setExperienceFields(prevExperienceFields => {
            const updatedFields = [...prevExperienceFields];
            if (fieldKey === 'present') {
                updatedFields[index][fieldKey] = value;
                updatedFields[index]['experienceEnd'] = value ? 'Present' : '';
            } else {
                updatedFields[index][fieldKey] = value;
            }
            return updatedFields;
        });
    };




    const handleTextareaKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const { selectionStart, value } = e.target;
            const textBeforeCursor = value.slice(0, selectionStart);
            const textAfterCursor = value.slice(selectionStart);
            const newLineWithBullet = '- ' + textAfterCursor;
            const newValue = textBeforeCursor + '\n' + newLineWithBullet;
            e.target.value = newValue;
            const newPosition = selectionStart + 3 + 1;
            e.target.setSelectionRange(newPosition, newPosition);
        }
    };


    // function for education--------------------------------

    const [educationFields, setEducationFields] = useState([]);
    useEffect(() => {
        setEducationFields(education || []);
    }, [education]);

    const addEducationField = () => {
        setEducationFields(prevEducationFields => [
            ...prevEducationFields,
            { eduPassDate: '', eduEndDate: '', schoolName: '', edulocation: '', degree: '', major: '', curricularActivity: '', additionalNotes: '' }
        ]);
    };
    const removeEducationField = (index) => {
        setEducationFields(prevEducationFields => prevEducationFields.filter((_, i) => i !== index));
    };

    const handleChange = (index, field, value) => {
        setEducationFields(prevEducationFields => {
            const updatedFields = [...prevEducationFields];
            updatedFields[index][field] = value;
            return updatedFields;
        });
    };

    // function for qualification field --------------------
    const [qualificationFields, setQualificationFields] = useState([]);
    const [experienceHeader, setExperienceHeader] = useState('Qualifications');
    const addQualificationField = () => {
        setQualificationFields(prevQualificationFields => [
            ...prevQualificationFields,
            { year: '', technicalSkills: '', additionalQualifications: '' }
        ]);
    };
    useEffect(() => {
        if (qualifications && qualifications.length > 0) {
            setQualificationFields(qualifications);
        }
    }, [qualifications]);
    const removeQualificationField = (index) => {
        setQualificationFields(prevQualificationFields => prevQualificationFields.filter((_, i) => i !== index));
    };

    const handleQualificationChange = (index, field, value) => {
        setQualificationFields(prevQualificationFields => {
            const updatedFields = [...prevQualificationFields];
            updatedFields[index][field] = value;
            return updatedFields;
        });
    };
    const handleExperienceTitleChange = (e) => {
        console.log("Selected value:", e.target.value);
        setExperienceHeader(e.target.value);
    };
    console.log("Experience Header:", experienceHeader);

    // form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const jobtitle = e.target.jobtitle.value;
        const profileDescription = e.target.profileDescription.value;
        const imageUrl = await uploadImageToCloudinary();
        const skillsData = skills.map(skill => ({ name: skill.name, level: skill.level }));
        const languagesData = languages.map(language => ({ name: language.name, level: language.level }));
        const location = e.target.location.value;
        const phoneNumber = e.target.phoneNumber.value;
        const emailAddress = e.target.emailAddress.value;
        const linkedinProfile = e.target.linkedinProfile.value;
        const achievementsAndAwards = achievementFields.map(achievement => achievement.achievement);

        const education = educationFields.map(education => ({ ...education }));
        const qualifications = qualificationFields.map(qualification => ({ ...qualification }));
        const experiences = experienceFields.map(experience => ({
            experienceStart: experience.experienceStart,
            experienceEnd: experience.present ? 'Present' : experience.experienceEnd,
            experienceJobTitle: experience.experienceJobTitle,
            companyName: experience.companyName,
            location: experience.location,
            professionalSummary: experience.professionalSummary,
            present: experience.present
        }));

        const formData = {
            name,
            jobtitle,
            profileDescription,
            imageUrl,
            skillsData,
            languagesData,
            location,
            phoneNumber,
            emailAddress,
            linkedinProfile,
            achievementsAndAwards,
            experiences,
            education,
            qualifications,
            experienceHeader


        };
        fetch(`https://cv-server-iota.vercel.app/userInfo/${_id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    navigate('/allpdf');
                    swal({
                        title: 'Success!',
                        text: 'Product updated successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }

            })
    }
    return (
        <div className='w-4/5'>
            <form onSubmit={handleSubmit}>
                <div className='w-full flex'>
                    {/* Left Section */}
                    <div className='w-2/6 bg-customRed'>
                        {/* Image Upload */}
                        <div>
                            <div className={`w-[129px] h-[128px] bg-white relative mx-auto my-16 ${imgUrl ? 'rounded-full' : 'rounded-full'}`}>
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
                                        {/* Display uploaded image if available */}
                                        {imgUrl ? (
                                            <img src={imgUrl} alt="Selected" className="w-full h-full object-cover rounded-full" />
                                        ) : (
                                            <HiUser className="w-24 h-24 mx-auto text-[#a3a3a3] mt-[43px]" />
                                        )}
                                        {/* Plus icon for uploading image */}
                                        <div className="bg-[#F1F1F1] rounded-full absolute right-1 top-24">
                                            <HiOutlinePlus className="m-2 text-[#525252] text-2xl" />
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Profile Description */}
                        <div>
                            <h1 className="text-start font-semibold mb-3 text-2xl text-white ml-10">Profile</h1>
                            <div className="relative">
                                <textarea

                                    name="profileDescription"
                                    className="bg-customRed border border-[#d4d4d8] text-white h-20 w-56 mx-auto pl-4 outline-none text-left ml-10 resize-none"
                                    placeholder="Profile Description"
                                    defaultValue={profileDescription}
                                    style={{ textIndent: "0" }} // Set text-indent to 0
                                />
                            </div>
                        </div>
                        {/* skills */}
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
                        {/* language skill */}
                        <div>
                            {languages.length > 0 && (
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
                                                        <HiOutlinePlus className="text-customgray ml-1" />
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
                                                <HiOutlinePlus className="text-customgray ml-1" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* contact info */}
                        <div>
                            <h1 className="text-2xl text-white font-semibold ml-10 mt-10">Contact Information</h1>
                            <div className="ml-10 mt-5 relative">
                                <input id="location" defaultValue={location} className="h-8 w-56 p-2 pl-8 bg-customRed border outline-none border-customgray text-white" type="text" placeholder="Location" name="location" />
                                <HiLocationMarker className="absolute top-2 left-2 text-customgray" />
                            </div>
                            <div className="ml-10 mt-5 relative">
                                <input id="phoneNumber" defaultValue={phoneNumber} className="h-8 w-56 p-2 pl-8 bg-customRed border outline-none border-customgray text-white" type="text" placeholder="Phone Number" name="phoneNumber" />
                                <HiPhone className="absolute top-2 left-2 text-customgray" />
                            </div>
                            <div className="ml-10 mt-5 relative">
                                <input id="emailAddress" defaultValue={emailAddress} className="h-8 w-56 p-2 pl-8 bg-customRed border outline-none border-customgray text-white" type="text" placeholder="Email Address" name="emailAddress" />
                                <HiMail className="absolute top-2 left-2 text-customgray" />
                            </div>
                            <div className="ml-10 mt-5 relative">
                                <input id="linkedinProfile" defaultValue={linkedinProfile} className="h-8 w-56 p-2 pl-8 bg-customRed border outline-none border-customgray text-white" type="text" placeholder="Linkedin Profile" name="linkedinProfile" />
                                <GrLinkedinOption className="absolute top-2 left-2 text-customgray" />
                            </div>
                        </div>


                    </div>

                    {/* Right Section */}
                    <div className='w-4/6'>
                        {/* name and job title */}
                        <div className="bg-customgray w-full mt-24 p-8">
                            {/* Name Input */}
                            <input
                                defaultValue={name}
                                required
                                type="text"
                                id="name"
                                name="name"
                                placeholder='Full Name'
                                className="w-2/3 px-4 py-2 border-b-2 border-gray-400 outline-none ml-20 bg-customgray"
                                style={{ 'fontSize': '22px' }}
                            />
                            {/* Job Title Input */}
                            <input
                                defaultValue={jobtitle}
                                required
                                type="text"
                                id="jobtitle"
                                name="jobtitle"
                                placeholder='Job Title'
                                className="w-2/3 px-4 py-2 border-b-2 border-gray-400 outline-none ml-20 bg-customgray"
                            />
                        </div>

                        {/* Achievements and Awards field */}
                        <div className="">
                            <h1 className="text-xl font-bold mt-20 ml-10 mb-5">Achievements and Awards (If Any)</h1>
                            <div className="bg-customgray mx-10 py-5 px-5">
                                {achievementFields.map((field, index) => (
                                    <div key={field.id} className="mb-4">
                                        <input
                                            type="text"
                                            value={field.achievement}
                                            onChange={e => handleAchievementChange(field.id, e.target.value)}
                                            placeholder="Achievements and Awards"
                                            className="w-11/12 px-4 py-4 mb-2 border-b-2 border-gray-400 outline-none bg-customgray"
                                        />
                                        {/* Buttons for adding and removing achievement fields */}
                                        <div className="flex justify-center items-center mt-5">
                                            <button
                                                type="button"
                                                onClick={() => removeAchievementField(field.id)}
                                                className="cursor-pointer mr-2 hover:text-customRed"
                                                disabled={achievementFields.length === 1}
                                            >
                                                <CiCircleMinus className="w-10 h-10 " />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={addAchievementField}
                                                className="cursor-pointer hover:text-customRed"
                                            >
                                                <CiCirclePlus className="w-10 h-10 " />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* professional experience */}
                        <div>
                            <h1 className="text-xl font-bold mt-20 ml-10 mb-5">Professional experience</h1>
                            <div className="bg-customgray mx-10 py-5 px-5">
                                {experienceFields.map((experience, index) => (
                                    <div key={experience.id} className="mb-4">
                                        <div className="flex items-center justify-between">
                                            {/* Start Date */}
                                            <div className="flex flex-col items-center justify-center">
                                                <label htmlFor={`experienceStart_${index}`} className="mr-2">
                                                    Start Date:
                                                </label>
                                                <input
                                                    type="text"
                                                    id={`experienceStart_${experience.id}`}
                                                    name={`experienceStart_${experience.id}`}
                                                    value={experience.experienceStart}
                                                    onChange={(e) => handleExperienceChange(index, 'experienceStart', e.target.value)}
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
                                                    id={`experienceEnd_${experience.id}`}
                                                    name={`experienceEnd_${experience.id}`}
                                                    value={experience.experienceEnd}
                                                    onChange={(e) => handleExperienceChange(index, 'experienceEnd', e.target.value)}
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
                                                    onChange={(e) => handleExperienceChange(index, 'present', e.target.checked)}
                                                />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                        <input
                                            type="text"
                                            id={`experienceJobTitle_${experience.id}`}
                                            name={`experienceJobTitle_${experience.id}`}
                                            value={experience.experienceJobTitle}
                                            onChange={(e) => handleExperienceChange(index, 'experienceJobTitle', e.target.value)}
                                            placeholder='Job Title'
                                            className="w-11/12 px-4 py-2 mb-2 border-b-2 border-gray-400 outline-none bg-customgray "
                                        />

                                        <input
                                            type="text"
                                            id={`companyName_${experience.id}`}
                                            name={`companyName_${experience.id}`}
                                            value={experience.companyName}
                                            onChange={(e) => handleExperienceChange(index, 'companyName', e.target.value)}
                                            placeholder='Company Name'
                                            className="w-11/12 px-4 py-2 mb-2 border-b-2 border-gray-400 outline-none bg-customgray"
                                        />
                                        <input
                                            type="text"
                                            id={`location_${experience.id}`}
                                            name={`location_${experience.id}`}
                                            value={experience.location}
                                            onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
                                            placeholder='Location'
                                            className="w-11/12 px-4 py-2 mb-2 border-b-2 border-gray-400 outline-none bg-customgray"
                                        />
                                        <textarea
                                            id={`professionalSummary_${experience.id}`}
                                            name={`professionalSummary_${experience.id}`}
                                            value={experience.professionalSummary}
                                            onChange={(e) => handleExperienceChange(index, 'professionalSummary', e.target.value)}
                                            placeholder='Professional Summary'
                                            className="w-11/12 px-4 py-2 mb-4 border-b-2 border-gray-400 outline-none bg-customgray"
                                            onKeyDown={(e) => handleTextareaKeyDown(e, index)}
                                        />
                                        {/* buttons */}
                                        <div className="flex justify-center items-center mt-5">
                                            <button type="button" onClick={() => removeExperienceField(index)} className="cursor-pointer mr-2 hover:text-customRed" disabled={experienceFields.length === 1}>
                                                <CiCircleMinus className="w-10 h-10" />
                                            </button>

                                            <button type="button" onClick={addExperienceField} className="cursor-pointer hover:text-customRed">
                                                <CiCirclePlus className="w-10 h-10" />
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
                                                onChange={(e) => handleChange(index, 'eduPassDate', e.target.value)}
                                                className="py-2 px-4 mb-2  bg-customgray"
                                                placeholder='M/Y(09/2024)'
                                            />
                                            <input
                                                type="text"
                                                id={`eduEndDate_${index}`}
                                                name={`eduEndDate_${index}`}
                                                value={education.eduEndDate}
                                                onChange={(e) => handleChange(index, 'eduEndDate', e.target.value)}
                                                placeholder='M/Y(09/2024)'
                                                className=" px-4 py-2 mb-2   outline-none bg-customgray"
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            id={`schoolName_${index}`}
                                            name={`schoolName_${index}`}
                                            value={education.schoolName}
                                            onChange={(e) => handleChange(index, 'schoolName', e.target.value)}
                                            placeholder='School/University Name'
                                            className="w-11/12 px-4 py-2 mb-2 border-b-2 border-gray-400 outline-none bg-customgray"
                                        />
                                        <input
                                            type="text"
                                            id={`edulocation_${index}`}
                                            name={`edulocation_${index}`}
                                            value={education.edulocation}
                                            onChange={(e) => handleChange(index, 'edulocation', e.target.value)}
                                            placeholder='Location'
                                            className="w-11/12 px-4 py-2 mb-2 border-b-2 border-gray-400 outline-none bg-customgray"
                                        />
                                        <input
                                            type="text"
                                            id={`degree_${index}`}
                                            name={`degree_${index}`}
                                            value={education.degree}
                                            onChange={(e) => handleChange(index, 'degree', e.target.value)}
                                            placeholder='Degree Obtained'
                                            className="w-11/12 px-4 py-2 mb-2 border-b-2 border-gray-400 outline-none bg-customgray"
                                        />
                                        <input
                                            type="text"
                                            id={`major_${index}`}
                                            name={`major_${index}`}
                                            value={education.major}
                                            onChange={(e) => handleChange(index, 'major', e.target.value)}
                                            placeholder='Major/Field of Study'
                                            className="w-11/12 px-4 py-2 mb-2 border-b-2 border-gray-400 outline-none bg-customgray"
                                        />
                                        <input
                                            type="text"
                                            id={`curricularActivity_${index}`}
                                            name={`curricularActivity_${index}`}
                                            value={education.curricularActivity}
                                            onChange={(e) => handleChange(index, 'curricularActivity', e.target.value)}
                                            placeholder='Extracurricular Activity'
                                            className="w-11/12 px-4 py-2 mb-2 border-b-2 border-gray-400 outline-none bg-customgray"
                                        />
                                        <input
                                            type="text"
                                            id={`additionalNotes_${index}`}
                                            name={`additionalNotes_${index}`}
                                            value={education.additionalNotes}
                                            onChange={(e) => handleChange(index, 'additionalNotes', e.target.value)}
                                            placeholder='Additional Notes'
                                            className="w-11/12 px-4 py-2 mb-4 border-b-2 border-gray-400 outline-none bg-customgray"
                                        />

                                        {/* buttons */}
                                        <div className="flex justify-center items-center mt-5">
                                            <button type="button" onClick={() => removeEducationField(index)} className=" cursor-pointer mr-2 hover:text-customRed" disabled={educationFields.length === 1}>
                                                <CiCircleMinus className="w-10 h-10 " />
                                            </button>
                                            <button type="button" onClick={() => addEducationField()} className="cursor-pointer hover:text-customRed">
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
                                    onChange={handleExperienceTitleChange} // Update the experienceHeader state when the value changes
                                    value={experienceHeader} // Set the value of the select element to the experienceHeader state variable
                                >
                                    <option value="Qualifications">Qualifications</option>
                                    <option value="Work History">Work History</option>
                                    <option value="Projects">Projects</option>
                                    <option value="Certifications">Certifications</option>
                                    {/* Add more options as needed */}
                                </select>
                            </h1>
                            <div className="bg-customgray mx-10 py-5 px-5 relative">
                                {qualificationFields.map((qualification, index) => (
                                    <div key={index} className="pt-8 relative">
                                        {/* Inputs for each qualification field */}
                                        <input
                                            type="text"
                                            id={`year_${index}`}
                                            name={`year_${index}`}
                                            value={qualification.year}
                                            onChange={(e) => handleQualificationChange(index, 'year', e.target.value)}
                                            placeholder='Year'
                                            className="w-11/12 px-4 py-2 mb-2 border-b-2 border-gray-400 outline-none bg-customgray"
                                        />
                                        <input
                                            type="text"
                                            id={`technicalSkills_${index}`}
                                            name={`technicalSkills_${index}`}
                                            value={qualification.technicalSkills}
                                            onChange={(e) => handleQualificationChange(index, 'technicalSkills', e.target.value)}
                                            placeholder='Technical Skills'
                                            className="w-11/12 px-4 py-2 mb-2 border-b-2 border-gray-400 outline-none bg-customgray"
                                        />
                                        <input
                                            type="text"
                                            id={`additionalQualifications_${index}`}
                                            name={`additionalQualifications_${index}`}
                                            value={qualification.additionalQualifications}
                                            onChange={(e) => handleQualificationChange(index, 'additionalQualifications', e.target.value)}
                                            placeholder='Additional Qualifications'
                                            className="w-11/12 px-4 py-2 mb-4 border-b-2 border-gray-400 outline-none bg-customgray"
                                        />
                                        <div className="flex justify-center items-center mt-5">
                                            {/* Button to remove the qualification field */}
                                            <button type="button" onClick={() => removeQualificationField(index)} className="cursor-pointer mr-2 hover:text-customRed" disabled={qualificationFields.length === 1}>
                                                <CiCircleMinus className="w-10 h-10 " />
                                            </button>
                                            {/* Button to add a new qualification field */}
                                            <button type="button" onClick={addQualificationField} className="cursor-pointer hover:text-customRed">
                                                <CiCirclePlus className="w-10 h-10 " />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>











                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-4 flex justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update CV</button>
                </div>
            </form>
        </div>

    );
};

export default UpdatePdf;
