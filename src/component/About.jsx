import './About.css';
import van from '../assets/van.png';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-image-container">
          <img src={van} alt="Van" className="about-image" />
        </div>
        <div className="about-text">
          <h1 className="p1">Don’t squeeze in a sedan when you could relax in a van.</h1>
          <p className="p2">
            Our mission is to enliven your road trip with the perfect travel van rental. Our vans are recertified before each trip to ensure your travel plans can go off without a hitch.
            <span> (Hitch costs extra 😉)</span>
          </p>
          <p className="p3">
            Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world on 4 wheels.
          </p>
          <div className="button-container">
            <p>Your destination is waiting. Your van is ready.</p>
            <Link className="van-list" to="vans-list">Explore our vans</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
