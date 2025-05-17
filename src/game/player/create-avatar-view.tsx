import { Button } from '../../common/button/button';
import { useCreateAvatar } from './hooks';

export function CreateAvatarView() {
  const { submitAction, disabled, state } = useCreateAvatar();

  return (
    <div className="flex sm:items-center justify-center min-h-full p-5">
      <div className="cornerless bg-purple-700 p-[1px]">
        <form
          action={submitAction}
          className="w-full max-w-md p-8 space-y-6 bg-dark-bg cornerless min-h-full sm:min-h-0"
        >
          <div className="text-2xl font-bold mb-2 text-center">
            Avatar Synthesis
          </div>
          <div className="text-sm mb-4 text-center font-bold italic">
            Slots available: 1
          </div>
          <div className="text-base mb-4">
            Create your avatar by providing a name and a bio. The avatar will be
            generated based on the provided information.
          </div>
          <div>
            <label
              htmlFor="avatar-name"
              className="block text-sm font-medium mb-1"
            >
              Name
            </label>
            <input
              id="avatar-name"
              name="avatar-name"
              type="text"
              className="w-full px-4 py-2 border border-purple-700 focus:outline-none focus:ring-2"
              disabled={disabled}
              defaultValue={state.data.name}
              autoFocus
            />
          </div>
          <div>
            <label
              htmlFor="avatar-bio"
              className="block text-sm font-medium mb-1"
            >
              Bio
            </label>
            <textarea
              id="avatar-bio"
              name="avatar-bio"
              rows={4}
              className="w-full px-4 py-2 border border-purple-700 focus:outline-none focus:ring-2"
              disabled={disabled}
              defaultValue={state.data.bio}
            />
          </div>
          {state.validation && (
            <div className="text-red-500 text-sm">
              {Array.isArray(state.validation)
                ? state.validation.map((msg, i) => <div key={i}>{msg}</div>)
                : state.validation}
            </div>
          )}
          <Button type="submit" disabled={disabled} className="py-2">
            Create
          </Button>
        </form>
      </div>
    </div>
  );
}
