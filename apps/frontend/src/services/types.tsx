import { BuildEntry, CreateAccount, Game, ReferenceEntity, UpdateBuildEntry, ViewConfig } from "../types";

export interface Services {
    accountService: IAccountService;
    buildService: IBuildService;
    gameService: IGameService;
    leagueStaticService: ILeagueStaticService;
    viewService: IViewService;
};

export interface IAccountService {
    fetchAccounts: () => Promise<ReferenceEntity[]>;
    addAccount: (_body: CreateAccount) => Promise<void>;
    removeAccount: (_id: string) => Promise<void>;
};

export interface IBuildService {
    getBuildEntries: () => Promise<BuildEntry[]>;
    getBuildEntriesById: (_ids: string[]) => Promise<BuildEntry[]>;
    deleteBuildEntry: (_id: string) => Promise<void>;
    duplicateBuildEntry: (_id: string) => Promise<void>;
    updateBuildEntry: (_id: string, _body: UpdateBuildEntry) => Promise<void>;
    addBuildEntry: () => Promise<void>;
};

export interface IGameService {
    fetchGames: (_lookback: number) => Promise<Game[]>;
}

export interface ILeagueStaticService {
    refreshStaticData: () => Promise<void>;
    fetchCurrentVersion: () => Promise<string|null>;
    fetchLatestVersion: () => Promise<string>;
    fetchItems: () => Promise<ReferenceEntity[]>;
    fetchChampions: () => Promise<ReferenceEntity[]>;
    fetchKeystones: () => Promise<ReferenceEntity[]>;
    fetchRunes: () => Promise<ReferenceEntity[]>;
    fetchShards: () => Promise<ReferenceEntity[]>;
    fetchSpells: () => Promise<ReferenceEntity[]>;
}

export interface IViewService {
    fetchViews: () => Promise<ViewConfig[]>;
    fetchViewById: (_id: string) => Promise<ViewConfig>;
    createView: () => Promise<void>;
    deleteView: (_id: string) => Promise<void>;
    duplicateView: (_id: string) => Promise<void>;
    editViewName: (_id: string, _name: string) => Promise<void>;
}