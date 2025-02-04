import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import LogoURL from '../../assets/img/logo.jpeg';
import { useForm } from 'react-hook-form';
import { SimilarJobs } from '../SimilarJobs';

export const JobDetails = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            candidateID: "",
            jobID: "",
            applicationStatus: "active",
            resume: null,
            applicationForm: [{ question: "", answer: "" }],
            candidateFeedback: [{ question: "", answer: "" }]
        }
    });

    const { id } = useParams();
    const [job, setJob] = useState();
    const [applicants, setApplicants] = useState([]);
    const [file, setFile] = useState(null);
    const [loginData, setLoginData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("user");
        if (token) {
            setLoginData(JSON.parse(token));
        }
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8000/jobs/current-job/${id}`)
            .then(res => res.json())
            .then(data => setJob(data))
            .catch(error => console.error("Error fetching job:", error));
    }, [id]);

    useEffect(() => {
        if (job && job.applicants?.length > 0) {
            fetch(`http://localhost:8000/users/all-users`)
                .then(response => response.json())
                .then(data => {
                    const filteredApplicants = data.filter(user =>
                        job.applicants.some(applicant => applicant.applicant === user._id)
                    );
                    setApplicants(filteredApplicants);
                })
                .catch(error => console.error("Error fetching applicants:", error));
        }
    }, [job]);

    const handleFileUpload = async (e) => {
        const uploadedFile = e.target.files[0];

        if (!uploadedFile) {
            alert("Please select a file to upload.");
            return;
        }

        if (!loginData || !loginData._id) {
            alert("User not logged in.");
            return;
        }

        const formData = new FormData();
        formData.append("file", uploadedFile);
        setFile(uploadedFile.name); // Update UI

        try {
            const response = await fetch(`http://localhost:8000/upload/resume/${loginData._id}`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Upload failed: ${response.statusText}`);
            }

            const result = await response.json();
            alert("Resume uploaded successfully!");
            console.log("Upload successful:", result);
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Failed to upload resume.");
        }
    };

    return (
        <div className='max-w-screen-2xl w-full md:w-5/6 lg:w-6/8 container mt-2 mx-auto xl:px-24 px-4'>
            <div className='bg-[#efefef] mx-auto py-12 md:px-14 px-8 rounded-lg'>
                <div className='flex flex-col lg:flex-row gap-8'>

                    {/* JOB DETAILS */}
                    {job && (
                        <div className='w-full'>
                            <div className='flex items-center flex-wrap justify-center md:justify-normal'>
                                <img src={LogoURL} alt="Logo" className="rounded-full w-20 md:w-24 h-auto" />
                                <div className='mx-4 my-3 text-center md:text-left md:my-0'>
                                    <h1 className='text-xl md:text-2xl font-bold'>{job.jobTitle}</h1>
                                    <p className='text-secondary'>Humgrow.com</p>
                                    <p className='text-sm text-gray-700'>Posted - {new Date(job.createdDate).toISOString().split('T')[0]}</p>
                                </div>
                            </div>

                            <div className='my-4 gap-2 grid grid-cols-2 sm:grid-cols-4'>
                                <div className='bg-blue-300 rounded-lg py-4 md:py-5 text-center'>
                                    <h2 className='text-xs md:text-md font-semibold text-gray-700'>Job Type</h2>
                                    <p className='text-sm md:text-lg font-bold'>{job.employmentType}</p>
                                </div>
                                <div className='bg-green-300 rounded-lg py-4 md:py-5 text-center'>
                                    <h2 className='text-xs md:text-md font-semibold text-gray-700'>Salary</h2>
                                    <p className='text-sm md:text-lg font-bold'>{job.salary}</p>
                                </div>
                                <div className='bg-blue-300 rounded-lg py-4 md:py-5 text-center'>
                                    <h2 className='text-xs md:text-md font-semibold text-gray-700'>Location</h2>
                                    <p className='text-sm md:text-lg font-bold'>{job.location}</p>
                                </div>
                                <div className='bg-green-300 rounded-lg py-4 md:py-5 text-center'>
                                    <h2 className='text-xs md:text-md font-semibold text-gray-700'>Applicants</h2>
                                    <p className='text-sm md:text-lg font-bold'>{applicants.length}</p>
                                </div>
                            </div>

                            <div className='px-1'>
                                <h2 className='my-2 font-bold'>Job Description</h2>
                                <p className='text-sm md:text-base text-justify'>{job.description}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Resume Upload Form */}
                <form className='mt-8'>
                    <h2 className='font-bold my-4'>Upload Resume to Apply<span className='text-red-600'>*</span></h2>
                    <div className='px-2 grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-4'>

                        <div className='w-full md:w-5/6'>
                            <input type="file" onChange={handleFileUpload} className="block w-full cursor-pointer border border-primary shadow-sm rounded-lg text-sm file:bg-primary file:text-white file:border-0 file:py-2 file:px-3" />
                        </div>

                        <Link to={`/application-form/${job?._id}`}>
                            <div className='flex justify-center'>
                                <button className='block bg-primary text-white text-md py-2 px-12 md:px-16 rounded-md'>
                                    Apply Now
                                </button>
                            </div>
                        </Link>
                    </div>
                </form>

                {file && (
                    <div className="mt-4">
                        <h2 className="font-bold">Uploaded Resume:</h2>
                        <p>{file}</p>
                    </div>
                )}

                <div className='text-center'>
                    <p className='hover:underline text-xs md:text-sm mt-8'>
                        By applying to the above job, you agree to our terms and conditions.
                    </p>
                </div>
            </div>

            <SimilarJobs />
        </div>
    );
};
