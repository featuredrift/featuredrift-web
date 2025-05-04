import type { HTMLAttributeAnchorTarget, PropsWithChildren } from 'react';

export function LinkButton({
  to,
  target = '_blank',
  children,
}: PropsWithChildren<{
  to: string;
  target?: HTMLAttributeAnchorTarget;
}>) {
  return (
    <a
      href={to}
      target={target}
      className="p-4 inline-block rounded-4xl text-xl border-2 border-cyan-600 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-cyan-400 active:text-cyan-400 active:bg-purple-700 text-center cursor-pointer hover:italic"
    >
      {children}
    </a>
  );
}
