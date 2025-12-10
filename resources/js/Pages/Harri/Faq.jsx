import { useState } from 'react';
import { Link } from '@inertiajs/react';
import HarriLayout from '@/Layouts/HarriLayout';

const faqCategories = [
    { id: 'all', name: '전체' },
    { id: 'order', name: '주문/결제' },
    { id: 'shipping', name: '배송' },
    { id: 'return', name: '교환/환불' },
    { id: 'account', name: '회원/계정' },
    { id: 'product', name: '상품' },
];

const faqs = [
    {
        id: 1,
        category: 'order',
        question: '주문은 어떻게 하나요?',
        answer: '원하시는 상품을 장바구니에 담은 후 결제 페이지에서 배송지 정보와 결제 수단을 선택하시면 됩니다. 비회원으로도 주문이 가능하지만, 회원가입 후 주문하시면 적립금 혜택과 주문 조회가 더 편리합니다.',
    },
    {
        id: 2,
        category: 'order',
        question: '결제 수단은 어떤 것이 있나요?',
        answer: '신용카드, 체크카드, 무통장입금, 카카오페이, 네이버페이, 토스페이 등 다양한 결제 수단을 지원합니다. 무통장입금의 경우 주문 후 24시간 이내에 입금해 주셔야 합니다.',
    },
    {
        id: 3,
        category: 'order',
        question: '주문 취소는 어떻게 하나요?',
        answer: '마이페이지 > 주문내역에서 주문 취소가 가능합니다. 단, 상품 준비 단계 이후에는 취소가 불가하며, 배송 후에는 반품 절차를 통해 환불 가능합니다.',
    },
    {
        id: 4,
        category: 'shipping',
        question: '배송비는 얼마인가요?',
        answer: '50,000원 이상 구매 시 무료배송이며, 그 미만은 3,000원의 배송비가 부과됩니다. 제주/도서산간 지역은 추가 배송비가 발생할 수 있습니다.',
    },
    {
        id: 5,
        category: 'shipping',
        question: '배송은 얼마나 걸리나요?',
        answer: '주문 후 1-2일 이내 출고되며, 출고 후 1-2일 이내 도착합니다 (주말/공휴일 제외). 제주/도서산간 지역은 2-3일 추가 소요될 수 있습니다.',
    },
    {
        id: 6,
        category: 'shipping',
        question: '배송 조회는 어떻게 하나요?',
        answer: '마이페이지 > 주문내역에서 운송장 번호를 확인하실 수 있습니다. 운송장 번호 클릭 시 택배사 배송 조회 페이지로 이동합니다.',
    },
    {
        id: 7,
        category: 'return',
        question: '교환/반품은 어떻게 하나요?',
        answer: '마이페이지 > 주문내역에서 교환/반품 신청이 가능합니다. 상품 수령 후 7일 이내에 신청해 주세요. 단순 변심의 경우 왕복 배송비가 부과됩니다.',
    },
    {
        id: 8,
        category: 'return',
        question: '환불은 언제 되나요?',
        answer: '반품 상품 도착 후 검수 완료 시 1-3 영업일 이내에 환불됩니다. 카드 결제의 경우 카드사에 따라 3-7일 추가 소요될 수 있습니다.',
    },
    {
        id: 9,
        category: 'return',
        question: '교환/반품이 불가능한 경우가 있나요?',
        answer: '착용 흔적이 있거나, 상품 태그를 제거한 경우, 세탁을 한 경우, 고객 과실로 상품이 훼손된 경우에는 교환/반품이 불가합니다.',
    },
    {
        id: 10,
        category: 'account',
        question: '회원 등급은 어떻게 되나요?',
        answer: '구매 금액에 따라 일반, 실버, 골드, VIP 등급이 부여되며, 등급별로 적립율과 쿠폰 혜택이 다릅니다. 등급은 매월 1일 갱신됩니다.',
    },
    {
        id: 11,
        category: 'account',
        question: '비밀번호를 잊어버렸어요.',
        answer: '로그인 페이지에서 "비밀번호 찾기"를 클릭하신 후, 가입하신 이메일 주소로 비밀번호 재설정 링크를 받으실 수 있습니다.',
    },
    {
        id: 12,
        category: 'product',
        question: '사이즈 선택에 도움이 필요해요.',
        answer: '각 상품 페이지에 상세 사이즈표가 안내되어 있습니다. 평소 착용하시는 사이즈와 비교해 보시고, 추가 문의가 필요하시면 고객센터로 연락해 주세요.',
    },
];

export default function Faq() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [openItems, setOpenItems] = useState([]);

    const filteredFaqs = selectedCategory === 'all'
        ? faqs
        : faqs.filter(faq => faq.category === selectedCategory);

    const toggleItem = (id) => {
        setOpenItems(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    return (
        <HarriLayout>
            {/* Breadcrumb */}
            <div className="bg-[#F6F6F6] py-6">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 text-sm">
                        <Link href="/harri" className="text-[#55585B] hover:text-[#F50963]">홈</Link>
                        <span className="text-[#55585B]">/</span>
                        <span className="text-[#010F1C] font-medium">자주 묻는 질문</span>
                    </div>
                </div>
            </div>

            {/* Hero */}
            <section className="py-16 bg-[#F6F6F6]">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl lg:text-4xl font-bold text-[#010F1C] mb-4">자주 묻는 질문</h1>
                    <p className="text-[#55585B]">
                        궁금한 점이 있으신가요? 아래에서 답변을 찾아보세요.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16">
                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {faqCategories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`px-6 py-3 text-sm font-medium transition-colors ${
                                selectedCategory === category.id
                                    ? 'bg-[#F50963] text-white'
                                    : 'bg-[#F6F6F6] text-[#55585B] hover:bg-[#EAEAEF]'
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* FAQ List */}
                <div className="max-w-3xl mx-auto space-y-4">
                    {filteredFaqs.map((faq) => (
                        <div key={faq.id} className="border border-[#EAEAEF]">
                            <button
                                onClick={() => toggleItem(faq.id)}
                                className="w-full flex items-center justify-between p-5 text-left hover:bg-[#F6F6F6] transition-colors"
                            >
                                <span className="font-medium text-[#010F1C] pr-4">{faq.question}</span>
                                <svg
                                    className={`w-5 h-5 flex-shrink-0 text-[#55585B] transition-transform ${
                                        openItems.includes(faq.id) ? 'rotate-180' : ''
                                    }`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {openItems.includes(faq.id) && (
                                <div className="px-5 pb-5 pt-0">
                                    <p className="text-[#55585B] leading-relaxed">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="max-w-3xl mx-auto mt-16 text-center p-10 bg-[#F6F6F6]">
                    <h2 className="text-xl font-bold text-[#010F1C] mb-2">원하시는 답변을 찾지 못하셨나요?</h2>
                    <p className="text-[#55585B] mb-6">고객센터로 문의해 주시면 친절하게 안내해 드리겠습니다.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            href="/harri/contact"
                            className="inline-block px-8 py-3 bg-[#F50963] text-white font-medium hover:bg-[#d90858] transition-colors"
                        >
                            문의하기
                        </Link>
                        <a
                            href="tel:1588-0000"
                            className="inline-block px-8 py-3 border border-[#010F1C] text-[#010F1C] font-medium hover:bg-[#010F1C] hover:text-white transition-colors"
                        >
                            1588-0000
                        </a>
                    </div>
                </div>
            </div>
        </HarriLayout>
    );
}
