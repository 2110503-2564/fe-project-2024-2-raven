import Image from 'next/image';
import InteractiveCard from './InteractiveCard';

export default function ProductCard( {coworkingSpaceName, imgSrc, onCompare} : {coworkingSpaceName:string, imgSrc:string, onCompare?:Function}) {
    
    function onCoworkingSpaceSelected() {
        alert("You Select " + coworkingSpaceName)
    }
    
    return (
        <InteractiveCard contentName={coworkingSpaceName}>
            <div className='w-full h-[70%] relative rounded-t-lg'>
            <Image src={imgSrc}
                alt='Product Picture'
                fill={true}
                objectFit='object-cover rounded-t-lg'/>
            </div>
            <div className='w-full h-[15%] p-[10px]'>{coworkingSpaceName}</div>
            {
                onCompare? <button className='block h-[10%] text-sm rounded-md bg-sky-600 
                hover:bg-indigo-600 mx-2 px-1 py-1 shadow-sm text-white' 
                onClick={(e)=>{ e.preventDefault(); onCompare(coworkingSpaceName)}}
                >Compare</button>:''
            }
        </InteractiveCard>
    );
}