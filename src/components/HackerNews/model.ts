import { LanguageOption } from "../../interfaces"

export const URI = 'https://hn.algolia.com/api/v1/search_by_date'

export const LANGUAGE_OPTIONS: LanguageOption[] = [
    {
        id: '01',
        name: 'Angular',
        value: 'angular',
        icon: 'angular.png'
    },
    {
        id: '02',
        name: 'Reacts',
        value: 'reactjs',
        icon: 'react.png'
    },
    {
        id: '03',
        name: 'Vuejs',
        value: 'vuejs',
        icon: 'vue.png'
    },
]