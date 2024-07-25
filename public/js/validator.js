export const validate = (frames, pageNumber) => {
    if (Number.isNaN(frames)) {
        alert("Please enter a number for number of frames!");
        return false;
    } if (frames == 0 || frames < 0) {
        alert("Number of frames cant be 0 or negative! Please enter a valid input");
        return false;
    }
    if (Number.isNaN(pageNumber)) {
        alert("Please enter a number for page number!");
        return false;
    }
    if (pageNumber < 0) {
        alert("Page number cant be negative! Please enter a valid input");
        return false;
    }
    return true;
}