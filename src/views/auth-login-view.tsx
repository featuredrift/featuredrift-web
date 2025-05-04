import { LinkButton } from '../components/link-button/link-button';

export function AuthLoginView() {
  return (
    <div className="flex flex-col gap-8 justify-center items-center min-h-full">
      <div className="flex flex-row justify-center align-middle">
        <img
          src="/assets/featuredrift-ai-art.png"
          alt="FeatureDrift AI Art"
          className="max-h-[50vh] w-auto motion-safe:animate-pulse"
        />
      </div>
      <LinkButton to="/auth/login" target="_self">
        Login
      </LinkButton>
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
