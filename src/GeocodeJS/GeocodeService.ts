import axios from "axios"

export default async function GetLocationCode(placeID)
{
        const Config = 
        {
            headers: {
                'content-type': 'application/json',
             }
        }

       const URL = `https://micro.com/Geocode/get/${placeID}`;
       
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