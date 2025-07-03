import type { Product } from "./Product";

export interface Cargo {
    id?: string;
    cargoName?: string;
    status?: "Deleted Cargo" | "Draft" | "Getting Ready" | "Delivered to Cargo" | "On the Road" | "Delivered";
    created_at?: string;
    product?: Product[];
    qrCodeUrl?: string;
    recipient?: string[]
    everoneRecipient?: boolean;
    cargoCompany?: "Aras" | "Dhl" | "Yurtİçi" | "UPS" ;
}