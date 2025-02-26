import React, { useState } from 'react'
import { OurCompanies } from './OurCompanies'
import bannerImg from "../../assets/img/working-women.png"
import briefcase from "../../assets/img/icons/briefcase.png"
import users from "../../assets/img/icons/candidates.png"
import listing from "../../assets/img/icons/listing.png"
import send from "../../assets/img/icons/send.png"
import Applicant from "../../assets/img/for-applicant.png"
import employer from "../../assets/img/for-employer.png"
import PostingImg from "../../assets/img/posting-img.png"
import Accordion from "../accordian";
import {accordionEmployerData, accordionApplicantData, jobStats} from "../enum"
export const Hero = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    console.log(openIndex, 'openIndex');
  };
  const jobStats = [
    { name: "Active Employers", value: 150, icon: briefcase, hoverIcon: "" },
    { name: "Job Listings", value: 5, icon: users , hoverIcon: "" },
    { name: "Candidates Registered", value: 70, icon: listing, hoverIcon: "" },
    { name: "Applications Submitted", value: 30, icon: send, hoverIcon: "" },
  ];
  return (
    <div>
      <div className="max-w-[1360px] container mx-auto px-4">
        <div className="grid my-[50px] md:grid-cols-2 gap-4 justify-center items-center">
          <div>
            <h1 className="text-[3.8vw] leading-[4.7vw] font-bold text-primary mb-3 helveticaBold">
            Post Openings, Search Jobs, and Build the Future You Want
            </h1>
            <p className="text-lg text-black mb-[42px] text-grey60">
            Employers can quickly post jobs and attract top talent, while candidates can browse listings and apply to roles that match their skills and career goals.
            </p>
            <button className="text-base font-semibold py-3 px-8 border-solid border-blue50 border rounded-lg bg-blue50 text-white">
              Post a Job
            </button>
            <button className="ml-[20px] text-base font-semibold py-3 px-8 border-solid border-transparent border rounded-lg bg-blue40 text-blue50">
              Find a Job
            </button>
          </div>

          <div className="">
            <img
              src={bannerImg}
              alt="banner-img"
              className="max-w-[500px] ml-auto w-full"
            />
          </div>
        </div>
      </div>
{/* impact counts section */}
      <div className="max-w-[1360px] container mx-auto px-4">
        <div className="flex py-5">
          <div className="max-w-[305px]">
            <h4 className="helveticaBold text-5xl mb-3">Here's Our Impact</h4>
            <p className="text-lg font-normal text-grey60 max-w-[260px]">
            We've helped thousands of employers and job seekers.
            </p>
          </div>
          <ul className="w-[calc(100%-180px)] flex  justify-stretch bg-white rounded-[17px] px-[30px] py-[25px]">
            {jobStats.map((stat, index) => (
              <li key={index} className="flex align-middle items-center">
                <span className="bg-blue70 rounded-[10px] min-w-[60px] w-[60px] text-center h-[60px] inline-flex justify-center items-center">
                  <img
                    src={stat.icon}
                    alt="icon"
                    className="text-center h-[22px]"
                  />
                </span>
                <div className="ml-4">
                  <div className="helveticaBold text-[2.5vw] mb-0 leading-[2.5vw] text-blue50">
                    {stat.value}
                  </div>
                  <span className="text-base helvetica text-grey70">
                    {stat.name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
{/* works for employer section */}
      <div className="max-w-[1360px] container mx-auto px-4">
        <div className="grid min-h-[580px] items-center md:grid-cols-[1fr_2fr] gap-4 pt-5">
          <div className="">
            <img src={employer} alt="img" className="max-w-[450px] w-100" />
          </div>
          <div className="pt-5">
            <div className='max-w-[694px] ml-auto'>
              <h4 className="helveticaBold text-5xl mb-3">How It Works for the employer</h4>
              <p className="text-lg font-normal text-grey60">
                Streamline Your Hiring Process in Just a Few Simple Steps.
              </p>
              <div className="space-y-4 pt-5">
                {accordionEmployerData.map((item, index) => (
                  <Accordion
                    key={index}
                    title={item.title}
                    isOpen={openIndex === index}
                    onToggle={() => handleToggle(index)}
                  >
                    {item.content}
                  </Accordion>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
{/* works for applicant section */}
      <div className="max-w-[1360px] container mx-auto px-4">
        <div className="grid min-h-[580px] items-center md:grid-cols-[2fr_1fr] gap-4 pb-5">
          <div className="pt-5">
            <h4 className="helveticaBold text-5xl mb-3">How It Works for the Applicant</h4>
            <p className="text-lg font-normal text-grey60">
            Finding your next job is easy! Here's how it works.
            </p>
            <div className="max-w-[612px] space-y-4 pt-5">
              {accordionApplicantData.map((item, index) => (
                <Accordion
                  key={index}
                  title={item.title}
                  isOpen={openIndex === index}
                  onToggle={() => handleToggle(index)}
                >
                  {item.content}
                </Accordion>
              ))}
            </div>
          </div>

          <div className="">
            <img src={Applicant} alt="img" className="max-w-[450px] w-100 ml-auto" />
          </div>
        </div>
      </div>
{/* get started section */}
      <div className="bg-dark100">
        <div className="max-w-[1360px] container mx-auto px-4 grid pt-[20px] grid-cols-[2fr_1fr] gap-4 items-center">
          <div className="">
            <h4 className="helveticaBold text-5xl mb-3 text-white leading-[62px] max-w-[775px]">
            The Best Place to Hire Talent and Find Your Next Job
            </h4>
            <p className="text-lg font-normal text-white mb-5 max-w-[550px]">
            Our platform brings employers and job seekers together with powerful tools that make the process fast, simple, and seamless.
            </p>
            <button className="mt-4 text-base font-normal py-3 px-8 border-solid border-blue50 border rounded-lg bg-blue50 text-white">
              Get Started
            </button>
          </div>
          <div className="">
            <img src={PostingImg} alt="img" className="max-w-[450px] w-100" />
          </div>
        </div>
      </div>

      <OurCompanies />
    </div>
  );
}
