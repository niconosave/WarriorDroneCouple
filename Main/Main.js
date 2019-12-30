class Main{
	constructor(){
		if(localStorage.firstTime=="1" || localStorage.firstTime==undefined)this.intro=new Intro();
		else {
			this.name=localStorage.playerName;
			this.setNamePartner(localStorage.partnerName);
			this.init();
		}
	}
	
	init(){
		end=false;
		fled=false;
		this.threat=1;
		this.stamina=10;
		this.stamina_max=10;
		this.wounded=false;
		this.defended=false;
		this.bait=false;
		this.bait_count=0;
		this.enemy=this.createCharacter("enemy",11);
		this.enemy2=this.createCharacter("enemy2",18);
		this.partner=this.createCharacter(this.partnerName,10);
		this.partner.order=null;
		this.target=this.enemy2;
		this.sideTarget=this.enemy;
		this.setFocus(this.enemy,this.partner,this);
		this.setFocus(this.enemy2,this,this.partner);
		this.setFocus(this.partner,this.enemy,this.enemy2);
		this.adrenaline=false;
		this.queueIndex=0;
		if(Math.random()>0.45)this.think=this.enemyLogicA;
		else this.think=this.enemyLogicB;
		this.turn=1;
		this.drawLeftImage("rsc/partner_back.gif");
		this.drawImage("rsc/default_enemy_idle.gif");
		this.drawRightImage("rsc/default_enemy_idle.gif");
		this.addButton("btnWaitDescription","WAIT A MOMENT");
		this.addButton("btnAttackDescription","ATTACK");
		this.addButton("btnBaitDescription","BAIT AN ATTACK");
		this.addButton("btnFlankDescription","FLANK");
		this.addButton("btnChangeFocusDescription","CHANGE FOCUS");
		this.addButton("btnLook","LOOK AT PARTNER");
		this.addButton("btnRestart","RESTART");
		this.writeStats();
		window.onkeypress = this.keyPress;
		this.saveData();
	}
	
	resetBattle(){
		this.hideDangerText();
		fled=false;
		this.enemy=this.createCharacter("enemy",11);
		this.enemy2=this.createCharacter("enemy2",18);
		this.partner.stamina=this.partner.stamina_max;
		this.partner.defended=false;
		this.partner.wounded=false;
		this.partner.bait=false;
		this.partner.threat=1;
		this.partner.bait_count=0;
		this.partner.flanker=null;
		this.partner.order=null;
		this.threat=1;
		this.stamina=10;
		this.stamina_max=10;
		this.wounded=false;
		this.defended=false;
		this.bait=false;
		this.bait_count=0;
		this.target=this.enemy2;
		this.sideTarget=this.enemy;
		this.setFocus(this.enemy,this.partner,this);
		this.setFocus(this.enemy2,this,this.partner);
		this.setFocus(this.partner,this.enemy,this.enemy2);
		this.queueIndex=0;
		this.adrenaline=false;
		if(Math.random()>0.45)this.think=this.enemyLogicA;
		else this.think=this.enemyLogicB;
		document.getElementById("mainImg").style.width="32%";
		this.turn=1;
		this.hideDangerText();
		this.drawLeftImage("rsc/partner_back.gif");
		this.drawImage("rsc/default_enemy_idle.gif");
		this.drawRightImage("rsc/default_enemy_idle.gif");
		this.addButton("btnWaitDescription","WAIT A MOMENT");
		this.addButton("btnAttackDescription","ATTACK");
		this.addButton("btnBaitDescription","BAIT AN ATTACK");
		this.addButton("btnFlankDescription","FLANK");
		this.addButton("btnChangeFocusDescription","CHANGE FOCUS");
		this.addButton("btnLook","LOOK AT PARTNER");
		this.writeStats();
	}
	
	setNamePlayer(name){
		this.name=name;
	}
	
	setNamePartner(name){
		this.partnerName=name;
	}
	
	createCharacter(name,stamina){
		var character=new Object();
		character.threat=1;
		character.stamina=stamina;
		character.stamina_max=stamina;
		character.wounded=false;
		character.defended=false;
		character.bait=false;
		character.bait_count=0;
		character.flanker=null;
		character.name=name;
		return character;
	}
	
	setFocus(who,target,sideTarget){
		who.target=target;
		who.sideTarget=sideTarget;
	}
	
	saveData(){
		if (typeof(Storage) !== "undefined") {
			localStorage.setItem("firstTime", 0);
			localStorage.setItem("playerName", this.name);
			localStorage.setItem("partnerName", this.partner.name);
		}
	}
	
	resetSaveData(){
		if (typeof(Storage) !== "undefined") {
			localStorage.removeItem("firstTime");
			localStorage.removeItem("playerName");
			localStorage.removeItem("partnerName");
		}
	}
	
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$                    $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$        juego       $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$                    $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	
	update(){
		if(!this.checkVictory()){
			switch(this.queueIndex){
				case 0:
					this.think(this.enemy);
					if(this.adrenaline)this.setPanicText();
					else if(this.stamina<4)this.setDangerText();
					else this.hideDangerText();
					this.checkDefeat();
					if((this.partner.wounded || this.wounded) && this.adrenaline==false){
						this.queueIndex=3;
						return false;
					}
					this.queueIndex=1;
					return false;
				break;
				case 1:
					if(this.wounded)this.partner.threat++;
					this.defended=false;
					this.allyLogic(this.partner,this);
					this.checkDefeat();
					this.queueIndex=2;
					return false;
				break;
				case 2:
					this.think(this.enemy2);
					if(this.adrenaline)this.setPanicText();
					else if(this.stamina<4)this.setDangerText();
					else this.hideDangerText();
					this.checkDefeat();
					this.partner.defended=false;
					if((this.partner.wounded || this.wounded) && this.adrenaline==false){
						this.queueIndex=4;
						return false;
					}
					if(this.partner.wounded)this.threat++;
					this.turn++;
					this.queueIndex=0;
					return true;
				case 3://berzerk false
				case 4://partner true
					this.setPanicText();
					if(this.partner.wounded){
						this.drawImage("rsc/partner_down.gif");
						this.cleanText();
						this.threat+=4;
						this.write(this.partner.name+" is not moving!!!!");
					}else {
						this.drawImage("rsc/partner_panic.gif");
						this.cleanText();
						this.partner.threat+=4;
						this.write("<span class='blue'>no</span>");
					}
					this.adrenaline=true;
					this.turn++;
					if(this.queueIndex==4){
						this.queueIndex=0;
						return true;
					}else {
						this.queueIndex=0;
						return false;
					}
				break;
				break;
			}
		}
	}
	
	enemyLogicA(who){
		if(who.wounded){
			this.write(who.name+" is too hurt to fight!")
		}else if(who.target.wounded){
			this.changeFocus(who);
		}else if(who.flanker==who.target && who.sideTarget.threat>2){
			if(enemy.stamina<1){
				var r=this.attack(who,enemy);
				if(r)this.drawImage("rsc/default_enemy_attack_ok.gif");
				else this.drawImage("rsc/default_enemy_attack_fail.gif");
			}else {
				this.drawImage("rsc/default_enemy_idle.gif");
				this.flank(who,enemy);
			}
		}else if(who.flanker==who.sideTarget && who.target.target!=who){
			if(enemy.stamina<1){
				var r=this.attack(who,enemy);
				if(r)this.drawImage("rsc/default_enemy_attack_ok.gif");
				else this.drawImage("rsc/default_enemy_attack_fail.gif");
			}else {
				this.changeFocus(who);
			}
		}else if(who.bait_count>0 && Math.random()<0.2*Math.max(who.target.threat,who.sideTarget.threat)){
			this.drawImage("rsc/default_enemy_idle.gif");
			this.baitAttack(who);
		}else if(this.turn%2==0){
			var r=this.attack(who,who.target);
			if(r)this.drawImage("rsc/default_enemy_attack_ok.gif");
			else this.drawImage("rsc/default_enemy_attack_fail.gif");
		}else {
			this.wait(who);
			this.drawImage("rsc/default_enemy_idle.gif");
		}
	}
	
	enemyLogicB(who){
		if(who.wounded){
			this.write(who.name+" is too hurt to fight!")
		}else if(who.target.wounded){
			this.changeFocus(who);
		}else if(who.flanker==who.target && who.sideTarget.threat>2){
			if(enemy.stamina<1){
				var r=this.attack(who,enemy);
				if(r)this.drawImage("rsc/default_enemy_attack_ok.gif");
				else this.drawImage("rsc/default_enemy_attack_fail.gif");
			}else {
				this.drawImage("rsc/default_enemy_idle.gif");
				this.flank(who,enemy);
			}
		}else if(who.flanker==who.sideTarget && who.target.target!=who){
			if(enemy.stamina<1){
				var r=this.attack(who,enemy);
				if(r)this.drawImage("rsc/default_enemy_attack_ok.gif");
				else this.drawImage("rsc/default_enemy_attack_fail.gif");
			}else {
				this.changeFocus(who);
			}
		}else if(who.bait_count>0 && Math.random()<0.2*Math.max(who.target.threat,who.sideTarget.threat)){
			this.drawImage("rsc/default_enemy_idle.gif");
			this.baitAttack(who);
		}else if(this.turn%3==0){
			var r=this.attack(who,who.target);
			if(r)this.drawImage("rsc/default_enemy_attack_ok.gif");
			else this.drawImage("rsc/default_enemy_attack_fail.gif");
		}else {
			this.wait(who);
			this.drawImage("rsc/default_enemy_idle.gif");
		}
	}
	
	allyLogic(who,ally){
		if(who.wounded){
			this.write(who.name+" is too hurt to fight");
		}else if(who.order!=null){
			who.order();
			who.order=null;
		}else if(ally.wounded && ((who.stamina<=0 && who.sideTarget.wounded==false) || (who.target.threat>who.stamina && who.threat<who.target.stamina))){
			this.flee(who,ally);
		}else if(who.target.wounded){
			this.changeFocus(who);
		}else if(ally.wounded==false && who.target.flanker!=null && who.threat>=3 && who.stamina>1){
			this.flank(who,who.target);
			this.drawPartnerImage();
		}else if(ally.wounded==false && (((who.target.threat>1 && who.target.target==ally) || (who.sideTarget.threat>1 && who.sideTarget.target==ally)) && ally.bait==false && who.bait_count>0)){
			this.defendAlly(who,ally);
			this.write("<span class='blue'>don't worry, I got your back!</span>");
			this.drawPartnerImage();
		}else if(Math.random()>0.4 && who.stamina-2>ally.stamina && who.stamina>0 && ally.wounded==false){
			this.write("<span class='blue'>hang in there budy!</span>");
			this.drawImage("rsc/partner_looking.gif");
			this.encourage(who,ally);
		}else if(ally.target==who.target && ally.threat>2 && ally.target.bait_count>0){
			var r=this.attack(who,who.target);
			if(r)this.drawImage("rsc/partner_attack_ok.gif");
			else this.drawImage("rsc/default_fail.gif");
			this.write("<span class='blue'> attack now! his guard is down</span>");
		}else{
			if(this.turn%3==0){
				var r=this.attack(who,who.target);
				if(r)this.drawImage("rsc/partner_attack_ok.gif");
				else this.drawImage("rsc/default_fail.gif");
			}else {
				this.drawImage("rsc/partner_back.gif");
				this.wait(who);
			}
		} 
	}
	
	addOrder(who,what){
		who.order=what;
	}
	
	checkVictory(){
		if(this.enemy.wounded && this.enemy2.wounded){
			end=true;
			this.removeButtons();
			this.cleanText();
			document.getElementById("statsDiv").innerHTML="";
			this.hideDangerText();
			this.drawImage("");
			this.drawLeftImage("");
			this.drawRightImage("");
			this.write("<h1>YOU WIN!!!</h1>GAME OVER<br>this screen is under construction");
			this.addButton("BtnVictory","RESTART");
			return true;
		}else return false;
	}
	
	checkDefeat(){
		if(this.wounded && this.partner.wounded){
			end=true;
			this.removeButtons();
			this.cleanText();
			document.getElementById("statsDiv").innerHTML="";
			this.hideDangerText();
			this.drawImage("");
			this.drawLeftImage("");
			this.drawRightImage("");
			this.write("<h1>YOU LOST</h1>GAME OVER<br>this screen is under construction");
			this.addButton("BtnDefeat","RESTART");
			this.resetSaveData();
			return true;
		}else return false;
	}
	
	flee(who,toWhom){
		fled=true;
		this.cleanText();
		this.removeButtons();
		this.hideStats();
		this.hideDangerText();
		this.write(who.name+" carried "+toWhom.name+" away from the battle!");
		if(isMobile())document.getElementById("mainImg").style.width="60%";
		else document.getElementById("mainImg").style.width="40%";
		if(who==this){
			this.hideDangerText();
			this.drawLeftImage();
			this.drawRightImage();
			this.drawImage("rsc/partner_injured.gif");
			this.addButton("btnRest","WAIT UNTIL "+toWhom.name+"'S WOUNDS ARE HEALED");
		}
		else {
			this.hideDangerText();
			this.drawLeftImage();
			this.drawRightImage();
			this.drawImage("rsc/partner_save.gif");
			this.write("<span class='blue'>you try and rest. I will keep watch until you are feeling better</span>");
			this.addButton("btnWaitRest","SLEEP");
		}
	}
	
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$                    $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$       sistema      $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$          de        $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$       graficos     $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$                    $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	
	drawImage(imageName){
		if(imageName==undefined){
			document.getElementById("mainImg").style.display='none';
		}else{
			document.getElementById("mainImg").style.display='initial';
			document.getElementById("mainImg").src=imageName;
		}
	}
	
	drawLeftImage(imageName){
		if(imageName==undefined){
			document.getElementById("leftImg").style.display='none';
		}else{
			document.getElementById("leftImg").style.display='initial';
			document.getElementById("leftImg").src=imageName;
		}
	}
	
	drawRightImage(imageName){
		if(imageName==undefined){
			document.getElementById("rightImg").style.display='none';
		}else{
			document.getElementById("rightImg").style.display='initial';
			document.getElementById("rightImg").src=imageName;
		}
	}
	
	drawPartnerImage(){
		if(this.partner.stamina<this.partner.stamina_max/3){
			this.drawImage("rsc/partner_very_tired.gif");
		}else if(this.partner.stamina<(this.partner.stamina_max/3)*2){
			this.drawImage("rsc/partner_tired.gif");
		}else {
			this.drawImage("rsc/partner_healthy.gif");
		}
	}
	
	preLoadImage(imageName){
		if(document.getElementById("img_"+imageName)==null){
			var elmnt=document.createElement("img");
			elmnt.id="img_"+imageName;
			elmnt.src=imageName;
			document.getElementById("hiddenImages").appendChild(elmnt);
		}
	}
	
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$                    $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$       sistema      $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$          de        $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$       batalla      $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$                    $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	
	wait(who){
		who.threat++;
		who.bait=false;
		if(who.bait_count<4)who.bait_count++;
		this.write(who.name+" decided to wait");
	}
	
	baitAttack(who){
		who.bait_count--;
		who.bait=true;
		this.write(who.name+" decided to wait");
	}
	
	defendAlly(who,toWhom){
		who.bait_count--;
		toWhom.defended=true;
		this.write(who.name+" is defending "+toWhom.name);
	}
	
	encourage(who,toWhom){
		who.stamina-=1;
		toWhom.stamina+=2;
		var r=Math.random()*10;
		if(r>6)	this.write(who.name+" gave "+toWhom.name+" a pat on the back");
		else if(r>3) this.write(who.name+" gave "+toWhom.name+" a shoulder bump");
		else this.write(who.name+" gave "+toWhom.name+" a wink");
	}
	
	changeFocus(who){
		this.setFocus(who,who.sideTarget,who.target);
		this.write(who.name+" has turned towards "+who.target.name);
	}
	
	attack(who,toWhom){
		var r=true;
		who.bait=false;
		var s=who.name+" strikes at "+toWhom.name+" ... ";
		if(toWhom.bait){
			s+="<br>but "+toWhom.name+" was waiting for that!<br>"+who.name+" misses!!";
			who.stamina-=3;
			toWhom.stamina-=1;
			toWhom.bait=false;
			r=false;
		}else if(toWhom.defended){
			s+="<br>but "+toWhom.name+" was protected!<br>"+who.name+" misses!!";
			who.stamina-=1;
			toWhom.defended=false;
			r=false;
		}else if(toWhom.stamina<1){
			toWhom.wounded=true;
			s+="<br>"+toWhom.name+" is wounded!!!";
		}else {
			toWhom.stamina-=who.threat;
			if(who.threat>3){
				s+="<br><span class='red'>ugh!</span>";
			}
			s+="<br>"+toWhom.name+" loses "+who.threat+" stamina!";
		}
		who.stamina-=1;
		who.threat=1;
		this.write(s);
		return r;
	}
	
	flank(who,toWhom){
		if(who.flanker==toWhom){
			who.stamina--;
			who.threat=1;
			who.flanker=null;
			this.write(who.name+"moved out of the way<br>"+toWhom.name+"is no longer flanking!");
		}else if(toWhom.flanker==null){
			who.stamina--;
			who.threat=1;
			toWhom.flanker=who;
			this.write(who.name+" is flanking "+toWhom.name+"!!");
		}else{
			who.stamina--;
			who.threat=1;
			toWhom.wounded=true;
			this.write(who.name+" and "+toWhom.flanker.name+" surrounded "+toWhom.name+"<br> and struck him down!!<br>"+toWhom.name+" is wounded!!!");
			toWhom.flanker=null;
		}
	}
	
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$                    $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$        textos      $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$                    $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	
	write(contenido){
		var elmnt=document.createElement("p");
		elmnt.innerHTML=contenido.toUpperCase();
		document.getElementById("textDiv").appendChild(elmnt);
	}
	
	cleanText(){
		document.getElementById("textDiv").innerHTML="";
	}
	
	describePartner(){
		if(this.partner.wounded){
			this.write(this.partner.name+" is hurting real bad<br> <span class='redC'>one more hit and "+this.partner.name+" will fall down!!</span></p>");
		}else if(this.partner.stamina<this.partner.stamina_max/3){
			this.write(this.partner.name+" is looking bad</p>");
		}else if(this.partner.stamina<(this.partner.stamina_max/3)*2){
			this.write(this.partner.name+" looks tired</p>");
		}else {
			this.write(this.partner.name+" looks ready to fight</p>");
		}
	}
	
	writeStats(){
		var s=this.name;
		if(this.stamina>0)s+=",stamina:"+this.stamina;
		else s+=" is badly hurt";
		s+=",threat:"+this.threat+",baits:"+this.bait_count+"<br>";
		/*s+=this.partner.name;
		if(this.partner.stamina>0)s+=",stamina:"+this.partner.stamina;
		else s+=" is badly hurt";
		s+=",threat:"+this.partner.threat+",baits:"+this.partner.bait_count+"<br>";
		*/
		if(this.enemy.stamina<this.enemy.stamina_max/3){
			s+="the "+this.enemy.name+" seems to be out of breath";
		}else if(this.enemy.stamina<(this.enemy.stamina_max/3)*2){
			s+="the "+this.enemy.name+" looks tired";
		}else {
			s+=this.enemy.name+" looks ready to fight";
		}
		s+="<br>";
		if(this.enemy2.stamina<this.enemy2.stamina_max/3){
			s+="the "+this.enemy2.name+" seems to be out of breath";
		}else if(this.enemy2.stamina<(this.enemy2.stamina_max/3)*2){
			s+="the "+this.enemy2.name+" looks tired";
		}else {
			s+=this.enemy2.name+" looks ready to fight";
		}
		document.getElementById("statsDiv").innerHTML="<p class='status'>"+s.toUpperCase()+"</p>";
	}
	
	writePartnerStats(){
		var s=this.partner.name;
		if(this.partner.stamina>0)s+=",stamina:"+this.partner.stamina;
		else s+=" is badly hurt";
		s+=",threat:"+this.partner.threat+",baits:"+this.partner.bait_count+"<br>";
		document.getElementById("statsDiv").innerHTML="<p class='status'>"+s.toUpperCase()+"</p>";
	}
	
	hideStats(){
		document.getElementById("statsDiv").innerHTML="";
	}
	
	setDangerText(){
		document.getElementById("topDiv").classList.add("danger");
		document.getElementById("topDiv").innerHTML="DANGER";
		document.getElementById("bottomDiv").classList.add("danger");
		document.getElementById("bottomDiv").innerHTML="DANGER";
	}
	
	setPanicText(){
		document.getElementById("topDiv").classList.add("danger");
		document.getElementById("topDiv").innerHTML="PANIC";
		document.getElementById("bottomDiv").classList.add("danger");
		document.getElementById("bottomDiv").innerHTML="PANIC";
	}
	
	hideDangerText(){
		document.getElementById("topDiv").classList.remove("danger");
		document.getElementById("topDiv").innerHTML="";
		document.getElementById("bottomDiv").classList.remove("danger");
		document.getElementById("bottomDiv").innerHTML="";
	}
	
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$                    $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$}
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$       teclado      $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$       botones      $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$                    $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	
	keyPress(e){
		if(fled==false && (e.which || e.keyCode)>47 && (e.which || e.keyCode)<58){
			var n;
			if((e.which || e.keyCode)==48)n=9;
			else n=(e.which || e.keyCode)-49;
			var btns=document.getElementById("buttonDiv");
			if(n<btns.children.length){
				var btn=btns.children[n];
				var obj=new Object();
				obj.currentTarget=btn;
				btn.onclick(obj);
			}
		}
	}
	
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$                    $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$       botones      $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$                    $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	
	addButton(id,insideText){
		var nmbr="<span class='BLUE'>("+(document.getElementById("buttonDiv").children.length+1)%9+")</span>";
		document.getElementById("buttonDiv").appendChild(this.makeButton(id,insideText+nmbr));
	}
	
	makeButton(id,insideText){
		var bttn=document.createElement("button");
		bttn.innerHTML=insideText;
		bttn.id=id;
		bttn.onclick=this.buttonClick;
		return bttn;
	}
	
	disableButton(id){
		document.getElementById(id).disabled=true;
	}
	
	enableButton(id){
		document.getElementById(id).disabled=false;
	}
	
	removeButtons(){
		document.getElementById("buttonDiv").innerHTML="";
	}
	
	buttonClick(e){
		window.main.cleanText();
		switch(e.currentTarget.id){
			case "btnWaitDescription":
				window.main.removeButtons();
				window.main.write("if you wait one turn. you will gain 1 threat level and 1 bait");
				window.main.write("the more threat you have the more damage you will do");
				window.main.addButton("btnWait","WAIT FOR A TURN");
				window.main.addButton("btnNevermind","NEVERMIND");
			break;
			case "btnAttackDescription":
				window.main.removeButtons();
				window.main.write("spend 1 stamina to damage the opponent stamina or to wound if the opponent has none");
				window.main.write("don´t attack if you think the opponent is waiting for that");
				window.main.addButton("btnAttack","CONTINUE");
				window.main.addButton("btnNevermind","NEVERMIND");
			break;
			case "btnBaitDescription":
				window.main.removeButtons();
				window.main.write("spend 1 bait to counter any attack you suffer");
				window.main.write("if you counter succesfully then the opponent loses 3 stamina and you lose 1");
				window.main.addButton("btnBait","BAIT AN ATTACK");
				window.main.addButton("btnNevermind","NEVERMIND");
				if(window.main.bait_count>0)window.main.enableButton("btnBait");
				else window.main.disableButton("btnBait");
			break;
			case "btnFlankDescription":
				window.main.removeButtons();
				window.main.write("if you and your partner are flanking your opponent he will be wounded and not able to fight further");
				window.main.write("if your opponent was already flaking you then you will move out of the way and so you will no longer be flanked");
				window.main.write("you need at least 3 threat and 1 stamina to flank");
				window.main.write("your threat level will be 1");
				window.main.addButton("btnFlank","SURROUND OPPONENT");
				window.main.addButton("btnNevermind","NEVERMIND");
				if(window.main.enemy.flanker==window.main || window.main.threat<3)window.main.disableButton("btnFlank");
				else window.main.enableButton("btnFlank");
			break;
			case "btnChangeFocusDescription":
				window.main.removeButtons();
				window.main.write("stop focusing on "+window.main.target.name+" to start fighting "+window.main.sideTarget.name+"<br> but lose one turn");
				window.main.addButton("btnChangeFocus","CHANGE FOCUS");
				window.main.addButton("btnNevermind","NEVERMIND");
			break;
			case "btnRestart":
				if(isMobile())document.getElementById("mainImg").style.width="60%";
				else document.getElementById("mainImg").style.width="40%";
				window.main.drawLeftImage();
				window.main.drawImage();
				window.main.drawRightImage();
				window.main.hideStats();
				window.main.removeButtons();
				window.main.write("your saved data will be lost and you will start all over again. Are you sure?");
				window.main.addButton("btnComfirmRestart","RESTART");
				window.main.addButton("btnNevermind","NEVERMIND");
			break;
			case "btnComfirmRestart":
				window.main.resetSaveData();
				window.main.removeButtons();
				window.init();
			break;
			case "btnWait":
				if(isMobile())document.getElementById("mainImg").style.width="60%";
				else document.getElementById("mainImg").style.width="40%";
				window.main.drawLeftImage();
				window.main.drawImage();
				window.main.drawRightImage();
				window.main.hideStats();
				window.main.wait(window.main);
				window.main.removeButtons();
				window.main.addButton("btnContinuePlayer","CONTINUE");
			break;
			case "btnAttack":
				if(isMobile())document.getElementById("mainImg").style.width="60%";
				else document.getElementById("mainImg").style.width="40%";
				window.main.drawLeftImage();
				window.main.drawRightImage();
				window.main.hideStats();
				var r=window.main.attack(window.main,window.main.target);
				if(r)window.main.drawImage("rsc/default_enemy_hit.gif");
				else window.main.drawImage("rsc/default_fail.gif");
				window.main.removeButtons();
				window.main.addButton("btnContinuePlayer","CONTINUE");
			break;
			case "btnBait":
				if(isMobile())document.getElementById("mainImg").style.width="60%";
				else document.getElementById("mainImg").style.width="40%";
				window.main.drawLeftImage();
				window.main.drawImage();
				window.main.drawRightImage();
				window.main.hideStats();
				window.main.baitAttack(window.main);
				window.main.removeButtons();
				window.main.addButton("btnContinuePlayer","CONTINUE");
			break;
			case "btnFlank":
				if(isMobile())document.getElementById("mainImg").style.width="60%";
				else document.getElementById("mainImg").style.width="40%";
				window.main.drawLeftImage();
				window.main.drawImage();
				window.main.drawRightImage();
				window.main.hideStats();
				window.main.flank(window.main,window.main.enemy);
				window.main.removeButtons();
				window.main.addButton("btnContinuePlayer","CONTINUE");
			break;
			case "btnChangeFocus":
				if(isMobile())document.getElementById("mainImg").style.width="60%";
				else document.getElementById("mainImg").style.width="40%";
				window.main.drawLeftImage();
				window.main.drawImage();
				window.main.drawRightImage();
				window.main.hideStats();
				if(window.main.target==window.main.enemy)window.main.changeFocus(window.main,window.main.enemy2);
				else window.main.changeFocus(window.main,window.main.enemy);
				window.main.removeButtons();
				window.main.addButton("btnContinuePlayer","CONTINUE");
			break;
			case "btnNevermind":
				document.getElementById("mainImg").style.width="32%";
			case "btnContinueEnemy":
				if(!window.main.partner.wounded)window.main.drawLeftImage("rsc/partner_back.gif");
				else window.main.drawLeftImage();
				if(!window.main.enemy.wounded)window.main.drawImage("rsc/default_enemy_idle.gif");
				else window.main.drawImage();
				if(!window.main.enemy2.wounded)window.main.drawRightImage("rsc/default_enemy_idle.gif");
				else window.main.drawRightImage();
				document.getElementById("mainImg").style.width="32%";
				window.main.writeStats();
				window.main.removeButtons();
				if(end!=true && fled==false){
					if(window.main.wounded){
						window.main.drawLeftImage();
						window.main.drawImage();
						window.main.drawRightImage();
						window.main.addButton("btnContinuePlayer","YOU ARE TOO HURT TO FIGHT");
					}else{
						window.main.addButton("btnWaitDescription","WAIT A MOMENT");
						window.main.addButton("btnAttackDescription","ATTACK");
						window.main.addButton("btnBaitDescription","BAIT AN ATTACK");
						window.main.addButton("btnFlankDescription","FLANK");
						window.main.addButton("btnChangeFocusDescription","CHANGE FOCUS");
						if(window.main.partner.wounded) window.main.addButton("btnFlee","TAKE PARTNER AND FLEE");
						else window.main.addButton("btnLook","LOOK AT PARTNER");
						window.main.addButton("btnRestart","RESTART");
					}
				}
			break;
			case "btnContinuePlayer":
				window.main.removeButtons();
				var e=window.main.update();
				if(end!=true && fled==false){
					if(e)window.main.addButton("btnContinueEnemy","CONTINUE");
					else window.main.addButton("btnContinuePlayer","CONTINUE");
				}
			break;
			case "btnFlee":
				window.main.flee(window.main,window.main.partner);
			break;
			case "btnLook":
				window.main.drawLeftImage();
				window.main.drawRightImage();
				window.main.drawPartnerImage();
				window.main.describePartner();
				window.main.writePartnerStats();
				window.main.removeButtons();
				if(isMobile())document.getElementById("mainImg").style.width="60%";
				else document.getElementById("mainImg").style.width="40%";
				window.main.addButton("btnOrderAttack","GIVE ORDER <span class='WHITE'>ATTACK</span>");
				window.main.addButton("btnOrderWait","GIVE ORDER <span class='WHITE'>WAIT</span>");
				window.main.addButton("btnOrderBait","GIVE ORDER <span class='WHITE'>BAIT</span>");
				window.main.addButton("btnOrderDefendMe","GIVE ORDER <span class='WHITE'>DEFEND ME</span>");
				window.main.addButton("btnOrderFlank","GIVE ORDER <span class='WHITE'>FLANK</span>");
				window.main.addButton("btnDefendDescription","DEFEND");
				window.main.addButton("btnEncourageDescription","ENCOURAGE");
				window.main.addButton("btnNevermind","NEVERMIND");
			break;
			case "btnOrderAttack":
				window.main.removeButtons();
				window.main.addOrder(window.main.partner,function atk(){
					var r=window.main.attack(this,window.main.enemy);
					if(r)window.main.drawImage("rsc/partner_attack_ok.gif");
					else window.main.drawImage("rsc/default_fail.gif");});
				window.main.write(window.main.partner.name+" will attack the enemy next turn");
				window.main.drawPartnerImage();
				window.main.addButton("btnNevermind","CONTINUE");
			break;
			case "btnOrderWait":
				window.main.removeButtons();
				window.main.addOrder(window.main.partner,function wt(){window.main.wait(this);window.main.drawPartnerImage();});
				window.main.write(window.main.partner.name+" will wait in the next turn");
				window.main.drawPartnerImage();
				window.main.addButton("btnNevermind","CONTINUE");
			break;
			case "btnOrderBait":
				window.main.removeButtons();
				if(window.main.partner.bait_count<1){
					window.main.write("<span class='blue'> i can't do that!</span>");
					window.main.addButton("btnLook","NEVERMIND");
					window.main.drawImage("rsc/partner_denied.gif");
				}else {
					window.main.addOrder(window.main.partner,function wt(){window.main.baitAttack(this);window.main.drawPartnerImage();});
					window.main.write(window.main.partner.name+" will bait in the next turn");
					window.main.drawPartnerImage();
					window.main.addButton("btnNevermind","CONTINUE");
				}
			break;
			case "btnOrderDefendMe":
				window.main.removeButtons();
				if(window.main.partner.bait_count<1){
					window.main.write("<span class='blue'> i can't do that!</span>");
					window.main.addButton("btnLook","NEVERMIND");
					window.main.drawImage("rsc/partner_denied.gif");
				}else {
					window.main.addOrder(window.main.partner,function df(){window.main.defendAlly(this,window.main);window.main.drawPartnerImage();});
					window.main.write(window.main.partner.name+" will defend you the next turn");
					window.main.drawPartnerImage();
					window.main.addButton("btnNevermind","CONTINUE");
				}
			break;
			case "btnOrderFlank":
				window.main.removeButtons();
				if(window.main.partner.threat<3){
					window.main.write("<span class='blue'> i can't do that!</span>");
					window.main.addButton("btnLook","NEVERMIND");
					window.main.drawImage("rsc/partner_denied.gif");
				}else {
					window.main.addOrder(window.main.partner,function fl(){window.main.flank(this,window.main.enemy);window.main.drawPartnerImage();});
					window.main.write(window.main.partner.name+" will flank the enemy next turn");
					window.main.drawPartnerImage();
					window.main.addButton("btnNevermind","CONTINUE");
				}
			break;
			case "btnEncourageDescription":
				window.main.removeButtons();
				window.main.write("show your partner some support<br> spend 1 stamina to give 2 stamina more");
				window.main.addButton("btnEncourage","ENCOURAGE");
				window.main.addButton("btnLook","NEVERMIND");
				if(window.stamina<1)window.main.disableButton("btnEncourage");
				else window.main.enableButton("btnEncourage");
			break;
			case "btnDefendDescription":
				window.main.removeButtons();
				window.main.write("spend 1 bait to defend "+window.main.partner.name+" from the next attack");
				window.main.addButton("btnDefend","DEFEND");
				window.main.addButton("btnLook","NEVERMIND");
				if(window.main.bait_count>0)window.main.enableButton("btnDefend");
				else window.main.disableButton("btnDefend");
			break;
			case "btnDefend":
				window.main.hideStats();
				window.main.drawImage("rsc/partner_looking.gif");
				window.main.defendAlly(window.main,window.main.partner);
				window.main.removeButtons();
				window.main.addButton("btnContinuePlayer","CONTINUE");
			break;
			case "btnEncourage":
				window.main.hideStats();
				window.main.drawImage("rsc/partner_looking.gif");
				window.main.encourage(window.main,window.main.partner);
				window.main.removeButtons();
				window.main.addButton("btnContinuePlayer","CONTINUE");
			break;
			case "btnWaitRest":
				window.main.drawImage("rsc/partner_looking.gif");
				window.main.write("<span class='blue'>are you ready to fight?</span>");
				window.main.removeButtons();
				window.main.addButton("btnResetFight","YES");
			break;
			case "btnRest":
				window.main.drawImage("rsc/partner_looking.gif");
				window.main.write("<span class='blue'>i am ready to fight<br>let's go</span>");
				window.main.removeButtons();
				window.main.addButton("btnResetFight","LET'S GO");
			break;
			case "btnResetFight":
				window.main.removeButtons();
				window.main.resetBattle();
			break;
			case "BtnVictory":
			case "BtnDefeat":
				window.main.removeButtons();
				window.init();
			break;
			default:
				alert("error de boton!");
			break;
		}
	}
}

function init(){
	end=false;
	fled=false;
	window.main=new Main();
}