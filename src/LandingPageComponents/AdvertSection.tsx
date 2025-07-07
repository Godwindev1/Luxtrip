import * as React from 'react';

function InfoFrame()
{
    return(
        <>
            <div className='w-full h-[100vh] bg-white text-[#0b1c0ea8] flex flex-col justify-start items-center z-[-10]  '>
                <div className=' text-4xl text-center text-wrap font-semibold font-[sullivan] mb-7'  >
                     Unforgettable Comfort  <br /> and <br /> Unparralleled Memories </div>
                <div className='text-[1.3rem]'>
                     experience ultimate travel comfort  pick from  curated  list of exclusive hotels and luxurious <br /> services world  wide  offering an unforgettable and livid experience all for your comfort </div>
           
            </div>
        </>
    )
}

function NumberedScript({name, number})
{
    return(
        <>
            <div className='flex flex-col gap-1 justify-center'>
                <div className='text-white text-3xl font-semibold' style={{ fontFamily: "var(--var-Stylzed-header-font)" }}> {number}+</div>
                <div className='self-start text-[#ffffff62] text-[1.1rem] font-normal'> {name} </div>
            </div>
        </>
    )
}


function ImageFrame()
{
    return(
        <>
            <div className='relative w-full h-[100vh] bg-[#4D594A] flex-col flex justify-end items-center pb-13 z-[1] '>
                <div className='flex justify-between flex-col'> 
                    
                    <div className='text-4xl text-left text-wrap font-semibold  mb-7' style={{ fontFamily: "var(--var-Stylzed-header-font)" }}>
                        Ready For An Adventure ??  
                    </div>

                    <div className='flex justify-between mt-5'>
                        <NumberedScript name={"Cities"} number={"900"}/>
                        <NumberedScript name={"Exclusive Hotels"} number={"5,000"}/>
                        <NumberedScript name={"Exclusive Rooms"} number={"40,000"}/>
                    </div>

                    

                </div>
            </div>
        </>
    )
}

function CapsuleOutline()
{
    return(
        <>
            <div className='outline-4 outline-[#4D594A] rounded-full h-[80%] w-[22%] z-[0]'></div>
        </>
    )
}

function ShortCapsuleOutline()
{
    return(
        <>
            <div className='outline-4  outline-[#4D594A] rounded-full h-[65%] w-[22%] z-[0]'></div>
        </>
    )
}

function ImageCapsule({url})
{
    let bgval: String = (`url('${url}')`)

        return(
        <>
            <div className= {   'rounded-full h-[80%] w-[22%] z-[0] bg-center bg-cover bg-no-repeat  '  } style={{ backgroundImage: `${bgval}`,  }}>
            </div>
        </>
    )
}


function ShortImageCapsule({url})
{
    let bgval: String = (`url("${url}")`)

     return(
        <>
            <div className={' rounded-full h-[65%] w-[22%] z-[0] bg-center bg-cover bg-no-repeat ' } style={{ backgroundImage: `${bgval}` }}></div>
        </>
    )

}

function Capsules()
{
    return(
        <>
        <div className='w-full h-[100vh] absolute z-0 '>
            <div className='flex justify-between items-center w-full h-[100vh] absolute top-[-50%] bg-[#ffffff00] pr-16 pl-16 '>
                <CapsuleOutline/>
                <ShortCapsuleOutline/>
                <CapsuleOutline/>
            </div>

     
                
        </div>
        </>
    )
}

function ImageCapsules()
{
    return(<>
        <div className='w-full h-[100vh] absolute z-[2]'>
            <div className='flex justify-around items-center w-full h-[100vh] absolute top-[-40%] bg-[#ffffff00] pr-16 pl-16  '>
                <ImageCapsule url={"src/assets/cap4.jpg"}/>
                <ShortImageCapsule url={"src/assets/cap2.jpg"}/>
                <ImageCapsule url={"src/assets/hotel.jpg"}/>
            </div>
           
        </div>
    </>)
}

export default function AdvertFrames()
{
    return (
    <>
        <InfoFrame/>
        <Capsules/>
        <ImageCapsules/>
        <ImageFrame/>
    </>
)
} 