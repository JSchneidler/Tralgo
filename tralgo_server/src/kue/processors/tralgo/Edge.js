class Edge {
	constructor(name, distance, elevation_gain, points) {
		this.name = name;
		this.distance = distance;
		this.elevation_gain = elevation_gain;
		this.points = points;
	}
	
	getPoints() {
		return this.points;
	}
}

module.exports = Edge;