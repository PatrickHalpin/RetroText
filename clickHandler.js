function mousePressed() {

  if(screen==3)
  {
    if(matchTacticsMenu.selected)
    {
      showMatchTacticsBool = true;
      matchTacticsMenu.selected=false;
      console.log('matchTacticsMenu pressed');
    }
  }

  if(mainMenu.selected)
  {
    mainMenu.selected=false;
    clearSelected();
    screen=1;
  }

  if(next.selected)
  {
    next.selected=false;
    if(week==0)
    {
      transferWeek+=1;
      if(transferWeek>5)
      {
        week=1;
        transferWeek=0;
      }
    }
    else if(screen==3)
    {
      if(!matchStarted)
      {
        startMatch();
      }
      else
      {
        updateMatch();
      }
    }
    else if(screen ==6) //6
    {
      progressWeek();
    }
    else
    {
      screen+=1;
    }
  }

  if(teamMenu.selected)
  {
    teamMenu.selected=false;
    screen=7; //7
  }
  if(tableMenu.selected)
  {
    tableMenu.selected=false;
    screen=10; //8
  }
  if(fixtureMenu.selected)
  {
    fixtureMenu.selected=false;
    screen=11; //11
  }

  if(screen==7 || screen==8 || screen==9) //7//8//9
  {
    mousePressedTeam();
  }

  if(showMatchTacticsBool)
  {
    if(backMenu.selected)
    {
      showMatchTacticsBool=false;
      backMenu.selected = false;
    }
  }

  if(screen == 7 || showMatchTacticsBool) //7
  {
    mousePressedTactics();
  }

  if(week==0)
  {
    mousePressedOffSeason();
  }
}

function mousePressedOffSeason(){
  if(next.selected)
  {
    //next.selected=false;
    //update offers etc
  }
  else if(offers.selected)
  {
    offers.selected=false;
    offSeasonScreen=2;
  }
}

//Team Tab Menu Switch
function mousePressedTeam() {
    if(mainMenu.selected)
    {
      mainMenu.selected=false;
      clearSelected();
      screen=1;
    }
    if(tactics.selected)
    {
      tactics.selected=false;
      currentSelect=[];
      screen = 7; //7
    }
    if(transfers.selected)
    {
      transfers.selected=false;
      currentSelect=[];
      screen = 8; //8
    }
    if(info.selected)
    {
      info.selected=false;
      currentSelect=[];
      screen = 9; //9
    }
}
