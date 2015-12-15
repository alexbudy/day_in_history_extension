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
function get_start_idx(starting_date) {
	var len = todayinhistory.length

	return bin_search(Math.floor(len/2), starting_date)	
}

function bin_search(idx, date_to_match) {
	
	if (date_compare(date_to_match, get_month_day_from_list(idx)) == 0) {
		while (date_compare(date_to_match, get_month_day_from_list(idx-1)) == 0) {
			idx--;
		}
		return idx;
	}


	if (date_compare(date_to_match, get_month_day_from_list(idx)) == 1) { // first date larger
		return bin_search(Math.floor((idx + todayinhistory.length)/2), date_to_match)
	} else {
		return bin_search(Math.floor(idx/2), date_to_match)
	}

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