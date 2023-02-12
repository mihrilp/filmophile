import { useEffect } from "react";

export function useRandomMedia(){
    useEffect(() => {
        randomMedia && dispatch(setBannerData(randomMedia));
        console.log(randomMedia);
      }, [randomMedia]);
}