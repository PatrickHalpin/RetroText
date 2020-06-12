let displayPlayers = [];
let displayFormations = [];
let displayStyles = [];
let currentSelect=[];

function mousePressedTactics(){
  swapPlayerMenu();
  setFormation();
  setStyle();
}

function subPlayer (arr, indexA, indexB) {
  var temp = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = temp;
};


function swapPlayerMenu(){
  let myTeam=getTeam(1);
  for(let x=0;x<displayPlayers.length;x++)
    {
      if(displayPlayers[x].hover)
      {
        currentSelect.push(displayPlayers[x]);
        displayPlayers[x].selected=true;
        if(currentSelect.length == 2)
        {
          subPlayer(myTeam.squad, currentSelect[0].screenPos,currentSelect[1].screenPos);
          displayPlayers = [];
          currentSelect =[];
          myTeam.setStarting11();
          for(let y=0;y<displayPlayers.length;y++)
            {
              displayPlayers[y].selected=false;
            }
        }
      }
    }
}

class PlayerMenuItem {
  constructor(player,x,y,screenPos,size=20) {
    this.relatedPlayer = player
    this.x=x;
    this.y=y;
    this.hover=false;
    this.selected=false;
    this.text=text;
    this.size = size;
    this.screenPos = screenPos;
    this.startFill = this.initFill();
    this.fill = this.initFill();
  }

  initFill(){
    if( this.screenPos % 2 == 0)
    {
      return lightblue;
    }
    else
    {
      return white;
    }
  }

  checkHover(){
    if(mouseX > this.x - this.size &&
      mouseX < this.x + this.size+100 &&
      mouseY > this.y - this.size/2 &&
      mouseY < this.y + this.size/2)
    {
      this.fill=yellow;
      this.hover=true;
    }
    else
    {
      this.hover=false;
      this.fill=this.startFill;
    }
  }

  draw(){
    this.checkHover();
    if(this.selected)
    {
      this.fill=green;
    }
    fill(this.fill);
    textSize(17);
    textFont(font);
    textAlign(LEFT,CENTER);
    text("{"+this.relatedPlayer.position+"} " + this.relatedPlayer.name,this.x,this.y);
  }
}

class FormationMenuItem {
  constructor(name,x,y,screenPos,size=40) {
    this.size=size;
    this.name=name;
    this.x=x;
    this.y=y;
    this.screenPos=screenPos;
    this.startFill = this.initFill();
    this.fill = this.initFill();
  }
  initFill(){
    if( this.screenPos % 2 == 0)
    {
      return lightblue;
    }
    else
    {
      return white;
    }
  }
  checkHover(){
    if(mouseX > this.x - this.size &&
      mouseX < this.x + this.size+50 &&
      mouseY > this.y - 10 &&
      mouseY < this.y + 10)
    {
      this.fill=yellow;
      this.hover=true;
    }
    else
    {
      this.hover=false;
      this.fill=this.startFill;
    }
  }

  checkSelected(){
    let myTeam=getTeam(1);
    if(myTeam.formation==this.name)
    {
      this.selected=true;
    }
  }

  draw(){
    this.checkHover();
    this.checkSelected();
    if(this.selected)
    {
      this.fill=green;
    }
    fill(this.fill);
    textSize(17);
    textFont(font);
    textAlign(LEFT,CENTER);
    text(this.name,this.x,this.y);
  }
}

class StyleMenuItem {
  constructor(name,x,y,screenPos,size=40) {
    this.size=size;
    this.name=name;
    this.x=x;
    this.y=y;
    this.screenPos=screenPos;
    this.startFill = this.initFill();
    this.fill = this.initFill();
  }
  initFill(){
    if( this.screenPos % 2 == 0)
    {
      return lightblue;
    }
    else
    {
      return white;
    }
  }
  checkHover(){
    if(mouseX > this.x - this.size &&
      mouseX < this.x + this.size+50 &&
      mouseY > this.y - 10 &&
      mouseY < this.y + 10)
    {
      this.fill=yellow;
      this.hover=true;
    }
    else
    {
      this.hover=false;
      this.fill=this.startFill;
    }
  }

  checkSelected(){
    let myTeam=getTeam(1);
    if(myTeam.style==this.name)
    {
      this.selected=true;
    }
  }

  draw(){
    this.checkHover();
    this.checkSelected();
    if(this.selected)
    {
      this.fill=green;
    }
    fill(this.fill);
    textSize(17);
    textFont(font);
    textAlign(LEFT,CENTER);
    text(this.name,this.x,this.y);
  }
}
