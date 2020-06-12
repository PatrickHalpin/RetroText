function genTeamName(){
  let name = places[ round(random(places.length) ) ];

  while( checkNames(name) )
  {
    name = places[ round(random(places.length) ) ];
  }
  return name;
}

function checkNames(name)
{
  for(let i = 0;i<teams.length;i++)
  {
    if(teams[i].name === name)
    {
      return true;
    }
  }
  return false;
}

function generateTeams(){

  for(i=1;i<=10;i++)
  {
    let stand = i;
    if(i==1)
    {
      stand = 5;
    }
    newTeam = new Team(i,stand);
    teams.push(newTeam);
  }
}
