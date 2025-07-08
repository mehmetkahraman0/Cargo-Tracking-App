export interface Product {
    id?: string,
    productName?: string,
    serialNo?: string,
    fotoUrl?: string
}

export interface SelectedProductList {
    product: Product,
    piece: string
}