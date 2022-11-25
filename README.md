# Spacepharmacy-DoctorSideFE

## 설치

- 패키지 매니저로 `npm` 을 사용합니다.
- 설치
  - `npm install`
- 개발 서버 스크립트
  - `npm run dev`
- 로컬 빌드
  - `npm run build`
  - `npm start`

## 배포 환경

- vercel을 사용해 배포하고 있습니다.
- develop 브랜치에 PR을 보내면 자동으로 preview build가 되고, PR 머지시 test.rocketdoctor.co.kr에 자동으로 배포됩니다.
- release에 최신 develop을 머지시 rocketdoctor.co.kr에 자동으로 배포되며, 필요한 경우 vercel.com에서 테스트 배포본을 `Promote to Production` 하여 프로덕션에 배포하는 것도 가능합니다.
  <img width="1212" alt="Screen Shot 2022-05-02 at 15 36 46" src="https://user-images.githubusercontent.com/31644638/166194108-360fed6a-38b8-4ded-ace3-5673efe76c5c.png">

## 사용 라이브러리

- `nextjs`를 메인 프레임워크로, `TypeScript`로 작성하고 있습니다.
- auth
  - `next-auth`
- 상태 관리
  - 전역 상태 관리가 필요한 경우 리덕스를 [redux-toolkit]([Redux Toolkit | Redux Toolkit (redux-toolkit.js.org)](https://redux-toolkit.js.org/)) 기반으로 사용합니다.
  - 데이터 페칭 상태가 관련된 부분에 [rtk query]([RTK Query Overview | Redux Toolkit (redux-toolkit.js.org)](https://redux-toolkit.js.org/rtk-query/overview))가 부분적으로 사용되고 있습니다.
- 폼 관련
  - 기본적으로 모든 폼 영역에 [react-hook-form](https://react-hook-form.com/)를 사용합니다.
  - 검증 스키마 툴로 [yup](https://www.npmjs.com/package/yup)을 사용하고 있습니다.
    - `form.utils.ts`에서 용례를 확인하실 수 있습니다.
    - 실제 폼엔 react-hook-form에서 제공하는 yupResolver를 사용해 선언한 스키마를 폼에 바인딩합니다(`LoginFormSection.tsx`).
  - 전화번호 검증을 위해 [yup-phone-lite](https://www.npmjs.com/package/yup-phone-lite), [libphonenumber-js](https://www.npmjs.com/package/libphonenumber-js)을 사용합니다.
- 스타일링
  - [stitches](https://stitches.dev)
    - 메인으로 사용중인 css-in-js 툴입니다.
  - [polished](https://polished.js.org)
    - css-in-js 사용시 편리한 헬퍼 함수들을 제공하는 라이브러리입니다. 주로 `rem` 함수(픽셀 값을 rem으로 변경)가 사용되었습니다.
- UI 컴포넌트 관련
  - [radix-ui](https://reach.tech/dialog)
    - 체크박스, 토글 등에 사용되었습니다.
  - [reach ui](https://reach.tech)
    - 주로 다이얼로그 기능에 사용되었습니다.
    - https://reach.tech/dialog
  - [antd](https://ant.design)
    - 국외 협업자였던 Annie가 사용한 부분들에 쓰였습니다.
    - 진료실 레이아웃, 진료 리스트 페이지네이션 등에 쓰였는데 이후 마이그레이션이 필요할 것 같습니다.
  - [downshift](https://github.com/downshift-js/downshift)
  - [react-select](https://react-select.com)
  - [h6s/calendar](https://h6s.dev/docs/calendar/get-started)
    - headless 방식의 캘린더 컴포넌트입니다.
    - 예약 접수 데이트피커에 쓰였습니다.
  -
- 그 외
  - `firebase`
    - firestore store 리스너, app-check 설정을 위해 사용합니다.
  - moment, [date-fns](https://date-fns.org)
    - `Date`를 다루기 위해 사용되었습니다.
  - [react-daum-postcode](https://www.npmjs.com/package/react-daum-postcode)
    - 가입, 병원 정보 등의 주소 검색에 사용합니다.
    - `DaumAddressSearch.tsx` 컴포넌트에서 사용되고 있습니다.

## 프로젝트 폴더 구조

- `/components`
  - 사용되는 컴포넌트들을 모아둔 폴더입니다. 컴포넌트 카테고리, 형태, 사용된 페이지 등의 기준으로 폴더 정리 컨벤션이 좀 섞여있어 정리가 필요한 상황입니다.
- `/interfaces`
  - 정의된 타입들이 들어있습니다.
- `/pages`
  - nextjs 프로젝트의 중심인 폴더입니다.
- `/public`
  - 정적 파일로 서비스 되어야 하는 리소스들이 들어있습니다.
- `/services`
  - rtk query 관련 파일들. rtk query에서 권장하는 컨벤션을 따른 것입니다.
- `/store`
  - 리덕스 스토어 관련 파일들.
- `/styles`
  - 글로벌하게 적용되어야 할 몇몇 부분들에 대한 스타일 정의가 되어있습니다.
- `/types`
  - `react-select`가 내부적으로 `emotion`을 사용해서 발생하는 타입 충돌을 막기 위해 추가.
- `/utils`
  - 여기 저기서 쓰이는 헬퍼 함수들을 모아둔 폴더입니다. 파일명 컨벤션을 `***.utils.ts`로 정해보았습니다.
- `/woozooapi`
  - 그냥 `api`라고 폴더명을 정하면 nextjs 내부 로직이랑 충돌이 생겨서 일단 앞에 `woozoo`를 붙였습니다.

## 페이지들, 주요 로직 및 플로우

### root(index) 페이지

- url: `/`
- file: `/pages/index.tsx`
- `rocketdoctor.co.kr`을 입력하고 엔터를 치면 요 페이지에 액세스합니다.
- `auth` 정보를 확인하여
  - 가입된 회원이 아니면`/auth/login`으로 redirect 합니다.
  - 가입은 되어있으나 아직 승인 되지 않은 경우 `/auth/register/standby`로 redirect 합니다.
  - 가입된 회원이고 승인 까지 완료 되었으면 `/diagnosis`로 redirect 합니다.

### 가입 페이지

- url: `/auth/register`
- file:
  - `/pages/auth/register` 폴더 내 파일들
  - `/components/registerPage` 폴더 내 파일들
- 가입 api 요청이 성공하면 `/auth/register/complete`로 redirect 합니다.

### 로그인 페이지

- url: `/auth/login`
- file: `/pages/auth/login.tsx`
- 플로우
  - email/pw 입력
  - 검증
    - next-auth가 제공하는 `signIn` 함수를 이용합니다.
    - 성공시:
      - 승인이 완료되지 않은 유저라면 승인 대기 페이지 `/auth/register/standby`로 redirect 합니다.
        - 조건: `useGetDoctorInfoQuery` 의 `error.status`가 403일 경우
      - 승인이 완료 되었으나 필수 정보가 입력되지 않은 유저는 `/settings`로 redirect 하여 추가 정보를 입력하게 합니다.
        - 조건: `useGetDoctorInfoQuery` 의 `data.hospitalUser.isSatisfied`가 `false` 일 경우
      - 승인 및 필수 정보 입력이 완료된 유저라면 진료실 페이지 `/diagnosis` 로 redirect 합니다.

### 진료실 페이지

- 일반
  - 리스트
    - url: `/diagnosis`
    - file: `/pages/diagnosis/index.tsx`
  - 상세
    - url: `/diagnosis/[id]`
    - file: `/pages/diagnosis/[id].tsx`
  - 스테이션
    - url: `/diagnosis/station`
    - file: `/pages/diagnosis/station.tsx`
  - 지난 진료
    - url: `/diagnosis/past`
    - file: `/pages/diagnosis/past.tsx`
- 프라이빗
  - 리스트
    - url: `/diagnosis/private/reservation`
    - file: `/pages/diagnosis/private/reservation.tsx`
  - 상세
    - url: `/diagnosis/private/reservation/[id]`
    - file: `/pages/diagnosis/private/reservation/[id].tsx`
  - 즉시 접수
    - url: `/diagnosis/private`
    - file: `/pages/diagnosis/private.tsx`
  - 예약 접수 (대기실 리스트 조회 api 연동필요, mason)
    - url: `/diagnosis/private/reservation/register`
    - file: `/pages/diagnosis/private/reservation/register.tsx`
  - 상담안내 문구 설정
    - api url: devserver.woozoo.clinic/api/base/v1/notice (Jay)
    - Django 에서 문구설정 가능

### 설정 페이지

- url: `/settings`
- file: `/settings.tsx`
- 영역
  - 기본 정보
  - 진료 정보
  - 병원 정보
  - 운영 시간
- 각 영역별로 `idle`/`edit` 상태가 있으며, `수정` 버튼 클릭시 `edit` 상태로 변경됩니다.

  - 해당 상태는 리덕스 스토어 `settingsSlice`에서 관리합니다.

  ### 정산 페이지

개발은 되어있으나(api, ui 모두 추가, 합계금액, 추가 수정이 필요함)
