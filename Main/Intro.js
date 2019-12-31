class Intro{
	constructor(){
		this.init();
		if(isMobile())document.getElementById("mainImg").style.width="60%";
		else document.getElementById("mainImg").style.width="40%";
	}
	
	init(){
		this.write("SUPER WARRIOR DRONE BATTLE COUPLE");
		this.write("this si an experimental rpg with cooperation and risktaking mechanics");
		this.write("the usual mechanics of rpgs, where you substract from enemies health, are kind of boring");
		this.write("and dont create a lot of tension or drama. furthermore it will be interesting to explore cooperation and interdependance between players");
		this.write("(sorry for the spanish intro)");
		this.addButton("START","START GAME");
	}
	
	write(contenido){
		var elmnt=document.createElement("p");
		elmnt.innerHTML=contenido.toUpperCase();
		document.getElementById("textDiv").appendChild(elmnt);
	}
	
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$                    $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$       botones      $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$                    $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	
	addButton(id,insideText){
		document.getElementById("buttonDiv").appendChild(this.makeButton(id,insideText.toUpperCase()));
	}
	
	makeButton(id,insideText){
		var bttn=document.createElement("button");
		bttn.innerHTML=insideText;
		bttn.id=id;
		bttn.onclick=this.buttonClick;
		return bttn;
	}
	
	removeButtons(){
		document.getElementById("buttonDiv").innerHTML="";
	}
	
	buttonClick(e){
		
		window.main.removeButtons();
		switch(e.currentTarget.id){
			case "START":
				window.main.preLoadImage("rsc/story01_002.gif");
				window.main.cleanText();
				window.main.drawImage("rsc/story01_001.gif");
				window.main.write("en el futuro distante post-numerico la humanidad es verdaderamente libre");
				window.main.write("abandonando las restricciones de la inteligencia, la ciencia, el criterio, el progreso y la buena voluntad hacia el projimo");
				window.main.write("a logrado expandir su conciencia hacia el universo interior de la post-realidad");
				window.main.write("en verdad, es el mas oscuro momento para la humanidad");
				window.main.intro.addButton("btnPre0","CONTINUAR");
				break;
			case "btnPre0":
				window.main.preLoadImage("rsc/story01_003.gif");
				window.main.cleanText();
				window.main.drawImage("rsc/story01_002.gif");
				window.main.write("en un movimiento verdaderamente atrevido la humanidad abraza el post-marxismo comunismo");
				window.main.write("lo que marx no supo ver es que sin la plusvalia y la explotacion de los trabajadores");
				window.main.write("la sociedad no podra alcanzar un suficiente estado de opresion para alcanzar el verdadero comunismo");
				window.main.write("los post-marxistas comunistas han trascendido la verdadad mismas y abrazado las posibilidades radicales de la irrealidad");
				window.main.intro.addButton("btnPre01","CONTINUAR");
				break;
			case "btnPre01":
				window.main.preLoadImage("rsc/story01_004.gif");
				window.main.cleanText();
				window.main.drawImage("rsc/story01_003.gif");
				window.main.write("Marte es la Meca post-marxista donde los jovenes revolucionarios peregrinan para abandonan la opresion burgesa de una familia amorosa");
				window.main.write("y participar en la explotacion de la clase trabajadora. En este lugar se encuentra la 'Gran Fabrica de los trabajadores' donde la sagrada explotacion es exraida");
				window.main.write("de la clase trabajadora manufacturada, producida en ese mismo lugar. Esta vez el comunismo verdadero esta a la vuelta de la esquina");
				window.main.intro.addButton("btnPre02","CONTINUAR");
				break;
			case "btnPre02":
				window.main.cleanText();
				window.main.drawImage("rsc/story01_004.gif");
				window.main.write("la gran expancion industrial de la fabrica es de tal tamaño que sociedades enteras viven entre sus rendijas");
				window.main.write("grupos de sucios recolectores de basura, facistas y contra-revolucionarios amenazan la integridad de La Gran Fabrica");
				window.main.write("para contrarrestar estas acciones politicas, se despachan drones trabajadores especiales adaptados para el combate");
				window.main.intro.addButton("btnPre03","CONTINUAR");
				break;
			case "btnPre03":
				window.main.cleanText();
				window.main.write("report: hardware malfunction");
				window.main.write("possible cause: sabotage");
				window.main.intro.addButton("btn0","RESPONSE: DISPATCH ATTACK DRONES");
				break;
			case "btn0":
				window.main.preLoadImage("rsc/asemble_005.gif");
				window.main.cleanText();
				window.main.drawImage("rsc/asemble_001.gif");
				window.main.intro.addButton("btn1","add left arm");
			break;
			case "btn1":
				window.main.preLoadImage("rsc/asemble_006.gif");
				window.main.drawImage("rsc/asemble_002.gif");
				window.main.intro.addButton("btn2","add right arm");
			break;
			case "btn2":				
				window.main.preLoadImage("rsc/asemble_007.gif");
				window.main.drawImage("rsc/asemble_003.gif");
				window.main.intro.addButton("btn3","connect right arm to heart");
			break;
			case "btn3":				
				window.main.preLoadImage("rsc/asemble_008.gif");
				window.main.drawImage("rsc/asemble_004.gif");
				window.main.intro.addButton("btn4","connect left arm to heart");
			break;
			case "btn4":				
				window.main.preLoadImage("rsc/asemble_010.gif");
				window.main.drawImage("rsc/asemble_005.gif");
				window.main.intro.addButton("btn5","add leg bones");
			break;
			case "btn5":				
				window.main.preLoadImage("rsc/asemble_009.gif");
				window.main.preLoadImage("rsc/asemble_010.gif");
				window.main.drawImage("rsc/asemble_006.gif");
				window.main.intro.addButton("btn6","assemble leg muscles");
			break;
			case "btn6":			
				window.main.preLoadImage("rsc/asemble_010B.gif");
				window.main.drawImage("rsc/asemble_007.gif");
				window.main.intro.addButton("btn7","assemble exoskeleton");
			break;
			case "btn7":				
				window.main.preLoadImage("rsc/asemble_011B.gif");
				window.main.drawImage("rsc/asemble_008.gif");
				window.main.intro.addButton("btn8","connect legs to heart");
			break;
			case "btn8":				
				window.main.preLoadImage("rsc/asemble_012B.gif");
				window.main.drawImage("rsc/asemble_009.gif");
				window.main.intro.addButton("btn9","request: drone");
			break;
			case "btn9":			
				window.main.drawImage("rsc/asemble_010B.gif");
				window.main.intro.addButton("btn10","wake drone up");
			break;
			case "btn10":
				window.main.preLoadImage("rsc/asemble_013B.gif");
				window.main.preLoadImage("rsc/asemble_011.gif");
				window.main.preLoadImage("rsc/partner_healthy.gif");
				window.main.drawImage("rsc/asemble_011B.gif");
				window.main.intro.addButton("btn11","give a name to the drone");
			break;
			case "btn11":
				window.main.drawImage("rsc/asemble_012B.gif");
				var elmnt=document.createElement("input");
				elmnt.id="idPartnerName";
				document.getElementById("textDiv").appendChild(elmnt);
				window.main.intro.addButton("btn12","finish writing name");
			break;
			case "btn12":
				if(document.getElementById("idPartnerName").value==""){
					window.main.cleanText();
					window.main.write("error: the name is required!");
					var elmnt=document.createElement("input");
					elmnt.id="idPartnerName";
					document.getElementById("textDiv").appendChild(elmnt);
					window.main.intro.addButton("btn12","finish writing name");
				}else {
					window.main.setNamePartner(document.getElementById("idPartnerName").value.toUpperCase());
					window.main.cleanText();
					window.main.intro.addButton("btn13","connect drone to body");
				}
			break;
			case "btn13":
				window.main.drawImage("rsc/asemble_013B.gif");
				window.main.intro.addButton("btn140","assemble second drone");
			break;
			case "btn140":				
				window.main.drawImage("rsc/asemble_001.gif");
				window.main.intro.addButton("btn141","add left arm");
			break;
			case "btn141":				
				window.main.drawImage("rsc/asemble_002.gif");
				window.main.intro.addButton("btn142","add right arm");
			break;
			case "btn142":				
				window.main.drawImage("rsc/asemble_003.gif");
				window.main.intro.addButton("btn143","connect right arm to heart");
			break;
			case "btn143":	
				window.main.preLoadImage("rsc/partner_denied.gif");
				window.main.preLoadImage("rsc/partner_down.gif");
				window.main.preLoadImage("rsc/partner_looking.gif");
				window.main.preLoadImage("rsc/partner_panic.gif");
				window.main.preLoadImage("rsc/partner_tired.gif");
				window.main.preLoadImage("rsc/partner_very_tired.gif");
				window.main.preLoadImage("rsc/partner_attack_ok.gif");
				window.main.preLoadImage("rsc/partner_back.gif");
				window.main.drawImage("rsc/asemble_004.gif");
				window.main.intro.addButton("btn144","connect left arm to heart");
			break;
			case "btn144":				
				window.main.preLoadImage("rsc/default_enemy.gif");
				window.main.preLoadImage("rsc/default_enemy_attack_fail.gif");
				window.main.preLoadImage("rsc/default_enemy_attack_ok.gif");
				window.main.preLoadImage("rsc/default_enemy_hit.gif");
				window.main.preLoadImage("rsc/default_enemy_idle.gif");
				window.main.preLoadImage("rsc/default_enemy.gif");
				window.main.preLoadImage("rsc/camping_partner_01.gif");
				window.main.preLoadImage("rsc/camping_partner_02.gif");
				window.main.drawImage("rsc/asemble_005.gif");
				window.main.intro.addButton("btn145","add leg bones");
			break;
			case "btn145":				
				window.main.drawImage("rsc/asemble_006.gif");
				window.main.intro.addButton("btn146","assemble leg muscles");
			break;
			case "btn146":			
				window.main.drawImage("rsc/asemble_007.gif");
				window.main.intro.addButton("btn147","assemble exoskeleton");
			break;
			case "btn147":				
				window.main.drawImage("rsc/asemble_008.gif");
				window.main.intro.addButton("btn148","connect legs to heart");
			break;
			case "btn148":				
				window.main.drawImage("rsc/asemble_009.gif");
				window.main.intro.addButton("btn1410","request: drone");
			break;
			case "btn1410":
				window.main.intro.addButton("btn1411","write my name");
			break;
			case "btn1411":
				var elmnt=document.createElement("input");
				elmnt.id="idPlayerName";
				document.getElementById("textDiv").appendChild(elmnt);
				window.main.intro.addButton("btn1412","finish writing name");
			break;
			case "btn1412":
				if(document.getElementById("idPlayerName").value==""){
					window.main.cleanText();
					window.main.write("error: the name is required!");
					var elmnt=document.createElement("input");
					elmnt.id="idPlayerName";
					document.getElementById("textDiv").appendChild(elmnt);
					window.main.intro.addButton("btn1412","finish writing name");
				}else {
					window.main.setNamePlayer(document.getElementById("idPlayerName").value.toUpperCase());
					window.main.cleanText();
					window.main.intro.addButton("btn1413","connect drone to body");
				}				
			break;
			case "btn1413":
				window.main.drawImage("rsc/asemble_010.gif");
				window.main.intro.addButton("btn1414","look at my hand");
			break;
			case "btn1414":
				window.main.drawImage("rsc/asemble_011.gif");
				window.main.intro.addButton("btn1415","look at my partner");
			break;
			case "btn1415":
				window.main.drawImage("rsc/partner_looking.gif");
				window.main.write("<span class='blue'>lets go find the intruders</span>");
				window.main.intro.addButton("btn1416","lets go");
			break;
			case "btn1416":
				document.getElementById("mainImg").style.width="32%";
				window.main.cleanText();
				window.main.init();
				window.main.saveData();
			break;
		}
	}
}