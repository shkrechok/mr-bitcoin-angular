
function store(key:any, value:any) {
    localStorage[key] = JSON.stringify(value);
}

function load(key:any, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}
export const storageService = {
    store,
    load
}
