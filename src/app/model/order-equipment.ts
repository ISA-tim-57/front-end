import { Equipment, createEmptyEquipment } from "./equipment.model";
import { PurchaseOrder, createEmptyPurchaseOrder } from "./purchase-order.model";

export interface OrderEquipment{
    id: number,
   // purchaseOrder : PurchaseOrder,
    equipment : Equipment,
    quantity : number,
}

export const createEmptyOrderEquipment = (): OrderEquipment => ({
    id: 0,
  //  purchaseOrder: createEmptyPurchaseOrder(),
    equipment: createEmptyEquipment(),
    quantity : 0
  });

