
export interface Account {
    id: string;
    name: string;
    tag: string;
    lastFetched: Date;  // date to start fetching game 
                        // at when calling fetchGames for this account
    createdAt: Date;  // date at which the account was added to db
}