import Image from 'next/image';
import Link from 'next/link';

const Vets = ({ vets, currentPath }) => {

    return (
        <div className='flex flex-col gap-5'>
            {
                vets.map(({ _id, avator, name, title, works_at, years_of_experiences, specialities, visit_fee_usd, visit_fee_bdt }) => (
                    <Link href={{
                        pathname: `${currentPath}/${_id}`,
                        query: {
                            vet: `${name.toLowerCase()}`
                        }
                    }} key={_id} className='border p-3 grid grid-cols-[5fr_3fr_2fr] items-center'>
                        <div className='flex items-center gap-5'>
                            <div><Image src="/images/vet.png" alt="" width={100} height={100} className='rounded' /></div>
                            <div>
                                <h4 className='font-bold'>{name}</h4>
                                <p className='text-sm mb-2'>{title}</p>
                                <p className='text-sm text-gray-700 mb-1'>Specialities</p>
                                <div className='flex gap-1'>{specialities.map((speciality, index) => <p key={index} className='text-xs bg-primary p-1 text-white rounded'>{speciality}</p>)}</div>
                            </div>
                        </div>
                        <div>
                            <div className='mb-2'>
                                <p className='text-sm text-gray-700'>Works at</p>
                                <p className='font-semibold text-sm'>{works_at}</p>
                            </div>
                            <div>
                                <p className='text-sm text-gray-700'>Years of experience</p>
                                <p className='font-semibold text-sm'>{years_of_experiences}+ years</p>
                            </div>
                        </div>
                        <div className=''>
                            <h1 className='mb-1 font-bold text-primary text-3xl flex items-center gap-1'>${visit_fee_usd.toFixed(2)} <span className='text-xs text-gray-500 font-semibold'>(incl. VAT)</span></h1>
                            <p className='text-gray-800 '>Consultation fee</p>
                        </div>
                    </Link>
                ))
            }
        </div>
    );
};

export default Vets;