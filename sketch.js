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

	state_pops = [	['Alabama',4888949],
					['Alaska',738068],
					['Arizona',7123898],
					['Arkansas',3020327],
					['California',39776830],
					['Colorado',5684203],
					['Connecticut',3588683],
					['Delaware',971180],
					['Florida',21312211],
					['Georgia',10545138],
					['Hawaii',1426393],
					['Idaho',1753860],
					['Illinois',12768320],
					['Indiana',6699629],
					['Iowa',3160553],
					['Kansas',2918515],
					['Kentucky',4472265],
					['Louisiana',4682509],
					['Maine',1341582],
					['Maryland',6079602],
					['Massachusetts',6895917],
					['Michigan',9991177],
					['Minnesota',5628162],
					['Mississippi',2982785],
					['Missouri',6135888],
					['Montana',1062330],
					['Nebraska',1932549],
					['Nevada',3056824],
					['New Hampshire',1350575],
					['New Jersey',9032872],
					['New Mexico',2090708],
					['New York',19862512],
					['North Carolina',10390149],
					['North Dakota',755238],
					['Ohio',11694664],
					['Oklahoma',3940521],
					['Oregon',4199563],
					['Pennsylvania',12823989],
					['Rhode Island',1061712],
					['South Carolina',5088916],
					['South Dakota',877790],
					['Tennessee',6782564],
					['Texas',28704330],
					['Utah',3159345],
					['Vermont',623960],
					['Virginia',8525660],
					['Washington',7530552],
					['West Virginia',1803077],
					['Wisconsin',5818049],
					['Wyoming',573720]]

	largest_pop = 0

	for (let i = 0; i < state_pops.length; i++) {
		if ((state_pops[i][1]) > largest_pop) {
			largest_pop = state_pops[i][1]
		}
	}

	star_scalers = []
	star_scaling = 2.7

	largest_pop = Math.log(largest_pop/100000)/Math.log(10)

	for (let i = 0; i < state_pops.length; i++) {
		temp_pop = Math.log(state_pops[i][1]/1000000)/Math.log(10)
		star_scalers.push(temp_pop/largest_pop*star_scaling)
	}

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

	orig_states_total_pop = 0

	for (let i = 0; i < original_states.length; i++) {
		orig_states_total_pop += state_pops[original_states[i][0]][1]
	}

	stripe_heights = []

	for (let i = 0; i < original_states.length; i++) {
		if (i == 0) {
			stripe_heights.push([state_pops[original_states[i][0]][1]/orig_states_total_pop*flag_height, 0])
		} else {
			stripe_heights.push([state_pops[original_states[i][0]][1]/orig_states_total_pop*flag_height, stripe_heights[i-1][0]+stripe_heights[i-1][1]])
		}
	}

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
