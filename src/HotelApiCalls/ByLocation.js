import axios from "axios"

const amenities = [
    "JACUZZI", "SWIMMING_POOL", "FREE_WIFI"
];


export default async function ByLocation(long, lat)
{
        const Config = 
        {
            headers: {
                'content-type': 'application/json',  
             }
        }

        const Amenitiesparams = new URLSearchParams();
        amenities.forEach(r => Amenitiesparams.append('ratings', r));



        const ratings = ['5', '4', '3','2', '1'];
        const params = new URLSearchParams();
        ratings.forEach(r => params.append('ratings', r));

       const URL = `https://micro.com/Hotel/List/${lat}/${long}?ratings=${ratings}&amenities=${amenities}`;
       
       let results = await axios.get(URL, Config).catch(
            (error) => {
                console.error('Error fetching data:', error);
            }
        );

        if(results)
        {
            let JsonRes = JSON.stringify(results.data);
            let FinalRes = JSON.parse(JsonRes);

            return FinalRes;
        }
       

    return null;
}