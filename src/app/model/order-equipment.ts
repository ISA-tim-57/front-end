import { Equipment, createEmptyEquipment } from "./equipment.model";
import { PurchaseOrder, createEmptyPurchaseOrder } from "./purchase-order.model";

export interface OrderEquipment{
    id: number,
   purchaseOrder : number,
    equipment : Equipment,
    quantity : number,
}

export const createEmptyOrderEquipment = (): OrderEquipment => ({
    id: 0,
    purchaseOrder: 0,
    equipment: createEmptyEquipment(),
    quantity : 0
  });

