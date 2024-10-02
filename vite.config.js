/** NOTE: Vite 어플리케이션 동작 설정 파일
 * [참고] https://vitejs.dev/config/
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'

export default defineConfig({
    resolve: {
        extensions: [//확장자를 따로 명시하지 않아도 되게 하는 설정
            ".js",
            ".ts",
            ".vue"
        ],
        alias: {
            '~': fileURLToPath(new URL('./src', import.meta.url)),
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: "@import './src/assets/scss/main';",
            }
        },
        // .postcssrc.js
        postcss: [
            autoprefixer({})
        ],
    },
    // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
    plugins: [
        vue(),
    ],
    server: {
        host: "localhost",
        port: 8079, // Netlify 설정으로 8080 에서 변경
    },
})