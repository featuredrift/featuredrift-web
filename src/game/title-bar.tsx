export function TitleBar() {
  return (
    <div className="grow-0 flex flex-row border-b-1 border-purple-700 text-center text-lg sm:text-xl align-middle bg-dark-bg">
      <div className="grow flex items-center justify-center text-purple-700 font-(family-name:--font-glitch) italic">
        Feature Drift
      </div>
      <a
        href="/auth/logout"
        className="flex items-center justify-center w-[1lh] border-l-1 border-purple-600 text-purple-600 hover:text-cyan-400 hover:bg-purple-600 active:text-purple-700 active:bg-cyan-600"
      >
        X
      </a>
    </div>
  );
}
