// SVG Icons (Harri-inspired)

export const CartIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.25 8V5.5C6.25 3.42893 7.92893 1.75 10 1.75C12.0711 1.75 13.75 3.42893 13.75 5.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2.5 8H17.5L16.25 18.5H3.75L2.5 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
);

export const HeartIcon = ({ className = "w-5 h-5", filled = false }) => (
    <svg className={className} viewBox="0 0 20 18" fill={filled ? "currentColor" : "none"} xmlns="http://www.w3.org/2000/svg">
        <path d="M10 17L8.55 15.7C3.4 11.1 0 8.1 0 4.5C0 1.5 2.42 0 5 0C6.74 0 8.41 0.81 10 2.09C11.59 0.81 13.26 0 15 0C17.58 0 20 1.5 20 4.5C20 8.1 16.6 11.1 11.45 15.7L10 17Z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
);

export const EyeIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 1C6 1 1.73 4.11 0 8C1.73 11.89 6 15 11 15C16 15 20.27 11.89 22 8C20.27 4.11 16 1 11 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M11 11C12.6569 11 14 9.65685 14 8C14 6.34315 12.6569 5 11 5C9.34315 5 8 6.34315 8 8C8 9.65685 9.34315 11 11 11Z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
);

export const SearchIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M15 15L19 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);

export const UserIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 10C11.7614 10 14 7.76142 14 5C14 2.23858 11.7614 0 9 0C6.23858 0 4 2.23858 4 5C4 7.76142 6.23858 10 9 10Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M1 20C1 16.134 4.13401 13 8 13H10C13.866 13 17 16.134 17 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);

export const MenuIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

export const CloseIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const ArrowRightIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const StarIcon = ({ className = "w-4 h-4", filled = true }) => (
    <svg className={className} viewBox="0 0 12 12" fill={filled ? "currentColor" : "none"} xmlns="http://www.w3.org/2000/svg">
        <path d="M6 0L7.34708 4.1459H11.7063L8.17963 6.7082L9.52671 10.8541L6 8.2918L2.47329 10.8541L3.82037 6.7082L0.293661 4.1459H4.65292L6 0Z" stroke={filled ? "none" : "currentColor"} strokeWidth="1"/>
    </svg>
);

export const ShippingIcon = ({ className = "w-12 h-12" }) => (
    <svg className={className} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 13H38L45 22V33H41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 33H32V13H5V33Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <circle cx="13" cy="37" r="4" stroke="currentColor" strokeWidth="2"/>
        <circle cx="37" cy="37" r="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M17 37H33" stroke="currentColor" strokeWidth="2"/>
    </svg>
);

export const RefundIcon = ({ className = "w-12 h-12" }) => (
    <svg className={className} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 25C7 14.5066 15.5066 6 26 6C36.4934 6 45 14.5066 45 25C45 35.4934 36.4934 44 26 44C20.3 44 15.2 41.4 12 37.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M7 17V25H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M26 15V25L32 31" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const SupportIcon = ({ className = "w-12 h-12" }) => (
    <svg className={className} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 45C36.0457 45 45 36.0457 45 25C45 13.9543 36.0457 5 25 5C13.9543 5 5 13.9543 5 25C5 36.0457 13.9543 45 25 45Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M25 35C30.5228 35 35 30.5228 35 25C35 19.4772 30.5228 15 25 15C19.4772 15 15 19.4772 15 25C15 30.5228 19.4772 35 25 35Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M10 10L18.5 18.5" stroke="currentColor" strokeWidth="2"/>
        <path d="M40 10L31.5 18.5" stroke="currentColor" strokeWidth="2"/>
        <path d="M40 40L31.5 31.5" stroke="currentColor" strokeWidth="2"/>
        <path d="M10 40L18.5 31.5" stroke="currentColor" strokeWidth="2"/>
    </svg>
);

export const PaymentIcon = ({ className = "w-12 h-12" }) => (
    <svg className={className} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="12" width="40" height="26" rx="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M5 20H45" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 30H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 34H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

export const RewardIcon = ({ className = "w-12 h-12" }) => (
    <svg className={className} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="2"/>
        <path d="M25 12V25L32 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="25" cy="25" r="3" fill="currentColor"/>
    </svg>
);

export const CommunityIcon = ({ className = "w-12 h-12" }) => (
    <svg className={className} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="25" cy="15" r="7" stroke="currentColor" strokeWidth="2"/>
        <circle cx="10" cy="25" r="5" stroke="currentColor" strokeWidth="2"/>
        <circle cx="40" cy="25" r="5" stroke="currentColor" strokeWidth="2"/>
        <path d="M15 38C15 33.5817 19.4772 30 25 30C30.5228 30 35 33.5817 35 38" stroke="currentColor" strokeWidth="2"/>
        <path d="M5 42C5 39.2386 7.23858 37 10 37" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M45 42C45 39.2386 42.7614 37 40 37" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

export const MinusIcon = ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
    </svg>
);

export const PlusIcon = ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
);

export const LinkIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
);
