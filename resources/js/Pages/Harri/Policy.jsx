import { Link } from '@inertiajs/react';
import HarriLayout from '@/Layouts/HarriLayout';

export default function Policy() {
    return (
        <HarriLayout>
            {/* Breadcrumb */}
            <div className="bg-[#F6F6F6] py-6">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 text-sm">
                        <Link href="/harri" className="text-[#55585B] hover:text-[#F50963]">홈</Link>
                        <span className="text-[#55585B]">/</span>
                        <span className="text-[#010F1C] font-medium">개인정보처리방침</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold text-[#010F1C] mb-8">개인정보처리방침</h1>

                    <div className="prose max-w-none text-[#55585B]">
                        <p className="text-sm text-[#55585B] mb-8">최종 수정일: 2024년 1월 1일</p>

                        <p className="leading-relaxed mb-8">
                            HARRI(이하 "회사")는 이용자의 개인정보를 중요시하며, 「개인정보 보호법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 등 관련 법령을 준수하고 있습니다.
                        </p>

                        <section className="mb-10">
                            <h2 className="text-xl font-semibold text-[#010F1C] mb-4">1. 개인정보의 수집 및 이용 목적</h2>
                            <p className="leading-relaxed mb-4">회사는 다음의 목적을 위하여 개인정보를 처리합니다.</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>
                                    <strong className="text-[#010F1C]">회원 관리:</strong> 회원제 서비스 이용에 따른 본인확인, 개인식별, 불량회원의 부정 이용 방지, 비인가 사용 방지, 가입 의사 확인, 연령확인, 불만처리 등 민원처리, 고지사항 전달
                                </li>
                                <li>
                                    <strong className="text-[#010F1C]">서비스 제공:</strong> 물품배송, 서비스 제공, 계약서·청구서 발송, 콘텐츠 제공, 맞춤 서비스 제공, 본인인증, 구매 및 요금 결제
                                </li>
                                <li>
                                    <strong className="text-[#010F1C]">마케팅 및 광고:</strong> 신규 서비스 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공, 접속 빈도 파악, 서비스 이용에 대한 통계
                                </li>
                            </ul>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-xl font-semibold text-[#010F1C] mb-4">2. 수집하는 개인정보 항목</h2>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>
                                    <strong className="text-[#010F1C]">필수항목:</strong> 이름, 이메일 주소, 비밀번호, 휴대폰 번호
                                </li>
                                <li>
                                    <strong className="text-[#010F1C]">선택항목:</strong> 생년월일, 성별, 배송지 주소
                                </li>
                                <li>
                                    <strong className="text-[#010F1C]">자동 수집 항목:</strong> IP 주소, 쿠키, 서비스 이용 기록, 방문 기록
                                </li>
                            </ul>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-xl font-semibold text-[#010F1C] mb-4">3. 개인정보의 보유 및 이용 기간</h2>
                            <p className="leading-relaxed mb-4">
                                회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
                                <li>대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
                                <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
                                <li>표시/광고에 관한 기록: 6개월</li>
                            </ul>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-xl font-semibold text-[#010F1C] mb-4">4. 개인정보의 파기 절차 및 방법</h2>
                            <p className="leading-relaxed mb-4">
                                회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>
                                    <strong className="text-[#010F1C]">전자적 파일 형태:</strong> 복구 불가능한 방법으로 영구 삭제
                                </li>
                                <li>
                                    <strong className="text-[#010F1C]">종이 문서:</strong> 분쇄기로 분쇄하거나 소각
                                </li>
                            </ul>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-xl font-semibold text-[#010F1C] mb-4">5. 개인정보의 제3자 제공</h2>
                            <p className="leading-relaxed mb-4">
                                회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>이용자들이 사전에 동의한 경우</li>
                                <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
                            </ul>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-xl font-semibold text-[#010F1C] mb-4">6. 이용자의 권리와 그 행사방법</h2>
                            <p className="leading-relaxed mb-4">
                                이용자는 언제든지 자신의 개인정보를 조회하거나 수정할 수 있으며, 가입해지를 요청할 수 있습니다.
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>개인정보 조회, 수정: 마이페이지 &gt; 프로필 수정</li>
                                <li>가입해지(동의 철회): 마이페이지 &gt; 회원탈퇴</li>
                                <li>고객센터를 통한 서면, 전화 또는 이메일로 요청 가능</li>
                            </ul>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-xl font-semibold text-[#010F1C] mb-4">7. 개인정보 보호책임자</h2>
                            <div className="bg-[#F6F6F6] p-6">
                                <p className="mb-2"><strong className="text-[#010F1C]">개인정보 보호책임자</strong></p>
                                <ul className="space-y-1">
                                    <li>이름: 김보호</li>
                                    <li>직위: 개인정보보호팀장</li>
                                    <li>이메일: privacy@harri.com</li>
                                    <li>전화: 1588-0000</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-xl font-semibold text-[#010F1C] mb-4">8. 쿠키(Cookie)의 운용 및 거부</h2>
                            <p className="leading-relaxed mb-4">
                                회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 쿠키(cookie)를 사용합니다. 쿠키는 웹사이트를 운영하는데 이용되는 서버가 이용자의 브라우저에게 보내는 아주 작은 텍스트 파일로 이용자 컴퓨터의 하드디스크에 저장됩니다.
                            </p>
                            <p className="leading-relaxed">
                                이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 웹 브라우저에서 옵션을 설정하여 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수 있습니다.
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="text-xl font-semibold text-[#010F1C] mb-4">9. 개인정보처리방침 변경</h2>
                            <p className="leading-relaxed">
                                이 개인정보처리방침은 2024년 1월 1일부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
                            </p>
                        </section>

                        <div className="bg-[#F6F6F6] p-6 mt-12">
                            <p className="text-sm text-[#55585B]">
                                개인정보 관련 문의사항이 있으시면 <Link href="/harri/contact" className="text-[#F50963] hover:underline">고객센터</Link>로 연락해 주세요.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </HarriLayout>
    );
}
