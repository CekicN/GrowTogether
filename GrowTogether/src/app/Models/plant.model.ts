
export interface Plant{
    id:number,
    name:string,
    plantType:string,
    address:string,
    description:string,
    user:UserId,
    imageUrls:string[]
}

interface UserId{
    id:number
}