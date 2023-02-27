import React, { useCallback, useState } from "react";
import { Close, Search } from "@/public/assets";
import { useRouter } from "next/router";

function SearchBar({
  isSearchBarOpen,
  setIsSearchBarOpen,
}: {
  isSearchBarOpen: boolean;
  setIsSearchBarOpen: (value: boolean) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = useCallback((e) => setSearchTerm(e.target.value), []);

  const router = useRouter();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      router.push({ pathname: "/search", query: { q: searchTerm } });
      setSearchTerm("");
    },
    [searchTerm]
  );

  return (
    <form
      className={`searchBar ${isSearchBarOpen && "activeSearchBar"}`}
      onSubmit={handleSubmit}
    >
      <Search
        width={isSearchBarOpen ? 35 : 25}
        height={isSearchBarOpen ? 35 : 20}
      />
      <input
        type="text"
        placeholder="Search Movies, TV shows, more..."
        value={searchTerm}
        onChange={handleChange}
      />
      <input type="submit" hidden />
      {isSearchBarOpen && (
        <button onClick={() => setIsSearchBarOpen(false)}>
          <Close stroke="#cb9e0c" />
        </button>
      )}
    </form>
  );
}

export default SearchBar;
