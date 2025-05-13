import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Card from '../../components/Card'
import Loading from '../../components/Loading'
import SearchBox from '../../components/SearchBox'
import * as bootstrap from 'bootstrap'

const { VITE_APP_UnsplashAPIUrl, VITE_APP_UnsplashAccessKey } = import.meta.env
const url = `${VITE_APP_UnsplashAPIUrl}?client_id=${VITE_APP_UnsplashAccessKey}`

function FindImage() {
  const [filterString, setFilterString] = useState('animal')
  const [jsonData, setJsonData] = useState([])
  const [ratelimitRemaining, setRatelimitRemaining] = useState(50)
  const [isLoading, setIsLoading] = useState(false)
  const [photoUrl, setPhotoUrl] = useState('')
  const isLoadingRef = useRef(false)
  const currentPage = useRef(1)
  const modalRef = useRef(null)
  const myModal = useRef(null)

  const onSearchHandler = (e) => {
    console.log(e)
    if (e.key === 'Enter') {
      setFilterString(e.target.value)
    }
  }

  /**
   * 取得單一照片
   * @param {*} id
   */
  const getSinglePhoto = (id) => {
    ;(async () => {
      const api = 'https://api.unsplash.com/photos/'
      const result = await axios(
        `${api}${id}?client_id=${VITE_APP_UnsplashAccessKey}`
      )
      setPhotoUrl(result.data.urls.regular)
      console.log(result, photoUrl)

      // 打開 Modal
      myModal.current.show()
    })()
  }

  /**
   * 依照參數取得數張照片
   * @param {*} page
   * @param {*} isNew
   */
  const getPhotos = async (page = 1, isNew = true) => {
    try {
      // 搜尋特定需要加入 query
      isLoadingRef.current = true

      setIsLoading(true)

      const result = await axios.get(
        `${url}&query=${filterString}&page=${page}`
      )
      console.log('result', result)

      setJsonData((preData) => {
        console.log('更新資料觸發')
        if (isNew) {
          return [...result.data.results]
        }
        return [...preData, ...result.data.results]
      })

      setRatelimitRemaining(result.headers['x-ratelimit-remaining'])
      currentPage.current = page

      setTimeout(() => {
        isLoadingRef.current = false;
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.log(error)
    }
  }

  const listRef = useRef(null)
  useEffect(() => {
    getPhotos(1, true)

    const scrollEvent = () => {
      // 垂直滾動的位置
      console.log('scroll', window.scrollY)
      const height =
        listRef.current.offsetHeight +
        listRef.current.offsetTop -
        window.innerHeight

      // console.log('height', height)
      // console.log('isLoadingRef.current', isLoadingRef.current)

      if (!isLoadingRef.current && window.scrollY > height) {

        // 需要滾動到下方，並沒有在讀取中
        currentPage.current++
        // console.log(
        //   '需要滾動到下方，並沒有在讀取中currentPage.current',
        //   currentPage.current
        // )

        // 應該是頁數增加 1
        getPhotos(currentPage.current, false) 
      }
    }

    // 滾動監聽
    window.addEventListener('scroll', scrollEvent)
    return () => window.removeEventListener('scroll', scrollEvent)
  }, [filterString])

  //畫面鎖住效果
  useEffect(() => {
    const body = document.querySelector('body')
    if (isLoading) {
      body.style.overflow = 'hidden'
    } else {
      body.style.overflow = 'auto'
    }
  }, [isLoading])

  useEffect(() => {
    myModal.current = new bootstrap.Modal(modalRef.current)
  }, [])

  return (
    <div>
      <Loading isLoading={isLoading} />
      <SearchBox
        onSearchHandler={onSearchHandler}
        filterString={filterString}
      />
      <p>剩餘請求次數：{ratelimitRemaining}</p>
      <div className="row row-cols-2 g-3" ref={listRef}>
        {jsonData.map((item) => (
          <div className="col" key={item.id}>
            <Card item={item} getSinglePhoto={getSinglePhoto} />
          </div>
        ))}
      </div>
      <div className="modal" tabIndex="-1" ref={modalRef}>
        <div className="modal-dialog">
          <img src={photoUrl} alt="" width="100%" />
        </div>
      </div>
    </div>
  )
}

export default FindImage
