import { useReducer, useCallback, type ReactNode } from "react";
import {
  spaceReducer,
  initialSpaceState,
  SET_LOADING,
  SET_ERROR,
  SPACE_CREATE,
  SPACE_READ,
  SPACE_UPDATE,
  SPACE_DELETE,
} from "../reducers/useSpaceReducer";
import type { SpacesState } from "../types/space";
import { SpaceContext } from "../hooks/useSpaceHook";
import {
  createSpaceAPI,
  deleteSpaceAPI,
  getMySpacesAPI,
  updateSpaceAPI,
} from "../api/spaceAPI";
import type { SpaceFormState } from "../features/listing/spaceState";
// import type { PropertyUpdateInterface } from "../features/listing/updateSpace";

// Context type
export interface SpaceContextType extends SpacesState {
  createSpace: (space: SpaceFormState) => void;
  readSpaces: () => void;
  updateSpace: (id: number | string, space: SpaceFormState) => void;
  deleteSpace: (id: number) => void;
}

// Provider
export const SpaceProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(spaceReducer, initialSpaceState);

  // CREATE
  const createSpace = useCallback(async (space: SpaceFormState) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await createSpaceAPI(space);
      if (response.success) {
        dispatch({ type: SPACE_CREATE, payload: response.data });
      } else {
        dispatch({ type: SET_ERROR, payload: "Failed to create space" });
      }
    } catch {
      dispatch({ type: SET_ERROR, payload: "Failed to create space" });
    }
  }, []);

  // READ
  const readSpaces = useCallback(async () => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await getMySpacesAPI();
      if (response.success && response.data) {
        dispatch({ type: SPACE_READ, payload: response.data });
      } else {
        dispatch({ type: SET_ERROR, payload: "Failed to fetch space" });
      }
    } catch {
      dispatch({ type: SET_ERROR, payload: "Failed to fetch spaces" });
    }
  }, []);

  // UPDATE
  const updateSpace = useCallback(
    async (id: number | string, space: SpaceFormState) => {
      dispatch({ type: SET_LOADING });
      try {
        const response = await updateSpaceAPI(id, space);
        if (response.success && response.data) {
          dispatch({ type: SPACE_UPDATE, payload: response.data });
        } else {
          dispatch({ type: SET_ERROR, payload: "Failed to update space" });
        }
      } catch {
        dispatch({ type: SET_ERROR, payload: "Failed to update space" });
      }
    },
    []
  );

  // DELETE
  const deleteSpace = useCallback(async (id: number) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await deleteSpaceAPI(id);
      if (response) {
        dispatch({ type: SPACE_DELETE, payload: id });
      } else {
        dispatch({ type: SET_ERROR, payload: "Failed to delete space" });
      }
    } catch {
      dispatch({ type: SET_ERROR, payload: "Failed to delete space" });
    }
  }, []);

  // Context value
  const value: SpaceContextType = {
    ...state,
    createSpace,
    readSpaces,
    updateSpace,
    deleteSpace,
  };

  return (
    <SpaceContext.Provider value={value}>{children}</SpaceContext.Provider>
  );
};
