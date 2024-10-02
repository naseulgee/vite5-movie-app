import { createApp } from "vue"
import App from "./App"
import router from "./routes" // 특정 폴더 안의 index.js 는 생략 가능하다. /routes/index.js
import store from "./store"
import loadImage from "./plugins/loadImage"

// NOTE: fontawesome 호출
// [참고] https://velog.io/@devbinna/Vue.js-fontawesome-%EC%82%AC%EC%9A%A9
// fontawesome 코어
import { library } from '@fortawesome/fontawesome-svg-core'
// fontawesome 컴포넌트
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// fontawesome 사용할 아이콘 명시
import { fas } from "@fortawesome/free-solid-svg-icons" // 전체 아이콘 등록
import { far } from "@fortawesome/free-regular-svg-icons"
library.add(fas, far);

createApp(App) //Root 컴포넌트 연결
.component("font-awesome-icon", FontAwesomeIcon)
.use(router)   //라우터 플러그인 연결
.use(store)    //store 플러그인 연결
.use(loadImage)//커스텀 플러그인 연결
.mount("#app") //렌더링할 HTML 요소 지정