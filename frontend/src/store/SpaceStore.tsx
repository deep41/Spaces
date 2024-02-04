import { create } from "zustand";

export type Space = {
  _id: string;
  spaceName: string;
  spaceImage: string[];
  spaceCoordinate: {
    latitude: string;
    longitude: string;
  };
  spaceAddress: string;
  spaceDescriptions: string;
  spaceTags: string[];
  comments: { dateTime: number; username: string; commentData: string }[];
};

type SpaceState = {
  spaceItem: Space | null;
};

type SpaceAction = {
  updateSpaceItem: (spaceItem: SpaceState["spaceItem"]) => void;
};

export const useSpaceStore = create<SpaceState & SpaceAction>()((set) => ({
  spaceItem: null,

  updateSpaceItem: (spaceItem: Space | null) => {
    set(() => ({ spaceItem: spaceItem }));
  },
}));
