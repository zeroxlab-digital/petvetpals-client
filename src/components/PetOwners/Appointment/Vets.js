import { PetSpinner } from '@/components/Common/Loader/PetSpinner';
import { Stethoscope, Award, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineClock } from 'react-icons/hi2';

const Vets = ({ vets, isLoading, error, currentPath }) => {
    if (isLoading) return <PetSpinner />;
    
    if (error) return (
        <div className='flex flex-col items-center justify-center py-20 bg-red-50 rounded-[2rem] border border-red-100'>
            <p className='text-red-500 font-black uppercase tracking-widest text-xs'>Connection Error</p>
            <p className='text-slate-600 font-medium'>There was an error fetching vets!</p>
        </div>
    );

    return (
        <div className='max-sm:mt-5'>
            {vets?.length > 0 ? (
                <div className='flex flex-col gap-6'>
                    {vets.map(({ _id, image, fullName, degrees, works_at, experience_years, specialities, fees }) => (
                        <motion.div
                            key={_id}
                            whileHover={{ y: -4 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Link 
                                href={{
                                    pathname: `${currentPath}/${_id}`,
                                    query: { vet: `${fullName.toLowerCase().replace(/\s+/g, '-')}` }
                                }} 
                                className='group relative block bg-white rounded-[2rem] border border-slate-100 hover:border-primary/20 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all overflow-hidden'
                            >
                                <div className='grid md:grid-cols-[1fr_auto] items-center p-6 lg:p-8 gap-6'>
                                    
                                    <div className='flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10'>
                                        
                                        <div className='relative flex-shrink-0 w-24 h-24'>
                                            <div className='absolute inset-0 bg-primary/10 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500' />
                                            <Image 
                                                src={image || "/images/dr-vector.png"} 
                                                alt={fullName} 
                                                width={96} 
                                                height={96} 
                                                className='relative z-10 rounded-full w-24 h-24 object-cover border-4 border-white shadow-sm' 
                                            />
                                            <div className='absolute bottom-0 right-0 z-20 bg-green-500 border-2 border-white w-5 h-5 rounded-full' title='Available' />
                                        </div>

                                        <div className='space-y-3'>
                                            <div>
                                                <h4 className='text-xl font-black text-slate-900 tracking-tight group-hover:text-primary transition-colors flex items-center gap-2'>
                                                    {fullName}
                                                    <Award className='w-4 h-4 text-blue-500' />
                                                </h4>
                                                <p className='text-xs font-black text-slate-400 uppercase tracking-[0.15em] flex items-center gap-2 mt-1'>
                                                    <HiOutlineAcademicCap className='text-sm' /> {degrees[0] || "Licensed Professional"}
                                                </p>
                                            </div>

                                            <div className='flex flex-wrap gap-2'>
                                                {specialities.slice(0, 3).map((s, i) => (
                                                    <span key={i} className='px-3 py-1 bg-slate-50 text-slate-600 text-[10px] font-bold rounded-lg border border-slate-100 group-hover:bg-white transition-colors uppercase tracking-wider'>
                                                        {s}
                                                    </span>
                                                ))}
                                                {specialities.length > 3 && (
                                                    <span className='text-[10px] font-black text-slate-300 ml-1'>+{specialities.length - 3} More</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex flex-col md:flex-row items-center gap-6 md:gap-12 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-12'>
                                        
                                        <div className='flex flex-row md:flex-col gap-8 md:gap-3 w-full md:w-auto'>
                                            <div className='flex-1'>
                                                <p className='text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2'>
                                                    <HiOutlineBriefcase /> Clinic
                                                </p>
                                                <p className='text-sm font-bold text-slate-700 truncate max-w-[120px]'>{works_at || "Independent"}</p>
                                            </div>
                                            <div className='flex-1'>
                                                <p className='text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2'>
                                                    <HiOutlineClock /> Exp.
                                                </p>
                                                <p className='text-sm font-bold text-slate-700'>{experience_years} Years</p>
                                            </div>
                                        </div>

                                        <div className='bg-primary transition-colors duration-300 p-5 rounded-2xl w-full md:w-40 text-center relative overflow-hidden'>
                                            <div className='relative z-10'>
                                                <p className='text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1'>Fee</p>
                                                <h3 className='text-xl font-black text-white'>${fees.toFixed(2)}</h3>
                                                <div className='mt-2 flex items-center justify-center gap-1 text-white/80 group-hover:text-white'>
                                                    <span className='text-[9px] font-black uppercase tracking-tighter'>Book Now</span>
                                                    <ArrowUpRight className='w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform' />
                                                </div>
                                            </div>

                                            <Stethoscope className='absolute -bottom-2 -right-2 w-16 h-16 text-white/10 rotate-12' />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="bg-white border-2 border-dashed border-slate-200 rounded-[3rem] py-20 px-6 text-center">
                    <div className='w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6'>
                        <Stethoscope className="h-10 w-10 text-slate-300" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Finding your partners...</h2>
                    <p className="text-slate-500 max-w-xs mx-auto text-sm font-medium">
                        We're currently verifying the best veterinarians in your area. Please check back shortly!
                    </p>
                </div>
            )}
        </div>
    );
};

export default Vets;