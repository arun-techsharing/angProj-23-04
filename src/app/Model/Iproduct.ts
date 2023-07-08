export interface iProduct {
    productID: number,
    prodName: string | null,
    price: number | null,
    prdCtgy: string | null,
    quantityAvl: number,
    dsctAvl: boolean,
    dsctPer?: number,
    prdImg: string,
    offerExpDt?: Date,
    rating?: number;
}