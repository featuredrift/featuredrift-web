import classNames from 'classnames';
import styles from './button.module.css';

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  text?: {
    default?: string;
    hover?: string;
    active?: string;
  };
  border?: {
    default?: string;
    hover?: string;
    active?: string;
  };
  bg?: {
    default?: string;
    hover?: string;
    active?: string;
  };
};

export function Button(props: ButtonProps) {
  const { text, border, bg, className, ...rest } = props;

  const borderDefault = border?.default || 'var(--color-purple-600)';
  const borderHover = border?.hover || borderDefault;
  const borderActive = border?.active || 'var(--color-cyan-500)';
  const bgDefault = bg?.default || 'var(--color-dark-bg)';
  const bgHover = bg?.hover || 'var(--color-purple-700)';
  const bgActive = bg?.active || 'var(--color-cyan-600)';
  const textDefault = text?.default || 'var(--color-purple-700)';
  const textHover = text?.hover || 'var(--color-cyan-400)';
  const textActive = text?.active || 'var(--color-purple-700)';

  return (
    <div
      className={classNames(
        'flex h-full cornerless p-[1px] overflow-hidden',
        styles.container,
      )}
      style={
        {
          '--border-color': borderDefault,
          '--border-hover-color': borderHover,
          '--border-active-color': borderActive,
        } as React.CSSProperties
      }
    >
      <button
        className={classNames(
          'h-full w-full cornerless cursor-pointer ',
          styles.button,
          className,
        )}
        style={
          {
            '--text-color': textDefault,
            '--text-hover-color': textHover,
            '--text-active-color': textActive,
            '--bg-color': bgDefault,
            '--bg-hover-color': bgHover,
            '--bg-active-color': bgActive,
          } as React.CSSProperties
        }
        {...rest}
      ></button>
    </div>
  );
}
