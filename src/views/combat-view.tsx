import { Button } from '../common/button/button';
import type { MobType } from '../types';
import type { useViewManager } from './hooks/use-view-manager.hook';

export function CombatView(props: {
  mobTypes?: MobType[] | null;
  viewManager: ReturnType<typeof useViewManager>;
}) {
  return (
    <div className="flex flex-col grow justify-between">
      <div>
        <div className="text-2xl text-center pb-2">Pick a fight..</div>
        {props.mobTypes && props.mobTypes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-auto">
            {props.mobTypes.map((mob) => (
              <Button key={mob.name} disabled className="p-4">
                <div className="text-lg">{mob.name}</div>
                <div className="text-xs pb-2">Level: {mob.level}</div>
                <div className="text-sm italic font-thin">
                  {mob.description}
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
