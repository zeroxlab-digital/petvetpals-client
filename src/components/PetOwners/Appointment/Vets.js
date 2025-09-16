import { PetSpinner } from '@/components/Common/Loader/PetSpinner';
import { Stethoscope } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { HiAcademicCap, HiArrowRight, HiBriefcase, HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineClock } from 'react-icons/hi2';

const Vets = ({ vets, isLoading, error, currentPath }) => {
    console.log(vets)
    if (isLoading) {
        return <PetSpinner />
    }
    if (error) {
        return <div className='max-sm:mt-5 text-center'>There was an error fetching vets!</div>
    }
    return (
        <div className='max-sm:mt-5'>
            {vets?.length > 0 ?
                <div className='flex flex-col gap-5'>
                    {
                        vets.map(({ _id, image, fullName, degrees, works_at, experience_years, specialities, fees }) => (
                            <Link href={{
                                pathname: `${currentPath}/${_id}`,
                                query: {
                                    vet: `${fullName.toLowerCase()}`
                                }
                            }} key={_id} className='rounded-md  hover:shadow-lg duration-200 grid sm:grid-cols-[5fr_3fr_2fr] gap-5 max-sm:gap-0 items-center md:border max-md:bg-white '>
                                <div className='flex sm:items-start gap-5 max-sm:gap-3 p-3'>
                                    <div><Image src={image || "/images/dr-vector.png"} alt="vet-image" width={100} height={100} className='rounded-full w-24 h-24 object-cover' /></div>
                                    <div>
                                        <h4 className='font-bold mb-[2px]'>{fullName}</h4>
                                        <p className='text-sm mb-2 flex items-center gap-2'><HiOutlineAcademicCap className='text-base' /> {degrees[0] || "N/A"}</p>
                                        <p className='text-sm text-gray-700 mb-1'>Specialities</p>

                                        {
                                            specialities.length === 0 && <p className='text-sm font-medium'>N/A</p>
                                        }
                                        <div className='flex gap-1 flex-wrap lg:hidden'>{specialities.slice(0, 2).map((speciality, index) => <p key={index} className='text-xs bg-gray-200 px-2 py-[2px] text-gray-700 rounded-full'>{speciality}</p>)}</div>
                                        <div className='flex gap-1 flex-wrap max-lg:hidden'>{specialities.map((speciality, index) => <p key={index} className='text-xs bg-gray-200 px-2 py-[2px] text-gray-700 rounded-full'>{speciality}</p>)}</div>

                                    </div>
                                </div>
                                <div className='max-sm:flex gap-5 p-3'>
                                    <div className='mb-2'>
                                        <p className='text-sm text-gray-700 flex items-center gap-2'><HiOutlineBriefcase className='text-base' /> Works at</p>
                                        <p className='font-medium text-sm'>{works_at || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className='text-sm text-gray-700 flex items-center gap-2'><HiOutlineClock className='text-base' /> Years of experience</p>
                                        <p className='font-medium text-sm'>{experience_years}+ years</p>
                                    </div>
                                </div>
                                <div className='max-sm:border-t  sm:bg-primary h-full max-md:p-3 max-md:rounded-b-md md:rounded-r-md md:flex items-center justify-center'>
                                    <div className='max-sm:flex items-center justify-between '>
                                        <div className='max-sm:flex items-center gap-2'>
                                            <h1 className=' font-bold text-white max-sm:text-primary text-2xl max-sm:text-xl flex items-center gap-1'>${fees.toFixed(2)} USD</h1>
                                            <p className=' text-gray-200 max-sm:text-gray-700 text-sm'>(Consultation Fee)</p>
                                        </div>
                                        <span className='sm:hidden'>
                                            <HiArrowRight className='text-primary text-2xl' />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
                :
                <div className="text-center py-10 text-gray-500">
                    <Stethoscope className="mx-auto h-12 w-12 mb-4 text-gray-400" />
                    <p className="text-lg font-medium">No Available Vet!</p>
                    <p className="text-sm">We do not have a registered verified veterinarian yet. Please check back later.</p>
                </div>
            }
        </div>
    );
};

export default Vets;