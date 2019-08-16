import {enable_spin} from '/spinner.js';
import {disable_spin} from '/spinner.js';


export async function getName(){
	enable_spin()
	document.getElementById("my-text-box").innerHTML = ""
	var username = document.getElementById("text_username").value;
	var profile = await HttpGet('https://anirec.appspot.com/'+username);
	if (profile.status==4004){response_text(0)}
	else if (profile[0]["status"]==1){
		displayJSON(profile)
		document.getElementById("display1").style.display = 'none';
		$("#lightSlider2").lightSlider({observer: true,observeParents: true});
		document.getElementById("display2").style.display = 'block';
		disable_spin()
	}
	else if(profile[0]["status"]==0){
		response_text(1)
	}
}

export function EnterToClick(){
	var username = document.getElementById("text_username");
	username.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
		 event.preventDefault();
		 document.getElementById("btn_user").click();
		}
	});
}

export async function getExample(){
  fetch("./exam.json")
	.then(function(resp){
		return resp.json();
	})
	.then(function(data){
		displayJSON(data)
		enable_spin()
		setTimeout(function() {
			document.getElementById("display1").style.display = 'none';
			$("#lightSlider2").lightSlider({observer: true,observeParents: true});
			document.getElementById("display2").style.display = 'block';
			disable_spin()
		}, 1000);
	})
}

async function HttpGet(url){
  return $.get(url)
  .then((response)=> {return response})
  .catch(error => {
    if(error.status === 429){
      setTimeout(()=> HttpGet(url),10000)
    }
    else if(error.status === 404){
      response_text(1)
      return error.responseText
    }
		else{
			response_text(2)
			return error.responseText
		}
    })
}

function response_text(val){
		if(val==1){document.getElementById('my-text-box').innerHTML = "Error 404: Username not found in database";}
    else if (val==0){document.getElementById('my-text-box').innerHTML = "Error 4004: Please enter a username";}
		else if (val==2){ document.getElementById('my-text-box').innerHTML = "Error **:An unknown error occurred";}
		disable_spin()
};


//my_nums=[1,2904,5114,4224,35839,32281,11887,23273,13125,31859]



function displayJSON(data){
	var a=data[4]["favs"]
	console.log(typeof a,a)
	if (data[0]["status"]==1){
	document.getElementById("profile_url").href=data[2]["profile"][0]["profile_url"]
	document.getElementById("profile_url").title=data[2]["profile"][0]["profile_url"]
	document.getElementById("profile_image").src=data[2]["profile"][0]["image_url"]
	document.getElementById("insert_username").innerHTML=data[2]["profile"][0]["username"]
	document.getElementById("insert_stats_0").innerHTML=data[2]["profile"][0]["anime_stats"]["days_watched"]
	document.getElementById("insert_stats_1").innerHTML=data[2]["profile"][0]["anime_stats"]["mean_score"]
	document.getElementById("insert_stats_2").innerHTML=data[2]["profile"][0]["anime_stats"]["total_entries"]
	document.getElementById("insert_stats_3").innerHTML=data[2]["profile"][0]["anime_stats"]["episodes_watched"]
	document.getElementById("insert_stats_4").innerHTML=data[2]["profile"][0]["anime_stats"]["completed"]
	document.getElementById("insert_stats_5").innerHTML=data[2]["profile"][0]["anime_stats"]["watching"]
	document.getElementById("insert_stats_6").innerHTML=data[2]["profile"][0]["anime_stats"]["on_hold"]
	document.getElementById("insert_stats_7").innerHTML=data[2]["profile"][0]["anime_stats"]["dropped"]
	document.getElementById("insert_stats_8").innerHTML=data[2]["profile"][0]["anime_stats"]["plan_to_watch"]

	for (var i =0;i<20;i++){
		document.getElementById("rec_a_img_"+(i+1)).src=data[3]["recs"][i]["image_url"]
		document.getElementById("rec_a_url_"+(i+1)).title=data[3]["recs"][i]["title"]
		document.getElementById("rec_a_url_"+(i+1)).href=data[3]["recs"][i]["anime_url"]

		if(i<10){
			document.getElementById("rec_g_img_"+(i+1)).src=data[4]["favs"][i]["image_url"]
			document.getElementById("rec_g_url_"+(i+1)).title=data[4]["favs"][i]["title"]
			document.getElementById("rec_g_url_"+(i+1)).href=data[4]["favs"][i]["anime_url"]
			}
}
	}

}
