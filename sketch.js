function setup() {

	console.log(window.innerWidth/1.9)
	console.log(window.innerHeight)

	scaling = Math.min(window.innerWidth/1.9, window.innerHeight)
	console.log(scaling)

	flag_height = 1*scaling
	flag_width = 1.9*scaling
	canton_height = flag_height*7/13
	canton_width = flag_width*2/5
	star_vert_space = canton_height/10
	star_horiz_space = canton_width/12
	stripe_height = flag_height/13
	star_outer_rad = stripe_height*4/5/2
	star_inner_rad = star_outer_rad*30/70

	state_pops = [	['Alabama',4888949,22],
				['Alaska',738068,49],
				['Arizona',7123898,48],
				['Arkansas',3020327,25],
				['California',39776830,31],
				['Colorado',5684203,38],
				['Connecticut',3588683,5],
				['Delaware',971180,1],
				['Florida',21312211,27],
				['Georgia',10545138,4],
				['Hawaii',1426393,50],
				['Idaho',1753860,43],
				['Illinois',12768320,21],
				['Indiana',6699629,19],
				['Iowa',3160553,29],
				['Kansas',2918515,34],
				['Kentucky',4472265,15],
				['Louisiana',4682509,18],
				['Maine',1341582,23],
				['Maryland',6079602,7],
				['Massachusetts',6895917,6],
				['Michigan',9991177,26],
				['Minnesota',5628162,32],
				['Mississippi',2982785,20],
				['Missouri',6135888,24],
				['Montana',1062330,41],
				['Nebraska',1932549,37],
				['Nevada',3056824,36],
				['New Hampshire',1350575,9],
				['New Jersey',9032872,3],
				['New Mexico',2090708,47],
				['New York',19862512,11],
				['North Carolina',10390149,12],
				['North Dakota',755238,39],
				['Ohio',11694664,17],
				['Oklahoma',3940521,46],
				['Oregon',4199563,33],
				['Pennsylvania',12823989,2],
				['Rhode Island',1061712,13],
				['South Carolina',5088916,8],
				['South Dakota',877790,40],
				['Tennessee',6782564,16],
				['Texas',28704330,28],
				['Utah',3159345,45],
				['Vermont',623960,14],
				['Virginia',8525660,10],
				['Washington',7530552,42],
				['West Virginia',1803077,35],
				['Wisconsin',5818049,30],
				['Wyoming',573720,44],
			]

	original_states = [[6, 'Connecticut'],
	[7, 'Delaware'],
	[9, 'Georgia'],
	[19, 'Maryland'],
	[20, 'Massachusetts'],
	[28, 'New Hampshire'],
	[29, 'New Jersey'],
	[31, 'New York'],
	[32, 'North Carolina'],
	[37, 'Pennsylvania'],
	[38, 'Rhode Island'],
	[39, 'South Carolina'],
	[45, 'Virginia']]

	star_order = 3 // 1 alphabetical, 2 population, 3 order of admittance

	if (star_order == 1) {
		state_pops.sort(compareFirstColumn);
	} else if (star_order == 2) {
		state_pops.sort(compareSecondColumn);
	} else if (star_order == 3) {
		state_pops.sort(compareThirdColumn);
	}

	orig_states_total_pop = 0

	for (let i = 0; i < state_pops.length; i++) {
		if (state_pops[i][2] < 14) {
			orig_states_total_pop += state_pops[i][1]
		}
	}

	/*
	for (let i = 0; i < original_states.length; i++) {
		orig_states_total_pop += state_pops[original_states[i][0]][1]
	}*/

	stripe_heights = []

	for (let i = 0; i < state_pops.length; i ++) {
		if (state_pops[i][2] < 14) {
			if (stripe_heights.length == 0) {
				stripe_heights.push([state_pops[i][1]/orig_states_total_pop*flag_height, 0])
			} else {
				stripe_heights.push([state_pops[i][1]/orig_states_total_pop*flag_height, stripe_heights[stripe_heights.length-1][0]+stripe_heights[stripe_heights.length-1][1]])
			}
		}
	}

	normal_flag = true

	if (normal_flag) {
		stripe_heights = []
		for (let i = 0; i < 13; i++) {
			stripe_heights.push([flag_width/13,flag_width/13*i])
		}
	}

	/*
	for (let i = 0; i < original_states.length; i++) {
		if (i == 0) {
			stripe_heights.push([state_pops[original_states[i][0]][1]/orig_states_total_pop*flag_height, 0])
		} else {
			stripe_heights.push([state_pops[original_states[i][0]][1]/orig_states_total_pop*flag_height, stripe_heights[i-1][0]+stripe_heights[i-1][1]])
		}
	}*/

	largest_pop = 0
	smallest_pop = 9999999999999

	for (let i = 0; i < state_pops.length; i++) {
		if ((state_pops[i][1]) > largest_pop) {
			largest_pop = state_pops[i][1]
		}
		if ((state_pops[i][1]) < smallest_pop) {
			smallest_pop = state_pops[i][1]
		}
	}

	console.log(smallest_pop)

	star_scalers = []
	star_scaling = 1.7
	smallest_star = 0.05

	if (false) {
		// show negative star size // BUG:
		smallest_pop = 1000000
	}

	largest_pop = Math.log(largest_pop/smallest_pop)/Math.log(10)

	for (let i = 0; i < state_pops.length; i++) {
		temp_pop = Math.log(state_pops[i][1]/smallest_pop)/Math.log(10)
		star_scalers.push(temp_pop/largest_pop*(star_scaling-smallest_star)+smallest_star)
	}

	if (normal_flag) {
		star_scalers = []
		for (let i = 0; i < 50; i++) {
			star_scalers.push(1)
		}
	}

	console.log(star_scalers)

	createCanvas(flag_width, flag_height);
	background(0,0,0);
	strokeWeight(0);
	fill("#B22234")
	rect(0,0,flag_width,stripe_heights[0][0])
	for (let i = 0; i < 6; i++){
		fill("#FFFFFF")
		rect(0,stripe_heights[i*2+1][1],flag_width,stripe_heights[i*2+1][0])
		fill("#B22234")
		rect(0,stripe_heights[i*2+2][1],flag_width,stripe_heights[i*2+2][0])
	}
	fill("#3C3B6E")
	rect(0,0,canton_width,canton_height)

	fill("#FFFFFF")
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 6; j++) {
			push()
			translate(star_horiz_space*(j*2+1), star_vert_space*(i*2+1))
			rotate(0.95)
			star_inner_rad_scaled = star_inner_rad * star_scalers[j+i*11]
			star_outer_rad_scaled = star_outer_rad * star_scalers[j+i*11]
			star(0, 0, star_inner_rad_scaled, star_outer_rad_scaled, 5);
			pop()
		}
		for (let j = 0; j < 5; j++) {
			push()
			translate(star_horiz_space*(j*2+2), star_vert_space*(i*2+2))
			rotate(0.95)
			star_inner_rad_scaled = star_inner_rad * star_scalers[j+i*11+6]
			star_outer_rad_scaled = star_outer_rad * star_scalers[j+i*11+6]
			star(0, 0, star_inner_rad_scaled, star_outer_rad_scaled, 5);
			pop()
		}
	}
	for (let j = 0; j < 6; j++) {
		push()
		translate(star_horiz_space*(j*2+1), star_vert_space*(9))
		rotate(0.95)
		star_inner_rad_scaled = star_inner_rad * star_scalers[j+44]
		star_outer_rad_scaled = star_outer_rad * star_scalers[j+44]
		star(0, 0, star_inner_rad_scaled, star_outer_rad_scaled, 5);
		pop()
	}

}

function compareThirdColumn(a, b) {
    if (a[2] === b[2]) {
        return 0;
    }
    else {
        return (a[2] < b[2]) ? -1 : 1;
    }
}

function compareSecondColumn(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? -1 : 1;
    }
}

function compareFirstColumn(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function draw() {

}
