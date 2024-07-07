import { ListingCard } from "./card";

const images = [
    "https://images.pexels.com/photos/453201/pexels-photo-453201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    'https://images.pexels.com/photos/261045/pexels-photo-261045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/2343466/pexels-photo-2343466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/238385/pexels-photo-238385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/813692/pexels-photo-813692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

]

export  default function Listing() {


    return (
       
        <div className="flex flex-wrap justify-center gap-6">
             {
                Array.from({ length: 1000}, (_, i) => i + 1).map((i) => <ListingCard key={i}  image={images[Math.floor(Math.random() * images.length)]} />)
             }
        </div>
    )
}