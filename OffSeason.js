let offers;
function showOffSeason()
{
  showOffSeasonMenu();
  //main
  if(offSeasonScreen==1)
  {
    showMainOffSeasonScreen();
  }
  //offers
  if(offSeasonScreen==2)
  {
    showOffers();
  }
}

function showOffSeasonMenu()
{
  showNextMenu();
  offers = new MenuItem('OFFERS',mid + (mid/1.5),120);
  offers.draw();
  fill(green);

}

function showMainOffSeasonScreen(){
  textAlign(LEFT,CENTER);
  fill(yellow);
  textSize(17);
  textFont(font);
  text('MAIN', 50, 160);
  textAlign(LEFT,CENTER);
}

function showOffers(){
  textAlign(LEFT,CENTER);
  fill(yellow);
  textSize(17);
  textFont(font);
  text('OFFERS', 50, 160);
  textAlign(LEFT,CENTER);
}
