var courses = []
var maxRandValue = 20
var slotSizes = [40, 40, 40, 19, 19, 19, 19, 14, 12, 10, 10]
var numRands = Math.floor(slotSizes.reduce((a, b) => a + b) / (maxRandValue / 2))
var slots = []
var avgOverFlow;
console.log("Total Num of Courses:", numRands)
var textColor = "#333"

function generateRands(fill, part) {
	part = part || 1
	for (var i = 0; i < numRands * part; i++) {
		courses.push({
			val: Math.floor(Math.random() * (maxRandValue - 1)) + 1,
			fill: fill
		})
	}

}

function fillInSlots() {
	slotSizes.forEach(size => {
		slots.push({
			alloted: size,
			courses: [],
			spaceLeft: size
		})
	})
}

function fillErIn(color) {
	courses.sort((x, y) => y.val - x.val)
	function mostSpace() {
		return slots.reduce((mostSpace, slot, i) => {
			return slots[mostSpace].spaceLeft >= slot.spaceLeft ? mostSpace : i
		}, 0)
	}
	courses.forEach(course => {
		var i = mostSpace()
		if(color)
			course.fill = color;
		slots[i].courses.push(course)
		slots[i].spaceLeft -= course.val
	})
	courses = []
}

function display() {
	var x = 50
	var y = 50
	var unit = 20
	var space = 2
	slots.forEach(slot => {
		var barX = x;
		draw.fillStyle = "#AAA"
		draw.fillRect(x, y, unit * slot.alloted, unit * 3)
		y += unit
		slot.courses.forEach(course => {
			draw.fillStyle = course.fill;
			barX += space
			draw.fillRect(barX, y, unit * course.val - space, unit * 2)
			draw.fillStyle = textColor
			draw.fillText(course.val,barX+((unit * course.val - space)/2),y+unit)
			barX += unit * course.val
		})
		draw.fillStyle = textColor
		draw.fillText(slot.spaceLeft * -1,barX+unit,y+unit)
		y += unit * 3
	})

}

function colorMeMine() {
	function colorGenerator() {
		var max = 255;
		var min = 0;
		function meep () {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		return "rgb("+meep()+","+meep()+","+meep()+")";
	}
	slots.forEach(slot => {
		var green = colorGenerator()
		slot.courses.forEach( course => {
			course.fill = green;
			courses.push(course)
		})
	})
	slots = []
	fillInSlots()
}

function fireSomePeople(){
	function adjustTime(newTime,id){
		guy = slots[id]
		guy.alloted = newTime
		while(guy.courses.reduce((x,y) => x + y.val,0) > guy.alloted+3){
			courses.push(guy.courses.pop())
		}
		console.log(guy.alloted,guy.courses.reduce((x,y) => x + y.val,0))
		guy.spaceLeft = guy.alloted - guy.courses.reduce((x,y) => x + y.val,0)
	}
	[19, 40, 11, 40, 19, 30, 9, 14, 40, 10, 10].forEach(adjustTime)
//	slots.sort((x,y) => y.alloted-x.alloted)
}

function AllInOne() {
	generateRands("#389")
	fillErIn()
}

function partWay() {
	generateRands("#389")
	fillErIn()
	fireSomePeople()
	fillErIn("#593")
}

function splitMerge(){
	generateRands("#389")
	fillErIn()
	fireSomePeople()
	colorMeMine()
	fireSomePeople()
	fillErIn()
}

function init() {
	draw.textAlign="center"
	draw.textBaseline="middle"
	draw.font="20px Arial"
	fillInSlots()
//	AllInOne()
	partWay()
//	splitMerge()
	display()
	console.log(slots)
}
