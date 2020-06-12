let matchScreen=0;

let ra=0, rb=0, startT, deltaT = 1000, doit = false;

function showMatch(){
  textAlign(RIGHT,CENTER);
  fill(yellow);
  textSize(17);
  textFont(font);
  text('PREMIERSHIP', leftALign, 160);
  var yPos=190;

  textAlign(RIGHT,CENTER);
  fill(lightblue);
  text(weeksFixtures[0].homeTeam.name, leftALign, yPos);
  //Away
  textAlign(LEFT,CENTER);
  text(weeksFixtures[0].awayTeam.name, rightALign, yPos);
  //V
  textAlign(CENTER,CENTER);
  fill(white);
  text(' V ', mid, yPos);

  displayStarting11(getTeam(weeksFixtures[0].homeTeam.id));
  displayStarting11(getTeam(weeksFixtures[0].awayTeam.id),false);
  //if Start Clicked => Create New Match => time = 0
  //Every time next is clicked check what happens
}

function startMatch(){
  //Next pressed => skip 10 mins? => Gen

  match = new Match(getTeam(weeksFixtures[0].homeTeam.id).id,getTeam(weeksFixtures[0].awayTeam.id).id);
  matchStarted=true;
  //if()
}

function simMatch(homeTeamId,awayTeamId){
  let simMatch = new Match(homeTeamId,awayTeamId);
  for(let i = 0; i<90;i++)
  {
    simMatch.time+=1;
    if(simMatch.time > 90)
    {
      simMatch.time = 90;
    }
    simMatch.advance();
    //wait(1000);
  }
  return simMatch;
}


function checkMatch(){
  //Display Match Details here
  textAlign(RIGHT,CENTER);
  fill(yellow);
  textSize(17);
  textFont(font);
  text('PREMIERSHIP', leftALign, 160);

  //Home
  fill(lightblue);
  //replace with match??
  text(weeksFixtures[0].homeTeam.name, leftALign, 190);
  //Away
  textAlign(LEFT,CENTER);
  text(weeksFixtures[0].awayTeam.name, rightALign, 190);
  //Score
  textAlign(CENTER,CENTER);
  fill(white);
  text(match.homeTeamScore + '-' + match.awayTeamScore, mid, 190);
  textAlign(CENTER,CENTER);
  fill(yellow);
  text(match.time, mid, 210);

  //Commentary
  yPos=260;
  for(q=match.commentary.length-1;q>=0;q--)
  {
    fill(lightblue);
    textAlign(LEFT,CENTER);
    text(match.commentary[q], mid/3, yPos);
    yPos+=20;
  }
}

function updateMatch(){
  if(match.time >= 90)
  {
    match.time='FT';
    console.log('HOME TOT: ' + match.homeTeamActualShots);
    console.log('HOME TAR: ' + match.homeTeamShotsOnGoal);
    console.log('AWAY TOT: ' + match.awayTeamActualShots);
    console.log('AWAY TAR: ' + match.awayTeamShotsOnGoal);
  }
  else if(match.time == 'FT')
  {
    //set fixtrue result to this
    let g = new Game(match.homeTeamId,match.awayTeamId);
    g.homeTeamScore=match.homeTeamScore;
    g.awayTeamScore=match.awayTeamScore;
    g.genPoints();
    weeksFixtures[0] = g;
    lastWeeksResults[0] =g;
    matchStarted=false;
    screen+=1;
  }
  else
  {
    match.determineRelativeStrength();
    match.determineHomeTeamTactics();
    match.determineAwayTeamTactics();
    match.determineAllPotentialShots();
    for(let i = 0; i<10;i++)
    {
      match.time+=1;
      if(match.time > 90)
      {
        match.time = 90;
      }
      let res = match.advance();
      if(res)
      {
        break;
      }
      //wait(1000);
    }
  }
}


function displayStarting11(team,home=true){
  let yPos=220;
  let align = rightALign;
  textAlign(LEFT,CENTER);
  if(home==true)
  {
    align=leftALign
    textAlign(RIGHT,CENTER);
  }
  for(let i =0;i<team.lineup.length;i++)
  {
    textSize(17);
    fill(lightblue);
    text(team.lineup[i].name, align, yPos);
    yPos+=20;
  }
}
