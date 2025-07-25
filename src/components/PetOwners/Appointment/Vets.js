import { PetSpinner } from '@/components/Common/Loader/PetSpinner';
import Image from 'next/image';
import Link from 'next/link';
import { HiAcademicCap, HiArrowRight, HiBriefcase, HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineClock } from 'react-icons/hi2';

const Vets = ({ vets, isLoading, error, currentPath }) => {
    if (isLoading) {
        return <PetSpinner />
    }
    if (error) {
        return <div className='max-sm:mt-5 text-center'>There was an error fetching vets!</div>
    }
    return (
        <div className='max-sm:mt-5'>
            {vets?.length > 1 ?
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
                                    <div><Image src={image || "/images/user.jpg"} alt="vet-image" width={100} height={100} className='rounded max-w-32 object-cover border bg-gray-100' /></div>
                                    <div>
                                        <h4 className='font-bold mb-[2px]'>{fullName}</h4>
                                        <p className='text-sm mb-2 flex items-center gap-2'><HiOutlineAcademicCap className='text-base' /> {degrees[0] || "Title goes here"}</p>
                                        <p className='text-sm text-gray-700 mb-1'>Specialities</p>
                                        <div className='flex gap-1 flex-wrap lg:hidden'>{specialities.slice(0, 2).map((speciality, index) => <p key={index} className='text-xs bg-primary px-2 py-[2px] text-white rounded-full'>{speciality}</p>)}</div>
                                        <div className='flex gap-1 flex-wrap max-lg:hidden'>{specialities.map((speciality, index) => <p key={index} className='text-xs bg-[#672e5bd3] px-2 py-[2px] text-white rounded-full'>{speciality}</p>)}</div>
                                    </div>
                                </div>
                                <div className='max-sm:flex gap-5 p-3'>
                                    <div className='mb-2'>
                                        <p className='text-sm text-gray-700 flex items-center gap-2'><HiOutlineBriefcase className='text-base' /> Works at</p>
                                        <p className='font-medium text-sm'>{works_at || "Works at goes here"}</p>
                                    </div>
                                    <div>
                                        <p className='text-sm text-gray-700 flex items-center gap-2'><HiOutlineClock className='text-base' /> Years of experience</p>
                                        <p className='font-medium text-sm'>{experience_years}+ years</p>
                                    </div>
                                </div>
                                <div className='max-sm:border-t  sm:bg-primary h-full max-md:p-3 max-md:rounded-b-md md:rounded-r-md md:flex items-center justify-center'>
                                    <div className='max-sm:flex items-center justify-between '>
                                        <div className='max-sm:flex items-center gap-1'>
                                            <h1 className=' font-bold text-white max-sm:text-primary text-2xl max-sm:text-xl flex items-center gap-1'>${fees.toFixed(2)} USD</h1>
                                            <p className='mt-1 text-gray-200 max-sm:text-gray-700 text-base'>Consultation Fee</p>
                                        </div>
                                        <span className='sm:hidden'>
                                            <HiArrowRight className='text-primary' />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
                :
                <div className='text-center'>
                    <h2 className='font-semibold '>No vets found!</h2>
                </div>
            }
        </div>
    );
};

export default Vets;