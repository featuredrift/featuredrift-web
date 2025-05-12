import { usePlayer } from '../player/hooks';
import { ActionButtonsPane } from './action-buttons-pane';
import { ChatSection } from './chat-section';
import { NodeInfoPane } from './node-info-pane';
import { PlayerInfoPane } from './player-info-pane';
import { TitleBar } from './title-bar';

export function GameView() {
  const player = usePlayer();

  return (
    <div className="h-full flex flex-col">
      {player && <TitleBar />}
      <div className="flex flex-col gap-2 sm:gap-4 lg:gap-8 p-2 sm:p-4 lg:p-8 grow overflow-auto">
        <PlayerInfoPane player={player} />
        <NodeInfoPane node={player?.currentNode ?? null} />
        <ActionButtonsPane />
      </div>
      <ChatSection />
    </div>
  );
}
