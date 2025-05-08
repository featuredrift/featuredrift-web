import classNames from 'classnames';
import styles from './button.module.css';

export function Button(
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
) {
  const { className: classNameFromProps, ...rest } = props;
  const classes = classNames(styles.button, classNameFromProps);

  return <button className={classes} {...rest}></button>;
}
