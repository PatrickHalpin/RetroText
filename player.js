class Player {
  constructor(pos,standing)
  {
    this.teamStanding=standing;
    this.name=genName();
    this.age= round(random(17, 35)); //random 17-
    this.position=pos;
    this.ovr=80;
    this.abilities = new Abiliies(this.position,this.age,this.teamStanding);
    this.positions = new Positions(this.position);
  }
}

function genName(){
  let ln = names[round(random(names.length))];
  let fn = alpha[round(random(alpha.length-1))];
  let n = fn + '.' + ln;
  return n;
}

class Abiliies {
  constructor(pos,age,stand){
    this.teamStanding=stand;
    this.age=age;
    this.pos=pos;
    this.GK=30;
    this.DF=30;
    this.MF=30;
    this.FW=30;
    this.generateStartAbility();
  }

//round(random(1,5));
  generateStartAbility()
  {
    //factor team Standing? Or size
    //if u 21
    if(this.age<21)
    {
      switch(this.pos){
        case 'GK':
          this.GK=round(random(45, 65 + this.teamStanding));
          break;
        case 'CB':
          this.DF=round(random(45, 65+this.teamStanding ));
          break;
        case 'LB':
          this.DF=round(random(45, 65+this.teamStanding ));
          break;
        case 'RB':
          this.DF=round(random(45, 65+this.teamStanding ));
          break;
        case 'CM':
          this.MF=round(random(45, 65+this.teamStanding ));
          break;
        case 'CD':
          this.MF=round(random(45, 65+this.teamStanding ));
          break;
        case 'LM':
          this.MF=round(random(45, 65+this.teamStanding ));
          break;
        case 'RM':
          this.MF=round(random(45, 65+this.teamStanding ));
          break;
        case 'CF':
          this.FW=round(random(45, 65+this.teamStanding ));
          break;
        case 'LW':
          this.FW=round(random(45, 65+this.teamStanding ));
          break;
        case 'RW':
          this.FW=round(random(45, 65+this.teamStanding ));
          break;
      }
    }
    //Ovr 21 <= 30
    else
    {
      switch(this.pos){
        case 'GK':
          this.GK=round(random(60, 80+this.teamStanding ));
          break;
        case 'CB':
          this.DF=round(random(60, 80+this.teamStanding ));
          break;
        case 'LB':
          this.DF=round(random(60, 80+this.teamStanding ));
          break;
        case 'RB':
          this.DF=round(random(60, 80+this.teamStanding ));
          break;
        case 'CM':
          this.MF=round(random(60, 80+this.teamStanding ));
          break;
        case 'CD':
          this.MF=round(random(60, 80+this.teamStanding ));
          break;
        case 'LM':
          this.MF=round(random(60, 80+this.teamStanding ));
          break;
        case 'RM':
          this.MF=round(random(60, 80+this.teamStanding ));
          break;
        case 'CF':
          this.FW=round(random(60, 80+this.teamStanding ));
          break;
        case 'LW':
          this.FW=round(random(60, 80+this.teamStanding ));
          break;
        case 'RW':
          this.FW=round(random(60, 80+this.teamStanding ));
          break;
      }
    }
  }
}

//3 = good // 2 = ok // 1 = poor
//Used to hold a players abiltiy to play in a certain position
class Positions{
  constructor(pos){
    this.pos=pos;
    this.GK=1;
    this.CB=1;
    this.LB=1;
    this.RB=1;
    this.CM=1;
    this.CD=1;
    this.LM=1;
    this.RM=1;
    this.CF=1;
    this.LW=1;
    this.RW=1;
    this.set();
  }

  set(){
    switch(this.pos)
    {
      case 'GK':
        this.GK=3;
        break;
      case 'CB':
        this.CB=3;
        this.LB=2;
        this.RB=2;
        break;
      case 'LB':
        this.LB=3;
        break;
      case 'RB':
        this.RB=3;
        break;
      case 'CM':
        this.CM=3;
        this.CD=2;
        break;
      case 'CD':
        this.CD=3;
        this.CM=2;
        break;
      case 'LM':
        this.LM=3;
        break;
      case 'RM':
        this.RM=3;
        break;
      case 'CF':
        this.CF=3;
        break;
      case 'LW':
        this.LW=3;
        break;
      case 'RW':
        this.RW=3;
        break;
    }
  }

}

function generateTeamsStartingPlayers(teamStanding){

  let list = [];
  //create a list of 25 players
  //GK
  for(let i = 0;i<3;i++)
  {
    let player = new Player('GK',teamStanding);
    list.push(player);
  }
  //CB
  for(let i = 0;i<3;i++)
  {
    let player = new Player('CB',teamStanding);
    list.push(player);
  }
  //LB
  for(let i = 0;i<2;i++)
  {
    let player = new Player('LB',teamStanding);
    list.push(player);
  }
  //RB
  for(let i = 0;i<2;i++)
  {
    let player = new Player('RB',teamStanding);
    list.push(player);
  }
  //CM
  for(let i = 0;i<3;i++)
  {
    let player = new Player('CM',teamStanding);
    list.push(player);
  }
  //CD
  for(let i = 0;i<2;i++)
  {
    let player = new Player('CD',teamStanding);
    list.push(player);
  }
  //LM
  for(let i = 0;i<2;i++)
  {
    let player = new Player('LM',teamStanding);
    list.push(player);
  }
  //RM
  for(let i = 0;i<2;i++)
  {
    let player = new Player('RM',teamStanding);
    list.push(player);
  }
  //CF
  for(let i = 0;i<2;i++)
  {
    let player = new Player('CF',teamStanding);
    list.push(player);
  }
  //LW
  for(let i = 0;i<1;i++)
  {
    let player = new Player('LW',teamStanding);
    list.push(player);
  }
  //RW
  for(let i = 0;i<1;i++)
  {
    let player = new Player('RW',teamStanding);
    list.push(player);
  }
  return list;
}
