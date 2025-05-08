import { useActionState, useEffect } from 'react';
import { Button } from '../common/button/button';
import { createPlayerAvatar } from '../data/api';
import { useClient } from '../data/data-context';
import type { PlayerAvatar } from './types';

export function CreateAvatarView() {
  const client = useClient();
  const [avatar, submitAction, isPending] = useActionState(
    async (_previousState: PlayerAvatar | null, formData: FormData) => {
      const avatar = await createPlayerAvatar(
        formData.get('avatar-name') as string,
        formData.get('avatar-bio') as string,
      );

      return avatar;
    },
    null,
  );

  useEffect(() => {
    if (!avatar) return;

    window.location.pathname = '/';
  }, [avatar, client]);

  return (
    <form action={submitAction}>
      <div>Create a new avatar</div>
      <div>
        <label htmlFor="avatar-name">Name</label>
      </div>
      <div>
        <input
          id="avatar-name"
          name="avatar-name"
          type="text"
          className="bg-amber-50 text-black"
        />
      </div>
      <div>
        <label htmlFor="avatar-bio">Bio</label>
      </div>
      <div>
        <input
          id="avatar-bio"
          name="avatar-bio"
          type="text"
          className="bg-amber-50 text-black"
        />
      </div>
      <Button type="submit" disabled={isPending}>
        Create
      </Button>
    </form>
  );
}
