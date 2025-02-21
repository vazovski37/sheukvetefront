export interface LoginRequest {
    username: string;
    password: string;
}
  
export interface LoginResponse {
    role: string;
    token: string;
}
  
export interface FoodItem {
    id: number;
    name: string;
    price: number;
    comment1?: string;
    comment2?: string;
    comment3?: string;
    comment4?: string;
}
  
export interface Category {
    id: number;
    name: string;
    food: FoodItem[];
}
  
export interface FoodsData {
    drinks: { category: Category }[];
    meals: { category: Category }[];
}
  
export interface Food {
    id: number;
    name: string;
    category: { id: number; name: string; type: "MEAL" | "DRINK" };
    price: number;
    comment1: string;
    comment2: string;
    comment3: string;
    comment4: string;
}
  
export interface Table {
    id: number;
    tableNumber: number;
}
  