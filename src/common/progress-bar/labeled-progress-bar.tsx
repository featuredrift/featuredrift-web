import ProgressBar from './progress-bar';

export function LabeledProgressBar({
  label,
  current = 0,
  max = 0,
  color = '#ffffff',
}: {
  label: string;
  color?: string;
  current?: number;
  max?: number;
}) {
  return (
    <>
      <div>{label}</div>
      <ProgressBar
        current={current}
        max={max}
        minColor="#ff0000"
        maxColor={color}
      />
      <div>
        {current}/{max}
      </div>
    </>
  );
}
