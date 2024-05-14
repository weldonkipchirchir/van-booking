import './Home.css'
import { Link } from 'react-router-dom'
function Home() {
  return (
    <div className="home-container">
        <p className="p1">You got the travel plans, we got the travel vans.</p>
        <div className='p2'>
            <p>Add adventure to your life by joining the #vanlife movement. Rent the perfect van to make your perfect road trip.</p>
        </div>
        <div className='button'>
            <button> <Link to='/vans' className='button-link'>Find your van</Link></button>
        </div>
    </div>
  )
}

export default Home