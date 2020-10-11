import { ref } from 'vue'

const corsAnywhere = 'https://cors-anywhere.herokuapp.com/'
const hltbURL = 'https://howlongtobeat.com/search_results?page=1'

const chunk = (arr: string[], size: number) => {
  const res: Array<string[]> = []

  while (arr.length) {
    res.push(arr.splice(0, size))
  }

  return res
}

const search = async (name: string): Promise<Record<string, any>> => {
  return fetch(`${corsAnywhere}${hltbURL}`, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    referrer: 'https://howlongtobeat.com/',
    referrerPolicy: 'no-referrer-when-downgrade',
    body: `queryString=${encodeURI(
      name
    )}&t=games&sorthead=popular&sortd=Normal Order&plat=PC&length_type=main&length_min=&length_max=&detail=`,
    method: 'POST',
    // mode: 'cors',
    credentials: 'omit',
  })
    .then(content => {
      return content.text()
    })
    .then(data => {
      const tmp = document.createElement('div')

      tmp.innerHTML = data

      const firstSearchList = tmp.querySelector(
        '.search_list_details'
      ) as HTMLDivElement
      const arr = firstSearchList.querySelectorAll('.search_list_tidbit')
      const arr2 = [...arr].map(a => a.textContent) as string[]

      const picture = tmp.querySelector(
        '.search_list_image img'
      ) as HTMLImageElement
      const src = picture.getAttribute('src')

      return {
        picture: src,
        entries: chunk(arr2, 2),
      }
    })
}

const entries = ref([] as Array<string[]>)
const picture = ref('')

export { search, entries, picture }
