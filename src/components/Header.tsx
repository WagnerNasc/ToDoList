import styles from './Header.module.css';
import logo from '../assets/logo.png';


export function Header() {
    return(
        <header className={styles.header}>
            <img className={styles.logo} src={ logo } alt="logo To Do List"/>
        </header>
    );
}