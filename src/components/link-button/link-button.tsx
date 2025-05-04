import type { HTMLAttributeAnchorTarget, PropsWithChildren } from 'react';
import styles from './link-button.module.css';

export function LinkButton({
  to,
  target = '_blank',
  children,
}: PropsWithChildren<{
  to: string;
  target?: HTMLAttributeAnchorTarget;
}>) {
  return (
    <a href={to} target={target} className={styles.linkButton}>
      {children}
    </a>
  );
}
