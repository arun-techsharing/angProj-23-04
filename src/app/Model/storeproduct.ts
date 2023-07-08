export class storeProduct {

    category: string | null;
    description: string;
    id?: number;
    image: string;
    price: number;
    title: string | null;

    constructor(ctgy: string | null, desc: string, img: string, price: number, title: string | null, id?: number,) {
        this.category = ctgy;
        this.description = desc;
        this.id = id;
        this.image = img;
        this.price = price;
        this.title = title
    }

}