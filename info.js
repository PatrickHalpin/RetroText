function showInfo(){
  let myTeam=getTeam(1);
  fill(yellow);
  textAlign(LEFT,CENTER);
  text('SQUAD',leftALign/2,160);
  text('POS  NAME',leftALign/2,190);
  text('OVR',leftALign+50,190);
  text('GK',leftALign+100,190);
  text('DF',leftALign+150,190);
  text('MF',leftALign+200,190);
  text('FW',leftALign+250,190);
  text('AGE',leftALign+300,190);
  let newYpos =210;
  for(let x=0;x<myTeam.squad.length;x++)
  {
    let p = myTeam.squad[x];
    //displayPlayers[x].draw();
    fill(lightblue);
    textSize(17);
    textFont(font);
    textAlign(LEFT,CENTER);
    text("{"+p.position+"} " + p.name, leftALign/2,newYpos);
    text(""+p.ovr+" ", leftALign+50,newYpos);
    text(""+p.abilities.GK+" ", leftALign+100,newYpos);
    text(""+p.abilities.DF+" ", leftALign+150,newYpos);
    text(""+p.abilities.MF+" ", leftALign+200,newYpos);
    text(""+p.abilities.FW+" ", leftALign+250,newYpos);
    text(""+p.age+" ", leftALign+300,newYpos);

    newYpos+=20;
  }
}
