
export const updateObjectInArray = (items:any, itemId:number, objectPropName:string, newObjProps:object) => {
    return (
        items.map((u:any) => {
            if (u[objectPropName] === itemId) {
                return {...u, ...newObjProps}
            }
            return u;
        })
    )
}