import { useEffect, useRef } from 'react';
import { Button } from '../common/button/button';
import { startCombat } from '../data/api';
import { useMutation } from '../data/hooks/use-mutation.hook';
import type { ViewManagerViewProps } from '../types';

export function CombatView(props: ViewManagerViewProps) {
  const mobTypes = props.player.currentNode?.mobTypes;

  const [startCombatMutation, isMutating] = useMutation(startCombat, {
    invalidate: ['player', 'avatars'],
    handleSuccess: (mob) => {
      props.viewManager.push(['battle', { id: mob.id }]);
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

  return (
    <div ref={viewRef} className="flex flex-col grow justify-between">
      <div>
        <div className="text-2xl text-center pb-2">Pick a fight..</div>
        {mobTypes && mobTypes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-auto">
            {mobTypes.map((mobType) => (
              <Button
                key={mobType.constName}
                disabled={isMutating}
                onClick={() => startCombatMutation(mobType.constName)}
                className="p-4"
              >
                <div className="text-lg">{mobType.name}</div>
                <div className="text-xs pb-2">Level: {mobType.level}</div>
                <div className="text-sm italic font-thin">
                  {mobType.description}
                </div>
              </Button>
            ))}
          </div>
        ) : (
          <div>No mobs available to fight.</div>
        )}
      </div>
      <div className="flex flex-col items-end">
        <button
          className="cursor-pointer hover:bg-purple-700 hover:text-cyan-500 px-4 py-2"
          onClick={() => props.viewManager.back()}
        >
          ...Nevermind
        </button>
      </div>
    </div>
  );
}
