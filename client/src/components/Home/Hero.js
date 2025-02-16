import React from 'react'
import { OurCompanies } from './OurCompanies'
import bannerImg from "../../assets/img/working-women.png"

export const Hero = () => {
 
  
  const jobStats = [
    { name: "Applications", value: 150, icon: "../../assets/img/applications.png", hoverIcon: "" },
    { name: "Total Jobs", value: 5, icon: "../../assets/img/briefcase.png", hoverIcon: "" },
    { name: "Under Review", value: 70, icon: "../../assets/img/review.png", hoverIcon: "" },
    { name: "Shortlisted", value: 100, icon: "../../assets/img/listing.png", hoverIcon: "" },
  ];
  return (
    <div>
      <div className='hidden md:block top-0 -mt-14 p-0 absolute object-cover -z-10'>
        {/* Hero section image */}
        {/* <img src={require('../images/hero.jpg')} alt='hero' className='w-full */}

      </div>
      <div className='max-w-screen-2xl container mx-auto'>
        <div className='grid my-[50px] md:grid-cols-2 gap-4 justify-center items-center'>

          <div>
            <h1 className='text-[3.8vw] leading-[4.7vw] font-bold text-primary mb-3 helveticaBold'>Post Your Jobs And Let The Best Candidates Come To You</h1>
            <p className='text-lg text-black mb-8 text-grey60'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <button className='text-base font-normal py-3 px-8 border-solid border-blue50 border rounded-lg bg-blue50 text-white'>Post a Job</button>

          </div>

          <div className=''>
            <img src={bannerImg} alt='banner-img' className='max-w-[500px] ml-auto w-full'/>
          </div>

        </div>

        <div className='flex py-5'>
          <div className='max-w-[305px]'>
            <h4 className='helveticaBold text-5xl mb-3'>Application Overview</h4>
            <p className='text-lg font-normal text-grey60'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, </p>
          </div>
          <ul className='ml-auto grid md:grid-cols-4 gap-16 bg-white rounded-[17px] px-[40px] py-[25px]'>
              {jobStats.map((stat, index) => (
                <li key={index} className="flex align-middle items-center">
                  <img src={stat.icon} alt='icon' className='bg-blue70 rounded-[10px] p-4 min-w-[65px] w-[65px] text-center h-[65px]'/>
                  <div className='ml-4'>
                    <div className="helveticaBold text-[2.5vw] mb-0 leading-[2.5vw] text-blue50">{stat.value}</div>
                    <span className="text-base helvetica text-grey70">{stat.name}</span>
                  </div>
                </li>
              ))}
          </ul>
        </div>

        <OurCompanies />

      </div>
    </div>
  )
}
