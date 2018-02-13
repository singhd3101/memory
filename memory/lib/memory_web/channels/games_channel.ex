defmodule MemoryWeb.GamesChannel do
  use MemoryWeb, :channel
  alias Memory.Game
  
  #def join("games:lobby", payload, socket) do
   def join("games:" <> name, payload, socket) do
    if authorized?(payload) do
       game = Memory.GameBackup.load(name) || Game.new()
       socket = socket
       |> assign(:game, game)
       |> assign(:name, name)
  #    {:ok, socket}
       {:ok, %{"join" => name, "game" => Game.client_view(game)}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (games:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  #def handle_in("double", payload, socket) do
  #   xx = String.to_integer(payload["xx"])
  #   resp = %{ "xx" => xx, "yy" => 2 * xx }
  #   {:reply, {:doubled, resp}, socket}
  #end

  def handle_in("matchCard", %{"c" => cardSelected}, socket) do
     game = Game.matchCard(socket.assigns[:game], cardSelected)
     Memory.GameBackup.save(socket.assigns[:name], game)
     socket = assign(socket, :game, game)
     {:reply, {:ok, %{"game" => Game.client_view(game)}}, socket}
  end

  def handle_in("updateLayout", %{"c" => cardSelected }, socket) do
     game = Game.updateLayout(socket.assigns[:game], cardSelected)
     Memory.GameBackup.save(socket.assigns[:name], game)
     socket = assign(socket, :game, game)
     {:reply, {:ok, %{"game" => Game.client_view(game)}}, socket}
  end 
   
  def handle_in("restartGame", %{}, socket) do
     game = Game.restartGame(Game.new())
     Memory.GameBackup.save(socket.assigns[:name], game)
     socket = assign(socket, :game, game)
     {:reply, {:ok, %{"game" => Game.client_view(game)}}, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
