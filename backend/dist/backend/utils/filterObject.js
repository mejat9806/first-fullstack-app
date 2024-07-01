export function filterObjectsForUpdate(reqBodyObject, ...allowedFields) {
    const newObjects = {}; //this is index signature
    Object.keys(reqBodyObject).forEach((key) => {
        if (allowedFields.includes(key)) {
            newObjects[key] = reqBodyObject[key];
        }
    });
    return newObjects;
}
//this is use to filter out objects so no unnecessary data from req.body can be send here
