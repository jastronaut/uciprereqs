const MAX_HIST = 4;

class HistoryList {
    history: Array<string>
    constructor() {
        this.history = [];
    }

    all() {
        return this.history;
    }

    add = (course: string) => {
        const index = this.history.indexOf(course);
        if (index < 0) {
            this.history.unshift(course);
            if (this.history.length > MAX_HIST)
                this.history.pop();
        } else {
            this.history = this.history.splice(0, index).concat(this.history.splice(index + 1, this.history.length));
        }
        return this;
    }

};

export default HistoryList;