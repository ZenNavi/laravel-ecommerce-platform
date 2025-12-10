import { Link } from '@inertiajs/react';
import HarriLayout from '@/Layouts/HarriLayout';

export default function Terms() {
    return (
        <HarriLayout>
            {/* Breadcrumb */}
            <div className="bg-[#F6F6F6] py-6">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 text-sm">
                        <Link href="/harri" className="text-[#55585B] hover:text-[#F50963]">홈</Link>
                        <span className="text-[#55585B]">/</span>
                        <span className="text-[#010F1C] font-medium">이용약관</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold text-[#010F1C] mb-8">이용약관</h1>

                    <div className="prose max-w-none text-[#55585B]">
                        <p className="text-sm text-[#55585B] mb-8">최종 수정일: 2024년 1월 1일</p>

                        <section className="mb-10">
                            <h2 className="text-xl font-semibold text-[#010F1C] mb-4">제1조 (목적)</h2>
                            <p className="leading-relaxed">
                                본 약관은 HARRI(이하 "회사")가 운영하는 온라인 쇼핑몰에서 제공하는 인터넷 관련 서비스를 이용함에 있어 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-xl font-semibold text-[#010F1C] mb-4">제2조 (정의)</h2>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li>"쇼핑몰"이란 회사가 재화 또는 용역을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 또는 용역을 거래할 수 있도록 설정한 가상의 영업장을 말합니다.</li>
                                <li>"이용자"란 쇼핑몰에 접속하여 본 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.</li>
                                <li>"회원"이란 쇼핑몰에 개인정보를 제공하여 회원등록을 한 자로서, 쇼핑몰의 정보를 지속적으로 제공받으며, 쇼핑몰이 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.</li>
                                <li>"비회원"이란 회원에 가입하지 않고 쇼핑몰이 제공하는 서비스를 이용하는 자를 말합니다.</li>
                            </ol>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-xl font-semibold text-[#010F1C] mb-4">제3조 (약관의 게시와 개정)</h2>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li>회사는 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소, 전화번호, 전자우편주소, 사업자등록번호, 통신판매업 신고번호, 개인정보관리책임자 등을 이용자가 쉽게 알 수 있도록 쇼핑몰의 초기 서비스 화면에 게시합니다.</li>
                                <li>회사는 「전자상거래 등에서의 소비자보호에 관한 법률」, 「약관의 규제에 관한 법률」, 「전자문서 및 전자거래기본법」, 「전자금융거래법」, 「전자서명법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」, 「소비자기본법」 등 관련 법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.</li>
                            </ol>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-xl font-semibold text-[#010F1C] mb-4">제4조 (서비스의 제공 및 변경)</h2>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li>회사는 다음과 같은 서비스를 제공합니다.
                                    <ul className="list-disc pl-5 mt-2 space-y-1">
                                        <li>재화 또는 용역에 대한 정보 제공 및 구매 계약의 체결</li>
                                        <li>구매 계약이 체결된 재화 또는 용역의 배송</li>
                                        <li>기타 회사가 정하는 업무</li>
                                    </ul>
                                </li>
                                <li>회사는 재화 또는 용역의 품절 또는 기술적 사양의 변경 등의 경우에는 장차 체결되는 계약에 의해 제공할 재화 또는 용역의 내용을 변경할 수 있습니다.</li>
                            </ol>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-xl font-semibold text-[#010F1C] mb-4">제5조 (서비스의 중단)</h2>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li>회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.</li>
                                <li>회사는 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제3자가 입은 손해에 대하여 배상합니다. 단, 회사가 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.</li>
                            </ol>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-xl font-semibold text-[#010F1C] mb-4">제6조 (회원가입)</h2>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li>이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 본 약관에 동의한다는 의사표시를 함으로써 회원가입을 신청합니다.</li>
                                <li>회사는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다.</li>
                            </ol>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-xl font-semibold text-[#010F1C] mb-4">제7조 (회원 탈퇴 및 자격 상실 등)</h2>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li>회원은 회사에 언제든지 탈퇴를 요청할 수 있으며, 회사는 즉시 회원탈퇴를 처리합니다.</li>
                                <li>회원이 다음 각 호의 사유에 해당하는 경우, 회사는 회원자격을 제한 및 정지시킬 수 있습니다.
                                    <ul className="list-disc pl-5 mt-2 space-y-1">
                                        <li>가입 신청 시에 허위 내용을 등록한 경우</li>
                                        <li>쇼핑몰을 이용하여 구입한 재화 등의 대금을 지정한 기일 내에 결제하지 않는 경우</li>
                                        <li>다른 사람의 쇼핑몰 이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우</li>
                                    </ul>
                                </li>
                            </ol>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-xl font-semibold text-[#010F1C] mb-4">제8조 (구매신청)</h2>
                            <p className="leading-relaxed">
                                이용자는 쇼핑몰에서 다음 또는 이와 유사한 방법에 의하여 구매를 신청하며, 회사는 이용자가 구매신청을 함에 있어서 다음의 각 내용을 알기 쉽게 제공하여야 합니다.
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-xl font-semibold text-[#010F1C] mb-4">제9조 (계약의 성립)</h2>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li>회사는 제8조와 같은 구매신청에 대하여 다음 각 호에 해당하면 승낙하지 않을 수 있습니다.</li>
                                <li>회사의 승낙이 제12조 제1항의 수신확인통지 형태로 이용자에게 도달한 시점에 계약이 성립한 것으로 봅니다.</li>
                            </ol>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-xl font-semibold text-[#010F1C] mb-4">제10조 (결제방법)</h2>
                            <p className="leading-relaxed mb-4">
                                쇼핑몰에서 구매한 재화 또는 용역에 대한 대금지급방법은 다음 각 호의 방법 중 가용한 방법으로 할 수 있습니다.
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>신용카드 결제</li>
                                <li>무통장입금</li>
                                <li>간편결제 (카카오페이, 네이버페이, 토스페이 등)</li>
                                <li>기타 전자적 지급 방법에 의한 대금 지급 등</li>
                            </ul>
                        </section>

                        <div className="bg-[#F6F6F6] p-6 mt-12">
                            <p className="text-sm text-[#55585B]">
                                본 약관에 대한 문의사항이 있으시면 <Link href="/harri/contact" className="text-[#F50963] hover:underline">고객센터</Link>로 연락해 주세요.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </HarriLayout>
    );
}
