import { useActionState } from 'react';
import { Button } from '../common/button/button';
import { type AvatarPayload, createPlayerAvatar } from '../data/api';
import { useMutation } from '../data/data-context';

export function useCreateAvatar() {}

export function CreateAvatarView() {
  const [mutate] = useMutation<AvatarPayload>(createPlayerAvatar, {
    invalidate: ['player', 'avatars'],
  });

  const action = async (_prev: null, fd: FormData) => {
    const payload = {
      name: fd.get('avatar-name') as string,
      bio: fd.get('avatar-bio') as string,
    };

    await mutate(payload);

    return null;
  };

  const [, submitAction, isPending] = useActionState(action, null);

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
        <textarea
          id="avatar-bio"
          name="avatar-bio"
          className="bg-amber-50 text-black"
        />
      </div>
      <Button type="submit" disabled={isPending}>
        Create
      </Button>
    </form>
  );
}
