import type { Mob, MobType } from '../types';
import { LabeledProgressBar } from './progress-bar/labeled-progress-bar';

export function MobInfo({ mob, mobType }: { mob: Mob; mobType: MobType }) {
  return (
    <>
      <div className="text-lg">{mobType.name}</div>
      <div className="text-xs pb-2">Level: {mobType.level}</div>
      <div className="text-sm italic font-thin">{mobType.description}</div>
      <div className="flex flex-row p-1 justify-center items-center gap-2">
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
