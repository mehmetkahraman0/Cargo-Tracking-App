export interface Product {
    id?: string,
    productName?: string,
    serialNo?: string,
    file?: string
}

export interface SelectedProductList {
    product: Product,
    piece: string
}