let formations = ['4/4/2','4/3/3','3/4/3','4/5/1','5/4/1'];
let styles = ['DEFENSIVE','COUNTER','BALANCED','POSSESSION', 'ATTACKING'];

function showTactics(){
    displaySquad();
    displayFormation();
    displayStyle();
}

function setFormation(){
  let myTeam=getTeam(1);
  for(let x=0;x<displayFormations.length;x++)
    {
      if(displayFormations[x].hover)
      {
        for(let y=0;y<displayFormations.length;y++)
          {
            displayFormations[y].selected=false;
          }
        displayFormations[x].selected=true;
        myTeam.formation=displayFormations[x].name;
      }
    }
}

function displayFormation(){
  //CHANGE TO CUSTOM MENU
  if(displayFormations.length == 0)
  {
    let yPos=190;
    for(let i =0;i< formations.length;i++)
    {
      let fItem = new FormationMenuItem(formations[i],rightALign,yPos,i);
      displayFormations.push(fItem);
      yPos +=20;

    }
  }

  fill(yellow);
  textAlign(LEFT,CENTER);
  text('FORMATION',rightALign,160);
  for(let x=0;x<displayFormations.length;x++)
  {
    displayFormations[x].draw();
  }
}

function setStyle(){
  let myTeam=getTeam(1);
  for(let x=0;x<displayStyles.length;x++)
    {
      if(displayStyles[x].hover)
      {
        for(let y=0;y<displayStyles.length;y++)
          {
            displayStyles[y].selected=false;
          }
        displayStyles[x].selected=true;
        myTeam.style=displayStyles[x].name;
      }
    }
}

function displayStyle(){
  if(displayStyles.length == 0)
  {
    let yPos=350;
    for(let i =0;i< styles.length;i++)
    {
      let sItem = new StyleMenuItem(styles[i],rightALign,yPos,i);
      displayStyles.push(sItem);
      yPos +=20;

    }
  }

  fill(yellow);
  textAlign(LEFT,CENTER);
  text('STYLE',rightALign,320);
  for(let x=0;x<displayStyles.length;x++)
  {
    displayStyles[x].draw();
  }
}

function displayStarting11(){
  let yPos=150;
  let myTeam=getTeam(1);
  for(let i =0;i<myTeam.lineup.length;i++)
  {
    textSize(17);
    textAlign(RIGHT,CENTER);
    fill(lightblue);
    text(myTeam.lineup[i].name, leftALign, yPos);
    yPos+=20;
  }
}

function displaySquad(){
  let myTeam=getTeam(1);
  if(displayPlayers.length == 0)
  {
    let yPos=190;
    console.log(myTeam);
    for(let i =0;i<myTeam.squad.length;i++)
    {
      let pItem = new PlayerMenuItem(myTeam.squad[i],leftALign/2,yPos,i);
      displayPlayers.push(pItem);
      yPos +=20;

    }
  }
  fill(yellow);
  textAlign(LEFT,CENTER);
  text(myTeam.name + ' SQUAD',leftALign/2,160);
  //let newYpos =190;
  for(let x=0;x<displayPlayers.length;x++)
  {
    displayPlayers[x].draw();
    if(x==11)
    {
      fill(green);
      text('---------------------',leftALign/2,displayPlayers[x].y-10);
    }
    if(x==18)
    {
      fill(green);
      text('---------------------',leftALign/2,displayPlayers[x].y-10);
    }
  }
}
