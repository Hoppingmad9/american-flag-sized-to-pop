function setup() {

	scaling = Math.min(window.innerWidth/1.9, window.innerHeight)

	flag_height = 1*scaling
	flag_width = 1.9*scaling
	canton_height = flag_height*7/13
	canton_width = flag_width*2/5
	star_vert_space = canton_height/10
	star_horiz_space = canton_width/12
	stripe_height = flag_height/13
	star_outer_rad = stripe_height*4/5/2
	star_inner_rad = star_outer_rad*30/70

	state_pops = [	['Alabama',4888949,22,43,0,'AL'],
				['Alaska',738068,49,1,0,'AK'],
				['Arizona',7123898,48,40,0,'AZ'],
				['Arkansas',3020327,25,41,0,'AR'],
				['California',39776830,31,34,0,'CA'],
				['Colorado',5684203,38,29,0,'CO'],
				['Connecticut',3588683,5,16,5,'CT'],
				['Delaware',971180,1,39,8,'DE'],
				['Florida',21312211,27,50,0,'FL'],
				['Georgia',10545138,4,49,13,'GA'],
				['Hawaii',1426393,50,45,0,'HI'],
				['Idaho',1753860,43,13,0,'ID'],
				['Illinois',12768320,21,20,0,'IL'],
				['Indiana',6699629,19,31,0,'IN'],
				['Iowa',3160553,29,14,0,'IA'],
				['Kansas',2918515,34,30,0,'KS'],
				['Kentucky',4472265,15,37,0,'KY'],
				['Louisiana',4682509,18,47,0,'LA'],
				['Maine',1341582,23,6,0,'ME'],
				['Maryland',6079602,7,32,9,'MD'],
				['Massachusetts',6895917,6,11,3,'MA'],
				['Michigan',9991177,26,4,0,'MI'],
				['Minnesota',5628162,32,9,0,'MN'],
				['Mississippi',2982785,20,48,0,'MS'],
				['Missouri',6135888,24,25,0,'MO'],
				['Montana',1062330,41,2,0,'MT'],
				['Nebraska',1932549,37,24,0,'NE'],
				['Nevada',3056824,36,23,0,'NV'],
				['New Hampshire',1350575,9,17,1,'NH'],
				['New Jersey',9032872,3,22,7,'NJ'],
				['New Mexico',2090708,47,35,0,'NM'],
				['New York',19862512,11,10,2,'NY'],
				['North Carolina',10390149,12,38,11,'NC'],
				['North Dakota',755238,39,3,0,'ND'],
				['Ohio',11694664,17,26,0,'OH'],
				['Oklahoma',3940521,46,36,0,'OK'],
				['Oregon',4199563,33,12,0,'OR'],
				['Pennsylvania',12823989,2,21,6,'PA'],
				['Rhode Island',1061712,13,28,4,'RI'],
				['South Carolina',5088916,8,44,12,'SC'],
				['South Dakota',877790,40,8,0,'SD'],
				['Tennessee',6782564,16,42,0,'TN'],
				['Texas',28704330,28,46,0,'TX'],
				['Utah',3159345,45,18,0,'UT'],
				['Vermont',623960,14,5,0,'VT'],
				['Virginia',8525660,10,33,10,'VA'],
				['Washington',7530552,42,7,0,'WA'],
				['West Virginia',1803077,35,27,0,'WV'],
				['Wisconsin',5818049,30,15,0,'WI'],
				['Wyoming',573720,44,19,0,'WY'],
			]

	normal_flag = false
	negative_bug = false
	star_order = 4 // 1 alphabetical, 2 population, 3 order of admittance, 4 geographical
	ascending = true
	name_tags = true

	if (star_order == 1) {
		state_pops.sort(compareFirstColumn);
		if (!ascending) {
			state_pops.reverse()
		}
		stripe_state_pops = state_pops
	} else if (star_order == 2) {
		state_pops.sort(compareSecondColumn);
		if (!ascending) {
			state_pops.reverse()
		}
		stripe_state_pops = state_pops
	} else if (star_order == 3) {
		state_pops.sort(compareThirdColumn);
		if (!ascending) {
			state_pops.reverse()
		}
		stripe_state_pops = state_pops
	} else if (star_order == 4) {
		stripe_state_pops = [...state_pops]
		state_pops.sort(compareFourthColumn);
		stripe_state_pops.sort(compareFifthColumn);
		if (!ascending) {
			state_pops.reverse()
			stripe_state_pops.reverse()
		}
	}

	orig_states_total_pop = 0

	for (let i = 0; i < stripe_state_pops.length; i++) {
		if (stripe_state_pops[i][2] < 14) {
			orig_states_total_pop += stripe_state_pops[i][1]
		}
	}

	/*
	for (let i = 0; i < original_states.length; i++) {
		orig_states_total_pop += state_pops[original_states[i][0]][1]
	}*/

	stripe_heights = []

	for (let i = 0; i < stripe_state_pops.length; i ++) {
		if (stripe_state_pops[i][2] < 14) {
			if (stripe_heights.length == 0) {
				stripe_heights.push([stripe_state_pops[i][1]/orig_states_total_pop*flag_height, 0, stripe_state_pops[i][5]])
			} else {
				stripe_heights.push([stripe_state_pops[i][1]/orig_states_total_pop*flag_height, stripe_heights[stripe_heights.length-1][0]+stripe_heights[stripe_heights.length-1][1], stripe_state_pops[i][5]])
			}
		}
	}


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

	star_scalers = []
	star_scaling = 1.7
	smallest_star = 0.05

	if (negative_bug) {
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

	createCanvas(flag_width, flag_height);
	background(0,0,0);
	strokeWeight(0);

	textAlign(CENTER, CENTER)
	textSize(6)
	stroke('#000000')

	fill("#B22234")
	rect(0,0,flag_width,stripe_heights[0][0])
	if (name_tags) {
		strokeWeight(1)
		fill("#FFFFFF")
		text(stripe_heights[0][2], flag_width/2, stripe_heights[0][0]/2+stripe_heights[0][1])
		strokeWeight(0)
	}
	for (let i = 0; i < 6; i++){
		fill("#FFFFFF")
		rect(0,stripe_heights[i*2+1][1],flag_width,stripe_heights[i*2+1][0])
		if (name_tags) {
			strokeWeight(1)
			fill("#FFFFFF")
			text(stripe_heights[i*2+1][2], flag_width/2, stripe_heights[i*2+1][0]/2+stripe_heights[i*2+1][1])
			strokeWeight(0)
		}
		fill("#B22234")
		rect(0,stripe_heights[i*2+2][1],flag_width,stripe_heights[i*2+2][0])
		if (name_tags) {
			strokeWeight(1)
			fill("#FFFFFF")
			text(stripe_heights[i*2+2][2], flag_width/2, stripe_heights[i*2+2][0]/2+stripe_heights[i*2+2][1])
			strokeWeight(0)
		}
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
			if (name_tags) {
				rotate(-0.95)
				strokeWeight(1)
				text(state_pops[j+i*11][5], 0, 0)
			}
			pop()
		}
		for (let j = 0; j < 5; j++) {
			push()
			translate(star_horiz_space*(j*2+2), star_vert_space*(i*2+2))
			rotate(0.95)
			star_inner_rad_scaled = star_inner_rad * star_scalers[j+i*11+6]
			star_outer_rad_scaled = star_outer_rad * star_scalers[j+i*11+6]
			star(0, 0, star_inner_rad_scaled, star_outer_rad_scaled, 5);
			if (name_tags) {
				rotate(-0.95)
				strokeWeight(1)
				text(state_pops[j+i*11+6][5], 0, 0)
			}
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
		if (name_tags) {
			rotate(-0.95)
			strokeWeight(1)
			text(state_pops[j+44][5], 0, 0)
		}
		pop()
	}

}

function compareFifthColumn(a, b) {
    if (a[4] === b[4]) {
        return 0;
    }
    else {
        return (a[4] < b[4]) ? -1 : 1;
    }
}

function compareFourthColumn(a, b) {
    if (a[3] === b[3]) {
        return 0;
    }
    else {
        return (a[3] < b[3]) ? -1 : 1;
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
