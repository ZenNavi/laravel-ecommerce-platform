# CLAUDE.md

이 파일은 AI 어시스턴트가 이 Laravel 이커머스 플랫폼에서 작업할 때 참고하는 가이드입니다.

## 프로젝트 개요

Laravel 12와 React 19(Inertia.js)로 구축된 풀스택 이커머스 플랫폼입니다. 장바구니, 주문, 결제, 커뮤니티 게시판, 리워드 포인트, 자산 관리 시스템을 포함합니다.

## 기술 스택

- **백엔드:** PHP 8.2+, Laravel 12, Sanctum (API 인증), Filament 3.2 (관리자)
- **프론트엔드:** React 19, Inertia.js 2.0, Tailwind CSS 4, Vite 7
- **데이터베이스:** SQLite (개발), MySQL/PostgreSQL (운영)
- **테스트:** PHPUnit 11.5
- **기본 언어:** 한국어 (ko), 영어 폴백
- **IDE:** PhpStorm 권장

## 주요 명령어

```bash
# 개발 환경 (4개 서버 동시 실행)
composer dev

# 개별 명령어
php artisan serve          # Laravel 서버
php artisan queue:listen   # 큐 워커
npm run dev                # Vite 개발 서버

# 테스트
php artisan test           # 전체 테스트 실행
composer test              # 설정 초기화 + 테스트

# 데이터베이스
php artisan migrate
php artisan db:seed --class=AssetTypeSeeder

# 프로덕션 빌드
npm run build
```

## 프로젝트 구조

```
app/
├── Http/Controllers/
│   ├── Api/          # API 컨트롤러 13개
│   └── Web/          # 웹 컨트롤러 3개 (Inertia)
├── Models/           # Eloquent 모델 22개
├── Filament/         # 관리자 패널 리소스
routes/
├── api.php           # API 엔드포인트 50개 이상
├── web.php           # Inertia 라우트
database/
├── migrations/       # 마이그레이션 22개
├── seeders/          # DatabaseSeeder, AdminUserSeeder, AssetTypeSeeder
resources/
├── js/Pages/         # React 컴포넌트
├── scss/             # Tailwind + SCSS
```

## 주요 기능 및 모듈

1. **이커머스:** 상품, 카테고리, 장바구니, 주문, 재고 관리
2. **커뮤니티:** 게시글, 댓글, 좋아요, 팔로우
3. **리워드:** 포인트 (구매금액의 10%), 추천인 보너스, 리워드 교환
4. **결제:** Stripe, PayPal, 내부 지갑
5. **자산 관리:** 현금, 카드, Pay (내부결제), 리워드 포인트 및 거래 감사 추적

## 아키텍처 패턴

- **API:** RESTful, Sanctum 토큰 인증 (`auth:sanctum` 미들웨어)
- **웹:** Inertia.js SSR + React 컴포넌트
- **관리자:** Filament 패널 `/admin` (`is_admin` 플래그 필요)
- **다형성 관계:** 게시글/댓글 좋아요 시스템
- **소프트 삭제:** User, Order, Product, Post, Category 모델

## 데이터베이스 규칙

- 금액 값: `decimal(10,2)` 정밀도
- 타임스탬프: 모든 테이블에 `created_at`, `updated_at`
- 소프트 삭제: 해당 테이블에 `deleted_at` 컬럼
- 외래 키: 적절한 곳에 캐스케이딩 삭제 적용

## API 라우트 그룹

- **공개:** `/api/products`, `/api/posts`, `/api/rewards`, `/api/users/{id}`
- **인증 필요:** 장바구니, 주문, 결제, 지갑, 자산, 추천인
- **관리자:** `/api/pay/charge-requests/{id}/approve|reject`, `/api/admin/statistics`

## 테스트

- PHPUnit + 인메모리 SQLite
- 테스트 스위트: `Unit`, `Feature`
- Faker 로케일: `ko_KR`

## 코드 스타일

- Laravel Pint로 PHP 포맷팅
- 기존 컨트롤러/모델 패턴 따르기
- 유효성 검사는 Form Request 사용
- API 응답은 일관된 JSON 구조 유지

## 환경 변수

`.env` 주요 설정:
- `DB_CONNECTION` - 데이터베이스 드라이버
- `STRIPE_*`, `PAYPAL_*` - 결제 게이트웨이
- `REWARD_POINTS_PER_PURCHASE` - 포인트 비율 (기본 10%)
- `PAY_*` - 자산 관리 한도

## PhpStorm 설정

### 권장 플러그인
- Laravel Idea (유료, 강력 추천)
- Laravel Pint
- Tailwind CSS
- React / JavaScript and TypeScript

### 프로젝트 설정
1. **PHP 인터프리터:** PHP 8.2+ 설정
2. **Composer:** `Settings > PHP > Composer`에서 composer.json 경로 지정
3. **Laravel Pint:** `Settings > PHP > Quality Tools > Laravel Pint` 활성화
4. **PHPUnit:** `Settings > PHP > Test Frameworks`에서 phpunit.xml 연결
5. **Node.js:** `Settings > Languages & Frameworks > Node.js`에서 설정

### Run Configuration 예시
- **Laravel Serve:** `php artisan serve`
- **Vite Dev:** `npm run dev`
- **PHPUnit:** phpunit.xml 기반 테스트 실행
- **Composer Dev:** `composer dev` (4개 서버 동시 실행)
