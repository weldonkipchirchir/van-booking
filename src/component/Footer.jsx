import './Footer.css'
function Footer() {
    //year
    const year = new Date().getFullYear();
  return (
    <footer>
        <h1>@ {year} #VANLIFE</h1>
    </footer>
  )
}

export default Footer