<h1 align="center">🫀Health Log</h1>
<div align="center" >
  Health Log는 혈당 및 혈압 관리를 도와주는 웹 애플리케이션 입니다.<br />
</div>

## 기능

📊 대시보드에서 DB에 저장된 혈당 및 혈압 수치를 기반으로 현재 건강 상태와 추이를 한눈에 파악할 수 있습니다    
👀 혈압 및 혈당 데이터를 추가할 때, 입력한 값을 기반으로 건강 상태를 바로 알 수 있습니다.   
🩸 혈당 관리 페이지에서 혈당 추이와 내역을 확인할 수 있고, 혈당 내역 데이터를 Execl 혹은 PDF로 내보낼 수 있습니다.   

**<p align="center">🚀 이 외에도 다양한 기능이 계속 추가될 예정입니다 🚀</p>**

## 기술

- 코어: React, TypeScript, Next.js
- 상태 관리: React Query (TanStack Query)
- 스타일링: Tailwind CSS
- 패키지 매니저: NPM
- 테스트: Jest, Storybook

## 주요 설계 결정 및 구현 포인트

1. 설계 및 아키텍처 (FSD)
    - 기능 단위로 코드를 분리하는 Feature Sliced Design(FSD) 구조를 도입했습니다.
    - 각 기능이 서로 엉키지 않게 독립적으로 관리하여, 프로젝트가 커져도 유지보수가 쉬운 환경을 만들었습니다.
    - 모듈 간의 관계를 명확히 정의해, 코드 수정 시 발생할 수 있는 부작용(Side Effect)을 최소화했습니다.
2. 스타일링 전략 (Tailwind CSS)
    - Tailwind CSS를 도입해 클래스 이름을 고민하는 시간을 줄이고 개발 속도를 높였습니다.
    - 스타일 코드를 별도의 파일이 아닌 마크업과 함께 관리하여, 화면 구조와 스타일을 동시에 직관적으로 수정할 수 있게 했습니다.
    - 일관된 디자인 시스템을 빠르게 적용하여 전체적인 UI 품질을 유지했습니다.
3. UI 컴포넌트 개발 및 테스트 (Storybook)
    - 독립적인 환경에서 UI 컴포넌트를 개발하고 테스트하기 위해 Storybook을 도입했습니다.
    - 데이터 다운로드 상태, 에러 발생 등 다양한 상황을 미리 설정하여, 실제 서비스 로직과 상관없이 화면이 잘 나오는지 쉽고 빠르게 검증했습니다.
4. 데이터 상태 관리 (React Query)
    - 서버 데이터 관리를 위해 React Query와 Query Key Factory 패턴을 함께 사용했습니다.
    - 흩어져 있기 쉬운 쿼리 키와 요청 함수를 한곳에서 체계적으로 관리하여 개발 중 발생할 수 있는 실수를 방지했습니다.
    - 반복되는 데이터 요청 로직을 재사용 가능하게 만들어 생산성을 높였습니다.
5. 백엔드 및 데이터 인터페이스 (Supabase)
    - Supabase를 활용해 별도의 서버 구축 시간 없이 데이터베이스와 인증 시스템을 빠르게 연동했습니다.
    - 백엔드 인프라 관리에 드는 리소스를 절약하고, 대신 사용자 경험(UX)과 핵심 비즈니스 로직을 정교하게 다듬는 데 더 많은 시간을 투자했습니다.

## 주요 문제 해결 및 기록

- 기존 PDF 변환 라이브러리의 생산성 및 유지보수 한계를 파악하고, Cursor(AI)를 활용해 PDF 변환 기능을 직접 구현한 과정을 기록했습니다.
- 작성 글: [바이브 코딩으로 React 코드를 PDF로 변환 기능 만들기](https://dev-sisun.tistory.com/53)

## 미리보기

https://github.com/user-attachments/assets/d7bed7d4-f5cd-4d13-b7d1-6c97e9e03740

## 데모 사이트

🏠 [Health Log 보러가기](https://hyoni-health-log.vercel.app/)

## 실행

1. 프로젝트의 루트 경로에 아래 내용이 포함된 .env 파일을 생성합니다.

```
NEXT_PUBLIC_SUPABASE_URL="SUPABASE에서_제공하는_URL"
NEXT_PUBLIC_SUPABASE_ANON_KEY="SUPABASE에서_발급받은_ANON_KEY"
```

2. 터미널에 아래 명령어를 순서대로 실행하면 Health Log를 실행하실 수 있습니다.

```
npm ci
npm run build && npm start
```

## 개발 일지

✨ [개발일지 보러 바로 가기](https://steadfast-cardinal-956.notion.site/Health-Log-1f8216b709e280c2841af2fafeb5dcfe)  
개발일지에는 아래의 내용이 담겨 있습니다.

- 개발 배경
- 개발하면서 고민하고, 참고한 문서들 기록
- 진행 상황
  - '진행 중' 및 '완료' 상태의 문서에는 다음 내용이 기록되어 있습니다.
    - 화면 설계서 및 디자인
    - ERD
    - 해야 할 일
    - 배운 점
    - 리팩토링해야 할 점
    - 트러블 슈팅
