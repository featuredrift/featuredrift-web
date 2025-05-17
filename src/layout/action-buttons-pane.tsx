import { Button, type ButtonProps } from '../common/button/button';
import type { useViewManager } from '../views/hooks/use-view-manager.hook';

function ActionButton(props: ButtonProps<'button'>) {
  return <Button {...props} className="text-base sm:text-xl lg:text-2xl p-3" />;
}

function CyanActionButton(props: ButtonProps<'button'>) {
  return (
    <ActionButton
      text={{
        default: 'var(--color-cyan-400)',
        hover: 'var(--color-purple-600)',
        active: 'var(--color-cyan-500)',
      }}
      border={{
        default: 'var(--color-cyan-400)',
        hover: 'var(--color-cyan-400)',
        active: 'var(--color-purple-500)',
      }}
      bg={{
        default: 'var(--color-dark-bg)',
        hover: 'var(--color-cyan-600)',
        active: 'var(--color-purple-800)',
      }}
      {...props}
    />
  );
}

export function ActionButtonsPane({
  viewManager,
}: {
  viewManager: ReturnType<typeof useViewManager>;
}) {
  return (
    <div className="action-buttons gap-1 sm:gap-2 items-center">
      <ActionButton disabled onClick={() => viewManager.push('map')}>
        MAP
      </ActionButton>
      <CyanActionButton disabled onClick={() => viewManager.push('explore')}>
        EXPLORE
      </CyanActionButton>
      <CyanActionButton disabled onClick={() => viewManager.push('character')}>
        CHARACTER
      </CyanActionButton>
      <ActionButton disabled onClick={() => viewManager.push('work')}>
        WORK
      </ActionButton>
      <ActionButton disabled onClick={() => viewManager.push('inventory')}>
        INVENTORY
      </ActionButton>
      <CyanActionButton onClick={() => viewManager.push('combat')}>
        COMBAT
      </CyanActionButton>
      <CyanActionButton disabled onClick={() => viewManager.push('settings')}>
        SETTINGS
      </CyanActionButton>
      <ActionButton disabled onClick={() => viewManager.push('pvp')}>
        PVP
      </ActionButton>
    </div>
  );
}
