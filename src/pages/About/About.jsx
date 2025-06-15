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
        <h1 className="about__title">About GameTime Bar</h1>
        <p className="about__subtitle">Your Ultimate Gaming Entertainment Hub</p>
      </div>
      
      <div className="about__content">
        <section className="about__section">
          <h2 className="about__section-title">Our Mission</h2>
          <p>
            GameTime Bar is an innovative platform designed to bring the joy of gaming to everyone, 
            anywhere. We combine the casual atmosphere of a gaming bar with the convenience of web-based 
            games that can be played directly in your browser without any installation required.
          </p>
          <p>
            Our mission is to create a vibrant community where gamers can discover, play, and share 
            a diverse collection of games in a fun, social environment - just like your favorite local 
            gaming bar, but available 24/7 online.
          </p>
        </section>
        
        <section className="about__section">
          <h2 className="about__section-title">For Players</h2>
          <p>
            As a player at GameTime Bar, you'll enjoy:
          </p>
          <ul className="about__list">
            <li>A curated collection of web games across various genres</li>
            <li>No downloads or installations required - just click and play</li>
            <li>Games that work across all your devices and platforms</li>
            <li>Regular updates with new games and features</li>
            <li>A seamless, immersive gaming experience</li>
            <li>A community of fellow gaming enthusiasts</li>
          </ul>
        </section>
        
        <section className="about__section">
          <h2 className="about__section-title">For Developers</h2>
          <p>
            As a developer, GameTime Bar offers:
          </p>
          <ul className="about__list">
            <li>A popular platform to showcase your web games to a wider audience</li>
            <li>Simple integration process with minimal requirements</li>
            <li>Clear documentation and examples</li>
            <li>Standardized format for game metadata</li>
            <li>Open-source codebase you can contribute to</li>
            <li>Analytics and feedback from real players</li>
          </ul>
          <p>
            Interested in adding your game to our platform? Check out our 
            <a href="https://github.com/gametimebar/docs" className="about__link">
              developer documentation
            </a>.
          </p>
        </section>
        
        <section className="about__section">
          <h2 className="about__section-title">Technology</h2>
          <p>
            GameTime Bar is built using modern web technologies:
          </p>
          <ul className="about__list">
            <li>React for the user interface</li>
            <li>React Router for navigation</li>
            <li>CSS Modules for styling</li>
            <li>Vite for fast development and optimized builds</li>
          </ul>
          <p>
            The platform is designed to be lightweight, fast, and responsive across all devices, 
            providing a premium gaming experience wherever you are.
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
              <a href="https://github.com/gametimebar" className="about__link">
                github.com/gametimebar
              </a>
            </li>
            <li>
              <strong>Email:</strong> 
              <a href="mailto:info@gametime.bar" className="about__link">
                info@gametime.bar
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default About; 