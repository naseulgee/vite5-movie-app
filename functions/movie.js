/** NOTE: Netlify 내부에서 웹 프로젝트와 별도의 서버처럼 실행시켜주는 기능을 명시한 파일
 * [참고] https://docs.netlify.com/functions/get-started/
 * 
 * - Node.js 환경에서 동작한다
 * - ★/.netlify/functions/파일명 으로 요청 시 동작한다.
 * - 함수는 무조건 ★비동기로 명시한다
 * - return 값은 statusCode 와 body 를 포함해야 한다
 * - 네트워크로 주고받는 데이터는 문자열 데이터로, 문자열 <-> 객체 데이터 간의 전환이 필요하다
*/

const axios = require('axios') // 패키지 사용 시 import 가 아닌 require 를 사용하여야 한다
const { OMDB_API_KEY } = process.env

// Vite: 수정
export default async function handler(request, response) {
// exports.handler = async (request, context) => {
    // Vite: 수정
    // const payload = JSON.parse(request.body) // 문자열 -> 객체 데이터
    const payload = await request.json() // 문자열 -> 객체 데이터
    // console.log(request) // 브라우저 콘솔이 아닌 터미널에서 출력된다

    // [참고] https://www.omdbapi.com/
    const { title, type, year, page, id } = payload
    const url = id
        ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
        : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

    /** NOTE: 함수 자체가 비동기로 동작되기 때문에,
     * - Promise 객체가 아닌 try-catch 로 처리
     * - resolve, reject 대신 statusCode 로 결과 전달
    */
    try {
        const res = await axios.get(url)
        // 상태코드 200 이나, 에러인 경우 처리
        if(res.data.Error) {
            // Vite: 수정
            // return {
            //     statusCode: 400,
            //     body: res.data.Error,
            // }
            return new Response(res.data.Error, { status: 400 })
        }
        return new Response(JSON.stringify(res.data), { status: 200 })
    } catch (error) {
        return new Response(error.message, { status: error.response.status })
    }
}