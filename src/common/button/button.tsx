import classNames from 'classnames';
import { createElement } from 'react';
import styles from './button.module.css';

interface ButtonPropStates {
  default: string;
  disabled: string;
  hover: string;
  active: string;
}

type ButtonPropsWithoutType = {
  text?: Partial<ButtonPropStates>;
  border?: Partial<ButtonPropStates>;
  bg?: Partial<ButtonPropStates>;
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

  const bgDefault = bg?.default || 'var(--color-dark-bg)';
  const borderDefault = border?.default || 'var(--color-purple-600)';
  const textDefault = text?.default || 'var(--color-purple-600)';

  const bgHover = bg?.hover || 'var(--color-purple-800)';
  const borderHover = border?.hover || 'var(--color-purple-600)';
  const textHover = text?.hover || 'var(--color-cyan-500)';

  const bgActive = bg?.active || 'var(--color-cyan-600)';
  const borderActive = border?.active || 'var(--color-cyan-500)';
  const textActive = text?.active || 'var(--color-purple-600)';

  const bgDisabled = bg?.disabled || 'var(--color-dark-bg)';
  const borderDisabled = border?.disabled || 'var(--color-gray-400)';
  const textDisabled = text?.disabled || 'var(--color-gray-400)';

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
          '--border-disabled-color': borderDisabled,
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
          '--text-disabled-color': textDisabled,
          '--bg-color': bgDefault,
          '--bg-hover-color': bgHover,
          '--bg-active-color': bgActive,
          '--bg-disabled-color': bgDisabled,
        } as React.CSSProperties,
        ...rest,
      })}
    </div>
  );
}
