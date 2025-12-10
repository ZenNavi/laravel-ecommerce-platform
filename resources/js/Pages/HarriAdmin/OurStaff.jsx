import { Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

const staffMembers = [
    { id: 1, name: '김철수', email: 'chulsoo@harri.com', role: '최고관리자', phone: '+82 10-1234-5678', status: '활성', image: '/assets/img/users/user-1.jpg' },
    { id: 2, name: '이영희', email: 'younghee@harri.com', role: '매니저', phone: '+82 10-2345-6789', status: '활성', image: '/assets/img/users/user-2.jpg' },
    { id: 3, name: '박민수', email: 'minsoo@harri.com', role: '에디터', phone: '+82 10-3456-7890', status: '활성', image: '/assets/img/users/user-3.jpg' },
    { id: 4, name: '최지은', email: 'jieun@harri.com', role: '지원팀', phone: '+82 10-4567-8901', status: '비활성', image: '/assets/img/users/user-4.jpg' },
    { id: 5, name: '정현우', email: 'hyunwoo@harri.com', role: '에디터', phone: '+82 10-5678-9012', status: '활성', image: '/assets/img/users/user-5.jpg' },
];

export default function OurStaff() {
    return (
        <AdminLayout>
            <div className="px-8 py-8 bg-slate-100">
                <div className="flex justify-between items-center mb-7">
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-800">스태프 관리</h3>
                        <p className="text-gray-500">팀원을 관리하세요</p>
                    </div>
                    <button className="bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition-colors">
                        + 스태프 추가
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-md shadow-sm mb-6">
                    <div className="p-4 flex flex-wrap gap-4 items-center">
                        <input
                            type="text"
                            placeholder="스태프 검색..."
                            className="border border-gray-200 rounded-md px-4 py-2 w-64 focus:outline-none focus:border-blue-500"
                        />
                        <select className="border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500">
                            <option>전체 역할</option>
                            <option>최고관리자</option>
                            <option>매니저</option>
                            <option>에디터</option>
                            <option>지원팀</option>
                        </select>
                        <select className="border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500">
                            <option>전체 상태</option>
                            <option>활성</option>
                            <option>비활성</option>
                        </select>
                    </div>
                </div>

                {/* Staff Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {staffMembers.map((staff) => (
                        <div key={staff.id} className="bg-white rounded-md shadow-sm p-6 text-center">
                            <img
                                src={staff.image}
                                alt={staff.name}
                                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                            />
                            <h4 className="font-semibold text-gray-800 mb-1">{staff.name}</h4>
                            <p className="text-sm text-blue-600 mb-2">{staff.role}</p>
                            <p className="text-sm text-gray-500 mb-1">{staff.email}</p>
                            <p className="text-sm text-gray-500 mb-3">{staff.phone}</p>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                staff.status === '활성' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                            }`}>
                                {staff.status}
                            </span>
                            <div className="flex justify-center gap-2 mt-4">
                                <Link
                                    href={`/harri-admin/our-staff/${staff.id}`}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </Link>
                                <button className="p-2 text-red-600 hover:bg-red-50 rounded-md">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
