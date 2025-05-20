import { Button } from '../common/button/button';

export function AuthLoginView() {
  const authError = new URLSearchParams(window.location.search).get('error');

  return (
    <div className="flex flex-col gap-8 justify-center items-center min-h-full">
      <div className="flex flex-row justify-center align-middle">
        <img
          src="/assets/featuredrift-ai-art.png"
          alt="FeatureDrift AI Art"
          className="max-h-[50vh] w-auto motion-safe:animate-pulse"
        />
      </div>
      {authError && <div className="text-red-500 text-xs">{authError}</div>}
      <Button el="a" href="/auth/login" className="px-4 py-3">
        Authenticate
      </Button>
      <Button
        el="a"
        href="https://github.com/featuredrift/featuredrift-web/fork"
        target="_blank"
        className="px-4 py-3"
      >
        Vandalize UI
      </Button>
    </div>
  );
}
