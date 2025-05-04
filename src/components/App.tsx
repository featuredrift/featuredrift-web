import axios from 'axios';
import classNames from 'classnames';
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

function UserLoginView() {
  return (
    <>
      <LinkButton to="/auth/login" target="_self">
        Login
      </LinkButton>
    </>
  );
}

function HomeUserView({ session }: { session: SessionResponse }) {
  return (
    <>
      <code>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </code>
      <LinkButton to="/auth/logout" target="_self">
        Logout
      </LinkButton>
    </>
  );
}

function MainLayout({ sessionPromise }: { sessionPromise: SessionPromise }) {
  const session = use(sessionPromise);
  const isLoggedIn = session?.user !== undefined;

  return (
    <div
      className={classNames('p-8 h-full overflow-auto', {
        'border-4 border-purple-700': isLoggedIn,
      })}
    >
      <div className="flex flex-col gap-8 justify-center items-center min-h-full">
        <div className="flex flex-row justify-center align-middle">
          <img
            src={art}
            alt="FeatureDrift AI Art"
            className="max-h-[50vh] w-auto motion-safe:animate-pulse"
          />
        </div>

        {isLoggedIn ? <HomeUserView session={session} /> : <UserLoginView />}

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
    </div>
  );
}

function App() {
  const sessionPromise = getSession().catch(() => null);

  return (
    <Suspense fallback={<SessionLoading />}>
      <MainLayout sessionPromise={sessionPromise} />
    </Suspense>
  );
}

export default App;
