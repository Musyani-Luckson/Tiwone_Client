import type { PropertyItem } from "../types/space";
import type { SearchRequest } from "../types/search";
import api from "./index";
// import type { PropertyUpdateInterface } from "../features/listing/updateSpace";

export const searchSpaces = async (
  searchInput: SearchRequest,
  token?: string
): Promise<{ success: boolean; message: string; data: PropertyItem[] }> => {
  try {
    const response = await api.post("/api/space/search", searchInput, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Search API error:", error.response.data);
      throw new Error(error.response.data?.message || "Search failed");
    }
    throw new Error("Network error");
  }
};

// CRUD

// CREATE
export const createSpaceAPI = async (
  space: any
): Promise<{ success: boolean; message: string; data: PropertyItem }> => {
  try {
    const response = await api.post("/api/space", space);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("CreateSpace API error:", error.response.data);
      throw new Error(error.response.data?.message || "Failed to create space");
    }
    throw new Error("Network error");
  }
};
// READ
export const getMySpacesAPI = async (): Promise<{
  success: boolean;
  message: string;
  data: PropertyItem[];
}> => {
  try {
    const response = await api.get("/api/space");
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("GetMySpaces API error:", error.response.data);
      throw new Error(error.response.data?.message || "Failed to fetch spaces");
    }
    throw new Error("Network error");
  }
};

// UPDATE
export const updateSpaceAPI = async (
  id: number | string,
  space: Partial<any>
): Promise<{ success: boolean; message: string; data: PropertyItem }> => {
  try {
    const response = await api.patch(`/api/space/${id}`, space);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("UpdateSpace API error:", error.response.data);
      throw new Error(error.response.data?.message || "Failed to update space");
    }
    throw new Error("Network error");
  }
};
// DELETE
export const deleteSpaceAPI = async (id: number | string): Promise<boolean> => {
  try {
    await api.delete(`/api/space/${id}`);
    return true;
  } catch (error: any) {
    if (error.response) {
      console.error("DeleteSpace API error:", error.response.data);
      throw new Error(error.response.data?.message || "Failed to delete space");
    }
    throw new Error("Network error");
  }
};
// READ ONE
export const getSpaceByIdAPI = async (
  id: number | string
): Promise<PropertyItem> => {
  try {
    const response = await api.get(`/api/space/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("GetSpaceById API error:", error.response.data);
      throw new Error(
        error.response.data?.message || "Failed to retrieve space"
      );
    }
    throw new Error("Network error");
  }
};
