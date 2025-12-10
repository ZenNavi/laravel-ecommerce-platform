import { useState, useRef, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    Dashboard,
    Products,
    Categories,
    Orders,
    Coupons,
    Profile,
    Setting,
    Pages,
    Leaf,
    StuffUser,
    DownArrow,
    Menu,
    Search,
    Notification,
} from '@/Components/Admin/Icons';

// Sidebar menu data
const sidebarMenus = [
    { id: 1, icon: Dashboard, link: '/harri-admin/dashboard', title: '대시보드' },
    {
        id: 2,
        icon: Products,
        link: '/harri-admin/product-list',
        title: '상품 관리',
        subMenus: [
            { title: '상품 목록', link: '/harri-admin/product-list' },
            { title: '상품 그리드', link: '/harri-admin/product-grid' },
            { title: '상품 추가', link: '/harri-admin/add-product' },
        ],
    },
    { id: 3, icon: Categories, link: '/harri-admin/category', title: '카테고리' },
    { id: 4, icon: Orders, link: '/harri-admin/orders', title: '주문 관리' },
    { id: 5, icon: Leaf, link: '/harri-admin/brands', title: '브랜드' },
    { id: 6, icon: Coupons, link: '/harri-admin/coupon', title: '쿠폰' },
    { id: 7, icon: Profile, link: '/harri-admin/profile', title: '프로필' },
    { id: 8, icon: Setting, link: '/harri', title: '온라인 스토어', external: true },
    { id: 9, icon: StuffUser, link: '/harri-admin/our-staff', title: '스태프 관리' },
    {
        id: 10,
        icon: Pages,
        link: '/harri-admin/dashboard',
        title: '페이지',
        subMenus: [
            { title: '회원가입', link: '/harri-admin/register' },
            { title: '로그인', link: '/harri-admin/login' },
            { title: '비밀번호 찾기', link: '/harri-admin/forgot-password' },
        ],
    },
];

// Sidebar Component
function Sidebar({ sideMenu, setSideMenu }) {
    const [isDropdown, setIsDropdown] = useState('');
    const { url } = usePage();

    const handleMenuActive = (title) => {
        setIsDropdown(isDropdown === title ? '' : title);
    };

    const handleLogOut = () => {
        // TODO: Implement logout
        window.location.href = '/harri-admin/login';
    };

    return (
        <>
            <aside
                className={`w-[300px] lg:w-[250px] xl:w-[300px] border-r border-gray-200 overflow-y-auto sidebar-scrollbar fixed left-0 top-0 h-full bg-white z-50 transition-transform duration-300 ${
                    sideMenu ? 'translate-x-0' : '-translate-x-[300px] lg:translate-x-0'
                }`}
            >
                <div className="flex flex-col justify-between h-full">
                    <div>
                        <div className="py-4 pb-8 px-8 border-b border-gray-200 h-[78px]">
                            <Link href="/harri-admin/dashboard">
                                <img
                                    className="w-[140px]"
                                    src="/assets/img/logo/logo.svg"
                                    alt="logo"
                                />
                            </Link>
                        </div>
                        <div className="px-4 py-5">
                            <ul>
                                {sidebarMenus.map((menu) => (
                                    <li key={menu.id}>
                                        {!menu.subMenus && menu.title !== 'Online store' && (
                                            <Link
                                                href={menu.link}
                                                onClick={() => handleMenuActive(menu.title)}
                                                className={`group rounded-md relative text-black text-lg font-medium inline-flex items-center w-full transition-colors ease-in-out duration-300 px-5 py-[9px] mb-2 hover:bg-gray-100 ${
                                                    url.startsWith(menu.link) ? 'bg-blue-50 text-blue-600' : ''
                                                }`}
                                            >
                                                <span className="inline-block mr-[10px] text-xl">
                                                    <menu.icon />
                                                </span>
                                                {menu.title}
                                            </Link>
                                        )}
                                        {menu.subMenus && (
                                            <a
                                                onClick={() => handleMenuActive(menu.title)}
                                                className={`group cursor-pointer rounded-md relative text-black text-lg font-medium inline-flex items-center w-full transition-colors ease-in-out duration-300 px-5 py-[9px] mb-2 hover:bg-gray-100 ${
                                                    isDropdown === menu.title ? 'bg-blue-50 text-blue-600' : ''
                                                }`}
                                            >
                                                <span className="inline-block mr-[10px] text-xl">
                                                    <menu.icon />
                                                </span>
                                                {menu.title}
                                                <span
                                                    className={`absolute right-4 top-[52%] transition-transform duration-300 origin-center w-4 h-4 ${
                                                        isDropdown === menu.title ? 'rotate-90' : ''
                                                    }`}
                                                >
                                                    <DownArrow />
                                                </span>
                                            </a>
                                        )}
                                        {menu.title === 'Online store' && (
                                            <a
                                                href={menu.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group cursor-pointer rounded-md relative text-black text-lg font-medium inline-flex items-center w-full transition-colors ease-in-out duration-300 px-5 py-[9px] mb-2 hover:bg-gray-100"
                                            >
                                                <span className="inline-block mr-[10px] text-xl">
                                                    <menu.icon />
                                                </span>
                                                {menu.title}
                                            </a>
                                        )}
                                        {menu.subMenus && (
                                            <ul
                                                className={`pl-[42px] pr-[20px] pb-3 ${
                                                    isDropdown === menu.title ? 'block' : 'hidden'
                                                }`}
                                            >
                                                {menu.subMenus.map((sub, i) => (
                                                    <li key={i}>
                                                        <Link
                                                            href={sub.link}
                                                            className="block font-normal w-full text-gray-500 hover:text-blue-600 py-1"
                                                        >
                                                            {sub.title}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="text-center mb-6">
                        <button
                            onClick={handleLogOut}
                            className="bg-blue-600 text-white px-7 py-2 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            로그아웃
                        </button>
                    </div>
                </div>
            </aside>

            <div
                onClick={() => setSideMenu(false)}
                className={`fixed top-0 left-0 w-full h-full z-40 bg-black/70 transition-all duration-300 ${
                    sideMenu ? 'visible opacity-100' : 'invisible opacity-0'
                }`}
            />
        </>
    );
}

// Header Component
function Header({ setSideMenu }) {
    const [profileOpen, setProfileOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const pRef = useRef(null);
    const nRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (pRef.current && !pRef.current.contains(e.target)) {
                setProfileOpen(false);
            }
            if (nRef.current && !nRef.current.contains(e.target)) {
                setNotificationOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleNotificationOpen = () => {
        setNotificationOpen(!notificationOpen);
        setProfileOpen(false);
    };

    const handleProfileOpen = () => {
        setProfileOpen(!profileOpen);
        setNotificationOpen(false);
    };

    const handleLogOut = () => {
        window.location.href = '/harri-admin/login';
    };

    return (
        <header className="relative z-10 bg-white border-b border-gray-200 py-5 px-8">
            <div className="flex justify-between">
                <div className="flex items-center space-x-6 lg:space-x-0">
                    <button
                        onClick={() => setSideMenu((prev) => !prev)}
                        type="button"
                        className="block lg:hidden text-2xl text-black"
                    >
                        <Menu />
                    </button>
                    <div className="w-[30%] hidden md:block">
                        <form action="#">
                            <div className="w-[250px] relative">
                                <input
                                    className="h-12 w-full pr-[45px] border border-gray-200 rounded-md px-4 focus:outline-none focus:border-blue-500"
                                    type="text"
                                    placeholder="검색어를 입력하세요..."
                                />
                                <button className="absolute top-1/2 right-6 -translate-y-1/2 hover:text-blue-600">
                                    <Search />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="flex items-center justify-end space-x-6">
                    <div className="md:hidden">
                        <button className="relative w-[40px] h-[40px] leading-[40px] rounded-md text-gray-600 border border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100">
                            <Search />
                        </button>
                    </div>
                    <div ref={nRef} className="relative">
                        <button
                            onClick={handleNotificationOpen}
                            className="relative w-[40px] h-[40px] leading-[40px] rounded-md text-gray-600 border border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 flex items-center justify-center"
                        >
                            <Notification />
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                3
                            </span>
                        </button>
                        {notificationOpen && (
                            <div className="absolute w-[280px] top-full right-0 mt-2 shadow-lg rounded-md bg-white py-3">
                                <div className="px-4 pb-2 border-b border-gray-100">
                                    <h5 className="font-semibold">알림</h5>
                                </div>
                                <ul className="max-h-[300px] overflow-y-auto">
                                    <li className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                                        <p className="text-sm text-gray-600">새 주문 #1234 접수</p>
                                        <span className="text-xs text-gray-400">2분 전</span>
                                    </li>
                                    <li className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                                        <p className="text-sm text-gray-600">재고 부족: iPhone 15</p>
                                        <span className="text-xs text-gray-400">1시간 전</span>
                                    </li>
                                    <li className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                                        <p className="text-sm text-gray-600">신규 회원 가입</p>
                                        <span className="text-xs text-gray-400">3시간 전</span>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <div ref={pRef} className="relative flex justify-end items-center">
                        <button onClick={handleProfileOpen} className="relative" type="button">
                            <img
                                className="w-[40px] h-[40px] rounded-md object-cover"
                                src="/assets/img/users/user-10.jpg"
                                alt="user"
                            />
                            <span className="w-3 h-3 bg-green-500 rounded-full absolute -top-1 -right-1 border-2 border-white" />
                        </button>

                        {profileOpen && (
                            <div className="absolute w-[280px] top-full right-0 mt-2 shadow-lg rounded-md bg-white py-5 px-5">
                                <div className="flex items-center space-x-3 border-b border-gray-200 pb-3 mb-2">
                                    <img
                                        className="w-[50px] h-[50px] rounded-md object-cover"
                                        src="/assets/img/users/user-10.jpg"
                                        alt="user"
                                    />
                                    <div>
                                        <h5 className="text-base mb-1 leading-none font-medium">관리자</h5>
                                        <p className="mb-0 text-sm text-gray-500 leading-none">admin@harri.com</p>
                                    </div>
                                </div>
                                <ul>
                                    <li>
                                        <Link
                                            href="/harri-admin/dashboard"
                                            className="px-5 py-2 w-full block hover:bg-gray-100 rounded-md hover:text-blue-600 text-base"
                                        >
                                            대시보드
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/harri-admin/profile"
                                            className="px-5 py-2 w-full block hover:bg-gray-100 rounded-md hover:text-blue-600 text-base"
                                        >
                                            계정 설정
                                        </Link>
                                    </li>
                                    <li>
                                        <a
                                            onClick={handleLogOut}
                                            className="px-5 py-2 w-full block hover:bg-gray-100 rounded-md hover:text-blue-600 text-base cursor-pointer"
                                        >
                                            로그아웃
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

// Main Admin Layout
export default function AdminLayout({ children }) {
    const [sideMenu, setSideMenu] = useState(false);

    return (
        <div className="bg-slate-100 min-h-screen">
            <Sidebar sideMenu={sideMenu} setSideMenu={setSideMenu} />
            <div className="lg:ml-[250px] xl:ml-[300px]">
                <Header setSideMenu={setSideMenu} />
                {children}
            </div>
        </div>
    );
}
