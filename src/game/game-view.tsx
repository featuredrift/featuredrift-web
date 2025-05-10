import { Button } from '../common/button/button';
import { getSafetyRatingColor } from '../common/color-utils';
import ProgressBar from '../common/progress-bar/progress-bar';
import { usePlayer } from '../player/hooks';
import type { NodeDetails } from '../player/types';
import { ChatSection } from './chat';
import styles from './game-view.module.css';

function PlayerAvatar() {
  return (
    <div className="rounded-2xl border-2 border-purple-600 p-2">
      <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" fill="none">
        <circle cx="15" cy="10" r="6" stroke="#53eafd" strokeWidth="2" />
        <path d="M5,28 A10,8 0 0,1 25,28" stroke="#53eafd" strokeWidth="2" />
      </svg>
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
      <div>
        <ProgressBar
          current={current}
          max={max}
          minColor="#ff0000"
          maxColor={color}
        />
      </div>
      <div>
        {current}/{max}
      </div>
    </>
  );
}

function NodeInfoPane({ node }: { node: NodeDetails | null }) {
  if (!node) return null;

  const paddedId = String(node.id).padStart(4, '0');
  const safetyRatingColor = getSafetyRatingColor(node.safetyRating);

  return (
    <div className="col-span-3 flex flex-col gap-2 border-2 border-purple-600 p-2 sm:p-4">
      <div
        className="grow text-2xl sm:text-3xl"
        style={{ color: safetyRatingColor }}
      >
        {paddedId} - {node.name}
      </div>
      <div className="text-purple-300 font-light whitespace-pre-wrap text-base sm:text-lg italic m-screen max-h-[15vh] overflow-y-auto">
        {node.description}
      </div>
    </div>
  );
}

function ActionButtons() {
  return (
    <div
      className={`col-span-3 grid grid-cols-2 grid-rows-auto gap-2 items-center ${styles.actionButtons}`}
    >
      <Button>MOVE</Button>
      <Button>EXPLORE</Button>
      <Button>CHARACTER</Button>
      <Button>WORK</Button>
      <Button>INVENTORY</Button>
      <Button>COMBAT</Button>
      <Button>MAP</Button>
      <Button>PVP</Button>
    </div>
  );
}

export function GameView() {
  const player = usePlayer();

  const displayName =
    player?.activeAvatar?.name ||
    player?.displayName ||
    player?.username ||
    '????';

  return (
    <div className="flex flex-col h-full min-h-max gap-4 p-8">
      <div className="grid grid-cols-[auto_1fr_auto] grid-rows-auto gap-4 items-center text-purple-500 text-xl sm:text-2xl">
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
        <NodeInfoPane node={player?.currentNode ?? null} />
        <ActionButtons />
      </div>
      <ChatSection />
    </div>
  );
}
