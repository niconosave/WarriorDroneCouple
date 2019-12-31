class Intro{
	constructor(){
		this.init();
		if(isMobile())document.getElementById("mainImg").style.width="60%";
		else document.getElementById("mainImg").style.width="40%";
	}
	
	init(){
		this.write("SUPER WARRIOR DRONE BATTLE COUPLE");
		this.write("este es un juego experimental rpg con mecanicas de cooperacion y toma de riesgo");
		this.write("las mecanicas normales del rpg son faciles de entender, pero muy aburridas, no presentan muchas decisciones interesantes");
		this.write("y no tienden mucho al drama. ademas resulta una idea interesante explorar la cooperacion y dependencia entre los party memebers");
		this.addButton("START","EMPEZAR EL JUEGO");
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
				window.main.write("reporte: falla de hardware");
				window.main.write("posible causa: sabotage");
				window.main.intro.addButton("btn0","RESPUESTA: ENVIAR DRONES DE ATAQUES");
				break;
			case "btn0":
				window.main.preLoadImage("rsc/asemble_005.gif");
				window.main.cleanText();
				window.main.drawImage("rsc/asemble_001.gif");
				window.main.intro.addButton("btn1","agregar brazo izquierdo");
			break;
			case "btn1":
				window.main.preLoadImage("rsc/asemble_006.gif");
				window.main.drawImage("rsc/asemble_002.gif");
				window.main.intro.addButton("btn2","agregar brazo derecho");
			break;
			case "btn2":				
				window.main.preLoadImage("rsc/asemble_007.gif");
				window.main.drawImage("rsc/asemble_003.gif");
				window.main.intro.addButton("btn3","conectar brazo derecho al corazon");
			break;
			case "btn3":				
				window.main.preLoadImage("rsc/asemble_008.gif");
				window.main.drawImage("rsc/asemble_004.gif");
				window.main.intro.addButton("btn4","conectar brazo izquierdo al corazon");
			break;
			case "btn4":				
				window.main.preLoadImage("rsc/asemble_010.gif");
				window.main.drawImage("rsc/asemble_005.gif");
				window.main.intro.addButton("btn5","agregar los huesos de las piernas");
			break;
			case "btn5":				
				window.main.preLoadImage("rsc/asemble_009.gif");
				window.main.preLoadImage("rsc/asemble_010.gif");
				window.main.drawImage("rsc/asemble_006.gif");
				window.main.intro.addButton("btn6","ensamblar los musculos de las piernas");
			break;
			case "btn6":			
				window.main.preLoadImage("rsc/asemble_010B.gif");
				window.main.drawImage("rsc/asemble_007.gif");
				window.main.intro.addButton("btn7","ensamblar exoesqueleto");
			break;
			case "btn7":				
				window.main.preLoadImage("rsc/asemble_011B.gif");
				window.main.drawImage("rsc/asemble_008.gif");
				window.main.intro.addButton("btn8","conectar piernas al corazon");
			break;
			case "btn8":				
				window.main.preLoadImage("rsc/asemble_012B.gif");
				window.main.drawImage("rsc/asemble_009.gif");
				window.main.intro.addButton("btn9","pedir: drone");
			break;
			case "btn9":			
				window.main.drawImage("rsc/asemble_010B.gif");
				window.main.intro.addButton("btn10","despertar al drone");
			break;
			case "btn10":
				window.main.preLoadImage("rsc/asemble_013B.gif");
				window.main.preLoadImage("rsc/asemble_011.gif");
				window.main.preLoadImage("rsc/partner_healthy.gif");
				window.main.drawImage("rsc/asemble_011B.gif");
				window.main.intro.addButton("btn11","darle un nombre al drone");
			break;
			case "btn11":
				window.main.drawImage("rsc/asemble_012B.gif");
				var elmnt=document.createElement("input");
				elmnt.id="idPartnerName";
				document.getElementById("textDiv").appendChild(elmnt);
				window.main.intro.addButton("btn12","terminar de escribir el nombre");
			break;
			case "btn12":
				if(document.getElementById("idPartnerName").value==""){
					window.main.cleanText();
					window.main.write("error: un nombre es requerido!");
					var elmnt=document.createElement("input");
					elmnt.id="idPartnerName";
					document.getElementById("textDiv").appendChild(elmnt);
					window.main.intro.addButton("btn12","terminar de escribir el nombre");
				}else {
					window.main.setNamePartner(document.getElementById("idPartnerName").value.toUpperCase());
					window.main.cleanText();
					window.main.intro.addButton("btn13","conectar drone al cuerpo");
				}
			break;
			case "btn13":
				window.main.drawImage("rsc/asemble_013B.gif");
				window.main.intro.addButton("btn140","ensamblar segundo drone");
			break;
			case "btn140":				
				window.main.drawImage("rsc/asemble_001.gif");
				window.main.intro.addButton("btn141","agregar brazo izquierdo");
			break;
			case "btn141":				
				window.main.drawImage("rsc/asemble_002.gif");
				window.main.intro.addButton("btn142","agregar brazo derecho");
			break;
			case "btn142":				
				window.main.drawImage("rsc/asemble_003.gif");
				window.main.intro.addButton("btn143","conectar brazo derecho al corazon");
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
				window.main.intro.addButton("btn144","conectar brazo izquierdo al corazon");
			break;
			case "btn144":				
				window.main.preLoadImage("rsc/default_enemy.gif");
				window.main.preLoadImage("rsc/default_enemy_attack_fail.gif");
				window.main.preLoadImage("rsc/default_enemy_attack_ok.gif");
				window.main.preLoadImage("rsc/default_enemy_hit.gif");
				window.main.preLoadImage("rsc/default_enemy_idle.gif");
				window.main.preLoadImage("rsc/default_enemy.gif");
				window.main.drawImage("rsc/asemble_005.gif");
				window.main.intro.addButton("btn145","agregar los huesos de las piernas");
			break;
			case "btn145":				
				window.main.drawImage("rsc/asemble_006.gif");
				window.main.intro.addButton("btn146","ensamblar los musculos de las piernas");
			break;
			case "btn146":			
				window.main.drawImage("rsc/asemble_007.gif");
				window.main.intro.addButton("btn147","ensamblar exosqueleto");
			break;
			case "btn147":				
				window.main.drawImage("rsc/asemble_008.gif");
				window.main.intro.addButton("btn148","conectar piernas al corazon");
			break;
			case "btn148":				
				window.main.drawImage("rsc/asemble_009.gif");
				window.main.intro.addButton("btn1410","pedir: drone");
			break;
			case "btn1410":
				window.main.intro.addButton("btn1411","escribir mi nombre");
			break;
			case "btn1411":
				var elmnt=document.createElement("input");
				elmnt.id="idPlayerName";
				document.getElementById("textDiv").appendChild(elmnt);
				window.main.intro.addButton("btn1412","terminar de escribir nombre");
			break;
			case "btn1412":
				if(document.getElementById("idPlayerName").value==""){
					window.main.cleanText();
					window.main.write("error: un nombre es requerido!");
					var elmnt=document.createElement("input");
					elmnt.id="idPlayerName";
					document.getElementById("textDiv").appendChild(elmnt);
					window.main.intro.addButton("btn1412","terminar de escribir nombre");
				}else {
					window.main.setNamePlayer(document.getElementById("idPlayerName").value.toUpperCase());
					window.main.cleanText();
					window.main.intro.addButton("btn1413","conectar drone al cuerpo");
				}				
			break;
			case "btn1413":
				window.main.drawImage("rsc/asemble_010.gif");
				window.main.intro.addButton("btn1414","mirar mis manos");
			break;
			case "btn1414":
				window.main.drawImage("rsc/asemble_011.gif");
				window.main.intro.addButton("btn1415","mirar a mi compañer@");
			break;
			case "btn1415":
				window.main.drawImage("rsc/partner_looking.gif");
				window.main.write("<span class='blue'>vamos a encontrar a los intrusos</span>");
				window.main.intro.addButton("btn1416","VAMOS");
			break;
			case "btn1416":
				document.getElementById("mainImg").style.width="32%";
				window.main.cleanText();
				window.main.init();
			break;
		}
	}
}