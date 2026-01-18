//Baseline Date
var a = new Date(); // Current date now.
var b = new Date(2025, 12, 9, 0, 0, 0, 0); // Start of CHN LNK.
var d = (a - b); // Difference in milliseconds.
var days = parseInt((d / 1000) / 86400);


function saveStats() {
			localStorage.totalclplayed = document.getElementById("chnplayed").value;
       		 	document.getElementById("chnplayed").value = "";
			localStorage.totalclwins = Math.round((document.getElementById("chnwinp").value * localStorage.totalclplayed)/100) ;
        		document.getElementById("chnwinp").value = "";
			localStorage.totalclstreak = document.getElementById("chnstreak").value;
        		document.getElementById("chnstreak").value = "";
			localStorage.totalclstars = document.getElementById("chnstars").value;
        		document.getElementById("chnstars").value = "";
			localStorage.starcl5count = document.getElementById("chn5star").value;
       			document.getElementById("chn5star").value = "";
			localStorage.starcl4count = document.getElementById("chn4star").value;
       	 		document.getElementById("chn4star").value = "";
			localStorage.starcl3count = document.getElementById("chn3star").value;
        		document.getElementById("chn3star").value = "";
			localStorage.starcl2count = document.getElementById("chn2star").value;
        		document.getElementById("chn2star").value = "";
			localStorage.starcl1count = document.getElementById("chn1star").value;
        		document.getElementById("chn1star").value = "";
			// localStorage.starcl0count = document.getElementById("0star").value;
        	// 	document.getElementById("0star").value = "";
			localStorage.starclxcount = document.getElementById("chnxstar").value;
        		document.getElementById("chnxstar").value = "";
        		document.getElementById("answer").style.color = "white";
        		document.getElementById("answer").innerText = "STATS TRANSFERRED SUCCESSFULLY!\n REDIRECTING TO CHN LNK NOW...";
			waitFiveSec();
}

function waitFiveSec(){
    setTimeout(openchnlnk, 5000) /*(here you need to implement delay code)*/
  }

function openchnlnk(){
    window.open("https://sank0403.github.io/chnlnk/","_self")
    //window.close();
  }

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function submitMe() {

        if (Number(document.getElementById("chnplayed").value) >= 0 && Number(document.getElementById("chnwinp").value) >= 0 && Number(document.getElementById("chnstreak").value) >= 0 && Number(document.getElementById("chnstars").value) >= 0 && Number(document.getElementById("chn5star").value) >= 0 && Number(document.getElementById("chn4star").value) >= 0 && Number(document.getElementById("chn3star").value) >= 0 && Number(document.getElementById("chn2star").value) >= 0 && Number(document.getElementById("chn1star").value) >= 0   &&
 Number(document.getElementById("chnxstar").value) >= 0) {
        	//do nothing;
        }
	else {
       		document.getElementById("answer").style.color = "white";
        	document.getElementById("answer").innerText = "ONLY NUMERIC VALUES ALLOWED!";
        	return false;
	}

 	if (document.getElementById("chnplayed").value.includes('.') || document.getElementById("chnwinp").value.includes('.') || document.getElementById("chnstreak").value.includes('.') || document.getElementById("chnstars").value.includes('.') || document.getElementById("chn5star").value.includes('.') || document.getElementById("chn4star").value.includes('.') || document.getElementById("chn3star").value.includes('.') || document.getElementById("chn2star").value.includes('.') || document.getElementById("chn1star").value.includes('.') || document.getElementById("chnxstar").value.includes('.')) {
       		document.getElementById("answer").style.color = "white";
        	document.getElementById("answer").innerText = "NO DECIMAL VALUES ALLOWED'!";
        	return false;
        }
        if (document.getElementById("chnplayed").value == "") {
       		document.getElementById("answer").style.color = "white";
        	document.getElementById("answer").innerText = "ENTER VALUE FOR 'PLAYED'!";
        	return false;
        }
        if (localStorage.getItem('gameovercl' + days) == 1) {
       		 if (Number(document.getElementById("chnplayed").value) > days) {
       			document.getElementById("answer").style.color = "white";
        		document.getElementById("answer").innerText = "CHN LNK HAS NOT BEEN LIVE FOR " + document.getElementById("chnplayed").value + " DAYS. NO CHEATING!";
        		return false;
		}
	}
	else {
       		 if (Number(document.getElementById("chnplayed").value) > (days - 1)) {
       			document.getElementById("answer").style.color = "white";
        		document.getElementById("answer").innerText = "CAN ONLY TRANSFER FOR  " + (days - 1) + " DAYS COVERING STATS UNTIL YESTERDAY! PLAY TODAYS GAME ONCE TRANSFERRED.";
        		return false;
		}
        }

        if (document.getElementById("chnwinp").value == "") {
       		document.getElementById("answer").style.color = "white";
        	document.getElementById("answer").innerText = "ENTER VALUE FOR 'WIN %'!";
        	return false;
        }
        if (Number(document.getElementById("chnwinp").value) > 100) {
       		document.getElementById("answer").style.color = "white";
        	document.getElementById("answer").innerText = "WIN % CANNOT BE GREATER THAN 100!";
        	return false;
        }
        if (document.getElementById("chnstreak").value == "") {
       		document.getElementById("answer").style.color = "white";
        	document.getElementById("answer").innerText = "ENTER VALUE FOR 'STREAK'!";
        	return false;
        }
        if (Number(document.getElementById("chnstreak").value) > Number(document.getElementById("chnplayed").value)) {
       		document.getElementById("answer").style.color = "white";
        	document.getElementById("answer").innerText = "STREAK CANNOT BE LARGER THAN TOTAL PLAYED!";
        	return false;
        }
        if (document.getElementById("chnstars").value == "") {
       		document.getElementById("answer").style.color = "white";
        	document.getElementById("answer").innerText = "ENTER VALUE FOR 'STARS'!";
        	return false;
        }

        if (Number(document.getElementById("chnstars").value) > Number(document.getElementById("chnplayed").value)*5) {
       		document.getElementById("answer").style.color = "white";
        	document.getElementById("answer").innerText = "TOTAL STARS WON CANNOT BE MORE THAN 5 TIMES TOTAL PLAYED!";
        	return false;
        }

        if (document.getElementById("chn5star").value == "" || document.getElementById("chn4star").value == ""  || document.getElementById("chn3star").value == "" || document.getElementById("chn2star").value == "" || document.getElementById("chn1star").value == ""   || document.getElementById("chnxstar").value == "") {
       		document.getElementById("answer").style.color = "white";
        	document.getElementById("answer").innerText = "ENTER ALL VALUES FOR 'STAR DISTRIBUTION'!";
        	return false;
        }
        var CountSD = Number(document.getElementById("chn5star").value) + Number(document.getElementById("chn4star").value) + Number(document.getElementById("chn3star").value) + 	Number(document.getElementById("chn2star").value) + Number(document.getElementById("chn1star").value) +	Number(document.getElementById("chnxstar").value);
	var SumSD = Number(document.getElementById("chn5star").value) * 5 + Number(document.getElementById("chn4star").value) * 4 + Number(document.getElementById("chn3star").value) * 3 + Number(document.getElementById("chn2star").value) * 2 + Number(document.getElementById("chn1star").value) * 1 ;
 

        if (CountSD == Number(document.getElementById("chnplayed").value) && SumSD == Number(document.getElementById("chnstars").value)) {
	    saveStats();
	}
        else if  (CountSD != Number(document.getElementById("chnplayed").value) ) {
       		if (confirm('TOTAL SUM OF STAR DISTRIBUTION (' + CountSD +  ') SHOULD EQUAL TOTAL PLAYED (' + document.getElementById("chnplayed").value + ')! IGNORE THIS ERROR?')) {
		    if (SumSD != Number(document.getElementById("chnstars").value) ) {
			if (confirm('TOTAL STARS OF STAR DISTRIBUTION (' + SumSD +  ') SHOULD EQUAL TOTAL STARS (' + document.getElementById("chnstars").value + ')! IGNORE THIS ERROR?')) {				saveStats();
			}
		    }
		    else {
                       saveStats();
                    }
		}
        }
	else if  (SumSD != Number(document.getElementById("chnstars").value) ) {
		if (confirm('TOTAL STARS OF STAR DISTRIBUTION (' + SumSD +  ') SHOULD EQUAL TOTAL STARS (' + document.getElementById("chnstars").value + ')! IGNORE THIS ERROR?')) {
		   saveStats();
		}
	}
}

