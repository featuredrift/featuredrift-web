import { getSafetyRatingColor } from '../common/color-utils';
import type { NodeDetails } from './types';

export function NodeInfoPane({ node }: { node: NodeDetails | null }) {
  if (!node) return null;

  const paddedId = String(node.id).padStart(4, '0');
  const safetyRatingColor = getSafetyRatingColor(node.safetyRating);

  return (
    <div className="col-span-3 bg-purple-600 cornerless-b p-[1px] flex flex-col items-stretch max-h-40 md:max-h-80 xl:max-h-max">
      <div className="flex flex-col cornerless-b bg-dark-bg overflow-hidden">
        <div
          className="text-xl sm:text-2xl md:text-3xl p-2 border-b-1 border-purple-700"
          style={{ color: safetyRatingColor }}
        >
          {paddedId} - {node.name}
        </div>
        <div className="text-purple-300 font-light whitespace-pre-wrap text-sm sm:text-base italic p-2 overflow-auto grow">
          {node.description}
        </div>
      </div>
    </div>
  );
}
