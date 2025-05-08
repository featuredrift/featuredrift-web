import classNames from 'classnames';
import buttonStyles from './button/button.module.css';

export function LinkButton(
  props: React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >,
) {
  const { children, className: classNameFromProps, ...rest } = props;
  const classes = classNames(buttonStyles.button, classNameFromProps);

  return (
    <a className={classes} {...rest}>
      {children}
    </a>
  );
}
