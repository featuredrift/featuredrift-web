import { AxiosError } from 'axios';
import { useActionState } from 'react';
import { Button } from '../common/button/button';
import { type AvatarPayload, createPlayerAvatar } from '../data/api';
import { useMutation } from '../data/data-context';

export function useCreateAvatar() {}

interface CreateAvatarActionState {
  data: {
    name: string;
    bio: string;
  };
  validation?: string | string[];
}

export function CreateAvatarView() {
  const [mutate, isMutating] = useMutation<AvatarPayload>(createPlayerAvatar, {
    invalidate: ['player', 'avatars'],
  });

  const action = async (_prev: CreateAvatarActionState, fd: FormData) => {
    const state: CreateAvatarActionState = {
      data: {
        name: fd.get('avatar-name') as string,
        bio: fd.get('avatar-bio') as string,
      },
    };

    try {
      await mutate(state.data);
    } catch (err) {
      if (
        err instanceof AxiosError &&
        err.response &&
        err.response.status === 400 &&
        err.response.data.message
      ) {
        state.validation = err.response.data.message;
      } else {
        throw err;
      }
    }

    return state;
  };

  const [state, submitAction, isPending] = useActionState(action, {
    data: {
      bio: '',
      name: '',
    },
  });

  const disabled = isMutating || isPending;

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
          disabled={disabled}
          defaultValue={state.data.name}
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
          disabled={disabled}
          defaultValue={state.data.bio}
        />
      </div>
      {state.validation && (
        <div className="text-red-500">
          {Array.isArray(state.validation)
            ? state.validation.map((msg, i) => <div key={i}>{msg}</div>)
            : state.validation}
        </div>
      )}
      <Button type="submit" disabled={disabled}>
        Create
      </Button>
    </form>
  );
}
