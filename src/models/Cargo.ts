import type { SelectedProductList } from "./Product";

export interface Cargo {
    id?: string;
    cargoName?: string;
    status?: string;
    created_at?: string; //kargo eklenirken time now alınıcak
    product?: SelectedProductList[]
    recipient?: string[]
    everoneRecipient?: boolean; //recipient boşşa true varsa false
    cargoCompany?: string;
    cargoTrackingCode?: string; // kargo eger taslak ya da hazırlanıyor olarak kayıt edilirse kargo takip numarası girilemez kargoya verilince eklenir
}