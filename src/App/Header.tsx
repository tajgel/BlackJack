import { Link } from "react-router"


function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/singleplayer">Singleplayer</Link>
        <Link to="/multiplayer">Multiplayer</Link>
      </nav>
    </header>
  )
}

export default Header