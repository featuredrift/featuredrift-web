import classNames from 'classnames';
import { Button } from '../common/button/button';
import { LinkButton } from '../common/link-button';

export function AuthButton(
  props: React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >,
) {
  const { className: classNameFromProps, ...rest } = props;

  return (
    <LinkButton
      className={classNames('text-2xl p-4 active:italic', classNameFromProps)}
      {...rest}
    >
      {props.children}
    </LinkButton>
  );
}

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
      <Button type="a" href="/auth/login" className="px-4 py-3">
        Authenticate
      </Button>
      <Button
        type="a"
        href="https://github.com/featuredrift/featuredrift-web/fork"
        target="_blank"
        className="px-4 py-3"
      >
        Vandalize UI
      </Button>
    </div>
  );
}
