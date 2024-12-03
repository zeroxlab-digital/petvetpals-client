import './Footer.css';
import Link from 'next/link';
import PetsoliLogo22 from '../../../../public/images/petsoli-22.png'
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className='footer-section bg-primary pt-10 pb-5 hidden'>
            <div className="footer-content container">
                <div className="footer-top flex items-center justify-between pb-7 mb-7 ">
                    <Link href="/"><Image src={PetsoliLogo22} alt="logo" width={200} height={200} /> </Link>
                    <div className="socials">
                        <ul className='flex items-center gap-4'>
                            <li className='border border-gray-400 hover:border-gray-200 duration-150  inline-block rounded-full'><Link href="" target='_blank'><img src="https://crypto.com/__assets/mkt-nav-footer/images/icons/socials/twitter.svg" alt="" /></Link></li>
                            <li className='border border-gray-400 hover:border-gray-200 duration-150  inline-block rounded-full'><Link href="" target='_blank'><img src="https://crypto.com/__assets/mkt-nav-footer/images/icons/socials/facebook.svg" alt="" /></Link></li>
                            <li className='border border-gray-400 hover:border-gray-200 duration-150  inline-block rounded-full'><Link href="" target='_blank'><img src="https://crypto.com/__assets/mkt-nav-footer/images/icons/socials/instagram.svg" alt="" /></Link></li>
                            <li className='border border-gray-400 hover:border-gray-200 duration-150  inline-block rounded-full'><Link href="" target='_blank'><img src="https://crypto.com/__assets/mkt-nav-footer/images/icons/socials/discord.svg" alt="" /></Link></li>
                            <li className='border border-gray-400 hover:border-gray-200 duration-150  inline-block rounded-full'><Link href="" target='_blank'><img src="https://crypto.com/__assets/mkt-nav-footer/images/icons/socials/telegram.svg" alt="" /></Link></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-main ">
                    <ul className='flex flex-col gap-1 '>
                        <h2 className='text-zinc-200 font-bold text-xl mb-3'>What we do</h2>
                        <li className='text-zinc-300 inline-block hover:tracking-wider hover:underline duration-200'><Link href="">Trade Alert Subscription</Link></li>
                        <li className='text-zinc-300 inline-block hover:tracking-wider hover:underline duration-200'><Link href="">AI Trade Alerts</Link></li>
                        <li className='text-zinc-300 inline-block hover:tracking-wider hover:underline duration-200'><Link href="">0x0 Staking</Link></li>
                        <li className='text-zinc-300 inline-block hover:tracking-wider hover:underline duration-200'><Link href="">High Flyers NFTs</Link></li>
                    </ul>
                    <ul className='flex flex-col gap-1'>
                        <h2 className='text-zinc-200 font-bold text-xl mb-3'>Who do we support</h2>
                        <li className='text-zinc-300 inline-block hover:tracking-wider hover:underline duration-200'><Link href="">0x0 Blockchain</Link></li>
                        <li className='text-zinc-300 inline-block hover:tracking-wider hover:underline duration-200'><Link href="">0x0 Wallet</Link></li>
                        <li className='text-zinc-300 inline-block hover:tracking-wider hover:underline duration-200'><Link href="">0x0 NFTs</Link></li>
                        <li className='text-zinc-300 inline-block hover:tracking-wider hover:underline duration-200'><Link href="">High Flyers NFTs</Link></li>
                    </ul>
                    <ul className='flex flex-col gap-1 '>
                        <h2 className='text-zinc-200 font-bold text-xl mb-3'>Quick Links</h2>
                        <li className='text-zinc-300 inline-block hover:tracking-wider hover:underline duration-200'><Link href="">Discovery</Link></li>
                        <li className='text-zinc-300 inline-block hover:tracking-wider hover:underline duration-200'><Link href="">Supports</Link></li>
                        <li className='text-zinc-300 inline-block hover:tracking-wider hover:underline duration-200'><Link href="">View White Paper</Link></li>
                        <li className='text-zinc-300 inline-block hover:tracking-wider hover:underline duration-200'><Link href="">View Token Contract</Link></li>
                    </ul>
                    <ul className='flex flex-col gap-1 '>
                        <h2 className='text-zinc-200 font-bold text-xl mb-3'>About Us</h2>
                        <li className='text-zinc-300 inline-block hover:tracking-wider hover:underline duration-200'><Link href="">Our Team Goals</Link></li>
                        <li className='text-zinc-300 inline-block hover:tracking-wider hover:underline duration-200'><Link href="">What we have done</Link></li>
                        <li className='text-zinc-300 inline-block hover:tracking-wider hover:underline duration-200'><Link href="">Careers</Link></li>
                        <li className='text-zinc-300 inline-block hover:tracking-wider hover:underline duration-200'><Link href="">Partnership</Link></li>
                    </ul>
                    <ul className='flex flex-col gap-1 '>
                        <h2 className='text-zinc-200 font-bold text-xl mb-3'>News Letter</h2>
                        <p className='text-zinc-200 mb-3 font-semibold '>Subscribe to our news letter</p>
                        <div className="newsletter">
                            <form action="">
                                <input type="email" placeholder='Your email address' className='subs-input' required />
                                <button type="submit">Subscribe</button>
                            </form>
                        </div>
                    </ul>

                </div>

                <div className="footer-bottom text-gray-100 flex items-center justify-between pt-7 mt-10 border-t border-gray-400 border-opacity-20">
                    <p className='text-gray text-sm'>Copyright &copy; 2024 PetVetPals All rights reserved.</p>
                    <div className="items flex items-center gap-5 text-gray">
                        <Link href="" className='text-sm hover:text-light duration-100'>Privacy Notice</Link>
                        <Link href="" className='text-sm hover:text-light duration-100'>Status</Link>
                        <Link href="" className='text-sm hover:text-light duration-100'>Cookie Preference</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;