import ProgressBar from '../common/progress-bar/progress-bar';
import type { PlayerResponse } from '../types';

function PlayerAvatar() {
  return (
    <div className="cornerless p-[1px] overflow-hidden bg-purple-600 sm:row-span-2">
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
        height="1.2rem"
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
    <div className="player-info-pane items-center gap-y-0 gap-x-3  text-purple-500">
      <PlayerAvatar />
      <div className="display-name col-span-2 sm:col-span-1 sm:row-span-2 text-cyan-300 text-3xl sm:max-lg:text-2xl 2xl:text-4xl w-full h-full flex items-center">
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
