
/**
 * 載入中畫面
 * @param {*} param0 
 * @returns 
 */
function Loading({ isLoading }) {
  return (
    <div className="loading" style={{ display: isLoading ? 'flex' : 'none' }}>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default Loading
 