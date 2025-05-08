import { LinkButton } from '../link-button/link-button';

export function CloseButton() {
  return (
    <LinkButton
      href="/auth/logout"
      className="text-2xl fixed top-4 right-4 h-10 w-10 leading-[35px]"
    >
      X
    </LinkButton>
  );
}
