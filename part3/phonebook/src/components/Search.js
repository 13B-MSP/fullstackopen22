const Search = ( { search, handleSearchChanged }) =>
    <>
    filter shown with <input value={search} onChange={handleSearchChanged}/>
    </>

export default Search