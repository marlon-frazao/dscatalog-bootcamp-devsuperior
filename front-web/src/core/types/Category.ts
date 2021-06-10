export type CategoriesResponse = {
    content: Category[];
    totalPages: number;
}

export type Category = {
    id: number;
    name: string;
}
