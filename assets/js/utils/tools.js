/**
 * @return {boolean}
 */
function GetPageIdFromUrl(re, str) {
    const regex = re;
    let m;

    let id = false;
    if ((m = regex.exec(str)) !== null) {
        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            if (groupIndex === 1) {
                id = match
            }
        });
    }

    return id;
}