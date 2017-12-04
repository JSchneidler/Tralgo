class Point {
	constructor(name, type, edges, visited = false) {
		this.name = name;
		this.type = type;
		this.edges = edges;
		this.visited = visited;

		this.trailhead = this.type === Point.TRAILHEAD;
		this.deadEnd = (!this.isTrailhead()) && (this.edges.length === 1);
	}
	
	visit() { this.visited = true; }
	wasVisited() { return this.visited; }

	isTrailhead() {
		return this.trailhead;
	}
	isDeadEnd() {
		return this.deadEnd;
	}
	
	getEdges() {
		return this.edges;
	}
}

Point.TRAILHEAD = 'Trailhead';
Point.JUNCTION = 'Junction';

module.exports = Point;