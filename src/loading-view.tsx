import { Loading } from './common/loading/loading';

export function LoadingView() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <div>
        <Loading size="lg" text="LOADING..." />
      </div>
    </div>
  );
}
