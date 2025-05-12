import classNames from 'classnames';
import { createElement } from 'react';
import styles from './button.module.css';

type ButtonPropsWithoutType = {
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

export type ButtonProps<T extends 'button' | 'a'> = (T extends 'button'
  ? React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  : React.DetailedHTMLProps<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >) & { el?: T } & ButtonPropsWithoutType;

export function Button<T extends 'button' | 'a' = 'button'>(
  props: ButtonProps<T>,
) {
  const { el = 'button', text, border, bg, className, ...rest } = props;

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
        'flex h-full cornerless p-[1px] overflow-hidden flex-col justify-center items-center',
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
      {createElement(el, {
        className: classNames(
          'h-full w-full cornerless cursor-pointer',
          styles.button,
          className,
        ),
        style: {
          '--text-color': textDefault,
          '--text-hover-color': textHover,
          '--text-active-color': textActive,
          '--bg-color': bgDefault,
          '--bg-hover-color': bgHover,
          '--bg-active-color': bgActive,
        } as React.CSSProperties,
        ...rest,
      })}
    </div>
  );
}
