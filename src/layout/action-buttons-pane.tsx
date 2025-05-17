import { Button, type ButtonProps } from '../common/button/button';

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

export function ActionButtonsPane() {
  return (
    <div className="action-buttons gap-1 sm:gap-2 items-center">
      <ActionButton>MAP</ActionButton>
      <CyanActionButton>EXPLORE</CyanActionButton>
      <CyanActionButton>CHARACTER</CyanActionButton>
      <ActionButton>WORK</ActionButton>
      <ActionButton>INVENTORY</ActionButton>
      <CyanActionButton>COMBAT</CyanActionButton>
      <CyanActionButton>SETTINGS</CyanActionButton>
      <ActionButton>PVP</ActionButton>
    </div>
  );
}
