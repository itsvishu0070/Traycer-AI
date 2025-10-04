
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <span className={styles.logoText}>Traycer AI</span>
      </div>
    </header>
  );
};

export default Header;
