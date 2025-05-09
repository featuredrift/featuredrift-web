import { interpolateColor } from '../color-utils';

interface ProgressBarProps {
  /** current progress value */
  current: number;
  /** maximum value */
  max: number;
  /** color at 0% (e.g. "#00ff00") */
  minColor: string;
  /** color at 100% (e.g. "#ff0000") */
  maxColor: string;
  /** optional CSS height (default "20px") */
  height?: string;
  /** optional CSS width (default "100%") */
  width?: string;
}

const ProgressBar = ({
  current,
  max,
  minColor,
  maxColor,
  height = '20px',
  width = '100%',
}: ProgressBarProps) => {
  const ratio = Math.max(0, Math.min(current / max, 1));
  const fillColor = interpolateColor(minColor, maxColor, ratio);

  return (
    <div
      className="bg-[#111] rounded overflow-hidden"
      style={{ width, height }}
    >
      <div
        className="h-full transition-[width,background-color] duration-300 ease-in-out"
        style={{ width: `${ratio * 100}%`, backgroundColor: fillColor }}
      />
    </div>
  );
};

export default ProgressBar;
