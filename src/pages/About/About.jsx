import React from 'react';
import './About.css';

/**
 * About page component
 * @returns {JSX.Element} About page component
 */
function About() {
  return (
    <div className="about">
      <div className="about__header">
        <h1 className="about__title">About WebGameMulti</h1>
        <p className="about__subtitle">A modern platform for web-based games</p>
      </div>
      
      <div className="about__content">
        <section className="about__section">
          <h2 className="about__section-title">Our Mission</h2>
          <p>
            WebGameMulti is an open-source platform designed to make web games more accessible 
            to players and developers alike. We believe in the power of web technologies to create 
            engaging gaming experiences that can be played directly in the browser without any 
            installation required.
          </p>
          <p>
            Our mission is to provide a simple, unified platform where developers can showcase 
            their web-based games and where players can discover and enjoy a diverse collection 
            of games in one place.
          </p>
        </section>
        
        <section className="about__section">
          <h2 className="about__section-title">For Players</h2>
          <p>
            As a player, WebGameMulti offers you:
          </p>
          <ul className="about__list">
            <li>A curated collection of web games across various genres</li>
            <li>No downloads or installations required</li>
            <li>Games that work across devices and platforms</li>
            <li>Regular updates with new games and features</li>
            <li>A seamless, distraction-free gaming experience</li>
          </ul>
        </section>
        
        <section className="about__section">
          <h2 className="about__section-title">For Developers</h2>
          <p>
            As a developer, WebGameMulti provides:
          </p>
          <ul className="about__list">
            <li>An easy way to showcase your web games to a wider audience</li>
            <li>Simple integration process with minimal requirements</li>
            <li>Clear documentation and examples</li>
            <li>Standardized format for game metadata</li>
            <li>Open-source codebase you can contribute to</li>
          </ul>
          <p>
            Interested in adding your game to our platform? Check out our 
            <a href="https://github.com/webgamemulti/docs" className="about__link">
              developer documentation
            </a>.
          </p>
        </section>
        
        <section className="about__section">
          <h2 className="about__section-title">Technology</h2>
          <p>
            WebGameMulti is built using modern web technologies:
          </p>
          <ul className="about__list">
            <li>React for the user interface</li>
            <li>React Router for navigation</li>
            <li>CSS Modules for styling</li>
            <li>Vite for fast development and optimized builds</li>
          </ul>
          <p>
            The platform is designed to be lightweight, fast, and responsive across all devices.
          </p>
        </section>
        
        <section className="about__section">
          <h2 className="about__section-title">Contact Us</h2>
          <p>
            Have questions, suggestions, or want to report an issue? Reach out to us:
          </p>
          <ul className="about__list about__list--contact">
            <li>
              <strong>GitHub:</strong> 
              <a href="https://github.com/webgamemulti" className="about__link">
                github.com/webgamemulti
              </a>
            </li>
            <li>
              <strong>Email:</strong> 
              <a href="mailto:info@webgamemulti.com" className="about__link">
                info@webgamemulti.com
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default About; 