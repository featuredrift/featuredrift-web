import type { ViewManagerViewProps } from '../types';

export function BattleView(props: ViewManagerViewProps) {
  console.log('BattleView props:', props);
  return (
    <div className="relative w-full h-screen p-4">
      <div className="absolute top-4 right-4 flex space-x-4">
        <div className="border-2 border-purple-700 bg-dark-bg p-2">
          <svg
            className="w-24 h-24 text-purple-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" />
          </svg>
        </div>
        <div className="border-2 border-purple-700 bg-dark-bg p-2">
          <svg
            className="w-24 h-24 text-purple-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 flex space-x-4 items-end">
        <div className="border-2 border-purple-700 bg-dark-bg p-2">
          <svg
            className="w-24 h-24 text-cyan-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <rect x="4" y="4" width="16" height="16" />
          </svg>
        </div>
        <div className="bg-dark-bg border-2 border-purple-700 p-4 text-purple-600">
          <p className="text-cyan-500 font-bold">Player</p>
          <div className="mt-2 w-32 h-2 bg-gray-700 border border-purple-700"></div>
        </div>
      </div>
    </div>
  );
}
