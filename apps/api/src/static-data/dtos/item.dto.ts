export enum ItemType {
  LEGENDARY = "LEGENDARY",
  BOOTS = "BOOTS",
}

export class ItemDto {
  id: string;
  name: string;
  iconUrl: string;
  type: ItemType
}