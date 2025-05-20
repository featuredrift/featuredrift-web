import { AxiosError } from 'axios';
import { useActionState } from 'react';
import { type AvatarPayload, createPlayerAvatar } from '../../data/api';
import { useMutation } from '../../data/hooks/use-mutation.hook';

interface CreateAvatarActionState {
  data: {
    name: string;
    bio: string;
  };
  validation?: string | string[];
}

export function useCreateAvatar() {
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

  return { disabled, state, submitAction };
}
