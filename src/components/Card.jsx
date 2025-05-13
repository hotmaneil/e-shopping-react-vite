/**
 * 元件-卡片
 * @param {*} 
 * @returns 
 */
function Card({ item,getSinglePhoto }) {
  return (
    <a className="card" href="#" onClick={(e) => {
      e.preventDefault();
      getSinglePhoto(item.id)
    }}>
      <img className="card-img object-cover" width="100%" height="400"
      src={`${item.urls.raw}&w=600&q=80`} alt="" />
    </a>
  )
}

export default Card
 