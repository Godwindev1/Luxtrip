import * as React from 'react';
import { NavBar, TransparentButtonComponent } from './Landing-page';
import { Input } from '@base-ui-components/react/input';

class ReviewData{
    constructor(Review: string, Rating: Number,  Url: string)
    {

    }

    Review :string;
    Rating: Number;
    Url: string;
}

function InfoCard({ title, subtitle, image })
 {
  return (
    <div className="rounded-[32px] pr-7 pl-7 pt-12 pb-12 bg-white h-[80%] w-[80%] max-w-xs  shadow-2xl transition-all duration-500 box-border flex items-start justify-center flex-col gap-1 hover:transform hover:scale-[1.05]" >
      <h3 className=" text-lg font-bold text-[#0b1c0ea8] text-left">{title}</h3>
      <p className=" text-sm font-semibold text-[#aeac9a] text-left mb-5.5">{subtitle}</p>
      <img src={image} alt={title} className="w-[75%] h-[68%] mx-auto mb-4" />
    </div>
  );
};



function TextField()
{
    const handleClick = (val) => {

    }

    return(
        <>
            <div className='h-full w-full  flex justify-between items-center  bg-[white]'>
                 <Input
                                      placeholder="exampleemail@gmail.com"
                                      className="pl-6.5 h-[100%] w-[100%] font-semibold flex   border bg-white border-gray-200 text-base text-[#0b1c0ea8] focus:text-[#0b1c0ea8] focus:outline-0"
                                      onChange={(e) => handleClick(e.target.value)}
                                   />

                <div className='w-[10%] h-[60%] flex justify-center items-center transition duration-[0.55s] hover:transform hover:scale-[1.15] hover:cursor-pointer'>
                    <svg  className='w-full h-full' viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58172 3.86258e-07 -3.86258e-07 3.58172 0 8C3.86258e-07 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 -3.86258e-07 8 0ZM3.79289 10.7929L7.29289 7.29288L5.25 5.24999L6 4.49998L11.5 4.49998L11.5 9.99998L10.75 10.75L8.70711 8.70709L5.20711 12.2071L3.79289 10.7929Z" fill="#0b1c0e"></path> </g></svg>
                </div>
            </div>
        </>
    )
}

function Get_icon({srcimage})
{
    return (<div className=" h-[30px] w-[30px] flex justify-center items-center bg-center bg-cover bg-no-repeat transition duration-[0.55s] hover:transform hover:scale-[1.15] hover:cursor-pointer " style={ { backgroundImage: `url(${srcimage})` } } > </div>);
}

export function FootBar()
{
    
    return(
        <>
            <nav className='w-full h-fit flex justify-between items-center pl-16 pr-16 bg-[#4D594A] border-b border-[#0000002f] '>
                    <div className='flex justify-center items-center'><a  href="#"> <img className='h-[100px] w-[100px] ' src="src/assets/logo.png"   /> </a></div>
                   
                   <div className=' w-max flex justify-between items-center gap-13'>
                                  <TransparentButtonComponent link={"#features"} name={"Features"} />
                                  <TransparentButtonComponent link={"#About"} name={"About us"} />
                                  <TransparentButtonComponent link={"#Nav"} name={"Back to Top Page"} />
                   </div>

                    <div className="flex justify-center gap-4 items-center h-full w-fit">
                        <a href="https://x.com/isAme__" target='_blank'><Get_icon srcimage={"./src/assets/tw.svg"}/></a>
                        <a href="https://www.instagram.com/oluowho_g/" target='_blank'><Get_icon srcimage={"./src/assets/ig.svg"}/></a>
                    </div>
            </nav>
        </>
    )
}

export function AdvertFeatures()
{
    return(
        <>
        
                <div id='features' className='h-[75vh] w-full bg-white pt-8 pb-8 flex justify-center items-center pl-20 pr-16'>
                    <div className='h-full flex justify-between items-center w-full '>
                        <InfoCard title={"✈️ Top Hotel Deals Worldwide"} subtitle={"Find affordable stays, resorts & vacation rentals with Luxtrip"} image={"src/assets/deals.png"} />
                        <InfoCard title={"🏨 Explore Global Hotel Offers"} subtitle={"Book budget hotels, luxury resorts & unique stays—only on Luxtrip"} image={"src/assets/explore.png"} />
                        <InfoCard title={"🌍 Discover Your Perfect Stay"} subtitle={"From weekend getaways to international escapes—find it all with Luxtrip "} image={"src/assets/hotVector.png"} />
                        <InfoCard title={"🛋️ Travel in Comfort"} subtitle={"Enjoy a smoother, more relaxing journey Luxtrip "} image={"src/assets/relax.png"} />
                    </div>
                </div>
        </>
    )
}


export default function FooterSection()
{
    

    return(
        <>
                <hr />

                <div id='Footer' className='h-[25vh] w-full flex justify-center items-start bg-white text-[#0b1c0e] p-16 text-justify'>
                    Search affordable hotels across major destinations worldwide with Luxtrip, powered by Amadeus. Discover great deals on hotels that match your needs—whether you're planning a quick getaway or a long vacation.
                    Booking is easy, fast, and flexible. Start saving on your next stay with exclusive discounts available through Luxtrip.
                    Looking for more? Explore thousands of options including flights, car rentals, trains, and buses—all in one place with Luxtrip.
                </div>

                <div className='h-[25vh] w-full bg-[#4D594A] flex flex-col justify-end items-center ' >
                   
                    <div className='bg-[#0b1c0e] w-full h-[50%] flex justify-between items-center pl-20 pr-16'>
                        <div className='text-white text-3xl' style={{ fontFamily: "var(--var-Stylzed-header-font)" }}> Subscribe To Our Newletter </div>
                        
                        <div className='w-[35%] h-[50%]'> <TextField/> </div>
                    </div>
                   
                    <FootBar/>
                </div>
        </>
    )
}