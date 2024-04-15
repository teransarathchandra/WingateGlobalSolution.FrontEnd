export interface IShipmentDetails {
    itemName: string;
    description: string;
    categoryId: string;
    packageTypeId: string;
    packageCount: number;
    weight: number;
    value: number;
    isPickupOrder: boolean;
}