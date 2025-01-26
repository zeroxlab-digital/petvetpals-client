import Image from 'next/image';
import Link from 'next/link';

const Vets = ({ vets, currentPath }) => {
    if (vets?.length < 1) {
        return <div>No vets has been found!</div>
    }
    return (
        <div className='flex flex-col gap-5 '>
            {
                vets?.map(({ _id, image, fullName, title, works_at, experience_years, specialities, fees }) => (
                    <Link href={{
                        pathname: `${currentPath}/${_id}`,
                        query: {
                            vet: `${fullName.toLowerCase()}`
                        }
                    }} key={_id} className='rounded-md hover:shadow-md duration-150 grid sm:grid-cols-[5fr_3fr_2fr] gap-5 items-center md:border max-md:bg-white '>
                        <div className='flex sm:items-start gap-5 max-sm:gap-3 p-3'>
                            <div><Image src="/images/vet.png" alt="" width={100} height={100} className='rounded max-w-32' /></div>
                            <div>
                                <h4 className='font-bold'>{fullName}</h4>
                                <p className='text-sm mb-2'>Titles goes</p>
                                <p className='text-sm text-gray-700 mb-1'>Specialities</p>
                                <div className='flex gap-1 flex-wrap lg:hidden'>{specialities.slice(0, 2).map((speciality, index) => <p key={index} className='text-xs bg-primary p-1 text-white rounded'>{speciality}</p>)}</div>
                                <div className='flex gap-1 flex-wrap max-lg:hidden'>{specialities.map((speciality, index) => <p key={index} className='text-xs bg-primary p-1 text-white rounded'>{speciality}</p>)}</div>
                            </div>
                        </div>
                        <div className='max-sm:flex gap-5 p-3'>
                            <div className='mb-2'>
                                <p className='text-sm text-gray-700'>Works at</p>
                                <p className='font-semibold text-sm'>Works at here</p>
                            </div>
                            <div>
                                <p className='text-sm text-gray-700'>Years of experience</p>
                                <p className='font-semibold text-sm'>{experience_years}+ years</p>
                            </div>
                        </div>
                        <div className='bg-primary h-full max-md:p-3 max-md:rounded-b-md md:rounded-r-md md:flex items-center justify-center'>
                            <div>
                                <h1 className='mb-1 font-bold text-white text-2xl flex items-center gap-1'>${fees.toFixed(2)} USD</h1>
                                <p className='text-gray-200 text-sm'>Consultation fee</p>
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    );
};

export default Vets;