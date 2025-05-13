
/**
 * 搜尋文字方塊
 * @param {*} param0 
 * @returns 
 */
function SearchBox({ onSearchHandler, filterString }) {
  return (
    <div>
      <label htmlFor="filter">搜尋</label>
      <input
        type="text"
        id="filter"
        className="form-control"
        defaultValue={filterString}
        onKeyPress={onSearchHandler}
      />
    </div>
  )
}

export default SearchBox