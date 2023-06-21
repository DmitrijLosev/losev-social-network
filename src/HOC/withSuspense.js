import React, {Suspense} from "react";
import Preloader from "../components/Common/Preloader/Preloader";

export const withSuspense = (Component) => {

        return <div><Suspense fallback={<Preloader/>}>
            <Component />
        </Suspense>
        </div>
}
