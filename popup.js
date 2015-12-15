window.onload = function() {
	document.getElementById('span_fact').innerHTML = todayinhistory[0]
}

// stored in array as 'yyyy-mm-dd'
function get_date_string() {
	var today = new Date()
	var dd = today.getDate()
	var mm = today.getMonth()+1; //January is 0!

	if (dd<10) {
		dd = '0'+dd
	}
	if (mm<10) {
		mm = '0'+mm
	}

	return mm + "-" + dd
}

// index of todayinhistory[] array
// starting_date = 'mm-dd'
function bin_search_get_start_idx(date_to_match) {
	var startIndex  = 0,
        stopIndex   = todayinhistory.length - 1,
        middle      = Math.floor((stopIndex + startIndex)/2);

    var cnt = 0
	while (date_compare(date_to_match, get_month_day_from_list(middle)) != 0 && startIndex < stopIndex) {
		cnt++;
		if (date_compare(date_to_match, get_month_day_from_list(middle)) == 1) { // first date larger
			startIndex = middle + 1;
		} else {
			stopIndex = middle - 1;
		}

		middle = Math.floor((stopIndex+startIndex) / 2)
	}

	while (middle > 0 && date_compare(date_to_match, get_month_day_from_list(middle-1)) == 0) {
		middle--;
	}

	//console.log("Finding index of " + date_to_match + " took " + cnt + " loops, index found: " + middle)
	return middle;
}

function get_month_day_from_list(idx) {
	return todayinhistory[idx].date.substring(5);
}

// compare two dates such as '03-26' and '07-26' -> return 1 if first larger, 2 if second, 0 if equal
function date_compare(d1, d2) {
	var m1 = parseInt(d1.split('-')[0])
	var m2 = parseInt(d2.split('-')[0])

	if (m1 > m2) {
		return 1
	} else if (m1 < m2) {
		return 2
	} 

	var day1 = parseInt(d1.split('-')[1])
	var day2 = parseInt(d2.split('-')[1])

	if (day1 > day2) {
		return 1
	} else if (day1 < day2) {
		return 2
	} else {
		return 0
	}
}


function test_search() {
	var daysInMonth = [null, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

	for (var month = 1; month <= 12; month++) {
		for (var day = 1; day <= daysInMonth[month]; day++) {
			var month_day = month + "-" + day;
			var idx = bin_search_get_start_idx(month_day)

			if (idx == 0) {
				continue
			}
			if (date_compare(month_day, get_month_day_from_list(idx)) == 0 
				&& date_compare(month_day, get_month_day_from_list(idx-1)) == 1) {
				// no problem here
			} else {
				console.log("problem for " + month_day + ", index found: " + idx)
			}
		}
	}
}