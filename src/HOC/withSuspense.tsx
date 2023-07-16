import React, {ComponentType, Suspense} from "react";
import Preloader from "../components/Common/Preloader/Preloader";

export function withSuspense(Component:ComponentType){

        return <div><Suspense fallback={<Preloader/>}>
            <Component />
        </Suspense>
        </div>
}
