#Attribution - https://github.com/mxgrn/pairs.one

defmodule Memory.Game do
   #sets new state of the game
   def new do %{
       card: "###",
       cardValue: ["FA0","AB0","BA0","HB0","CA0","DB0","DA0","CB0","EA0","EB0","AA0","FB0","GA0","GB0","HA0","BB0"],
       cardShow: ["","","","","","","","","","","","","","","",""],
       ctr: 0,
       display: "display0"}
   end

   #renders the view of the game
   def client_view(game) do
      game
   end

   #Helper Functions
   def updateMap(game, c, s) do
      Map.merge(game, %{
         ctr: c+1,
         cardShow: s,
         display: "display1" })
   end

   def matchCardMap1(game, s) do
	Map.merge(game,%{ 
            card: s, 
            display: "display0" })
   end
   
   def matchCardMap2(game, v, s) do
       Map.merge(game, %{
          card: "###",
          cardValue: v,
          cardShow: s,
          display: "display0" })
   end

   def matchCardMap3(game, s) do
       Map.merge(game, %{
          card: "###",
          cardShow: s,
          display: "display0" })
   end

   #updates the layout of the game
   def updateLayout(game, cardSelected) do
      cardSelected = String.to_integer(cardSelected)
      #check if selected card matches the previous card
      if !(game.card == cardSelected) do
         newCard = Enum.at(game.cardValue,cardSelected)
         cardShowNew = List.replace_at(game.cardShow,cardSelected, String.at(newCard,0))
         #increment counter
         updateMap(game, game.ctr, cardShowNew)
      else
        game 
      end
   end

   #handels incoming events
   def matchCard(game, cardSelected) do
      cardSelected = String.to_integer(cardSelected)
      cardValueNew = game.cardValue
      newCard = Enum.at(cardValueNew,cardSelected)
      if !(game.card == cardSelected) do
         cond do
            game.card == "###" ->
                  matchCardMap1(game, cardSelected)
             String.at(Enum.at(cardValueNew,game.card),0)==String.at(newCard,0) ->   
                 prevCard = game.card
                 prev = Enum.at(cardValueNew,prevCard)
                 cardValueNew = List.replace_at(cardValueNew,prevCard,String.replace_suffix(prev,"0","1"))
                 cardValueNew = List.replace_at(cardValueNew,cardSelected,String.replace_suffix(newCard,"0","1"))
                 cardShowNew = List.replace_at(game.cardShow,cardSelected,"")
                 cardShowNew = List.replace_at(cardShowNew,prevCard,"")
                 :timer.sleep(1000)
                 matchCardMap2(game, cardValueNew, cardShowNew)
            true -> 
                    cardShowNew = List.replace_at(game.cardShow,cardSelected,"")
                    cardShowNew = List.replace_at(cardShowNew,game.card,"")
                    :timer.sleep(1000)
		    matchCardMap3(game, cardShowNew)
          end
      else
         game    
      end
   end

   #restarts the game
   def restartGame(game) do
      #shuffeling the cards for new game
      Map.merge(game, %{
       cardValue: Enum.shuffle(game.cardValue), })
   end
end
