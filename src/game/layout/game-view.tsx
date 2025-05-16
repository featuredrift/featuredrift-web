import { ChatSection } from '../chat/chat-section';
import { usePlayer } from '../player/hooks';
import { PlayerInfoPane } from '../player/player-info-pane';
import { ActionButtonsPane } from './action-buttons-pane';
import { NodeInfoPane } from './node-info-pane';
import { TitleBar } from './title-bar';

export function GameView() {
  const player = usePlayer();

  return (
    <div className="h-full flex flex-col border-1 border-t-2 border-purple-700">
      {player && <TitleBar />}
      <div className="flex flex-col gap-2 sm:gap-4 p-2 sm:p-4 lg:p-8 grow overflow-auto">
        <PlayerInfoPane player={player} />
        <NodeInfoPane node={player?.currentNode ?? null} />
        <ActionButtonsPane />
      </div>
      <ChatSection />
    </div>
  );
}
