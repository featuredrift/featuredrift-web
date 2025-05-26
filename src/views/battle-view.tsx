import { Button } from '../common/button/button';
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
    <div className="flex flex-col gap-2">
      <div className="text-lg text-center">- Current Battle -</div>
      <div className="bg-purple-600 cornerless p-[1px]">
        <div className="cornerless bg-dark-bg p-4 flex flex-col gap-2">
          <MobInfo mob={mob} mobType={mobType} />
        </div>
      </div>
      <div className="flex gap-3 justify-center">
        <Button className="py-2 px-3">Attack</Button>
        <Button className="py-2 px-3">Escape?</Button>
      </div>
    </div>
  );
}
