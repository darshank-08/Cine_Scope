import { NavLink } from 'react-router-dom'
import styles from "./nav.module.css"

const Navbar = () => {
  return (
    <nav className={styles.nav}> 
      <NavLink className={styles.navLink} to="/">Home</NavLink> {" "}
      <NavLink className={styles.navLink} to="/Fevorites">Favorites</NavLink>{" "}
      <NavLink className={styles.navLink} to="/about">About</NavLink>
    </nav>
  )
}

export default Navbar
