import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const UpdateJob = () => {
    const { id } = useParams(); // Get the job ID from the URL
    const [job, setJob] = useState(null); // Store the fetched job data
    const [questions, setQuestions] = useState([{ question: '', answer: '' }]); // Store the candidate form questions
    const [questionSize, setQuestionSize] = useState(0); // Track the number of questions
    const [redirect, setRedirect] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // Fetch job data when the component mounts
    useEffect(() => {
        fetch(`http://localhost:8000/jobs/current-job/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Job not found');
                }
                return res.json();
            })
            .then((result) => {
                setJob(result);
                setQuestions(
                    Array.isArray(result.applicationForm)
                        ? result.applicationForm
                        : [{ question: '', answer: '' }]
                );
                reset({
                    jobTitle: result.jobTitle || '',
                    employmentType: result.employmentType || '',
                    location: result.location || '',
                    salary: result.salary || '',
                    description: result.description || '',
                });
            })
            .catch((error) => {
                console.error('Error fetching job:', error);
                toast.error('Job not found or could not be fetched');
            });
    }, [id, reset]);

    useEffect(() => {
        if (redirect) {
            setTimeout(() => {
                window.location.href = "/";
            }, 2000);
        }
    }, [redirect]);
    // Handle form submission
    const onSubmit = (data) => {
        const jobId = job?.jobID; // Ensure we use the correct jobId
console.log(jobId,"kkkkkkk")
        // Log the data to verify the structure before sending the request
        console.log('Submitting the following data:', {
            ...data,
            applicationForm: questions, // Add the application form questions
        });

        fetch(`http://localhost:8000/jobs/update-job/${jobId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...data, // Job details from the form
                applicationForm: questions, // Candidate form questions
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log('Update successful:', result);
                toast.success('Job Updated Successfully');
                setRedirect(true); // Set redirect to true after success
            })
            .catch((error) => {
                console.error('Update failed:', error);
                toast.error('Failed to update job');
            });
    };

    // Add a new question dynamically
    const addQuestion = () => {
        setQuestionSize(questionSize + 1);
        setQuestions([...questions, { question: '', answer: '' }]);
    };

    // Handle deleting a question
    const handleDeleteQuestion = (index) => {
        const newQuestions = questions.filter((_, qIndex) => qIndex !== index);
        setQuestions(newQuestions);
        setQuestionSize(questionSize - 1);
    };

    return (
        <div className="max-w-scren-2xl container mt-2 mx-auto xl:px-24 px-4">
            <div className="bg-[#e7e7e7] py-6 px-4 lg:px-16 rounded-lg">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* JOB POSTING DETAILS */}
                        <div className="lg:w-1/2 w-full">
                            <h1 className="text-xl font-bold text-center">Job Details</h1>
                            <div>
                                <label className="block m-1 text-md">Job Title</label>
                                <input
                                    type="text"
                                    required
                                    {...register('jobTitle')}
                                    placeholder="Ex: Full Stack Developer"
                                    className="create-job-input placeholder:text-xs md:placeholder:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block m-1 text-md">Employment Type</label>
                                <input
                                    type="text"
                                    required
                                    {...register('employmentType')}
                                    placeholder="Ex: Internship, Part Time, Full Time"
                                    className="create-job-input placeholder:text-xs md:placeholder:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block m-1 text-md">Location</label>
                                <input
                                    type="text"
                                    required
                                    {...register('location')}
                                    placeholder="Ex: Hyderabad"
                                    className="create-job-input placeholder:text-xs md:placeholder:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block m-1 text-md">
                                    Expected Salary <span className="text-sm">(in LPA)</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    {...register('salary')}
                                    placeholder="Ex: 20"
                                    className="create-job-input placeholder:text-xs md:placeholder:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block m-1 text-md">Job Description</label>
                                <textarea
                                    className="create-job-input placeholder:text-xs md:placeholder:text-sm"
                                    rows={4}
                                    placeholder="Job Description and Requirements"
                                    required
                                    {...register('description')}
                                />
                            </div>
                        </div>

                        {/* CANDIDATE FORM */}
                        <div className="lg:w-1/2 w-full">
                            <h1 className="text-xl font-bold text-center">Candidate Form</h1>
                            <div>
                                {questions.map((question, index) => (
                                    <div key={index}>
                                        <label className="block m-1 text-md">Question {`${index + 1}`}</label>
                                        <div className="mb-2 text-lg grid grid-cols-1 md:grid-cols-2">
                                            <input
                                                type="text"
                                                required
                                                {...register(`applicationForm[${index}].question`)} // Correctly register question
                                                placeholder={`Question ${index + 1}`}
                                                className="create-job-input placeholder:text-xs md:placeholder:text-sm"
                                            />
                                            <div className="grid grid-cols-3 items-center justify-items-center my-2 md:my-0">
                                                <div className="flex">
                                                    <input
                                                        {...register(`applicationForm[${index}].answer`, { required: true })}
                                                        type="radio"
                                                        value="Yes"
                                                        className="mx-2"
                                                    />
                                                    <p>Yes</p>
                                                </div>
                                                <div className="flex">
                                                    <input
                                                        {...register(`applicationForm[${index}].answer`, { required: true })}
                                                        type="radio"
                                                        value="No"
                                                        className="mx-2"
                                                    />
                                                    <p>No</p>
                                                </div>
                                                <div onClick={() => handleDeleteQuestion(index)}>
                                                    <box-icon size="sm" name="trash" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={addQuestion}
                                className={`${questionSize === 4 ? 'hidden' : ''
                                    } block border border-black bg-transparent text-black text-xs md:text-md py-3 px-12 md:px-16 rounded-md mt-4 md:mt-8 mx-auto`}
                            >
                                Add More Questions
                            </button>
                        </div>
                    </div>

                    {/* Submit button */}
                    <div className="flex justify-center my-8">
                        <button className="block bg-primary text-white text-md py-4 px-16 rounded-md">
                            Update Job Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
