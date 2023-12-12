export interface ProductType {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	categoryId:number;
	image: string;
	quantity: number;
	rating: { rate: number; count: number };
}