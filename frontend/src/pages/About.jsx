import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">About Our Resume Builder</h1>
        <p className="text-lg text-gray-600 mb-6">
          Our resume builder is designed to help job seekers create professional resumes effortlessly. With customizable templates and ATS-friendly formatting, you can build a resume that stands out in just a few clicks.
        </p>
        
        <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
          <h2 className="text-2xl font-semibold text-secondary mb-2">Why Choose Us?</h2>
          <ul className="list-disc text-left text-gray-700 pl-5">
            <li>Easy-to-use, intuitive interface</li>
            <li>ATS-optimized templates for better job matching</li>
            <li>Instant PDF download & customization options</li>
            <li>AI-powered resume analysis for better job applications</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-secondary mb-2">Our Mission</h2>
          <p className="text-gray-700">
            We aim to empower job seekers with the best tools to showcase their skills and experience, making the job application process smoother and more effective.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
