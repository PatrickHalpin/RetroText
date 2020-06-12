//Team tab Vars
let tactics ;
let info ;
let transfers;


function clearSelected(){
  currentSelect=[];
  for(let x=0;x<displayPlayers.length;x++)
    {
      displayPlayers[x].selected=false;
    }
}

function displayTeamTabs(){
  //Main
  mainMenu.draw();
  //Tactics => //Subs //Form // Tactics
  tactics.draw();
  //Info
  info.draw();
  //Transfers
  transfers.draw();
  fill(green);
  text('------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------',0,135);
}
