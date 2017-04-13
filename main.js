var schedules = [[0,3],[2,5],[1,3],[0,2],[1,5],[3,5]]
.map(block => {return {start:block[0],end:block[1]}})

var workday = schedules.reduce( (workday,block) => {
	workday.start = workday.start < block.start ? workday.start : block.start
	workday.end = workday.end > block.end ? workday.end : block.end
	return workday
}, {start:schedules[0].start,end:schedules[0].end})

var Workspace = function(block){
	this.blocks = [block]
	this.hasOverlap = (x,y) => {
		// if the start and end of x is less than the start of y
		// or the other way around
		return ( x.start < y.start && x.end <= y.start ) ||
			   ( y.start < x.start && y.end <= x.start )
	}
	this.hasSpace = candidate => {
		this.blocks.forEach( block => {
			if(this.hasOverlap(block,candidate))
				return false
		})
		return true
	}
	return {
		blocks:this.blocks,
		hasSpace:this.hasSpace
	}
}

console.log(Workspace(schedules[0]))
