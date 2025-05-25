import { useReducer } from 'react';
import type { PlayerResponse } from '../../types';

export interface ViewProps {
  player: PlayerResponse;
  viewManager: ReturnType<typeof useViewManager>;
}

export type ViewComponent = React.FC<ViewProps>;

export type ViewEntry<T extends string = string> = [
  route: T,
  routeProps?: Record<string, unknown>,
];

interface ViewManagerState {
  current: ViewEntry | null;
  previous: ViewEntry[];
}

interface PushAction {
  name: 'push';
  payload: ViewEntry;
}

interface ReplaceAction {
  name: 'replace';
  payload: ViewEntry;
}

interface PopAction {
  name: 'pop';
}

const viewReducer = (
  state: ViewManagerState,
  action: PushAction | ReplaceAction | PopAction,
) => {
  switch (action.name) {
    case 'push': {
      if (state.current === action.payload) {
        return state;
      }

      return {
        ...state,
        current: action.payload,
        previous: state.current
          ? [...state.previous, state.current]
          : state.previous,
      };
    }
    case 'replace': {
      return {
        ...state,
        current: action.payload,
      };
    }

    case 'pop': {
      return {
        ...state,
        current: state.previous.length
          ? state.previous[state.previous.length - 1]
          : null,
        previous: state.previous.slice(0, -1),
      };
    }

    default: {
      return state;
    }
  }
};

export function useViewManager() {
  const [state, dispatch] = useReducer(viewReducer, {
    current: null,
    previous: [],
  } as ViewManagerState);

  const pushView = (viewOrName: string | ViewEntry) => {
    dispatch({
      name: 'push',
      payload: typeof viewOrName === 'string' ? [viewOrName] : viewOrName,
    });
  };

  const popView = () => {
    dispatch({ name: 'pop' });
  };

  return { push: pushView, back: popView, current: state.current } as const;
}
