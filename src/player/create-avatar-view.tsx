import { Button } from '../common/button/button';
import { useCreateAvatar } from './hooks/use-create-avatar.hook';

export function CreateAvatarView() {
  const { submitAction, disabled, state } = useCreateAvatar();

  return (
    <div className="grow flex items-center justify-center">
      <form
        action={submitAction}
        className="p-8 space-y-6 bg-dark-bg flex flex-col sm:max-w-2xl"
        autoComplete="off"
      >
        <div className="text-2xl font-bold text-center">
          Synthesize New Avatar
        </div>
        <div className="text-xs text-center font-bold italic">
          Available Slots: <span className="text-cyan-500">1</span>
        </div>
        <div className="text-base">
          Create your avatar by providing a name and a bio. The avatar will be
          generated based on the provided information.
        </div>
        <div>
          <label htmlFor="avatar-name" className="block text-sm font-medium">
            Name
          </label>
          <input
            id="avatar-name"
            name="avatar-name"
            type="text"
            className="w-full px-4 py-2 border border-purple-700 focus:outline-none focus:ring-2"
            minLength={2}
            maxLength={30}
            disabled={disabled}
            defaultValue={state.data.name}
            autoFocus
            data-1p-ignore
          />
        </div>
        <div className="grow flex flex-col">
          <label
            htmlFor="avatar-bio"
            className="block text-sm font-medium mb-1 grow-0"
          >
            Bio
          </label>
          <textarea
            id="avatar-bio"
            name="avatar-bio"
            rows={5}
            className="w-full px-4 py-2 border border-purple-700 focus:outline-none focus:ring-2 grow sm:grow-0 max-h-auto"
            disabled={disabled}
            defaultValue={state.data.bio}
          />
        </div>
        {state.validation && (
          <ul className="text-red-500 text-sm">
            {Array.isArray(state.validation)
              ? state.validation.map((msg, i) => <li key={i}>{msg}</li>)
              : state.validation}
          </ul>
        )}
        <div>
          <Button type="submit" disabled={disabled} className="py-2">
            Create
          </Button>
        </div>
      </form>
    </div>
  );
}
