import { Link } from '@inertiajs/react';
import HarriLayout from '@/Layouts/HarriLayout';
import { ShippingIcon, SupportIcon, PaymentIcon, CommunityIcon } from '@/Components/Icons';

const values = [
    { icon: ShippingIcon, title: '빠른 배송', description: '전국 어디든 2~3일 내 배송' },
    { icon: SupportIcon, title: '고객 지원', description: '24시간 친절한 고객 상담' },
    { icon: PaymentIcon, title: '안전 결제', description: '검증된 결제 시스템' },
    { icon: CommunityIcon, title: '커뮤니티', description: '함께 성장하는 쇼핑 문화' },
];

const team = [
    { name: '김대표', role: 'CEO', description: '15년 패션 업계 경력' },
    { name: '이디자이너', role: 'Creative Director', description: '글로벌 브랜드 경험' },
    { name: '박매니저', role: 'Operations Manager', description: '물류 시스템 전문가' },
    { name: '최마케터', role: 'Marketing Lead', description: '디지털 마케팅 전략가' },
];

export default function About() {
    return (
        <HarriLayout>
            {/* Breadcrumb */}
            <div className="bg-[#F6F6F6] py-6">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 text-sm">
                        <Link href="/harri" className="text-[#55585B] hover:text-[#F50963]">홈</Link>
                        <span className="text-[#55585B]">/</span>
                        <span className="text-[#010F1C] font-medium">회사 소개</span>
                    </div>
                </div>
            </div>

            {/* Hero */}
            <section className="bg-[#010F1C] py-20">
                <div className="container mx-auto px-4 text-center">
                    <span className="text-[#F50963] text-sm font-medium tracking-wider">ABOUT US</span>
                    <h1 className="text-3xl lg:text-5xl font-bold text-white mt-4 mb-6">
                        당신의 스타일을 완성하는<br />파트너, HARRI
                    </h1>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        2020년 설립 이래 고객 만족을 최우선으로<br />
                        최고의 패션 쇼핑 경험을 제공하고 있습니다.
                    </p>
                </div>
            </section>

            {/* Story */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-[#F50963] text-sm font-medium tracking-wider">OUR STORY</span>
                            <h2 className="text-3xl font-bold text-[#010F1C] mt-2 mb-6">우리의 이야기</h2>
                            <p className="text-[#55585B] leading-relaxed mb-4">
                                HARRI는 "모든 사람이 자신만의 스타일을 찾을 수 있어야 한다"는 믿음에서 시작되었습니다.
                                우리는 단순히 옷을 판매하는 것이 아니라, 고객들이 자신감을 갖고 일상을 즐길 수 있도록
                                돕는 것을 목표로 합니다.
                            </p>
                            <p className="text-[#55585B] leading-relaxed mb-4">
                                최고 품질의 제품을 합리적인 가격에 제공하며, 지속 가능한 패션을 추구합니다.
                                환경을 생각하는 소재 선택부터 윤리적인 생산 과정까지, 우리는 더 나은 미래를 위해
                                노력하고 있습니다.
                            </p>
                            <p className="text-[#55585B] leading-relaxed">
                                현재 10만 명 이상의 고객이 HARRI와 함께하고 있으며, 매일 더 많은 분들이
                                우리의 커뮤니티에 합류하고 있습니다.
                            </p>
                        </div>
                        <div className="aspect-square bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400">이미지</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 bg-[#F6F6F6]">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-[#F50963] text-sm font-medium tracking-wider">OUR VALUES</span>
                        <h2 className="text-3xl font-bold text-[#010F1C] mt-2">우리의 가치</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 text-[#F50963]">
                                    <value.icon className="w-12 h-12" />
                                </div>
                                <h3 className="font-semibold text-[#010F1C] mb-2">{value.title}</h3>
                                <p className="text-sm text-[#55585B]">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <p className="text-4xl font-bold text-[#F50963] mb-2">100K+</p>
                            <p className="text-[#55585B]">행복한 고객</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-[#F50963] mb-2">50K+</p>
                            <p className="text-[#55585B]">제품 판매</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-[#F50963] mb-2">4.9</p>
                            <p className="text-[#55585B]">평균 평점</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-[#F50963] mb-2">24/7</p>
                            <p className="text-[#55585B]">고객 지원</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20 bg-[#F6F6F6]">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-[#F50963] text-sm font-medium tracking-wider">OUR TEAM</span>
                        <h2 className="text-3xl font-bold text-[#010F1C] mt-2">팀 소개</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <div key={index} className="text-center">
                                <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                                    <span className="text-gray-400 text-sm">사진</span>
                                </div>
                                <h3 className="font-semibold text-[#010F1C]">{member.name}</h3>
                                <p className="text-sm text-[#F50963] mb-1">{member.role}</p>
                                <p className="text-xs text-[#55585B]">{member.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-[#010F1C]">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">함께 시작해요</h2>
                    <p className="text-white/60 mb-8 max-w-xl mx-auto">
                        지금 가입하고 특별한 혜택을 받아보세요.<br />
                        HARRI 커뮤니티의 일원이 되어주세요.
                    </p>
                    <Link
                        href="/harri/register"
                        className="inline-block bg-[#F50963] text-white px-8 py-4 font-medium hover:bg-white hover:text-[#010F1C] transition-colors"
                    >
                        회원가입하기
                    </Link>
                </div>
            </section>
        </HarriLayout>
    );
}
