const MAX_HIST = 4;

const addCourseHistory = (hist: Array<string>, course: string) => {
    let history = hist;
    const index = history.indexOf(course);
    if (index < 0) {
        history.unshift(course);
        if (history.length > MAX_HIST)
            history.pop();
    } else {
        history = history.splice(0, index).concat(history.splice(index + 1, history.length));
    }
    return history;
}

export default addCourseHistory