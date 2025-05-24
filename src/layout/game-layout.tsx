import { ChatSection } from '../chat/chat-section';
import { usePlayer } from '../player/hooks/use-player.hook';
import { PlayerAvatarGate } from '../player/player-avatar-gate';
import type { PlayerResponse } from '../types';
import { BattleView } from '../views/battle-view';
import { CombatView } from '../views/combat-view';
import {
  type ViewEntry,
  useViewManager,
} from '../views/hooks/use-view-manager.hook';
import { ActionButtonsPane } from './action-buttons-pane';
import { NodeInfoPane } from './node-info-pane';
import { PlayerInfoPane } from './player-info-pane';
import { TitleBar } from './title-bar';

const views = {
  combat: CombatView,
  battle: BattleView,
};

const renderView = (
  viewManager: ReturnType<typeof useViewManager>,
  player: PlayerResponse,
) => {
  const view = viewManager.current as ViewEntry<keyof typeof views> | null;

  if (!view) {
    return null;
  }

  const [viewName, viewProps] = view;
  const ViewComponent = views[viewName];

  return (
    <ViewComponent player={player} viewManager={viewManager} {...viewProps} />
  );
};

export function GameLayout() {
  const player = usePlayer();
  const viewManager = useViewManager();

  return (
    <div className="h-full flex flex-col border-1 border-t-2 border-purple-700">
      <TitleBar />
      <PlayerAvatarGate>
        <div className="flex flex-col gap-2 sm:gap-4 p-2 sm:p-4 lg:p-8 grow overflow-auto">
          <PlayerInfoPane player={player} />
          <NodeInfoPane node={player?.currentNode ?? null} />
          <ActionButtonsPane viewManager={viewManager} />
          {renderView(viewManager, player!)}
        </div>
        <ChatSection />
      </PlayerAvatarGate>
    </div>
  );
}
