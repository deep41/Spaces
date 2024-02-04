import { create } from "zustand";

type CommunitySearchState = {
  tag: string | null;
};

type CommunitySearchAction = {
  updateTag: (spacetagtagItem: CommunitySearchState["tag"]) => void;
};

export const useCommunitySearchStore = create<
  CommunitySearchState & CommunitySearchAction
>()((set) => ({
  tag: null,

  updateTag: (tag: string | null) => {
    set(() => ({ tag: tag }));
  },
}));
