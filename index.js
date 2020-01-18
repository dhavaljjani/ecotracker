var d = new Date();
document.getElementById('date').innerHTML = d.toDateString();

function addOption(input){
        if(document.getElementById(input.id).checked){
          /*var form = document.createElement("input");
          form.type = "text";
          var br = document.createElement("br");
          var transport = input.value;
          var text = document.createTextNode("Miles (" + transport + ") travelled: ");
          document.getElementById("transportOption").appendChild(text);
          document.getElementById("transportOption").appendChild(form);
          document.getElementById("transportOption").appendChild(br);*/
          document.getElementById(input.value + "text").style = "display: show";
          document.getElementById(input.value + "input").style = "display: show";
          var br = document.createElement("br");
          document.getElementById(input.value + "input").appendChild(br);
        } else {
          /*var elem = document.getElementById("transportOption");
          elem.innerHTML = " ";*/
          document.getElementById(input.value + "text").style = "display: none";
          document.getElementById(input.value + "input").style = "display: none";
          document.getElementById(input.value + "input").value = "";
    	}
}

function buttonFunction() {
        if(document.getElementById("IDNUMMILES").value.length == 0 || document.getElementById("IDNUMMPG").value.length == 0
         || document.getElementById("goods").value.length == 0){
          alert("Right then, might want to not keep the text fields empty.");
        } else {
        	var lightRailco2 = document.getElementById("lightrailinput").value * 0.36;
			var heavyRailco2 = document.getElementById("heavyrailinput").value * 0.22;
			var commuterRailco2 = document.getElementById("commuterrailinput").value * 0.33;
			var busco2 = document.getElementById("businput").value * 0.64;
			var vanPoolco2 = document.getElementById("vanpoolinput").value * 0.22;
			var tonsPublicTransportco2 = (lightRailco2 + heavyRailco2 + commuterRailco2 + busco2 + vanPoolco2) / 200;

			var tonsco2PerDollar = 12 / 1075;
			var tonsGoodsco2 = document.getElementById("goods").value * tonsco2PerDollar;

	        //console.log(document.getElementById("dietQ").value);
	        var diet = document.getElementById("dietQ").value;
	        var dietTonsPerYear = 0;
	        switch (diet){
	          case("veg"):
	            dietTonsPerYear = 1.7;
	            break;
	          case("vegan"):
	            dietTonsPerYear = 1.5;
	            break;
	          case("average"):
	            dietTonsPerYear = 2.5;
	            break;
	          case("meat"):
	            dietTonsPerYear = 3.3;
	            break;
	        }
	        //console.log("DIET TONS: " + dietTonsPerYear);

	        var isElectric = document.getElementById("electric").checked;
	        var miles = document.getElementById("IDNUMMILES").value;
	        var mpg = document.getElementById("IDNUMMPG").value;
	        var co2Emitted = 0;
	        var co2 = 0;
	        if (mpg <= 14.0) {
	          co2 = 614;
	        } else if (mpg >= 15.0 && mpg < 17.0) {
	          co2 = 540;
	        } else if (mpg >= 17.0 && mpg < 20.0) {
	          co2 = 457;
	        } else if (mpg >= 20.0 && mpg < 23.0) {
	          co2 = 396;
	        } else if (mpg >= 23.0 && mpg < 27.0) {
	          co2 = 302;
	        } else if (mpg >= 27.0 && mpg < 34.0) {
	          co2 = 266;
	        } else if (mpg >= 34.0 && mpg < 39.0) {
	          co2 = 232;
	        } else if (mpg >= 39.0 && mpg < 45.0) {
	          co2 = 201;
	        } else if(mpg > 45.0){
	          co2 = 100;
	        }
	        //console.log("CO2 value: " + co2);
	        //console.log("co2Emitted: " + co2Emitted);
	        //ternary operator to check if user's car is electric
	        co2Emitted = isElectric ? 0 : parseInt(co2 * miles);
	        var message = "You used about " + co2Emitted.toLocaleString()  + " grams of CO2 (carbon dioxide) this week just driving. Pubic transport accounted for " + tonsPublicTransportco2 + " tons as well.";
	        var tonsPerYear = ((co2Emitted * 52) / 907184.74);
	        //console.log("DRIVING: " + tonsPerYear);
	        var totalTonsPerYear = Math.round(tonsPerYear + dietTonsPerYear + tonsPublicTransportco2 + tonsGoodsco2);
	        //console.log("FOOD + DRIVING: " + totalTonsPerYear);
	        if(tonsPerYear.toLocaleString() == "NaN"){
	          alert("Retry with numbers in the text fields only please.");
	        } else {
	        	message = message.concat(" That's equivalent to " + tonsPerYear.toLocaleString() + " tons a year, just from driving! In total, you consume roughly "
	          	+ totalTonsPerYear + " tons of carbon a year.");
	        	var globalCarbonTonsPerCapita = 4.981;
	        	buttonFunction.staticProperty = 0;
	        	var people = Math.round(totalTonsPerYear / globalCarbonTonsPerCapita);
	          	if(buttonFunction.staticProperty == 0){
	          		for (var i = 0; i < people; i++) {
	            		document.getElementById("peopleImages").innerHTML += "<img src='https://1001freedownloads.s3.amazonaws.com/vector/thumb/74889/1367934593.png' width='50' height='50'/>";
	            		buttonFunction.staticProperty++;
	          		}
	        	}
	        //console.log("static: " + buttonFunction.staticProperty);
	        document.getElementById("text").style.fontWeight = 'bold';
	        document.getElementById("text").innerHTML = message;
	        var message2 = "That's equivalent to about " + people + " people based on the global carbon tons consumed per capita.";
	        document.getElementById("text2").innerHTML = message2;
	        document.body.scrollTop = document.documentElement.scrollTop = 0;
	    	}
    	}
}