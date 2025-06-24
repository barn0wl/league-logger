
export class RuneDto {
    id: string;
    name: string;
    iconUrl: string;
}

export class RuneTreeDto { //e.g: Domination, Sorcery, Precision, etc...
    id: string;
    name: string;
    iconUrl: string;
    runes: RuneDto[];
}