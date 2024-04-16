import { Link } from "react-router-dom"
import './NotFound.css'
function NotFound() {
  return (
    <div className="container-notfound">
      <h1>Ooops</h1>
      <p>Sorry, the page you were looking for was not found.</p>
      <Link to='/'>Return to home</Link>
    </div>
  )
}

export default NotFound 