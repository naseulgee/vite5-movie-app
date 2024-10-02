import axios from 'axios'
import _upperFirst from 'lodash/upperFirst'
import _toLower from 'lodash/toLower'

export const userA = {
    name: 'Ann',
    age: 35
}

export const userB = {
    name: 'Alex',
    age: 18
}

export function double(num){
    return num * 2
}

export function asyncFn(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Done!')
        }, 2000)
    })
}

export async function apiFn(){
    const res = await axios.get('https://www.omdbapi.com/?apikey=8a44dd72&i=tt4520988')
    return _upperFirst(_toLower(res.data.Title))
}