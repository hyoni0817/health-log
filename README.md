<h1 align="center">🫀Health Log</h1>
<div align="center" >
  Health Log는 혈당 및 혈압 관리를 도와주는 웹 애플리케이션 입니다.<br />
</div>

## 기능

📊 대시보드에서 DB에 저장된 혈당 및 혈압 수치를 기반으로 현재 건강 상태와 추이를 한눈에 파악할 수 있습니다(현재는 혈당 추이만 확인할 수 있습니다).   
👀 혈압 및 혈당 데이터를 추가할 때, 입력한 값을 기반으로 건강 상태를 바로 알 수 있습니다.

**<p align="center">🚀 이 외에도 다양한 기능이 계속 추가될 예정입니다 🚀</p>**

## 기술

- 코어: React, TypeScript, Next.js
- 상태 관리: React Query (TanStack Query)
- 스타일링: Tailwind CSS
- 패키지 매니저: NPM
- 테스트: Jest

## 미리보기

https://github.com/user-attachments/assets/d7bed7d4-f5cd-4d13-b7d1-6c97e9e03740

## 데모 사이트

준비중

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
