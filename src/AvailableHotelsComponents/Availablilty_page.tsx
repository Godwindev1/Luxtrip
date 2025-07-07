import * as React from 'react';
import { useLocation } from "react-router-dom";
import HotelOffer from '../HotelApiCalls/SearchOffers';
import dayjs from 'dayjs';
import {AvailabilityPageInputBar} from '../LandingPageComponents/InputBarAbstraction'
import GetPhotos from '../PhotosJS/PhotoRequest';
import { PlacePhotoList, PlacePhoto} from '../PhotosJS/PhotoRequest';
import CardImageSlider from './CardImageSLider';
import { hotelImages } from '../LandingPageComponents/DummuData';

type dist = { 
        value: number,
        unit: string
    }

type Hotels =  {
    hotelId: string,
    name: string,
    amenities: string [];
    distance: dist;
    rating: number;
}

type Prop = {
    hotel: Hotels
}




import { Varss } from '../LandingPageComponents/InputBarAbstraction';

export function NavBar()
{
    return(
        <>
            <nav className='w-full h-fit flex justify-between items-center pl-16 pr-16 bg-[#4D594A] border-b border-[#0000002f] '>
                        <div className='flex justify-between items-center h-full '>
                            <div className='h-[100px] w-[40px] flex justify-center items-center ' style={ {  } }>
                                 <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                    <rect y="2" width="24" height="2"/>
                                    <rect y="9" width="24" height="2"/>
                                    <rect y="16" width="24" height="2"/>
                                 </svg>
                            </div>
                            <div className='flex justify-center items-center'><a  href="#"> <img className='h-[100px] w-[100px] ' src="src/assets/logo.png"   /> </a></div>
                        </div>

                        <AvailabilityPageInputBar/>

                        <ul className='flex flex-row justify-between items-center gap-4'>
                            <li><div className='flex justify-between items-center '><a  href="#"> <img className='h-[30px] w-[30px] rounded-full ' src="src/assets/united-kingdom.png"   /> </a></div></li>
                        </ul>
            </nav>
        </>
    )
}

function GetOfferPrototype( {hotel} : Prop )
{
    const Offersre = async () =>  { 
       let result =  await HotelOffer(hotel.hotelId, dayjs(), dayjs().add(3, 'day'), 2, 1);

       let element =  document.getElementById(`${hotel.hotelId}`);

       if(element)
        { 
            element.innerHTML = result;
        }
    }

    Offersre();

    return(
        <>
            <div id={`${hotel.hotelId}`}> Loading Results </div>
        </>
    )
}

function CardSplit({Rating})
{
    return(
        <>
         <div className='flex-1 w-[30%] h-[2rem] flex justify-between gap-3 items-center self-end box-border '>
                        
                        <div className="text-[#043d0e9c] text-2xl font-semibold italic  "> ${500}<span className='text-[#4d594a97] font-[Sevillana,cursive] italic '>/night</span> </div>
                       
                        <div className='flex w-[30%] h-[100%]  justify-center items-center pr-1.5 rounded-2xl outline outline-[#0b1c0e35] box-border bg-[#0b1c0e] '>
                           
                            <div className='w-[50%] h-[54%] flex justify-center items-center bg-[url("./assets/star.svg")] bg-contain bg-center bg-no-repeat'>
                            </div>

                            <div className='text-[0.9rem] h-full w-[50%] flex justify-center items-center  font-semibold text-[white]'>
                                {Rating}
                            </div>
                         </div>
            </div>
        </>
    )
}

function AmenityTag({Name})
{
    let lower: string = Name.toLowerCase();
    lower = lower.charAt(0).toUpperCase() + lower.slice(1);
    lower = lower.replaceAll('_', ' ');

    return (
        <>
         <div className='w-auto text-[#0b1c0ecd] rounded-xl  border-[#0b1c0ecd] flex justify-start items-center'> <p className='text-left font-semibold  text-[0.80rem] whitespace-nowrap'>{lower} </p> </div>
        </>
    )
}

type MyComponentProps = {
  amenities: string[];
  HotelName: string;
  Distance: string;
  Units: string;
  Rating: string;
};


function getRandomInt(min, max) {
  min = Math.ceil(min);   // Round up to the nearest integer
  max = Math.floor(max);  // Round down to the nearest integer
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Cards({HotelName, Distance, Units, amenities, Rating}: MyComponentProps)
{
    const [placePhotos, setPlacePhotos] = React.useState<PlacePhoto[]>([]);
    const [firstTIme, setFIrstime] = React.useState(true);

    let AmenitiesNode = amenities.map((element) => 
    {
        return <AmenityTag Name={element} />
    })

    const Asyncall = async () => 
    {
        if(firstTIme) {
            let Res =  await GetPhotos(HotelName, 3, 1280, 720);
            if(Res)
            {
                setPlacePhotos(Res);
            }
        }
    } 

    //use Only WHen Live 
    //Asyncall();

    React.useEffect(() => {
        if(firstTIme)
        {
            setFIrstime(false)
        }

        if(!firstTIme)
        {
            let Element = document.getElementById(HotelName);

            if(Element)
            { 
               // Element.style.backgroundImage = `URL("${placePhotos[0].photoUri}")`;
                Element.style.backgroundImage = `URL("${hotelImages[getRandomInt(0, 25)].url}")`;
                Element.style.backgroundSize = "cover";
                Element.style.backgroundPosition = "center"

            }

        }
       
    }, [placePhotos]);


    {
            let Element = document.getElementById(HotelName);

            if(Element)
            { 
               // Element.style.backgroundImage = `URL("${placePhotos[0].photoUri}")`;
                Element.style.backgroundImage = `URL("${hotelImages[getRandomInt(0, 25)].url}")`;
                Element.style.backgroundSize = "cover";
                Element.style.backgroundPosition = "center"
            }
    }


    return(
        <>
            <div className='p-0 shadow-md outline-[#0b1c0e] w-full min-h-[30vh] h-auto rounded-xl  flex justify-start items-center box-border transition-all duration-500 hover:transform hover:scale-[1.005] cursor-pointer' >
                <div id={HotelName} className='w-68 aspect-[1/1] rounded-bl-xl rounded-tl-xl  '>   </div>
                
                <div className='flex-1  flex justify-center items-center gap-2  min-h-[36vh] h-auto box-border'>
                   
                    <div className='w-[65%] h-[100%] border-r-2  border-[#0b1c0e35] min-h-[37vh] justify-self-start  flex flex-col justify-start items-start p-4 pt-4 gap-1'>
                        <div className='w-full text-[#0b1c0ecd]'> <p className='text-left font-semibold text-[1.15rem]'>{HotelName}</p> </div>
                        <div className='w-full text-[#0b1c0ecd]'> <p className='text-left  text-[0.85rem]'>{Distance + Units} from your selected Location</p> </div>

                        <div className='grid-rows-[auto_auto] grid-cols-3 grid gap-x-3.5 gap-y-2.5 mt-2'>
                            {AmenitiesNode}
                            <div className='w-auto text-[#0b1c0ecd] rounded-xl  border-[#0b1c0ecd] flex justify-start items-center col-span-3 overflow-auto'> <a className='text-left font-semibold  text-[0.80rem] relative inline-block after:block after:h-0.5 after:bg-blue-500 after:scale-x-0 after:transition-transform after:duration-300 after:origin-left hover:after:scale-x-100' href=""> See More  </a>  </div>
                        </div>

                    </div>

                    <div className='w-[35%] h-[100%] min-h-[36vh]  flex flex-row justify-end mr-2 pb-1.5'>
                        <CardSplit Rating={Rating}/>
                    </div>

                </div>
            </div>
        </>
    )
}


export default function Availablility_page()
{

    let location = useLocation();
    const  HotelsData : Hotels [] =  location.state || {};

    const NoOfProperties = location.state.length;

    let reactNode = HotelsData.map((value, index) => {
            return ( 
            <div className='flex flex-col justify-center items-center'> 
                <div> name: {value.name} ID: {value.hotelId} Amenities: {value.amenities} </div>
                <div className='justify-self-start'> <GetOfferPrototype hotel={value}/> </div>
            </div> 
         )
        }
    )

    const [AmountDisplayed, setAmount] = React.useState(5);
    let AllPropertiesIncluded : boolean = false;

    let CurrentUsedSet = HotelsData.slice( 0, (AmountDisplayed ) );

    if(AmountDisplayed >= HotelsData.length)
    {
        AllPropertiesIncluded = true ;
    }

    console.log(location.state);
    let Nodes = CurrentUsedSet.map((element, idex) => {
        return <Cards HotelName={element.name} Distance={element.distance.value.toString()} Units={element.distance.unit} amenities={element.amenities.slice(0, 4)} Rating={element.rating.toString()}/>
    })



    return(
        <>
                <NavBar/>
                <div className='bg-black h-auto w-full flex flex-row justify-center items-start pr-16 pl-16' >
                    <div className='bg-amber-300 flex w-[30%] h-[120vh] flex-col justify-evenly items-center '> 

                    </div>


                    <div className='bg-white flex w-[60%] h-[auto] gap-4 flex-col justify-start items-center p-7 '> 

                        <div className='w-full text-2xl flex justify-self-start self-start  text-[#0b1c0e] bg-white font-bold'>
                            {NoOfProperties} Properties in {Varss.locationName} 
                        </div>

                        <div className='w-[13rem] h-[2.5rem] bg-white text-[#0b1c0e] outline-1 flex  justify-self-start self-start justify-center items-center rounded-3xl hover:outline-2 cursor-pointer'>
                                Sort By: {" 'TODO: selection' "} 
                        </div>

                         {Nodes}


                        { 
                            !AllPropertiesIncluded &&  <div className='w-full h-10.5 flex justify-center items-center outline-1 outline-[#0b1c0e] transition-colors duration-300 bg-white hover:bg-gray-200 hover:cursor-pointer' onClick={() => setAmount(AmountDisplayed + 5)} >
                                <p className='text-black'> show more </p>
                            </div>
                        }
                    </div>
                </div>
     
        </>
    )
}