import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { Input } from '@base-ui-components/react/input';

import dayjs from "dayjs"

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';

import CustomCalendarHeader from './CustomCalenderHeader';
import Counter from './counter';
import  GetLocationCode  from '../GeocodeJS/GeocodeService'
import ByLocation from '../HotelApiCalls/ByLocation';
import DummuData from './DummuData';
// Page1.jsx
import { useNavigate } from "react-router-dom";
import GetNewListOfNames from '../AutocompleteJS/CompleteService';
import { PlacePrediction, parsePlacePredictions } from '../AutocompleteJS/CompleteResult';

const protocol = "http://"
const HOSTNAME = "localhost:5173"

type NameCompleteSuggestionProps = {
  place: PlacePrediction;
};

type GeoLocationResponse = {
  location: {
    latitude: number;
    longitude: number;
  };
};


class GlobalVariables{
    constructor(Name, placeID)
    {
        this.locationName = Name;
        this.placeID = placeID;
    }

    locationName :string;
    placeID: string;
}



const Varss = new GlobalVariables("", ""); 
export { Varss };
let TriggerRerender: () => void;
let TriggerPlaceSuggestionRerender: () => void ;
let TriggerPlacePopupRemoval: () => void ;

//PLACES SUGGESTIONS
let Suggestions: PlacePrediction [] = [];



function NameCompleteSuggestion( {place}: NameCompleteSuggestionProps)
{
    const parts = place.text.split(',').map(p => p.trim()); 
        
    const main = parts[0];                           // "Madrid"
    const sub = parts.slice(1).join(', ');  


    const HandleCLick = (e) => {
        Varss.locationName = main;
        Varss.placeID = place.placeId;
       
        console.log("VARSS.location " + main );     

        TriggerRerender();
        TriggerPlacePopupRemoval();
    }

    return(
        <>
        
            <div className='box-border flex justify-start items-center w-full h-auto text-left hover:cursor-pointer min-h-[40px] gap-2 hover:bg-[#0b1c0e0d] pl-6 pr-6 pt-2.5 pb-2.5 mt-0.5 mb-0.5' onClick={(e) => HandleCLick(e)}> 
                    <div className='w-[10%] h-[50%]  min-h-[20px] bg-center bg-contain bg-no-repeat' style={{backgroundImage: `url("./assets/location.svg")`}}>
                    </div>  
                    
                    <div className='flex flex-col h-full]'>
                        <div className='text-[1rem]'>  {main} </div>
                        <div className='text-[0.8rem] text-[#0b1c0e70]'>  {sub} </div>
                    </div> 
             </div>
        </>
    )
}

function SearchFieldSuggestions()
{
    const [RerenderFlag, SetFlag] = React.useState(false);

    TriggerPlaceSuggestionRerender = () => 
    {
        SetFlag(prev => !prev);
    }

    let SuggestionList = Suggestions.map( (Place, index) => {
        return <NameCompleteSuggestion  place={Place} />
    })

    return(
        <>
            <div className='w-auto h-auto min-w-[350px] min-h-[400px]  pt-3 pb-3  flex  flex-col justify-start items-center gap-2.5 bg-white box-border rounded-[0.25rem] shadow-md text-[#0b1c0ea8] font-semibold'>
               
               {
                 SuggestionList
               }

            </div>
        </>
    )
}

function SearchField()
{
    const [LocationInput, setInput] = React.useState(false);
    const [locationName, SetLocation] = React.useState("");
    
    TriggerRerender = () => 
    {
        setInput(prev => !prev);
    }

    React.useEffect(() => {

        const Fetch = async () => {
             let ResponseData = await GetNewListOfNames(locationName);
             
             if(ResponseData)
             {
                Suggestions = parsePlacePredictions(ResponseData);
                console.log(Suggestions)
                TriggerPlaceSuggestionRerender();
             }
        }

        Fetch();

    }, [locationName]);


    React.useEffect(() => 
    {
        let textField = document.getElementById("Search-field-input") as HTMLInputElement;
        //Update The Value of the location search bar textfield
        if(textField) textField.value = Varss.locationName;
    }, [Varss.locationName]);

    return (
        <>
            <div className='pt-1.5 pb-1.5 w-full h-full flex justify-start items-center gap-1'> 
                 
                 <div className='flex justify-start items-center w-[10%] h-[70%] bg-[url("./assets/search.svg")] bg-contain bg-left bg-no-repeat' > 
                 </div>

                <form autoComplete='off'>
                 <input type="text"
                    autoComplete='off'
                    onChange={(e) => SetLocation(e.target.value)}
                    id='Search-field-input'
                    placeholder="City location or Property" className="pl-0.5 h-[100%] w-[90%] max-w-64 rounded-md  text-base text-[#0b1c0ea8] focus:text-[#0b1c0ea8] focus:outline-0 "
                />
                </form>

              
            </div>
        </>
    )
}

function SimplePopper({children, parent}) {
  
    const open = Boolean(parent);
  const id = open ? 'MultiPopper' : undefined;

  return (
    <div>
      <Popper id={id} open={open} anchorEl={parent} placement="bottom-start" transition 
      
      modifiers={
        [
            {
                name: 'flip',
                enabled: false, // ⛔ disable flipping
            },
            
            {
                name: 'preventOverflow',
                options: {
                    altAxis: false,
                    tether: false,
                },
            },

            {
                name: 'offset',
                options: {
                    offset: [0, 15], // Push 8px downward
                },
            }
        ] 
    }>
            { 
                ({TransitionProps}) =>
                (
                    <Fade {...TransitionProps} timeout={20}>
                       <div>{children}</div> 
                    </Fade>
                )
            }
      </Popper>
    </div>
  );
}

function DateComponents({children})
{
    return(
        <>
            <LocalizationProvider  dateAdapter={AdapterDayjs}>
                {children}
            </LocalizationProvider>
        </>
    )
}

function CalenderInputComp({LeftOnChangeFunc, RightOnChangeFunc})
{
    return(
        <>
            <div className=' absolute flex-row justify-between items-center text-[#0b1c0ead] shadow-md' >
            <div className='flex justify-between items-center text-[#0b1c0ead]'>
                <DateComponents children={<DateCalendar  sx={[
                    {
                        bgcolor: "white",
                        borderTopLeftRadius: "0.25rem",
                        borderBottomLeftRadius: "0.25rem", 
                        zIndex: "modal",
                        fontWeight: "bold",
                        color: "#0b1c0ead",  
                    }
                    ]
                }

                disablePast={true}
                defaultValue={dayjs()}
                
                slots={
                    {
                        calendarHeader: CustomCalendarHeader
                    }
                }

                onChange={LeftOnChangeFunc}
                />} />

                    <DateComponents children={<DateCalendar  sx={
                    {
                        bgcolor: "white",
                        borderTopRightRadius: "0.25rem",
                        borderBottomRightRadius: "0.25rem", 
                        zIndex: "modal",
                        fontWeight: "bold",
                        color: "#0b1c0ead" ,
                    }
                }
                
                 disablePast={true}
                 defaultValue={dayjs().add(1, "month")}
                
                   slots={
                    {
                        calendarHeader: CustomCalendarHeader
                    }
                }

                onChange={RightOnChangeFunc}
                />} />
            </div>
                 
               

            </div>
        </>
    )
}

function DropdownDate({DateValue})
{
    

    return(
        <>
            <div className='pt-1 pb-1 h-full w-full flex justify-start items-center gap-1' >
                <div className='flex justify-start items-center w-[10%] h-[80%] bg-[url("./assets/calender.svg")] bg-contain bg-left bg-no-repeat'></div>
                
                <div className='flex justify-start items-center gap-1 w-[100%] hover:cursor-pointer' >
                    <div className='w-[60%] text-1xl font-semibold text-[#0b1c0ead] focus:text-[#0b1c0ea8] text-left'> {DateValue} </div>
                    <div className='flex justify-start items-center w-[30%] h-[1rem] bg-[url("./assets/arrow-d.svg")] bg-contain bg-left bg-no-repeat'></div>

                </div>
            
            </div>
        </>
    )
}

function DropDownRoomsInfo({})
{

    return(
        <>
            <div className='pt-1 pb-1 h-full w-full flex justify-start items-center gap-1 hover:cursor-pointer'>
                
                <div className='w-[90%] h-[100%] flex justify-start items-center gap-2.5'>

                    <div className='flex justify-start items-center w-[11%] h-[100%] bg-[url("./assets/exit.svg")] bg-contain bg-left bg-no-repeat'></div>
                    <div id="Rooms-no"  className='w-[30%] text-1xl font-semibold text-[#0b1c0ead] focus:text-[#0b1c0ea8] text-left'> 1</div>
                    <div className='flex justify-start items-center w-[11%] h-[100%] bg-[url("./assets/persons.svg")] bg-contain bg-left bg-no-repeat'></div>
                    <div id="Guests-no"  className='w-[30%] text-1xl font-semibold text-[#0b1c0ead] focus:text-[#0b1c0ea8] text-left'> 2 </div>
              
                </div>
                
                <div className='flex justify-start items-center w-[10%] h-[1rem] bg-[url("./assets/arrow-d.svg")] bg-contain bg-left bg-no-repeat'></div>

            </div>
        </>
    )
}

function RoomsInputData({onChangeAdults, onChangeChildren, onChangeRooms})
{
    return(
        <>
            <div className='w-auto h-auto min-w-[300px] pt-2 pb-2  flex  flex-col gap-2.5 bg-white box-border rounded-[0.25rem] shadow-md'>
                <Counter PropertyName={"Adults"} onChangeProperty={onChangeAdults} DefaultValue={2}/>
                <Counter PropertyName={"Children"} onChangeProperty={onChangeChildren} DefaultValue={0}/>
                <Counter PropertyName={"Rooms"} onChangeProperty={onChangeRooms} DefaultValue={1}/>
            </div>
        </>
    )
}


export function InputBar()
{

    //Dates Input
        const [showDateInput, SetShowDate] = React.useState(false);
        const [DateValue, onChangeStateValue] = React.useState(dayjs().startOf("day"));
        const [DateValueDepart, onChangeStateValueDepart] = React.useState(dayjs().add(1, "month").startOf("day"));
    
        const handleClick = () => {
            SetShowDate(prev => !prev);
            console.log("Should Open Display")
        }
    
        const HandleDateUpdateStart = (DateVal) => 
        {
            onChangeStateValue(DateVal);
        }

            
        const HandleDateUpdateDepart = (DateVal) => 
        {
            onChangeStateValueDepart(DateVal);
        }


        //ROOMS INPUT
        const [showRoomsInput, SetShowRooms] = React.useState(false);
        const [Adults, setAdults] = React.useState(2);
        const [Children, setChildren] = React.useState(0);
        const [Rooms, SetRooms] = React.useState(1);


     
        React.useEffect(() =>
        {
           const GuestProp =  document.getElementById("Guests-no") ;

           if(GuestProp)
           {
             GuestProp.innerHTML = `${Adults + Children}`
           }

            const RoomProp =  document.getElementById("Rooms-no") ;

           if(RoomProp)
           {
             RoomProp.innerHTML = `${Rooms}`
           }

        
        }, [Adults, Children, Rooms]);

        //LOCATION INPUT
         const [ShowLocationSugesstions, SetSHowLocations] = React.useState(false);

        TriggerPlacePopupRemoval = () => {
            SetSHowLocations(false);
        }


        const navigate = useNavigate();

        const SearchHotels = () =>  {
                document.getElementById("Hotels-search")?.classList.add("Search-button");

                const Func = async () => {
                    let TestRes: GeoLocationResponse = await GetLocationCode(Varss.placeID);
                    console.log(TestRes);

                    let HotelsRes = await ByLocation(TestRes.location.longitude, TestRes.location.latitude);
                    console.log(HotelsRes);
                    
                    //let HotelRes = DummuData;      
                    let HotelRes = HotelsRes;      
                    
                    const GoToAvailabilityPage = () => 
                    {
                      navigate('/offers', { state: HotelRes } );
                    };

                    if(HotelRes)
                    {
                      GoToAvailabilityPage();
                    }
                    else
                    {
                        location.reload();
                    }

                    //TODO: Validation to SHow User Input Was wrong Or No Results where Found For Selected City
                }

                 // Func();

                //Development Test For Styling OFfers Page
               {
                    let HotelRes = DummuData;      
                    
                    const GoToAvailabilityPage = () => 
                    {
                      navigate('/offers', { state: HotelRes } );
                    };

                    if(HotelRes)
                    {
                      GoToAvailabilityPage();
                    }
                    else
                    {
                        location.reload();
                    }

               }


        }

        let TopClassOptionsDefault: string = "flex w-full h-1/9 pr-16 pl-16 absolute left-0 bottom-1/6  justify-center";

        const [isSearchFieldHovered, setIsHovered] = React.useState(false);
        const [isDatesHovered, setIsDatesHovered] = React.useState(false);
        const [isRoomsHovered, setIsRoomsHovered] = React.useState(false);


        React.useEffect(() => {

                   const RoomElement = document.getElementById('rooms-guest-hover');
                if(RoomElement)
                {
                    if(isRoomsHovered)
                        RoomElement.style.color = "blue";
                    else
                        RoomElement.style.color = "#0b1c0ea8"
                }
            
       
                const element = document.getElementById('city-location-hover');
                if(element)
                {
                    if(isSearchFieldHovered)
                        element.style.color = "blue";
                    else
                        element.style.color = "#0b1c0ea8"
                }
            


                const elementDates = document.getElementById('Date-hover');
                const elementDates2 = document.getElementById('Date-hover2');
                if(elementDates && elementDates2)
                {
                    if(isDatesHovered)
                    {
                        elementDates.style.color = "blue"; 
                        elementDates2.style.color = "blue"; 
                    }
                    else
                     { 
                          elementDates.style.color = "#0b1c0ea8"
                          elementDates2.style.color = "#0b1c0ea8"
                     }
                }
            


           

        }, [isSearchFieldHovered, isDatesHovered, isRoomsHovered]);

    return (
        <>
            <div className={`${TopClassOptionsDefault }`}>
                <div className='pt-3 pb-3 pl-9 pr-9 flex justify-center items-center w-full bg-white rounded-[5rem] shadow-2xl shadow-[#282d28] font-semibold text-[#0b1c0ea8]'>
                    
                    <div id='Location-input' className='flex flex-col justify-center items-start  w-[20%] h-[100%]' onMouseLeave={ () => setIsHovered(false) } onMouseEnter={() => setIsHovered(true)} onClick={() => { SetSHowLocations(prev =>  !prev) }}>
                        <div id='city-location-hover' className='text-[1rem]'> <p> City,location </p> </div>
                        <div className='Searchbar-Comp h-[90%]'> <SearchField/>   </div>
                    </div>

                    {
                        ShowLocationSugesstions && <SimplePopper  parent={document.getElementById('Location-input') } children={<SearchFieldSuggestions />} />
                    }

                    <div id='Date-inputs' className='w-[40%] h-full flex justify-center items-center hover:cursor-pointer' onClick={() => { handleClick() }} onMouseLeave={ () => setIsDatesHovered(false) } onMouseEnter={() => setIsDatesHovered(true)} >
                        <div className='flex flex-col justify-center items-start  w-[50%] h-[100%]'>
                            <div id='Date-hover' className='p'> <p> Arrival Date </p> </div>
                            <div className='Calender-Comp w-[75%]  h-[90%]'> <DropdownDate DateValue={DateValue.format("YYYY-MM-DD")}/> </div>
                        </div>

                        <div className='flex flex-col justify-center items-start  w-[50%] h-[100%]'>
                            <div id='Date-hover2' className='p'> <p> Departure Date </p> </div>
                            <div className='Calender-Comp w-[75%] h-[90%]'> <DropdownDate DateValue={DateValueDepart.format("YYYY-MM-DD")}/>  </div>
                        </div>

    
                    </div>

                        {showDateInput && <SimplePopper parent={document.getElementById("Date-inputs")}
                         children={<CalenderInputComp RightOnChangeFunc={HandleDateUpdateDepart} LeftOnChangeFunc={HandleDateUpdateStart}></CalenderInputComp> }/>}

                    <div id='Rooms-inputs' className='flex flex-col justify-center items-start  w-[20%] h-[100%]' onClick={() => { SetShowRooms(prev =>  !prev) }} onMouseLeave={ () => setIsRoomsHovered(false) } onMouseEnter={() => setIsRoomsHovered(true)} >
                        <div id='rooms-guest-hover' className='p'> <p> Rooms And Guests </p> </div>
                        <div className='Calender-Comp w-[75%] h-[90%]'> <DropDownRoomsInfo />  </div>
                    </div>

                        {
                            showRoomsInput && <SimplePopper  parent={document.getElementById('Rooms-inputs') } children={<RoomsInputData onChangeAdults={setAdults} onChangeChildren={setChildren} onChangeRooms={SetRooms}/>} />
                        }


                    <div className='flex flex-col justify-center items-start  w-[20%] h-[100%]'>
                        <div id="Hotel-search" className='font-bold w-[100%] h-[100%] rounded-full flex justify-center items-center bg-[#0b1c0e] transition-all duration-[0.15s] text-white hover:text-white focus:text-white visited:text-white hover:cursor-pointer hover:transform hover:scale-[1.025]  hover:bg-[#0b1c0ee8]' onClick={() => {
                            SearchHotels();
                        }} >
                            SEARCH
                        </div>
                    </div>
        


                </div>
            </div>
        </>
    )
}



//AVAILAIBILITY BAR
export function AvailabilityPageInputBar()
{

    //Dates Input
        const [showDateInput, SetShowDate] = React.useState(false);
        const [DateValue, onChangeStateValue] = React.useState(dayjs().startOf("day"));
        const [DateValueDepart, onChangeStateValueDepart] = React.useState(dayjs().add(1, "month").startOf("day"));
    
        const handleClick = () => {
            SetShowDate(prev => !prev);
            console.log("Should Open Display")
        }
    
        const HandleDateUpdateStart = (DateVal) => 
        {
            onChangeStateValue(DateVal);
        }

            
        const HandleDateUpdateDepart = (DateVal) => 
        {
            onChangeStateValueDepart(DateVal);
        }


        //ROOMS INPUT
        const [showRoomsInput, SetShowRooms] = React.useState(false);
        const [Adults, setAdults] = React.useState(2);
        const [Children, setChildren] = React.useState(0);
        const [Rooms, SetRooms] = React.useState(1);


     
        React.useEffect(() =>
        {
           const GuestProp =  document.getElementById("Guests-no") ;

           if(GuestProp)
           {
             GuestProp.innerHTML = `${Adults + Children}`
           }

            const RoomProp =  document.getElementById("Rooms-no") ;

           if(RoomProp)
           {
             RoomProp.innerHTML = `${Rooms}`
           }

        
        }, [Adults, Children, Rooms]);

        //LOCATION INPUT
         const [ShowLocationSugesstions, SetSHowLocations] = React.useState(false);

        TriggerPlacePopupRemoval = () => {
            SetSHowLocations(false);
        }


        const navigate = useNavigate();

        const SearchHotels = () =>  {
                document.getElementById("Hotels-search")?.classList.add("Search-button");

                const Func = async () => {
                    let TestRes: GeoLocationResponse = await GetLocationCode(Varss.placeID);
                    console.log(TestRes);

                    let HotelsRes = await ByLocation(TestRes.location.longitude, TestRes.location.latitude);
                    console.log(HotelsRes);

                    //let HotelRes = DummuData;      
                    let HotelRes = HotelsRes;      

                    const GoToAvailabilityPage = () => 
                    {
                    navigate('/offers', { state: HotelRes } );
                    };

                    if(HotelRes)
                    {
                      GoToAvailabilityPage();
                    }
                    else
                    {
                        location.reload();
                    }

                    //TODO: Validation to SHow User Input Was wrong Or No Results where Found For Selected City
                }

                Func();


        }

        let TopClassOptionsDefault: string = "flex w-[71%]  pr-16 pl-16  justify-center h-[4rem] ";

    return (
        <>
            <div className={`${ TopClassOptionsDefault }`}>
                <div className='pt-3 pb-3 pl-9 pr-9 flex justify-center items-center w-full bg-white rounded-[5rem]  font-semibold text-[#0b1c0ea8]'>
                    
                    <div id='Location-input' className='flex flex-col justify-center items-start  w-[20%] h-[100%]'  onClick={() => { SetSHowLocations(prev =>  !prev) }}>
                        <div className='Searchbar-Comp h-[100%]'> <SearchField/>   </div>
                    </div>

                    {
                        ShowLocationSugesstions && <SimplePopper  parent={document.getElementById('Location-input') } children={<SearchFieldSuggestions />} />
                    }

                    <div id='Date-inputs' className='ml-4.5  w-[40%] h-full flex justify-center items-center ' onClick={() => { handleClick() }}>
                        <div className='flex flex-col justify-center items-start  w-[50%] h-[100%]'>
                            <div className='Calender-Comp w-[100%]  h-[100%]'> <DropdownDate DateValue={DateValue.format("YYYY-MM-DD")}/> </div>
                        </div>

                        <div className='flex flex-col justify-center items-start  w-[50%] h-[100%]'>
                            <div className='Calender-Comp w-[100%] h-[100%]'> <DropdownDate DateValue={DateValueDepart.format("YYYY-MM-DD")}/>  </div>
                        </div>

    
                    </div>

                        {showDateInput && <SimplePopper parent={document.getElementById("Date-inputs")}
                         children={<CalenderInputComp RightOnChangeFunc={HandleDateUpdateDepart} LeftOnChangeFunc={HandleDateUpdateStart}></CalenderInputComp> }/>}

                    <div id='Rooms-inputs' className='mr-4.5 flex flex-col justify-center items-start  w-[20%] h-[100%]' onClick={() => { SetShowRooms(prev =>  !prev) }}>
                        <div className='Calender-Comp w-[100%] h-[100%]'> <DropDownRoomsInfo />  </div>
                    </div>

                        {
                            showRoomsInput && <SimplePopper  parent={document.getElementById('Rooms-inputs') } children={<RoomsInputData onChangeAdults={setAdults} onChangeChildren={setChildren} onChangeRooms={SetRooms}/>} />
                        }


                    <div className='flex flex-col justify-center items-start  w-[20%] h-[100%]'>
                        <div id="Hotel-search" className='font-bold w-[100%] h-[100%] rounded-full flex justify-center items-center bg-[#0b1c0e] transition-all duration-[0.15s] text-white hover:text-white focus:text-white visited:text-white hover:cursor-pointer hover:transform hover:scale-[1.025]  hover:bg-[#0b1c0ee8]' onClick={() => {
                            SearchHotels();
                        }} >
                            SEARCH
                        </div>
                    </div>
        


                </div>
            </div>
        </>
    )
}