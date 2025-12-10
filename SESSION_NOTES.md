# 세션 노트 - 2024-12-06

## 1. Vite/SCSS 빌드 오류 수정

### 문제
```
@use rules must be written before any other rules.
   ╷
17 │ @use 'abstracts' as *;
   │ ^^^^^^^^^^^^^^^^^^^^^
```

### 원인
- node_modules 손상으로 인한 Sass 컴파일 오류
- `[sass] undefined` 에러 발생

### 해결
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 2. Tailwind CSS 로드 문제 수정

### 문제
- `max-w-7xl`, `mx-auto` 등 Tailwind 클래스가 브라우저에서 적용되지 않음

### 원인
- `app.blade.php`에서 `tailwind.css` 파일이 포함되지 않음

### 해결
**파일**: `resources/views/app.blade.php`
```php
// Before
@vite(['resources/scss/app.scss', 'resources/js/app.jsx'])

// After
@vite(['resources/css/tailwind.css', 'resources/scss/app.scss', 'resources/js/app.jsx'])
```

---

## 3. UI 스타일 개선 (Minimal Clean)

### 변경된 파일
- `resources/js/Layouts/MainLayout.jsx`
- `resources/js/Pages/Home.jsx`
- `resources/js/Pages/Products/Index.jsx`
- `resources/js/Pages/Products/Show.jsx`
- `resources/js/Pages/Auth/Login.jsx`
- `resources/js/Pages/Auth/Register.jsx`

### 스타일 변경사항
| 항목 | Before | After |
|------|--------|-------|
| 메인 컬러 | indigo-600 | gray-900 |
| 배경색 | bg-gray-100 | bg-white |
| 버튼 형태 | rounded-md | rounded-full |
| 그림자 | shadow-md | border-gray-100 |
| 전환 효과 | - | transition-colors |

---

## 4. UI 버그 수정

### 문제
- Register 버튼에서 `bg-gray-900 text-gray-900` 충돌로 텍스트 안보임

### 해결
**파일**: `resources/js/Layouts/MainLayout.jsx`
```jsx
// Before
className="text-sm text-gray-900 bg-gray-900 text-white ..."

// After
className="text-sm bg-gray-900 text-white ..."
```

---

## 5. 한글화

### 변경 내용

#### 네비게이션
| English | 한글 |
|---------|------|
| Store | 스토어 |
| Home | 홈 |
| Products | 상품 |
| Community | 커뮤니티 |
| Cart | 장바구니 |
| Wallet | 지갑 |
| Orders | 주문내역 |
| Login | 로그인 |
| Register | 회원가입 |
| Logout | 로그아웃 |

#### 홈 페이지
| English | 한글 |
|---------|------|
| Discover products you'll love | 마음에 드는 상품을 발견하세요 |
| Browse Products | 상품 둘러보기 |
| Join Community | 커뮤니티 참여 |
| Featured Products | 추천 상품 |
| View all | 전체보기 |
| Earn Rewards | 리워드 적립 |
| Flexible Payment | 다양한 결제 |

#### 상품 페이지
| English | 한글 |
|---------|------|
| All | 전체 |
| Out of stock | 품절 |
| Only N left | N개 남음 |
| Add to Cart | 장바구니 담기 |
| Back to Products | 상품 목록으로 |
| Description | 상품 설명 |
| In Stock | 재고 있음 |

#### 인증 페이지
| English | 한글 |
|---------|------|
| Welcome back | 다시 오셨군요 |
| Email | 이메일 |
| Password | 비밀번호 |
| Remember me | 로그인 유지 |
| Forgot password? | 비밀번호 찾기 |
| Create an account | 계정 만들기 |
| Name | 이름 |
| Confirm Password | 비밀번호 확인 |
| Referral Code | 추천인 코드 |

#### 가격 표시
- `$` → `₩` (원화)
- `Number(price).toLocaleString()` 적용

---

## 최종 패키지 버전

```json
{
  "vite": "^7.2.6",
  "laravel-vite-plugin": "^2.0.1",
  "sass": "^1.94.2",
  "tailwindcss": "^4.1.17",
  "@tailwindcss/vite": "^4.1.17"
}
```

---

## 빌드 명령어

```bash
# 개발 서버
npm run dev

# 프로덕션 빌드
npm run build
```
