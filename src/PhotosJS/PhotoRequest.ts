import axios from "axios"

type PlacePhoto = {
  name: string;
  photoUri: string;
};



type PlacePhotoList = PlacePhoto[];

export {PlacePhoto, PlacePhotoList }

export default async function GetPhotos(Name, Amount , /* max currently is 5*/ width, height)
{
        const Config = 
        {
            headers: {
                'content-type': 'application/json',
             }
        }

       const URL = `https://micro.com/photo/get/${Name}/${Amount}/${width}/${height}`;
       
       let results = await axios.get(URL, Config).catch(
            (error) => {
                console.error('Error fetching data:', error);
            }
        );

        if(results)
        {
            let JsonRes = JSON.stringify(results.data);
            let FinalRes: PlacePhotoList = JSON.parse(JsonRes);

            return FinalRes;
        }
       

    return null;
}