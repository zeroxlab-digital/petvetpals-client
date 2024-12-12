"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaCalendar, FaCartShopping, FaHouse, FaPaw, FaPills, FaRegHeart, FaRegMessage, FaUser } from 'react-icons/fa6';

const DashboardSidebar = () => {

    //     Purposes:

    // Dashboard
    // Purpose: Provide an overview of the user's account and activity.
    // Features:

    // Summary of upcoming appointments, recent orders, and messages.
    // Quick actions like booking an appointment or checking pet profiles.
    // Pets Profile
    //     Purpose: Central hub to manage information about the user's pets.
    //     Features:

    //     Add / edit pet details(name, breed, age, medical history).
    // Upload pet photos and vaccination certificates.
    // View vaccination or treatment schedules.
    //         Appointments
    //     Purpose: Manage veterinary appointments.
    //         Features:

    // View past and upcoming appointments.
    //         Book, reschedule, or cancel appointments.
    // Receive notifications / reminders for appointments.
    //         Messages
    // Purpose: Enable communication with vets or support.
    //         Features:

    // Chat with doctors or platform support.
    //         Send / receive files like medical reports or prescriptions.
    // View message history.
    // Orders History
    //     Purpose: Track and manage past purchases.
    //         Features:

    // View details of previous orders.
    // Track current order status.
    // Option to reorder frequently bought items.
    //         Treatments
    //     Purpose: Provide an overview of pet medical treatments and history.
    //         Features:

    // Record of past treatments and prescriptions.
    // Medication reminders.
    // Downloadable medical records for sharing.
    // User Profile
    // Purpose: Manage user account details and preferences.
    //         Features:

    // Update personal details(name, contact info, address).
    // Change password or enable security options(e.g., 2FA).
    // Manage saved payment methods and subscription plans.
    //         Teleconsultations(New Suggestion)
    //     Purpose: Facilitate video consultations with vets.
    //         Features:

    //     Join / host live video calls.
    // View consultation summaries or reports.
    // History of past consultations.
    // Pet Insurance(New Suggestion)
    //     Purpose: Help users manage pet insurance policies.
    //         Features:

    // Purchase and renew pet insurance.
    // Track claims and policy coverage.
    // View insurance benefits and documents.
    // Community Forum(New Suggestion)
    //     Purpose: Create a social space for pet owners to interact.
    //         Features:

    // Post and answer questions about pet care.
    // Share pet stories or photos.
    // Get advice from vets or experienced pet owners.
    //         Wishlist(New Suggestion)
    //     Purpose: Allow users to save items for future purchase.
    //         Features:

    // Add products to a wishlist.
    // Move wishlist items to the cart.
    // Receive alerts when wishlist items are on sale.
    // These links cover a wide range of user needs, enhancing functionality and user experience for the PetVetPals platform.

    const links = [
        { title: "Dashboard", link: "/dashboard", icon: <FaHouse /> },
        { title: "Pets Profile", link: "/dashboard/pets", icon: <FaPaw /> },
        { title: "Appointments", link: "/dashboard/appointments", icon: <FaCalendar /> },
        { title: "Messages", link: "/dashboard/messages", icon: <FaRegMessage /> },
        { title: "Treatments", link: "/dashboard/treatments", icon: <FaPills /> },
        { title: "Wishlist", link: "/dashboard/wishlist", icon: <FaRegHeart /> },
        { title: "Order History", link: "/dashboard/orders", icon: <FaCartShopping /> },
        { title: "User Profile", link: "/dashboard/account", icon: <FaUser /> }
    ];
    const pathname = usePathname();

    return (
        <div className='col-span-2 bg-white p-3 rounded-md '>
            <ul className='flex flex-col gap-1'>
                {links.map((link, index) => <Link href={link.link} key={index}><li className={`${link.link === pathname && 'bg-primary text-white'} hover:bg-[#8a417ad5] hover:text-white duration-150 px-3 py-3 rounded-md flex items-center gap-3`}>
                    <span>{link.icon}</span>{link.title}
                </li></Link>)}
            </ul>
        </div>
    );
};

export default DashboardSidebar;