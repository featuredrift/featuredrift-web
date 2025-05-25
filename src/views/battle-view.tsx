import { useActiveMobsQuery } from './hooks/use-active-mobs-query.hook';

export function BattleView(props: { mobId: number }) {
  const activeMobs = useActiveMobsQuery();
  const mob = activeMobs.find((mob) => mob.id === props.mobId);

  return (
    <div className="relative w-full h-screen p-4">
      <div>Mob:</div>
      <pre>{JSON.stringify(mob, null, 2)}</pre>
    </div>
  );
}
