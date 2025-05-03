import React, { HTMLAttributeAnchorTarget, PropsWithChildren, Suspense, use } from 'react';
import art from '/featuredrift-ai-art.png';
import axios from 'axios';

function LinkButton({
  to,
  target = '_blank',
  children,
}: PropsWithChildren<{
  to: string,
  target?: HTMLAttributeAnchorTarget
}>) {
  return (
    <a href={to} target={target} className="p-4 inline-block rounded-4xl text-xl border-2 border-cyan-600 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-cyan-400 active:bg-purple-700 text-center cursor-pointer hover:italic">
      {children}
    </a>
  )
}

type SessionResponse = {
  message: string;
  user: {
    id: string;
  }
}

type SessionPromise = Promise<SessionResponse | null>;

async function getSession(): SessionPromise {
  const res = await axios.get('/auth/verify', { withCredentials: true });

  if (res.status !== 200) {
    return null;
  }

  return res.data;
}

function SessionLoading() {
  return (
    <div className="text-2xl">
      Loading...
    </div>
  )
}

function WithSessionPromise({ render }: { render: (sessionPromise: SessionPromise) => React.ReactNode }) {
  const sessionPromise = getSession().catch(() => null);

  return (
    <Suspense fallback={<SessionLoading />}>
      {render(sessionPromise)}
    </Suspense>
  )
}

function LoginPortal({ sessionPromise }: { sessionPromise: SessionPromise }) {
  const session = use(sessionPromise);

  if (session === null) {
    return (
      <div>
        <LinkButton to="/auth/login" target="_self">Login</LinkButton>
      </div>
    );
  }

  return (
    <>
      <div className='text-white'>
        <pre>
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>

      <div>
        <LinkButton to="/auth/logout" target="_self">Logout</LinkButton>
      </div>
    </>
  );
}

function App() {
  return (
    <div className="flex flex-col gap-8 justify-center items-center">
      <div className="max-h-2/3 flex flex-row justify-center align-middle">
        <img src={art} alt="FeatureDrift AI Art" />
      </div>
      <WithSessionPromise
        render={(sessionPromise) => (
          <LoginPortal sessionPromise={sessionPromise} />
        )}
      />
      <div>
        <LinkButton to="https://github.com/featuredrift/featuredrift-web/fork">Hack the Skin</LinkButton>
      </div>
      <div>
        <LinkButton to="https://github.com/featuredrift/featuredrift-web/issues/new?labels=enhancement">Petition for Drift</LinkButton>
      </div>
    </div>
  )
}

export default App
