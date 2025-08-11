"use client"
import { useGetPetsQuery } from "@/redux/services/petApi"
import { useGetUserDetailsQuery } from "@/redux/services/userApi"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
    FaCartShopping,
    FaHeart,
    FaMessage,
    FaUser,
    FaPaw,
    FaCalendarCheck,
    FaStethoscope,
    FaNewspaper,
    FaPhone,
    FaBell,
    FaGear,
    FaCircleQuestion,
    FaChevronRight,
} from "react-icons/fa6"

const MobileUserOptions = () => {
    const pathname = usePathname()

    // Mock user data - replace with actual user data
    // const user = {
    //     name: "Sarah Johnson",
    //     email: "sarah@example.com",
    //     avatar: "/placeholder.svg?height=60&width=60",
    //     petCount: 2,
    //     unreadMessages: 3,
    //     wishlistCount: 12,
    //     pendingOrders: 1,
    // }

    const { data: { user } = {} , isLoading } = useGetUserDetailsQuery();
    const { data: pets = {} } = useGetPetsQuery()
    console.log(pets);
    const navigationSections = [
        {
            title: "Communication",
            links: [
                {
                    title: "Messages",
                    link: "/dashboard/messages",
                    icon: <FaMessage />,
                    badge: user.unreadMessages,
                    description: "Chat with vets and trainers",
                },
                {
                    title: "Notifications",
                    link: "/dashboard/notifications",
                    icon: <FaBell />,
                    description: "Important updates and alerts",
                },
            ],
        },
        {
            title: "My Pets",
            links: [
                {
                    title: "Pet Profiles",
                    link: "/dashboard/pets",
                    icon: <FaPaw />,
                    description: `Manage your ${user.petCount} pets`,
                },
                {
                    title: "Health Records",
                    link: "/dashboard/health",
                    icon: <FaStethoscope />,
                    description: "Medical history and records",
                },
                {
                    title: "Appointments",
                    link: "/dashboard/appointments",
                    icon: <FaCalendarCheck />,
                    description: "Vet visits and checkups",
                },
            ],
        },
        {
            title: "Shopping & Services",
            links: [
                {
                    title: "Wishlist",
                    link: "/dashboard/wishlist",
                    icon: <FaHeart />,
                    badge: user.wishlistCount,
                    description: "Saved items and favorites",
                },
                {
                    title: "Order History",
                    link: "/dashboard/orders",
                    icon: <FaCartShopping />,
                    badge: user.pendingOrders,
                    description: "Track your purchases",
                },
            ],
        },
        // {
        //     title: "Resources",
        //     links: [
        //         {
        //             title: "Pet Care Tips",
        //             link: "/dashboard/articles",
        //             icon: <FaNewspaper />,
        //             description: "Expert advice and guides",
        //         },
        //         {
        //             title: "Emergency Contacts",
        //             link: "/dashboard/emergency",
        //             icon: <FaPhone />,
        //             description: "24/7 vet emergency numbers",
        //         },
        //     ],
        // },
        {
            title: "Account",
            links: [
                {
                    title: "Profile Settings",
                    link: "/dashboard/account",
                    icon: <FaUser />,
                    description: "Personal information",
                },
                {
                    title: "App Settings",
                    link: "/dashboard/settings",
                    icon: <FaGear />,
                    description: "Preferences and privacy",
                },
                {
                    title: "Help & Support",
                    link: "/dashboard/support",
                    icon: <FaCircleQuestion />,
                    description: "Get help and contact us",
                },
            ],
        },
    ]

    return (
        <>
            {/* User Profile Header */}
            <div className="bg-[#672e5b] p-6 rounded-lg text-white">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Image
                            src={user.image || "/images/user-man.png"}
                            alt="Profile"
                            width={50}
                            height={50}
                            className="w-16 h-16 object-cover rounded-full border-3 border-white shadow-lg"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-green-400 w-5 h-5 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-bold">{user.fullName}</h2>
                        <p className="text-gray-200 text-sm">{user.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <FaPaw className="text-blue-200 text-sm" />
                            <span className="text-sm text-gray-200">{pets?.pets?.length || 0} pets</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Sections */}
            <div className="mt-6 flex flex-col gap-4">
                {navigationSections.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 px-2">{section.title}</h3>
                        <div className="flex flex-col gap-2">
                            {section.links.map((link, linkIndex) => (
                                <Link href={link.link} key={linkIndex}>
                                    <div
                                        className={`
                                                ${link.link === pathname
                                                ? "bg-blue-50 border-blue-200 text-blue-700"
                                                : "bg-white hover:bg-gray-50 border-gray-200 text-gray-700"
                                            } 
                                                border rounded-xl px-4 py-3 transition-all duration-200 hover:shadow-md group`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={`
                          ${link.link === pathname ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"}
                          text-xl transition-colors duration-200
                        `}
                                                >
                                                    {link.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-1">
                                                        <span className="font-medium">{link.title}</span>
                                                        {link.badge && (
                                                            <span className="bg-red-500 text-white text-xs rounded-full h-[22px] w-[22px] flex items-center justify-center">
                                                                {link.badge}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {link.description && <p className="text-sm text-gray-500 mt-1">{link.description}</p>}
                                                </div>
                                            </div>
                                            <FaChevronRight
                                                className={`
                        ${link.link === pathname ? "text-blue-400" : "text-gray-300"}
                        text-sm transition-transform duration-200 group-hover:translate-x-1
                      `}
                                            />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default MobileUserOptions
