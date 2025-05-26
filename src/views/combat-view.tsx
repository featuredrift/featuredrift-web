import { useEffect, useRef } from 'react';
import { Button } from '../common/button/button';
import { MobInfo } from '../common/mob-info';
import { startCombat } from '../data/api';
import { useMutation } from '../data/hooks/use-mutation.hook';
import type { ViewManagerViewProps } from '../types';
import { useActiveMobsQuery } from './hooks/use-active-mobs-query.hook';

export function CombatView(props: ViewManagerViewProps) {
  const mobTypes = props.player.currentNode!.mobTypes!;
  const activeMobs = useActiveMobsQuery();

  const [startCombatMutation, isMutating] = useMutation(startCombat, {
    invalidate: ['mobs'],
    handleSuccess: (mob) => {
      props.viewManager.push(['battle', { mobId: mob.id }]);
    },
  });

  const viewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    viewRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  }, []);

  const activeMobButtons = activeMobs.map((mob) => {
    const mobType = mobTypes.find((type) => type.id === mob.mobTypeId)!;

    return (
      <Button
        key={mob.id}
        disabled={isMutating}
        onClick={() => props.viewManager.push(['battle', { mobId: mob.id }])}
        className="p-2"
      >
        <MobInfo mob={mob} mobType={mobType} />
      </Button>
    );
  });

  return (
    <div ref={viewRef} className="flex flex-col grow justify-between gap-6">
      {activeMobs.length > 0 && (
        <div className="text-2xl text-center flex flex-col gap-2">
          <div>Existing mobs...</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-auto gap-2">
            {activeMobButtons}
          </div>
        </div>
      )}
      <div>
        <div className="text-2xl text-center pb-2">Pick a new fight..</div>
        {mobTypes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-auto gap-2">
            {mobTypes.map((mobType) => (
              <Button
                key={mobType.constName}
                disabled={isMutating}
                onClick={() => startCombatMutation(mobType.constName)}
                className="p-2"
              >
                <div className="text-lg">{mobType.name}</div>
                <div className="text-xs">Level: {mobType.level}</div>
                <div className="text-sm italic font-thin pt-2">
                  {mobType.description}
                </div>
              </Button>
            ))}
          </div>
        ) : (
          <div>No mobs available to fight.</div>
        )}
        <div className="flex flex-col items-end">
          <button
            className="cursor-pointer hover:bg-purple-700 hover:text-cyan-500 px-4 py-2"
            onClick={() => props.viewManager.back()}
          >
            ...Nevermind
          </button>
        </div>
      </div>
    </div>
  );
}
