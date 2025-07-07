
import React from 'react';
import { PlacePhotoList, PlacePhoto} from '../PhotosJS/PhotoRequest';


type UrlArray = {
    PhotoUriList: PlacePhotoList;
}

 

export default function CardImageSlider( { PhotoUriList } : UrlArray )
{   
    

    let SliderDetails = PhotoUriList.map((element, index) => {

        return <li className="glide__slide w-full h-full"><div key={1} className={`w-full h-full bg-center bg-cover bg-no-repeat`}  style={ { backgroundImage:  `url(${element.photoUri})` }}></div></li>
    })

   return (
        <>
            <div className="w-full h-full" >
                <div className="w-[100%] h-[100%] glide__track" data-glide-el="track">
                     <ul className="glide__slides w-full h-full" >
                        <li className="glide__slide w-full h-full"><div key={1} className={`w-full h-full bg-center bg-cover bg-no-repeat`}  style={ { backgroundImage:  `url(${PhotoUriList[0].photoUri})` }}></div></li>
                     </ul>
                </div>

     
            </div>
        </>
   )
} 
