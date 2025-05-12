import ProgressBar from '../common/progress-bar/progress-bar';
import type { PlayerResponse } from '../player/types';

function PlayerAvatar() {
  return (
    <div className="cornerless p-[1px] overflow-hidden bg-purple-600">
      <div className="bg-dark-bg cornerless">
        <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" fill="none">
          <circle cx="15" cy="10" r="6" stroke="#53eafd" strokeWidth="2" />
          <path d="M5,28 A10,8 0 0,1 25,28" stroke="#53eafd" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}

function LabeledProgress({
  label,
  current = 0,
  max = 0,
  color = '#ffffff',
}: {
  label: string;
  color?: string;
  current?: number;
  max?: number;
}) {
  return (
    <>
      <div>{label}</div>
      <ProgressBar
        current={current}
        max={max}
        minColor="#ff0000"
        maxColor={color}
        height="100%"
      />
      <div>
        {current}/{max}
      </div>
    </>
  );
}

export function PlayerInfoPane({ player }: { player: PlayerResponse | null }) {
  const displayName =
    player?.activeAvatar?.name ||
    player?.displayName ||
    player?.username ||
    '????';

  return (
    <div className="grid grid-cols-[auto_1fr_auto] grid-rows-auto items-center gap-2 text-purple-500 text-xl sm:text-2xl">
      <div>
        <PlayerAvatar />
      </div>
      <div className="col-span-2 text-teal-300 text-4xl sm:text-5xl">
        {displayName}
      </div>
      <LabeledProgress
        label="HEALTH"
        color="#9810fa"
        current={player?.activeAvatar?.healthCurrent}
        max={player?.activeAvatar?.healthMax}
      />
      <LabeledProgress
        label="ENERGY"
        color="#53eafd"
        current={player?.activeAvatar?.energyCurrent}
        max={player?.activeAvatar?.energyMax}
      />
    </div>
  );
}
