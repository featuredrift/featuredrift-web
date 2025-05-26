import type { Mob, MobType } from '../types';
import { LabeledProgressBar } from './progress-bar/labeled-progress-bar';

export function MobInfo({ mob, mobType }: { mob: Mob; mobType: MobType }) {
  return (
    <>
      <div className="text-lg">{mobType.name}</div>
      <div className="text-xs">Level: {mobType.level}</div>
      <div className="text-base italic font-thin py-2">
        {mobType.description}
      </div>
      <div className="text-sm flex flex-row justify-center items-center gap-2">
        <LabeledProgressBar
          label="HEALTH"
          color="#9810fa"
          current={mob.healthCurrent}
          max={mobType.healthMax}
        />
      </div>
    </>
  );
}
