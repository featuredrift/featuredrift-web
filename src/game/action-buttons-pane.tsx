import { Button, type ButtonProps } from '../common/button/button';

function ActionButton(props: ButtonProps<'button'>) {
  return <Button {...props} className="text-base sm:text-xl lg:text-2xl" />;
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

export function ActionButtonsPane() {
  return (
    <div className="grid grid-cols-2 grid-rows-auto gap-1 sm:gap-2 items-center grow min-h-50 max-h-80">
      <ActionButton>MOVE</ActionButton>
      <CyanActionButton>EXPLORE</CyanActionButton>
      <ActionButton>CHARACTER</ActionButton>
      <CyanActionButton>WORK</CyanActionButton>
      <ActionButton>INVENTORY</ActionButton>
      <CyanActionButton>COMBAT</CyanActionButton>
      <ActionButton>MAP</ActionButton>
      <CyanActionButton>PVP</CyanActionButton>
    </div>
  );
}
