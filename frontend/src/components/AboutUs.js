import React from 'react';
import profile from'../profile.png';
import react from '../react.png';
import node from '../node.png';
import express from '../express.png';
import mongo from '../mongo.png';
import jwt from '../jwt.png';
import axios from '../axios.png';
import router from '../router.png';
import cv from "../cvAnkit1.pdf";
import logo from '../logoIntellichat.png';

const AboutUs = ({ isDarkMode }) => {
  const downloadPDF = (filename, url) => {
    // Create an invisible anchor element
    const link = document.createElement('a');
    link.style.display = 'none';

    // Set the download attribute with the filename
    link.download = filename;

    // Set the href to the URL of the PDF file
    link.href = url;

    // Append the link to the document body
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
};
  return (
    <div className={`about-us-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <h1>About Us</h1>
      
      <br></br>
      <div className="website-info">
        <h3>Our Website - IntelliChat</h3><img src = {logo} height={" 120rem"} width={"120rem" } alt='logo' className = "navbar-logo"></img>
        <br></br>
        <p>Welcome to <strong>IntelliChat</strong>, your ultimate AI-powered assistant! Designed to provide a seamless and intelligent conversational experience, IntelliChat is here to help with your questions, generate creative content, brainstorm ideas, or simply engage in a friendly chat. Explore the innovative world of AI-driven communication and discover the endless possibilities. Enjoy your journey with IntelliChat!</p>
        <p><strong>Key features of our chat app include:</strong></p>
        <ul className='list-item'>
          <li><b>Natural Language Processing:</b> Engage in natural conversations.</li>
          <li><b>Content Creation:</b> Generate high-quality content.</li>
          <li><b>Question and Answer:</b> Get accurate responses to queries.</li>
          <li><b>Brainstorming:</b> Foster creativity and idea generation.</li>
          <li><b>Language Translation:</b> Translate text accurately.</li>
          <li><b>Learning Support:</b> Educational assistance and tutoring.</li>
          <li><b>User-Friendly Interface:</b> Intuitive and easy to navigate.</li>
        </ul>
        <p>For any inquiries or feedback, please contact us at <a href='mailto:mail2ankit1234@gmail.com'>mail2ankit1234@gmail.com</a>.</p>
      </div>
      <div className="website-info">
  <h3>Tech Stack Used</h3>
  <p>Our chat application, <strong>IntelliChat</strong>, is built using a robust and modern tech stack to ensure a seamless and efficient user experience. Below are the key technologies we have utilized:</p>
  <div className="tech-stack-grid">
    <div className="tech-item">
      <img src={react} alt="React" />
      <b>React:</b> A powerful JavaScript library for building user interfaces.
    </div>
    <div className="tech-item">
      <img src={node} alt="Node.js" />
      <b>Node.js:</b> A JavaScript runtime built on Chrome's V8 JavaScript engine for server-side development.
    </div>
    <div className="tech-item">
      <img src={express} alt="Express" />
      <b>Express:</b> A minimal and flexible Node.js web application framework.
    </div>
    <div className="tech-item">
      <img src={mongo} alt="MongoDB" />
      <b>MongoDB:</b> A NoSQL database for storing and retrieving data efficiently.
    </div>
    <div className="tech-item">
      <img src={jwt} alt="JWT" />
      <b>JWT:</b> JSON Web Tokens for secure user authentication and authorization.
    </div>
    <div className="tech-item">
      <img src={axios} alt="Axios" />
      <b>Axios:</b> A promise-based HTTP client for making requests to the backend.
    </div>
    <div className="tech-item">
      <img src={router} alt="React Router" />
      <b>React Router:</b> A collection of navigational components for dynamic routing in a React app.
    </div>
  </div>
</div>



      <div className="developer-info">
        <h3>Meet the Developers</h3>
        <div className="developer">
          <img src={profile} alt="Developer 1" />
          <div>
            <h4>Ankit Singh</h4>
            <p>Frontend & Backend developer</p>
            <p>GitHub: <a href="https://github.com/ankit2four">www.github.com/ankit2four</a></p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/ankit-singh-638733243/">www.linkedin.com/in/ankit-singh-638733243/</a></p>
            <p>Email: <a href='mailto:mail2ankit1234@gmail.com'>mail2ankit1234@gmail.com</a></p>
            <button onClick={() => downloadPDF("cvAnkit.pdf", cv)}><b>Resume</b></button>
          </div>
        </div>
        {/* Add more developers as needed */}
      </div>
    </div>
  );
};

export default AboutUs;
