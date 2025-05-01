import { HTMLAttributeAnchorTarget, PropsWithChildren } from 'react';
import art from '/featuredrift-ai-art.png';

function LinkButton({
  to,
  target = '_blank',
  children,
}: PropsWithChildren<{
  to: string,
  target?: HTMLAttributeAnchorTarget
}>) {
  return (
    <a href={to} target={target} className="p-4 inline-block rounded-4xl text-xl border border-purple-600 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 text-center cursor-pointer">
      {children}
    </a>
  )
}

function App() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <div className="max-h-2/3 flex flex-row justify-center align-middle">
        <img src={art} alt="FeatureDrift AI Art" />
      </div>
      <div>
        <LinkButton to="https://github.com/featuredrift/featuredrift/fork">Deface the UI</LinkButton>
      </div>
      <div>
        <LinkButton to="https://github.com/featuredrift/featuredrift/issues/new?labels=enhancement">Request Core Drift</LinkButton>
      </div>
    </div>
  )
}

export default App
