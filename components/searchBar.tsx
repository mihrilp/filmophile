import React, { useCallback, useState } from "react";
import { useAppDispatch } from "../hooks";
import { Search } from "../public/assets";
import { fetchSearchedMovie } from "../store/moviesSlice";
import { useRouter } from "next/router";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = useCallback((e) => setSearchTerm(e.target.value), []);

  const router = useRouter();

  const dispatch = useAppDispatch();
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(fetchSearchedMovie(searchTerm));
      router.push({ pathname: "/search", query: { q: searchTerm } });
      setSearchTerm("");
    },
    [searchTerm]
  );

  return (
    <form className="searchBar" onSubmit={handleSubmit}>
      <Search width={25} height={25} />
      <input
        type="text"
        placeholder="Search movies, TV shows, more..."
        value={searchTerm}
        onChange={handleChange}
      />
      <input type="submit" hidden />
    </form>
  );
}

export default SearchBar;
