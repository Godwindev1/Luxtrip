import * as React from 'react';
import "../styles/CustomScroll.css"

function OfferCard({hotelImageLoc, Properties: { Title, Location, Price,  Rating} })
{
    let Bg = `${hotelImageLoc}`;

    return(
        <>
            <div className='w-[25%] h-[75%] bg-white rounded-4xl outline outline-[#0b1c0e3f] flex flex-col transition duration-[0.55s] hover:cursor-pointer hover:transform hover:scale-[1.025] box-border snap-center shrink-0'>
                <div className={'h-[65%] w-[100%] rounded-t-4xl '}>
                    <img src={Bg} alt="Offer" className='rounded-t-4xl w-full h-full'   />
                </div>

                <div className='flex flex-col justify-center items-start gap-4 text-[#0b1c0e] pl-4 pr-4 box-border'>
                    
                    <div className='flex flex-col items-center justify-center gap-1 w-full'>
                        <div className='w-full flex justify-start items-center mt-2 font-bold text-3xl'> {Title} </div>
                        <div className='w-full flex justify-start items-center font-semibold text-[1.10rem] text-[#0b1c0e9c] box-border'>

                            <div className='flex justify-start items-center w-[7%] h-[70%] bg-[url("./assets/search.svg")] bg-contain bg-left bg-no-repeat' > 
                            </div>  
                            {Location}
                            
                        </div>
                    </div>
                    
                    <div className='w-full flex justify-between items-center box-border'>
                        
                        <div className="text-[#043d0e9c] text-2xl font-semibold italic  "> ${Price}<span className='text-[#4d594a97] font-[Sevillana,cursive] italic '>/night</span> </div>
                       
                        <div className='flex w-[20%] h-[100%]  justify-center items-center pr-1.5 rounded-2xl outline outline-[#0b1c0e35] box-border bg-[#0b1c0e] '>
                            <div className='w-[50%] h-[54%] flex justify-center items-center bg-[url("./assets/star.svg")] bg-contain bg-center bg-no-repeat'>
                            </div>

                            <div className='text-[0.9rem] h-full w-[50%] flex justify-center items-center  font-semibold text-[white]'>
                                {Rating}
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default function  OffersComponents()
{
    return(
    <>
        <div className='flex flex-col justify-center items-center w-full h-[100vh] pr-16 pl-16 bg-white'> 
            <div className='self-start text-2xl text-[#0b1c0ea8]' style={{ fontFamily: "var(--var-Stylzed-header-font)" }}> Select from a curated list of Offers </div>
           
            <div className='w-full h-[75%] flex items-center justify-around  overflow-x-auto whitespace-nowrap scroll-smooth hide-scrollbar snap-x snap-proximity '>
                <OfferCard hotelImageLoc={"./src/assets/hot.jpg"} Properties={{Title: "Hotel Pari", Location: "Paris", Price: "500", Rating: 4}}/>
                <OfferCard hotelImageLoc={"./src/assets/hotelsec.jpg"} Properties={{Title: "Hotel NYC", Location: "Ney york", Price: "500", Rating: 4.5}}/>
                <OfferCard hotelImageLoc={"./src/assets/hot3.jpg"} Properties={{Title: "Hotel Ber", Location: "Berlin", Price: "500", Rating: 4.8}}/>
            </div>    
        
        </div>    
    </>
    
)

}