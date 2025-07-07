import axios from "axios"

export default async function HotelOffer(ID, CheckinDate, CheckoutDate, Guests, RoomQuantity)
{
        const Config = 
        {
            headers: {
                'content-type': 'application/json',  
             }
        }

       const URL = `https://micro.com/hotel/shopping?hotelIds=${ID}&checkInDate=${CheckinDate}&checkOutDate=${CheckoutDate}&adults=${Guests}&roomQuantity=${RoomQuantity}&priceRange=50-800`;
       
       let results = await axios.get(URL, Config).catch(
            (error) => {
                console.error('Error fetching data:', error);
            }
        );

        console.log(results);

        if(results)
        {
            let JsonRes = JSON.stringify(results.data);
            let FinalRes = JSON.parse(JsonRes);

            return FinalRes;
        }
       

    return null;
}