import styles from "./Display.module.css";
const Display = function ({ displayval }) {
  return (
    <input className={styles.display} type="text" value={displayval} readOnly />
  );
};
export default Display;
