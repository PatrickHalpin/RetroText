//GLOBAL VARS
//Grpahic Vars
let font;
let img;
//Alignment Vars
let mid;
let leftALign;
let rightALign;
//Fixture vars
let weeksFixtures = [];
let weeksResults = [];
let lastWeeksResults = [];
let lastWeeksFixtures = [];
//Team Vars
let teams =[];
let teamOrder=[];
//Menu vars
let offSeasonScreen = 1;
let screen = 1;
let menuSelect =1;
let next;
let teamMenu;
let tableMenu;
let fixtureMenu;
let mainMenu;
let matchTacticsMenu;
// Gameplay vars
let transferWeek=0;
let week =1;
let matchStarted = false;
let match;
let showMatchTacticsBool = false;
let backMenu;
//Colour Vars
let red = '#e52f28';
let green = '#4bc27d';
let yellow = '#F7FF13';
//blue = #3197D6;
let lightblue = '#00FFFF';
let white = '#eee';
let grey = '#2b2b2b';


function preload(){
  // Ensure the .ttf or .otf font stored in the assets directory
  // is loaded before setup() and draw() are called
  font = loadFont('fonts/ModeSeven.ttf');
  img = loadImage('assets/logo.svg');
  mid = windowHeight/2;
  leftALign = mid/1.5;
  rightALign = mid + (mid/3);
}


function setup() {
  createCanvas(windowHeight, windowHeight);
  //Instaniating Menus
  backMenu = new MenuItem('BACK',mid/3,120);
  mainMenu = new MenuItem('MAIN',mid/3,120);
  tactics = new MenuItem('TACTICS',mid/1.5,120,65);
  transfers = new MenuItem('TRANSFERS',mid + (mid/3),120,85);
  info = new MenuItem('INFO',mid + (mid/1.5),120);
  matchTacticsMenu = new MenuItem('TACTICS',mid+(mid/1.5),120);
  //CreateTeams
  generateTeams();
  teamOrder=teams;
}

function draw(){
  background(0);
  drawHeader();
  console.log(transferWeek + '' + screen);

  if(week==2)
  {
    console.log('Season Over');
    //resetTable
    //get top teams up
    //create new teams
    //determine player pro or rel
    week=0;
    transferWeek=1;
  }

  if(week==0)
  {
    showOffSeason();
  }
  //if(seasonActive)
  // do regular stuff
  //{} else //show transfer offers => next gets offers,
  else
  {
  //Main start Menu
    if(screen==1)
    {
      if(weeksFixtures.length<=0)
      {
        weeksFixtures=getWeeksFixtures();
      }
      showMainMenu();
    }

    //Next =>
    //Shows UPCOMING Games
    if(screen==2)
    {
      showNextMenu();
      showNextGames();
    }

    if(screen==3)
    {
      if(weeksResults.length<=0) //move to next if
      {
        lastWeeksResults = [];
        genResults();
      }

      if(showMatchTacticsBool)
      {
        showMatchTacticsMenu();
      }
      else
      {
        showNextMenu(); //Change to play??
        showMacthTactics();
        if(!matchStarted)
        {
          showMatch();
        }
        else
        {
          checkMatch();
        }
      }

      // showNextMenu()
      // showResults();
    }

    if(screen==4)
    {
      screen=5;
      //will be used for match deatails
    }
    if(screen == 5)
    {
      showNextMenu();
      showResults();
    }
    //Shows table
    if(screen ==6) //6
    {
      showNextMenu();
      showTable();
    }

    //Shows team menus
    if(screen == 7) //7
    {
      displayTeamTabs();
      showTactics();
    }
    //TRANSFERS
    if(screen == 8) //8
    {
      displayTeamTabs();
      //showTransfers();
    }

    //Info
    if(screen == 9) //9
    {
      displayTeamTabs();
      showInfo();
    }

    //Table => from main
    if(screen==10) //10
    {
      showTopMenu(false);
      showTable();
    }

    //Fixtures => from Main
    if(screen==11) //11
    {
      showTopMenu(false);
      showNextGames();
    }
  }
}

function progressWeek(){
  week+=1;
  screen=1;
  weeksFixtures=[];
  weeksResults=[];
}


//test?
function keyPressed() {
  if(keyCode==32)
  {
    //log
    for(let x=0;x<teams.length;x++)
    {
      console.log(teams[x]);
    }
  }
  else {
    console.clear();
  }
}


function drawHeader(){
  imageMode(CORNER);
  image(img, mid/2, 50);

  fill(white);
  textSize(15);
  textFont(font);
  textAlign(LEFT,TOP);
  text('#footytxt week:' + week, 20, 20);
  textAlign(CENTER,TOP);
  text('303', mid, 20);
  textAlign(RIGHT,TOP);
  text('01/01/2020', windowHeight-20, 20);
}

function showMainMenu()
{
  showTopMenu();
  showMenuResults();
  //showMenuTable();
}

function showNextMenu(){
  next = new MenuItem('NEXT',mid/3,120);
  next.draw();
  fill(green);
  text('------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------',0,135);
}


function showTopMenu(onMain=true){
  next = new MenuItem('NEXT',mid/3,120);
  teamMenu = new MenuItem('TEAM',mid/1.5,120);
  tableMenu = new MenuItem('TABLE',mid + (mid/1.5),120);
  fixtureMenu = new MenuItem('FIXTURES',mid + (mid/3),120);
  if(onMain==true)
  {
    next.draw();
  }
  else {
    mainMenu.draw();
  }
  teamMenu.draw();
  tableMenu.draw();
  fixtureMenu.draw();

  fill(green);
  text('------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------',0,135);
}

function showMacthTactics(){
  matchTacticsMenu.draw();
}

function showMatchTacticsMenu(){
  backMenu.draw();
  fill(green);
  text('------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------',0,135);
  showTactics();
}

class TableEntry{
  constructor(team){
    this.name=team.name;
    this.teamId=team.id;
    this.points=team.points;
    this.played=team.played;
    this.w=team.w;
    this.l=team.l;
    this.d=team.d;
    this.gs=0;
    this.g=0;
  }
}

function showTable(){

  let tableList = [];
  for(t=0;t<teams.length;t++)
  {
    let e = new TableEntry(teams[t]);
    tableList.push(e);
  }

  tableList.sort(function(a, b) {
    return parseFloat(b.points) - parseFloat(a.points);
  });

  textAlign(LEFT,CENTER);
  fill(yellow);
  textSize(17);
  textFont(font);
  text('PREMIERSHIP TABLE', 50, 160);
  textAlign(LEFT,CENTER);
  fill(white);
  text('As it Stands', 50, 190);
  text('P', mid+50, 190);
  text('W', mid+100, 190);
  text('D', mid+150, 190);
  text('L', mid+200, 190);
  text('Pts', mid+250, 190);
  yPos=220
  for(let i = 0;i<tableList.length;i++)
  {
    if( i % 2 == 0)
    {
      fill(lightblue);
    }
    else
    {
      fill(white);
    }
    textSize(17);
    text(i+1, 50, yPos);
    text(tableList[i].name, 100, yPos);
    text(tableList[i].played, mid+50, yPos);
    text(tableList[i].w, mid+100, yPos);
    text(tableList[i].d, mid+150, yPos);
    text(tableList[i].l, mid+200, yPos);
    text(tableList[i].points, mid+250, yPos);
    yPos+=30;
    if(i==2)
    {
      fill(green);
      text('----------------------------------------------------------',50,yPos-15);
    }
    if(i==8)
    {
      fill(red);
      text('----------------------------------------------------------',50,yPos-15);
    }
  }
}


function showMenuResults(){

  textAlign(RIGHT,CENTER);
  fill(yellow);
  textSize(17);
  textFont(font);
  text('PREMIERSHIP', leftALign, 160);
  var yPos=190;

  if(week == 1)
  {
    //show 5 next fixtures
    for(y=0;y<4;y++)
    {
      //Home
      textAlign(RIGHT,CENTER);
      fill(lightblue);
      text(weeksFixtures[y].homeTeam.name, leftALign, yPos);
      //Away
      textAlign(LEFT,CENTER);
      text(weeksFixtures[y].awayTeam.name, rightALign, yPos);
      //V
      textAlign(CENTER,CENTER);
      fill(white);
      text(' V ', mid, yPos);
      //Update position
      yPos+=20;
    }
  }
  else {
    //show last results
    for(y=0;y<5;y++)
    {
      textSize(17);
      //Home
      textAlign(RIGHT,CENTER);
      fill(lightblue);
      text(lastWeeksResults[y].homeTeam.name, leftALign, yPos);
      //Away
      textAlign(LEFT,CENTER);
      text(lastWeeksResults[y].awayTeam.name, rightALign, yPos);
      //Score
      textAlign(CENTER,CENTER);
      fill(white);
      text(lastWeeksResults[y].homeTeamScore + '-' + lastWeeksResults[y].awayTeamScore, mid, yPos);
      yPos+=20;
    }
  }
}

function getWeeksFixtures(){
  console.log('Setting this weeks fixtures');
  var list = [];
  for(t=0; t<teamOrder.length/2;t++)
  {
    if(week % 2 == 0)
    {
      var game = new Game(teamOrder[t].id, teamOrder[ (10 - t) -1 ].id);
    }
    else {
      var game = new Game(teamOrder[ (10 - t) -1 ].id,teamOrder[t].id);
    }
    //var game = new Game(teamOrder[t].id, teamOrder[t].id);
    list.push(game);
  }

  for(let x=1;x<teamOrder.length;x++)
  {
    teamOrder[x].index+=1;
    if(teamOrder[x].index >10)
    {
      teamOrder[x].index=2;
    }
    teamOrder.sort(function(a, b) {
      return parseFloat(a.index) - parseFloat(b.index);
    });
  }

  return list;
}

function genResults(){
  console.log('Generating results');
  for(y=0;y<weeksFixtures.length;y++)
  {
    weeksFixtures[y].genResult();
    if(y!=0)
    {
      weeksFixtures[y].genPoints();
    }
    lastWeeksResults.push(weeksFixtures[y]);
  }
  weeksResults=weeksFixtures;
}


function showResults(){
  textAlign(RIGHT,CENTER);
  fill(yellow);
  textSize(17);
  textFont(font);
  text('PREMIERSHIP SCORES', leftALign, 160);
  var yPos=190;
  for(y=0;y<weeksFixtures.length;y++)
  {
    textSize(17);
    textAlign(RIGHT,CENTER);
    fill(lightblue);
    text(weeksFixtures[y].homeTeam.name, leftALign, yPos);
    //Away
    textAlign(LEFT,CENTER);
    text(weeksFixtures[y].awayTeam.name, rightALign, yPos);
    //Score
    textAlign(CENTER,CENTER);
    fill(white);
    text(weeksFixtures[y].homeTeamScore + '-' + weeksFixtures[y].awayTeamScore, mid, yPos);
    //Time
    textAlign(CENTER,CENTER);
    fill(yellow);
    text(weeksFixtures[y].time, mid, yPos+20);
    yPos+=60;
  }
  //weeksResults=weeksFixtures;
}

//make list loop
function showNextGames(){

  textAlign(RIGHT,CENTER);
  fill(yellow);
  textSize(17);
  textFont(font);
  text('UPCOMING GAMES', leftALign, 160);

  var yPos=200;

  for(y=0;y<weeksFixtures.length;y++)
  {
    //Home
    textAlign(RIGHT,CENTER);
    fill(lightblue);
    text(weeksFixtures[y].homeTeam.name, leftALign, yPos);
    //Away
    textAlign(LEFT,CENTER);
    text(weeksFixtures[y].awayTeam.name, rightALign, yPos);
    //V
    textAlign(CENTER,CENTER);
    fill(white);
    text(' V ', mid, yPos);
    //Update position
    yPos+=40;
  }
}
