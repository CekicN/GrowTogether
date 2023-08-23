
export interface Plant{
    id:number,
    name:string,
    plantType:string,
    address:string,
    description:string,
    user:Username,
    category:Category,
    imageUrls:string[]
}

interface Username{
    username:string
}

interface Category{
    name:string
}