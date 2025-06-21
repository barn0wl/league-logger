import { Services } from "../services/types";
import {
  mockAccountEntities,
  mockBuildEntries,
  mockChampions,
  mockGames,
  mockItems,
  mockKeystones,
  mockRunes,
  mockShards,
  mockSpells,
  mockViews,
} from "../mocks/mockData";
import { CreateAccount, UpdateBuildEntry } from "../types";

// Simple in-memory state for demonstration (not reactive)
let accounts = [...mockAccountEntities];
let builds = [...mockBuildEntries];
let views = [...mockViews];

export const mockServices: Services = {
  accountService: {
    fetchAccounts: async () => accounts,
    addAccount: async (body: CreateAccount) => {
      const newAcc = { id: `acc${accounts.length + 1}`, name: body.name };
      accounts.push(newAcc);
    },
    removeAccount: async (id: string) => {
      accounts = accounts.filter(acc => acc.id !== id);
    },
  },
  buildService: {
    getBuildEntries: async () => builds,
    getBuildEntriesById: async (ids: string[]) => builds.filter(b => ids.includes(b.id)),
    deleteBuildEntry: async (id: string) => {
      builds = builds.filter(b => b.id !== id);
    },
    duplicateBuildEntry: async (id: string) => {
      const orig = builds.find(b => b.id === id);
      if (orig) {
        const copy = { ...orig, id: `build${builds.length + 1}`, name: orig.name + " Copy" };
        builds.push(copy);
      }
    },
    updateBuildEntry: async (id: string, body: UpdateBuildEntry) => {
      builds = builds.map(b => (b.id === id ? { ...b, ...body } : b));
    },
    addBuildEntry: async () => {
      const newBuild = {
        id: `build${builds.length + 1}`,
        name: "New Build",
        filter: {},
        tags: [],
        notes: "",
        createdAt: new Date().toISOString(),
      };
      builds.push(newBuild);
    },
  },
  gameService: {
    fetchGames: async (_lookback: number) => mockGames,
  },
  leagueStaticService: {
    refreshStaticData: async () => {},
    fetchCurrentVersion: async () => "14.1",
    fetchLatestVersion: async () => "14.1",
    fetchItems: async () => mockItems,
    fetchChampions: async () => mockChampions,
    fetchKeystones: async () => mockKeystones,
    fetchRunes: async () => mockRunes,
    fetchShards: async () => mockShards,
    fetchSpells: async () => mockSpells,
  },
  viewService: {
    fetchViews: async () => views,
    fetchViewById: async (id: string) => {
      const found = views.find(v => v.id === id);
      if (!found) throw new Error("View not found");
      return found;
    },
    createView: async () => {
      const newView = {
        id: `view${views.length + 1}`,
        name: "New View",
        filter: {},
      };
      views.push(newView);
    },
    deleteView: async (id: string) => {
      views = views.filter(v => v.id !== id);
    },
    duplicateView: async (id: string) => {
      const orig = views.find(v => v.id === id);
      if (orig) {
        const copy = { ...orig, id: `view${views.length + 1}`, name: orig.name + " Copy" };
        views.push(copy);
      }
    },
    editViewName: async (id: string, name: string) => {
      views = views.map(v => (v.id === id ? { ...v, name } : v));
    },
  },
};

export default mockServices;