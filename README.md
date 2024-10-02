<!-- start: ================================================================ -->
# [참고] VSCode Settings
<details>
<summary>접기/펼치기</summary>

## Extensions
- Auto Close Tag
- Auto Rename Tag
- Dracula Official
- ESLint (**v2.2.2**)
- HTML CSS Support
- HTML Snippets
- indent-rainbow
- TODO Highlight
- Vue-Official

## 설정 파일 생성 및 내용 입력
- ./vscode/**파일명.code-snippets** : 코드 자동완성 단축키 설정 파일
- ./vscode/**settings.json** : 작업 환경 설정 파일
</details>
<!-- end  : ================================================================ -->


<!-- start: ================================================================ -->
# [참고] Git
<details>
<summary>접기/펼치기</summary>

```
git init
git remote add origin 저장소주소
git pull origin 저장소주소
git status
git add .
git status
git commit -m "메세지"
git push origin master
```
</details>
<!-- end  : ================================================================ -->


<!-- start: ================================================================ -->
# [참고] webpack 기반 세팅
<details>
<summary>접기/펼치기</summary>

## 패키지 설치 및 세팅
```
npm init -y
npm i -D webpack webpack-cli webpack-dev-server@next html-webpack-plugin
npm i -D dotenv-webpack
npm i -D copy-webpack-plugin
npm i -D css-loader style-loader sass-loader sass postcss autoprefixer postcss-loader
npm i -D @babel/core @babel/preset-env @babel/plugin-transform-runtime babel-loader
```
1. package.json 파일 생성
2. 웹팩 패키지 설치
    - webpack
    - webpack-cli
    - webpack-dev-server@next
        : 개발 서버 오픈 시 수정한 코드를 바로 반영하여 볼 수 있도록 함
    - html-webpack-plugin
        : main.js 파일에 index.html 삽입하여 개발 서버를 오픈하게함
3. 환경변수를 사용하기 위한 패키지 설치
4. 파일 복사를 위한 패키지 설치(이미지 등)
    - copy-webpack-plugin
        : 지정한 폴더 및 패턴과 일치하는 파일을 빌드 시 복사하여 확인 가능하게 함
5. CSS, SCSS를 위한 패키지 설치
    - sass-loader
        : scss 파일을 웹팩에서 읽게 함
    - sass
        : 읽어들인 scss 파일을 해석하게 함
    - postcss-loader
        : postcss를 웹팩에서 동작시키게 함
    - postcss
        : css 파일의 후처리를 도와줌
    - autoprefixer
        : 접근성을 위한 접두사를 붙여줌
    - css-loader
        : js에서 css 파일을 해석하게 함
    - style-loader
        : css 파일을 html에 삽입하게 함
6. JS를 위한 Babel 패키지 설치
    - babel-loader
        : js 파일을 웹팩에서 읽게 함
    - @babel/core
    - @babel/preset-env
    - @babel/plugin-transform-runtime
        : 비동기 처리하는 async await 문법을 사용 가능하게 함

## 기본 테스트를 위한 파일 및 폴더 생성
1. index.html
2. js/main.js
3. css/style.css
4. scss/main.scss
5. static/favicon.ico
6. static/images/logo.png

## 설정 파일 생성
1. webpack.config.js
2. .postcssrc.js
3. .babelrc.js

### 파일 내용 수정
1. package.json 파일 내용 수정
```
  "scripts": {
    "dev": "webpack-dev-server --mode development",
    "build": "webpack --mode production"
  },
  "browserslist": [
    "> 1%",
    "last 2 version"
  ]
```
2. webpack.config.js 파일 내용 입력
3. .postcssrc.js 파일 내용 입력
4. .babelrc.js 파일 내용 입력
</details>
<!-- end  : ================================================================ -->


<!-- start: ================================================================ -->
# 📌 webpack 기반 vue로 전환
<details open>
<summary>접기/펼치기</summary>

## 저장소 복사
```
npx degit 깃헙계정/저장소 폴더명
npm i
```
1. 저장소 복사  
    - degit: 버전관리를 제외하여 처음부터 프로젝트를 시작 가능하다
    - clone: 버전관리 포함하여 복사
    - download.zip -> 파일 붙여넣기  
      (~~SSH 토큰 인증 문제로 degit이 작동되지 않는다면~~  
       -> repository visibility 설정이 **private**인 경우 복사되지 않는다)
2. 선언되어 있는 필요 모듈 설치

## 패키지 설치 및 세팅
```
npm i vue@next
npm i -D vue-loader@next vue-style-loader @vue/compiler-sfc
npm i -D file-loader
npm i -D eslint eslint-plugin-vue babel-eslint
npm i vue-router@4
npm i axios vuex@next
```
1. vue 패키지 설치
    - vue@next
        : Vue 파일의 문법을 해석하게 함
        : 최신 버전으로 설치하는 @next 가 안되면 @latest 또는 @3.4.26
2. vue 관리용 패키지 설치
    - vue-loader@next
    - vue-style-loader
        : Vue 파일 내부의 css 파일을 해석하게 함
    - @vue/compiler-sfc
        : Vue 파일을 변환하여 브라우저에서 동작할 수 있는 형태로 만듦
3. 파일 출력을 위한 패키지 설치
    - ~~file-loader
        : 파일을 읽어 브라우저에 출력해줌~~
    - webpack 5 의 경우 file-loader 를 기본 포함한다.
4. ESLint 패키지 설치
    - eslint
    - eslint-plugin-vue
    - babel-eslint
        : 안되면 @babel/eslint-parser
5. vue-router 패키지 설치
    - vue-router@4
6. store 및 통신 패키지 설치
    - axios
        : 네트워크 통신을 위한 패키지
    - vuex@next
        : store 관리를 위한 패키지

### [옵션] 추가 패키지 설치 및 세팅
```
npm i -D shortid
npm i bootstrap@v5.3.3
npm i --save @fortawesome/fontawesome-svg-core @fortawesome/vue-fontawesome@latest-3 @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons
npm i lodash
```
1. 간단한 고유 id 생성 패키지 설치
    - shortid
2. bootstrap 패키지 설치
    - bootstrap@v5.3.3
3. fontawesome 패키지 설치
    - @fortawesome/fontawesome-svg-core
        : 코어
    - @fortawesome/vue-fontawesome@latest-3
        : Vue 파일 내부의 fontawesome 아이콘을 사용할 수 있도록 함
    - @fortawesome/free-solid-svg-icons
    - @fortawesome/free-regular-svg-icons
    - @fortawesome/free-brands-svg-icons
        : 무료 아이콘 형태 패키지 설치
4. 중복 제거용 패키지 설치
    - lodash

## 설정 파일 수정 및 생성
1. webpack.config.js
2. **.eslintrc.js**
3. ~~js~~/main.js -> src/main.js
4. src/routes/index.js
5. src/store/index.js

## 파일 및 폴더 CUD
1. src/App.vue
2. src/layouts/BasicLayout.vue
3. static/images  -> src/assets/images
4. scss/main.scss -> src/assets/scss/main.scss
5. src/views/Home.vue
</details>
<!-- end  : ================================================================ -->


<!-- start: ================================================================ -->
# 🧪 테스트
<details open>
<summary>접기/펼치기</summary>

## 테스트 종류

### Unit Test
- 단위(Unit) 테스트란 프로그램 최소 단위들이 독립적으로 정상 동작하는지 확인하는 방법
- 데이터(상태), 함수(메소드), 컴포넌트 등
- **로직을 검증**하는 코드 위주의 테스트
- 프레임워크
    - Jest
    - Vue Test Utils
### E2E Test
- E2E(End to End) 테스트란 처음부터 끝까지 실제 사용자의 관점에서 사용 **흐름**을 테스트하는 방법
- 화면 위주의 시나리오 테스트
- 프레임워크
    - Cypress

## 패키지 설치 및 세팅
```
npm i -D jest@latest @vue/test-utils@next @vue/vue3-jest babel-jest@29.7 jest-environment-jsdom
npm i -D identity-obj-proxy
npm i -D cypress eslint-plugin-cypress
```
1. Unit 테스트 패키지 설치
    - jest@latest
        : 단위 테스트 프레임워크
        : @latest 또는 29 이상의 버전을 설치해야 함
    - @vue/test-utils@next
        : vue 컴포넌트 테스트 프레임워크
    - @vue/vue3-jest
        : vue 파일을 변환하여 동작하게 함
    - babel-jest@29.7
        : js 파일 변환하여 동작하게 함
    - [옵션] identity-obj-proxy
        : 스타일 파일에 대한 처리
        : 모의 파일로 대체 시 설치할 필요가 없다
2. E2E 테스트 패키지 설치
    - cypress
        : E2E 테스트 프레임워크
    - eslint-plugin-cypress
        : es lint 에서 cypress 문법 에러가 발생하지 않도록 함

## 설정 파일 생성 및 수정
1. jest.config.js
2. cypress.config.js
3. .eslintrc.js 파일 내용 수정
```
    env: {
        browser: true,
        node: true,
        jest: true,
        'cypress/globals': true
    },
    plugins: [
        'cypress'
    ],
```
4. package.json 파일 내용 수정
```
"scripts": {
    "dev": "netlify dev",
    "dev:webpack": "webpack-dev-server --mode development",
    "build": "webpack --mode production",
    "test:unit": "jest --watchAll",
    "test:unit:silent": "jest --watchAll --silent",
    "test:e2e": "cypress open",
    "test:e2e:headless": "cypress run"
},
```

## 파일 및 폴더 생성
1. test/e2e
2. test/unit
3. test/unit/테스트할 파일 경로/테스트 파일.test.js
4. test/e2e/테스트 시나리오 파일.test.js
5. \__mocks\__/fileMock.js
6. \__mocks\__/styleMock.js
</details>
<!-- end  : ================================================================ -->


<!-- start: ================================================================ -->
# 🚀 배포
<details open>
<summary>접기/펼치기</summary>

## 로컬 서버 세팅
```
npm i -D serve
    npm run build
    serve -s dist
```
1. 로컬 서버 패키지 설치
    - serve
    1) `dist` 폴더에 서버 배포용 파일 생성 (webpack.config.js output 설정 참고. 기본값 dist)
    2) 로컬 서버 오픈

## 호스팅 서비스 세팅
```
npm i -D netlify-cli
```
1. 호스팅 서비스 패키지 설치
    - netlify-cli
        : Netlify 서버용 CLI 설치
        : Netlify 의 기능을 로컬에서 사용할 수 있다

### 설정 파일 수정 및 생성
1. netlify.toml
2. package.json 파일 내용 수정
```
"scripts": {
    "dev": "netlify dev",
    "dev:webpack": "webpack-dev-server --mode development",
    "build": "webpack --mode production"
},
```
### Netlify 서버리스 함수 세팅
- <a href="https://docs.netlify.com/functions/overview/#default-deployment-options" target="_blank">서버리스 함수 기본 옵션 바로가기</a>
1. netlify.toml 파일의 functions 부분에 명시한 폴더 생성
2. 서버리스 함수명의 파일 생성
    - 서버리스 함수 실행 요청 경로: `/.netlify/functions/파일명`
### Netlify 환경변수 세팅
1. Site configuration > Environment variables 클릭
2. Add a variable 버튼 클릭
3. .env 파일 내용대로 Key, Values 값 입력
### Netlify 배포
1. <a href="https://app.netlify.com/" target="_blank">사이트 접속</a>
2. Sites > Add new site > Import an existing project 클릭
3. Let’s deploy your project with… > Github 선택
4. 레포지토리 선택
5. 레포지토리가 없는 경우
    - 하단 configure the Netlify app on Github 클릭
    - GitHub에서 settings>Applications>Netlify configure 클릭
6. 빌드 세팅
    - Site name        : 사이트명 입력
    - Branch to deploy : 배포용 브런치 선택
    - Build command    : `CI= npm run build` 입력
    - Publish directory: `dist` 빌드 폴더 입력
7. Deploys > 배포여부 확인 (`Published` 라벨)
</details>
<!-- end  : ================================================================ -->