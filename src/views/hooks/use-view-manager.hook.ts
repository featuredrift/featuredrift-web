import { useReducer } from 'react';

interface ViewManagerState {
  current: string | null;
  previous: string[];
}

interface PushAction {
  name: 'push';
  payload: string;
}

interface ReplaceAction {
  name: 'replace';
  payload: string;
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

  const pushView = (viewName: string) => {
    dispatch({
      name: 'push',
      payload: viewName,
    });
  };

  const popView = () => {
    dispatch({ name: 'pop' });
  };

  return { push: pushView, back: popView, current: state.current };
}
