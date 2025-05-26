import { MobInfo } from '../common/mob-info';
import type { PlayerResponse } from '../types';
import { useActiveMobsQuery } from './hooks/use-active-mobs-query.hook';

export function BattleView(props: { player: PlayerResponse; mobId: number }) {
  const activeMobs = useActiveMobsQuery();
  const mob = activeMobs.find((mob) => mob.id === props.mobId);

  if (!mob) {
    return <div className="text-red-500">Mob not found</div>;
  }

  const mobType = props.player.currentNode?.mobTypes?.find(
    (type) => type.id === mob?.mobTypeId,
  );

  if (!mobType) {
    return <div className="text-red-500">No mob types available</div>;
  }

  return (
    <div className="relative w-full border-1 border-purple-600 flex flex-col">
      <div className="border-b-1 p-2">Battle</div>
      <div className="p-2">
        <MobInfo mob={mob} mobType={mobType} />
      </div>
    </div>
  );
}
