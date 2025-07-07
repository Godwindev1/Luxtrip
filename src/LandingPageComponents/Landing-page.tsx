
import OffersComponents from './offersSectionComponents'
import AdvertFrames from './AdvertSection';
import FooterSection from './FooterSection';
import { AdvertFeatures } from './FooterSection';
import { PlacePrediction, parsePlacePredictions } from '../AutocompleteJS/CompleteResult';

import {InputBar} from '../LandingPageComponents/InputBarAbstraction'



export function TransparentButtonComponent({link, name})
{
    return(
        <>
                  <div ><a  style={{ width: "70%", height: "70%" }} className='text-[#aeac9a!important] bg-transparent hover:text-[#ffffff!important]'  href={link}>{name}</a></div>
        </>
    )
}

export function NavBar()
{
    return(
        <>
            <nav className='w-full h-fit flex justify-between items-center pl-16 pr-16 bg-[#4D594A] border-b border-[#0000002f] '>
                    <div className='flex justify-center items-center'><a  href="#"> <img className='h-[100px] w-[100px] ' src="src/assets/logo.png"   /> </a></div>
                   
                   <div className=' w-max flex justify-between items-center gap-13'>
                        <TransparentButtonComponent link={""} name={"Stays"} />
                        <TransparentButtonComponent link={""} name={"Services"} />
                        <TransparentButtonComponent link={""} name={"Events"} />
                        <TransparentButtonComponent link={""} name={"About us"} />
                   </div>

                        <ul className='flex flex-row justify-between items-center gap-4'>
                            <TransparentButtonComponent link={""} name={"Region & \nlanguage"} />
                            <li><div className='flex justify-between items-center '><a  href="#"> <img className='h-[30px] w-[30px] rounded-full ' src="src/assets/united-kingdom.png"   /> </a></div></li>
                        </ul>
            </nav>
        </>
    )
}

function HeroImageAndText()
{
    return(
        <>
            <div className=' flex justify-between items-center pl-16 pr-16 w-full h-[86vh] bg-[#4D594A] '>
                <div className='w-[50%] h-[70%] flex items-start justify-items-start flex-col gap-12' >
                    <h2 className='font-semibold text-[3.65rem] text-shadow-black text-left  whitespace-normal' style={{ fontFamily: "var(--var-Stylzed-header-font)" }}>Your Gateway to Comfort and Luxury </h2> 
                    
                    <h4 className='text-[1.5rem] text-left font-semibold  text-[#aeac9a]  whitespace-normal' >Recieve The Best Prices on Offer</h4>
                </div>

                <div className=' flex justify-end items-center h-[100%] w-[50%] ' >
                     <div className='bg-[url("src/assets/hotel.jpg")] h-[36rem] w-[36rem] bg-cover bg-center rounded-[50%] ' >  </div>
                </div>
            </div>
        </>
    )
}

function Sponsors()
{
    const SponsorsImages :  string[] = ['Top Galaxy', 'Rolex', 'Wellspring', 'Lasborn', 'Hevduit'];
    const Elements = SponsorsImages.map((el, indx) => {
        return <div className='mt-4 mb-4'> {el} </div>
    })

    return(
        <>
            <div className='p-2 H-Sponsor-section flex w-full justify-evenly items-center bg-[#323B2D] text-3xl font-extrabold text-[#ffffff2d] font-[Sevillana,cursive] '>
                {
                    Elements
                }    
            </div>
        </>
    )
}





export function Landing_page()
{
    return(
        <>
            <NavBar/>
            <HeroImageAndText/>
            <InputBar/>
            <AdvertFeatures/>
            <AdvertFrames/>
            <OffersComponents/>
            <FooterSection/>
        </>
    )
}