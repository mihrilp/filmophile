function isMovie(result: Movie | Person | TvShow): result is Movie {
    return result.media_type === "movie";
}

function isPerson(result: Movie | Person | TvShow): result is Person {
    return result.media_type === "person";
}

function isTvShow(result: Movie | Person | TvShow): result is TvShow {
    return result.media_type === "tv";
}

export function filterSearchResults(
    results: (Movie | Person | TvShow)[],
    mediaType: string
): (Movie | Person | TvShow)[] {
    switch (mediaType) {
        case "movie":
            return results.filter(isMovie);
        case "person":
            return results.filter(isPerson);
        case "tv":
            return results.filter(isTvShow);
        default:
            return results;
    }
}

export function formatDate(date: string) {
    let splittedDate: string[] = date.split("-");
    return `${splittedDate[2]}.${splittedDate[1]}.${splittedDate[0]}`;
}

export function formatRuntime(runtime: number) {
    if(runtime < 60) {
        return `${runtime}m`;
    } else {
        return `${Math.floor(runtime / 60)}h ${runtime % 60}m`;
    }
}

export function addRecentlyViewedItem(item: Movie | TvShow) {
    let recentlyViewed =
      JSON.parse(localStorage.getItem("recentlyViewed")!) || [];
    if (recentlyViewed.length === 0) {
      recentlyViewed.push(item);
    } else {
      recentlyViewed.every(( element: Movie | TvShow) => {
        return element.id !== item.id;
      }) && recentlyViewed.unshift(item);
    }
    if (recentlyViewed.length > 5) recentlyViewed.pop();
    localStorage.setItem(
      "recentlyViewed",
      JSON.stringify(recentlyViewed)
    );
}
