class Path {
    constructor() {
        this.path = [];
    }

    addPoint(point, edge = null) {
        this.path.push({
            point,
            edge,
        });
    }

    error(message) {
        this.path.push({
            error: message
        });
    }
}

module.exports = Path;