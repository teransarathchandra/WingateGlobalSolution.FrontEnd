export interface IItem {
    _id: string;
  itemId: string;
  itemName: string;
  description?: string;      // Optional because it's not marked as required in the schema
  weight: number;
  itemValue: number;
  packageCount: number;
  categoryId: string;  // Using Mongoose's ObjectId type
  packageTypeId: string;
  isPickupOrder: boolean;
  pickupOrderDate?: Date;      // Optional because it's conditionally required
  createdAt?: Date;            // Added to reflect the automatic timestamp
  updatedAt?: Date;            // Added to reflect the automatic timestamp
}
