class MenuItem {
  constructor(text,x,y,size=40) {
    this.x=x;
    this.y=y;
    this.selected=false;
    this.text=text;
    this.size = size;
    this.fill= lightblue;
  }

  checkHover(){
    if(mouseX > this.x - this.size &&
      mouseX < this.x + this.size &&
      mouseY > this.y - 10 &&
      mouseY < this.y + 10)
    {
      this.fill=yellow;
      this.selected=true;
    }
    else
    {
      this.selected=false;
      this.fill=lightblue;
    }
  }

  draw(){

    this.checkHover();
    fill(this.fill);
    textSize(17);
    textFont(font);
    textAlign(CENTER,CENTER);
    text(this.text,this.x,this.y);
  }

}

class Team {
  constructor(x,stand) {
    this.teamStanding = stand;
    this.overall=80;
    this.index=i;
    this.id = x;
    this.squad = [];
    this.lineup= [];
    this.name = genTeamName();
    this.formation = '4/4/2';
    this.style = 'BALANCED';
    this.points = 0;
    this.gs = 0;
    this.ga = 0;
    this.played = 0;
    this.w = 0;
    this.l = 0;
    this.d = 0;

    this.squad=generateTeamsStartingPlayers(this.teamStanding);

    this.setStarting11();
  }

  setStarting11(){
    this.lineup = [];
    for(let i=0;i<11;i++)
    {
      this.lineup.push(this.squad[i]);
    }
  }

  calculatePoints(){
    console.log('Team Points: ' + this.points)
  }

  log() {
    console.log('Logging Team: ' + this.name);
  }
}

function getTeam(id){
  for(i=0;i<teams.length;i++)
  {
    if(teams[i].id == id)
    {
      return teams[i];
    }
  }
}

class Match {
  constructor(homeTeamId,awayTeamId) {
    this.homeTeam = getTeam(homeTeamId);
    this.awayTeam = getTeam(awayTeamId);
    this.homeTeamScore=0;
    this.awayTeamScore=0;
    this.time=0;
    this.commentary = [];

    this.allPotentialShots;

    this.homeTeamPotentialShots;
    this.awayTeamPotentialShots;

    this.SHOT_IS_ON_GOAL_H = Math.random() * (0.5 - 0.1) + 0.1;
    this.SHOT_IS_ON_GOAL_A = Math.random() * (0.5 - 0.1) + 0.1;

    this.homeTeamActualShots=0;
    this.awayTeamActualShots=0;
    this.homeTeamShotsOnGoal=0;
    this.awayTeamShotsOnGoal=0;


    this.homeRelativeStrength
    this.awayRelativeStrength;

    this.homeTeamMorale;
    this.awayTeamMorale;

    this.homeTeamTactics;
    this.awayTeamTactics;

    this.homeTeamId=homeTeamId;
    this.awayTeamId=awayTeamId;

    this.homeTeamLineup;
    this.awayTeamLineup;

    this.homeTeamScorers =[];
    this.awayTeamScorers =[];

    this.determineRelativeStrength();
    this.determineHomeTeamTactics();
    this.determineAwayTeamTactics();
    this.determineAllPotentialShots();
  }

  determineRelativeStrength(){
    this.homeRelativeStrength = this.homeTeam.overall;
    this.awayRelativeStrength = this.awayTeam.overall;
  }

  determineAllPotentialShots(){ //per 10

    if (this.homeTeamTactics > this.awayTeamTactics) {

        this.allPotentialShots = ( 24 * (this.awayTeamTactics + this.homeTeamTactics) / (3 * this.awayTeamTactics) ) / 10;
    }
    else {
        if (this.homeTeamTactics == this.awayTeamTactics && this.homeTeamTactics >= 1 && this.awayTeamTactics >= 1) {
            // many attacks
            this.allPotentialShots = ( 24 * (this.awayTeamTactics + this.homeTeamTactics) / (2 * this.awayTeamTactics) ) / 10;
        }
        if (this.homeTeamTactics == this.awayTeamTactics && this.homeTeamTactics < 1 && this.awayTeamTactics < 1) {
            // few attacks
            this.allPotentialShots =  ( 24 * (this.awayTeamTactics + this.homeTeamTactics) / (4 * this.awayTeamTactics) ) /10;
        }
        if (this.homeTeamTactics < this.awayTeamTactics) {
            this.allPotentialShots = ( 24 * (this.homeTeamTactics + this.awayTeamTactics) / (4 * this.homeTeamTactics) ) /10;
        }
    }

    let htpsPer90 = Math.round(this.allPotentialShots * (this.homeRelativeStrength / 100));
    let atpsPer90 = Math.round(this.allPotentialShots * (this.awayRelativeStrength / 100));

    this.homeTeamPotentialShots = htpsPer90 / 10 ;

    this.awayTeamPotentialShots = atpsPer90 / 10 ;

  }

  determineHomeTeamTactics(){
    switch (this.homeTeam.style) {
        case 'DEFENSIVE':
            this.homeTeamTactics = 0.6;
            break;
        case 'COUNTER':
            this.homeTeamTactics = 0.8;
            break;
        case 'BALANCED':
            this.homeTeamTactics = 1;
            break;
        case 'POSSESSION':
            this.homeTeamTactics = 1.2;
            break;
        case 'ATTACKING':
            this.homeTeamTactics = 1.4;
            break;
    }
  }

  determineAwayTeamTactics(){
    switch (this.awayTeam.style) {
        case 'DEFENSIVE':
            this.awayTeamTactics = 0.6;
            break;
        case 'COUNTER':
            this.awayTeamTactics = 0.8;
            break;
        case 'BALANCED':
            this.awayTeamTactics = 1;
            break;
        case 'POSSESSION':
            this.awayTeamTactics = 1.2;
            break;
        case 'ATTACKING':
            this.awayTeamTactics = 1.4;
            break;
    }
  }

  advance(){
    //GET FOR HOME
    let homeComm;
    let awayComm;
    if (Math.random() < this.homeTeamPotentialShots / 2) {
        this.homeTeamActualShots++;
        homeComm=1;
        // was this shot on target by the home team?
        //Change SHOT_IS_ON_GOAL_H to be detremined by better forwards
        if (Math.random() < this.SHOT_IS_ON_GOAL_H) {
            this.homeTeamShotsOnGoal++;
            homeComm=2;
            //_this.homeTeamMorale = _this.homeTeamMorale + 0.2;
            // was this a goal? // insetad of homeRelativeStrength use forward ability?
            let homeGoalChance = this.homeRelativeStrength / 100 / (1.5 + Math.random());
            if (Math.random() < homeGoalChance) {
                // this is a goal
                homeComm=3;
                this.homeTeamScore+=1;
                // find who scored goal
                // var homeGoalscorer = _this.homeTeamStartingLineup[Math.round(0.5 + Math.random() * (_this.homeTeamStartingLineup.length - 1))];
                // homeGoalscorer.goalsToday++;
                // _this.homeTeamGoalObjects.push({ name: homeGoalscorer.name, goalTime: _this.matchMinutes + 1 });
                // _this.homeTeamMorale++;
            }
        }
    }

    switch (homeComm)
    {
        case 1:
            this.addComment('HOME Shot');
            return true;
            break;
        case 2:
            this.addComment('HOME Shot On Target');
            return true;
            break;
        case 3:
            this.addComment('HOME GOAL!');
            return true;
            break;
    }

    if (Math.random() < this.awayTeamPotentialShots / 2) {
        this.awayTeamActualShots++;
        awayComm=1;
        // was this shot on target by the home team?
        //Change SHOT_IS_ON_GOAL_H to be detremined by better forwards
        if (Math.random() < this.SHOT_IS_ON_GOAL_A) {
            this.awayTeamShotsOnGoal++;
            awayComm=2;
            //_this.homeTeamMorale = _this.homeTeamMorale + 0.2;
            // was this a goal? // insetad of homeRelativeStrength use forward ability?
            let homeGoalChance = this.awayRelativeStrength / 100 / (1.5 + Math.random());
            if (Math.random() < homeGoalChance) {
                // this is a goal
                awayComm=3;
                this.awayTeamScore+=1;
                // find who scored goal
                // var homeGoalscorer = _this.homeTeamStartingLineup[Math.round(0.5 + Math.random() * (_this.homeTeamStartingLineup.length - 1))];
                // homeGoalscorer.goalsToday++;
                // _this.homeTeamGoalObjects.push({ name: homeGoalscorer.name, goalTime: _this.matchMinutes + 1 });
                // _this.homeTeamMorale++;
            }
        }
    }

    switch (awayComm)
    {
        case 1:
            this.addComment('AWAY Shot');
            return true;
            break;
        case 2:
            this.addComment('AWAY Shot On Target');
            return true;
            break;
        case 3:
            this.addComment('AWAY GOAL!');
            return true;
            break;
    }

    return false;

  }

  addComment(comment){
    let c = this.time + '" ' + comment;
    this.commentary.push(c);
  }

}





class Game {
  constructor(homeTeamId,awayTeamId) {
    this.homeTeam = getTeam(homeTeamId);
    this.awayTeam = getTeam(awayTeamId);
    this.homeTeamScore=0;
    this.awayTeamScore=0;
    this.time='FT';
  }

  homeTeamGoal(){
    this.homeTeamScore+=1;
  }

  awayTeamGoal(){
    this.awayTeamScore+=1;
  }

  getHalfTimeResult(){
    this.time='HT';
  }

  genPoints(){
    if(this.homeTeamScore>this.awayTeamScore)
    {
      this.homeTeam.w+=1;
      this.homeTeam.points+=3;
      this.awayTeam.l+=1;
    }
    else if(this.homeTeamScore<this.awayTeamScore)
    {
      this.homeTeam.l+=1;
      this.awayTeam.w+=1;
      this.awayTeam.points+=3;
    }
    else
    {
      this.homeTeam.d+=1;
      this.homeTeam.points+=1;
      this.awayTeam.d+=1;
      this.awayTeam.points+=1;

    }
    this.homeTeam.played+=1;
    this.awayTeam.played+=1;
  }

  genResult() {
      let res=simMatch(this.homeTeam.id,this.awayTeam.id);
      this.homeTeamScore=res.homeTeamScore;
      this.awayTeamScore=res.awayTeamScore;

    //this.homeTeamScore = round(random(5));
    //this.awayTeamScore = round(random(5));
    this.time='FT';
  }
}
