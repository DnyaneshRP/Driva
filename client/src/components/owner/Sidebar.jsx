import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/data'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/react'

const Sidebar = () => {
    const navigate = useNavigate()
    const [isOwner, setIsOwner] = useState(true)
    const { user } = useUser()

    const navItems = [
        {
            path: "/owner",
            label: "Dashboard",
            icon: assets.dashboard
        },
        {
            path: "/owner/add-car",
            label: "Add Car",
            icon: assets.carPlus
        },
        {
            path: "/owner/list-car",
            label: "List Car",
            icon: assets.list
        }

    ]

    useEffect(() => {
        if (!isOwner) {
            navigate('/')
        }
    }, [isOwner])

    return (
        <div className='bg-primary'>
            <div className='mx-auto max-w-475 flex flex-col md:flex-row'>
                {/* Sidebar */}
                <div className='max-md:flexCenter flex flex-col justify-between bg-white sm:m-3 md:min-w-[20%] md:min-h-[97vh] rounded-xl shadow'>
                    <div className='flex flex-col gap-y-6 max-md:items-center md:flex-col md:pt-5'>
                        {/* Logo and Profile */}
                        <div className='w-full flex justify-between md:flex-col'>
                            <div className='flex flex-1 p-3 lg:pl-8'>
                                <Link to={"/"}>
                                    <img
                                        src={assets.logoImg}
                                        alt="logoImg"
                                        className='h-9' />
                                    <span className='text-textColor uppercase text-xs font-extrabold tracking-[6px] relative bottom-1'>Driva</span>
                                </Link>
                            </div>
                            <div className='md:hidden flex items-center gap-3 md:bg-primary rounded-b-xl p-2 pl-5 lg:pl-10 md:mt-10'>
                                <UserButton
                                    appearance={{
                                        elements: {
                                            userButtonAvatarBox: {
                                                width: "42px",
                                                height: "42px",
                                            },
                                        },
                                    }}
                                />
                                <div className='text-sm font-semibold text-gray-800 capitalize'>
                                    {user?.firstName} {user?.lastName}
                                </div>
                            </div>
                        </div>
                        <div className='flex md:flex-col md:gap-x-5 gap-y-8 md:mt-4'>
                            {/* NavLinks */}
                            {navItems.map((link) => (
                                <NavLink
                                    key={link.label}
                                    to={link.path}
                                    end={link.path === "/owner"}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flexStart gap-x-2 p-5 lg:pl-12 text-sm font-bold sm:text-sm! cursor-pointer h-10 bg-primaryOne max-md:border-b-4 md:border-r-4 border-solid"
                                            : "flexStart gap-x-2 lg:pl-12 p-5 text-sm font-bold sm:text-sm! cursor-pointer h-10 rounded-xl"
                                    }
                                >
                                    <img src={link.icon} alt={link.label} className='hidden md:block' width={18} />
                                    <div>
                                        {link.label}
                                    </div>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                    <div className='hidden md:flex items-center gap-3 md:bg-primary rounded-b-xl p-2 pl-5 lg:pl-10 md:mt-10'>
                        <UserButton
                            appearance={{
                                elements: {
                                    userButtonAvatarBox: {
                                        width: "42px",
                                        height: "42px",
                                    },
                                },
                            }}
                        />
                        <div className='text-sm font-semibold text-gray-800 capitalize'>
                            {user?.firstName} {user?.lastName}
                        </div>
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default Sidebar