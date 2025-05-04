import axios from 'axios';
import type { HTMLAttributeAnchorTarget, PropsWithChildren } from 'react';
import { Suspense, use } from 'react';
import art from '/featuredrift-ai-art.png';

function LinkButton({
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
      className="p-4 inline-block rounded-4xl text-xl border-2 border-cyan-600 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-cyan-400 active:bg-purple-700 text-center cursor-pointer hover:italic"
    >
      {children}
    </a>
  );
}

type SessionResponse = {
  message: string;
  user: {
    id: string;
  };
};

type SessionPromise = Promise<SessionResponse | null>;

async function getSession(): SessionPromise {
  const res = await axios.get('/auth/verify', { withCredentials: true });

  if (res.status !== 200) {
    return null;
  }

  return res.data;
}

function SessionLoading() {
  return <div className="text-2xl">Loading...</div>;
}

function WithSessionPromise({
  render,
}: {
  render: (sessionPromise: SessionPromise) => React.ReactNode;
}) {
  const sessionPromise = getSession().catch(() => null);

  return (
    <Suspense fallback={<SessionLoading />}>{render(sessionPromise)}</Suspense>
  );
}

function UserLoginView() {
  return (
    <div>
      <LinkButton to="/auth/login" target="_self">
        Login
      </LinkButton>
    </div>
  );
}

function MainLayout({ sessionPromise }: { sessionPromise: SessionPromise }) {
  const session = use(sessionPromise);
  const isLoggedIn = session?.user !== undefined;

  if (isLoggedIn) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col gap-8 justify-center items-center border-4 border-purple-700 p-8 h-full overflow-auto">
      <div className="flex flex-row justify-center align-middle">
        <img
          src={art}
          alt="FeatureDrift AI Art"
          className="max-h-[50vh] w-auto motion-safe:animate-pulse"
        />
      </div>

      {!isLoggedIn && <UserLoginView />}

      <div>
        {isLoggedIn && (
          <LinkButton to="/auth/logout" target="_self">
            Logout
          </LinkButton>
        )}
        {!isLoggedIn && (
          <LinkButton to="/auth/login" target="_self">
            Login
          </LinkButton>
        )}
      </div>
      <div>
        <LinkButton to="https://github.com/featuredrift/featuredrift-web/fork">
          Hack the Skin
        </LinkButton>
      </div>
      <div>
        <LinkButton to="https://github.com/featuredrift/featuredrift-web/issues/new?labels=enhancement">
          Petition for Drift
        </LinkButton>
      </div>
    </div>
  );
}

function App() {
  return (
    <WithSessionPromise
      render={(sessionPromise) => (
        <MainLayout sessionPromise={sessionPromise} />
      )}
    />
  );
}

export default App;
