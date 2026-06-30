# IMEC 이메일 API - Vercel 배포 가이드

## 배포 순서

### 1. GitHub 업로드
이 `vercel-email` 폴더를 GitHub 새 레포지토리로 업로드

### 2. Vercel 연결
1. vercel.com → "Add New Project" → GitHub 레포 선택
2. Framework Preset: **Other**
3. Deploy 클릭

### 3. 환경 변수 등록
Vercel Dashboard → 프로젝트 → Settings → Environment Variables

| 변수명 | 값 |
|--------|-----|
| SMTP_HOST | smtp.mailplug.co.kr |
| SMTP_PORT | 587 |
| SMTP_USER | hr@imecs.co.kr |
| SMTP_PASS | (hr@imecs.co.kr 비밀번호) |

### 4. 재배포
환경변수 저장 후 → Deployments → "Redeploy" 클릭

### 5. imec-hr.html에 URL 입력
1. IMEC HR 앱 로그인 (관리자)
2. 설정 탭(Supabase 설정 페이지) 접속
3. "이메일 알림 설정" 항목에 Vercel URL 입력
   - 예: `https://imec-email-api.vercel.app/api/send-email`
4. 저장 → "테스트 발송" 버튼으로 확인

---

## Mailplug SMTP 정보 확인 방법
- Mailplug 관리자 페이지 → 도메인 설정 → SMTP/POP3 설정
- 포트 587 (STARTTLS) 또는 465 (SSL) 사용 가능
- 포트 변경 시 SMTP_PORT 환경변수 값 수정
