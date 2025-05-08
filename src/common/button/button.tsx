import classNames from 'classnames';
import styles from './button.module.css';

export function Button(
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
) {
  const { className: classNameFromProps, ...rest } = props;

  return (
    <button
      className={classNames(styles.button, classNameFromProps)}
      {...rest}
    ></button>
  );
}
