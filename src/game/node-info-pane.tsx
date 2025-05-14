import { getSafetyRatingColor } from '../common/color-utils';
import type { NodeDetails } from './types';

export function NodeInfoPane({ node }: { node: NodeDetails | null }) {
  if (!node) return null;

  const paddedId = String(node.id).padStart(4, '0');
  const safetyRatingColor = getSafetyRatingColor(node.safetyRating);

  return (
    <div className="col-span-3 bg-purple-600 cornerless-b flex flex-col justify-items-end cornerless-b overflow-hidden min-h-40 p-[1px] gap-[1px]">
      <div
        className="text-xl sm:text-2xl md:text-3xl p-2 bg-dark-bg"
        style={{ color: safetyRatingColor }}
      >
        {paddedId} - {node.name}
      </div>
      <div className="text-purple-300 font-light whitespace-pre-wrap text-sm sm:text-base italic p-2 overflow-auto cornerless-b bg-dark-bg grow">
        {node.description}
      </div>
    </div>
  );
}
