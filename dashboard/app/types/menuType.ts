export interface MenuType {
    id?: number;
    name?: string;
    path?: string;
    submenu?: MenuType[];
}
