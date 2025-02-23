import React from 'react'
import { OurCompanies } from './OurCompanies'
import bannerImg from "../../assets/img/working-women.png"
import jobsImg from "../../assets/img/jobs.png"
import userImg from "../../assets/img/user.png"
import checkImg from "../../assets/img/check.png"
import closeImg from "../../assets/img/close.png"
import workImg from "../../assets/img/how-works-img.png"
import PostingImg from "../../assets/img/posting-img.png"

export const Hero = () => {
 
  
  const jobStats = [
    { name: "Jobs", value: 150, icon: jobsImg, hoverIcon: "" },
    { name: "Candidates Applied", value: 5, icon: userImg , hoverIcon: "" },
    { name: "Approved", value: 70, icon: checkImg, hoverIcon: "" },
    { name: "Declined", value: 30, icon: closeImg, hoverIcon: "" },
  ];
  return (
    <div>
      <div className="max-w-screen container mx-auto xl:px-24 px-4">
        <div className="grid my-[50px] md:grid-cols-2 gap-4 justify-center items-center">
          <div>
            <h1 className="text-[3.8vw] leading-[4.7vw] font-bold text-primary mb-3 helveticaBold">
              Post Your Jobs And Let The Best Candidates Come To You
            </h1>
            <p className="text-lg text-black mb-8 text-grey60">
              Our platform connects you with qualified candidates actively
              seeking new opportunities.{" "}
            </p>
            <button className="text-base font-normal py-3 px-8 border-solid border-blue50 border rounded-lg bg-blue50 text-white">
              Post a Job
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

      <div className="max-w-screen container mx-auto xl:px-24 px-4">
        <div className="flex py-5">
          <div className="max-w-[305px]">
            <h4 className="helveticaBold text-5xl mb-3">Jobs Overview</h4>
            <p className="text-lg font-normal text-grey60 max-w-[260px]">
              Overview of features to streamline your hiring process.
            </p>
          </div>
          <ul className="w-[calc(100%-180px)] flex  justify-stretch bg-white rounded-[17px] px-[30px] py-[25px]">
            {jobStats.map((stat, index) => (
              <li key={index} className="flex align-middle items-center">
                <span className="bg-blue70 rounded-[10px] min-w-[60px] w-[60px] text-center h-[60px] inline-flex justify-center items-center">
                  <img
                    src={stat.icon}
                    alt="icon"
                    className="text-center h-[28px]"
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

      <div className="max-w-screen container mx-auto xl:px-24 px-4">
        <div className="grid py-[50px] md:grid-cols-2 gap-4">
          <div className="">
            <img src={workImg} alt="img" className="max-w-[450px] w-100" />
          </div>
          <div className="pt-5">
            <h4 className="helveticaBold text-5xl mb-3">How It Works</h4>
            <p className="text-lg font-normal text-grey60">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
{/* get started section */}
      <div className="bg-dark100">
        <div className="max-w-screen container mx-auto xl:px-24 px-4 grid pt-[20px] grid-cols-[2fr_1fr] gap-4 items-center">
          <div className="">
            <h4 className="helveticaBold text-5xl mb-3 text-white leading-[62px] max-w-[775px]">
              Your Next Hire is Just a Click Away—Start Posting Jobs Today!
            </h4>
            <p className="text-lg font-normal text-white mb-5 max-w-[550px]">
              Post your jobs in seconds and connect with top talent
              effortlessly. Your next hire is just a click away
            </p>
            <button className="mt-4 text-base font-normal py-3 px-8 border-solid border-blue50 border rounded-lg bg-blue50 text-white">
              get Started
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
