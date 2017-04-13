var courses = []
var maxRandValue = 20
var slotSizes = [40, 40, 40, 19, 19, 19, 19, 14, 12, 10, 10]
var numRands = Math.floor(slotSizes.reduce((a, b) => a + b) / (maxRandValue / 2))
var slots = []
console.log("Total Num of Courses:", numRands)

function generateRands(fill, part) {
	part = part || 1
	for (var i = 0; i < numRands * part; i++) {
		courses.push({
			val: Math.floor(Math.random() * (maxRandValue - 1)) + 1,
			fill: fill
		})
	}
	courses.sort((x, y) => y.val - x.val)
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

function mostSpace() {
	return slots.reduce((mostSpace, slot, i) => {
		return slots[mostSpace].spaceLeft >= slot.spaceLeft ? mostSpace : i
	}, 0)
}

function fillErIn() {
	courses.forEach(course => {
		var i = mostSpace()
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
		draw.fillStyle = "#AAA"
		draw.fillRect(x, y, unit * slot.alloted, unit * 3)
		var barX = x;
		y += unit
		slot.courses.forEach(course => {
			draw.fillStyle = course.fill;
			barX += space
			draw.fillRect(barX, y, unit * course.val - space, unit * 2)
			barX += unit * course.val
		})
		y += unit * 3
	})
}

function greenGenerator() {
	var max = 250;
	var min = 50;
	var green = Math.floor(Math.random() * (max - min + 1)) + min;
	return "rgb(0," + green + ",0)";
}

function colorMeMine() {
	slots.forEach(slot => {
		var green = greenGenerator()
		slot.courses.forEach( course => {
			course.fill = green;
			courses.push(course)
		})
	})
	slots = []
	fillInSlots()
}

function AllInOne() {
	generateRands("#389")
	fillErIn()
}

function partWay() {
	generateRands("#389", .7)
	fillErIn()
	generateRands("#593", .3)
	fillErIn()
}

function splitMerge(){
	generateRands("#593", .7)
	fillErIn()
	colorMeMine()
	console.log(slots,courses)
	generateRands("#389", .3)
	fillErIn()
}


function init() {
	fillInSlots()
//	AllInOne()
//	partWay()
	splitMerge()
	display()
	console.log(slots.map(slot => slot.spaceLeft))
}
