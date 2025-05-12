export function TitleBar() {
  return (
    <div className="flex flex-row border-b-1 border-purple-600 text-center text-xl sm:text-2xl align-middle">
      <div className="grow flex items-center justify-center text-purple-500">
        Feature Drift
      </div>
      <a
        href="/auth/logout"
        className="flex items-center justify-center min-h-10 min-w-10 border-l-1 border-purple-600 text-purple-700 bg-dark-bg hover:text-cyan-400 hover:bg-purple-600 active:text-purple-700 active:bg-cyan-600"
      >
        X
      </a>
    </div>
  );
}
