import styles from './close-button.module.css';

export function CloseButton() {
  return (
    <a href="/auth/logout" target="_self" className={styles.closeBtn}>
      ╳
    </a>
  );
}
