import type { PropertyItem, SpacesState } from "../types/space";

// Action Types
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";

// CRUD
export const SPACE_CREATE = "SPACE_CREATE";
export const SPACE_READ = "SPACE_READ";
export const SPACE_UPDATE = "SPACE_UPDATE";
export const SPACE_DELETE = "SPACE_DELETE";

// Initial State
export const initialSpaceState: SpacesState = {
  loading: false,
  error: null,
  spaces: [],
};

// Action Type
type SpaceAction =
  | { type: typeof SET_LOADING }
  | { type: typeof SET_ERROR; payload: string }
  | { type: typeof SPACE_CREATE; payload: PropertyItem }
  | { type: typeof SPACE_READ; payload: PropertyItem[] }
  | { type: typeof SPACE_UPDATE; payload: any }
  | { type: typeof SPACE_DELETE; payload: number };

// Reducer
export function spaceReducer(
  state: SpacesState,
  action: SpaceAction
): SpacesState {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true, error: null };

    case SET_ERROR:
      return { ...state, loading: false, error: action.payload };

    case SPACE_CREATE:
      return {
        ...state,
        loading: false,
        spaces: [action.payload, ...state.spaces],
      };

    case SPACE_READ:
      return { ...state, loading: false, spaces: action.payload };

    case SPACE_UPDATE:
      return {
        ...state,
        loading: false,
        spaces: state.spaces.map((space) =>
          space.id === action.payload.id
            ? { ...space, ...action.payload }
            : space
        ),
      };

    case SPACE_DELETE:
      return {
        ...state,
        loading: false,
        spaces: state.spaces.filter(
          (space: PropertyItem) => space.id !== action.payload
        ),
      };

    default:
      return state;
  }
}
