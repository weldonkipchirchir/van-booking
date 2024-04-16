import './About.css'
import van from '../assets/van.png'
import { Link } from 'react-router-dom';
function About() {
  return (
    <div className="about-container">
      <img src={van} alt="" />
      <div>
        <p className='p1'>Don’t squeeze in a sedan when you could relax in a van.</p>
      </div>
      <div>
        <p className='p2'>
          Our mission is to enliven your road trip with the perfect travel van
          rental. Our vans are recertified before each trip to ensure your
          travel plans can go off without a hitch.
        <span> (Hitch costs extra 😉)</span>
        </p>
      </div>
      <div>
        <p className='p3'>
        Our team is full of vanlife enthusiasts who know firsthand the magic of
        touring the world on 4 wheels.
        </p>
      </div>
      <div className='button-container'>
        <p>Your destination is waiting. Your van is ready.</p>

        <Link to='vans-list'>Explore our vans</Link>
      </div>
    </div>
  );
}

export default About;
