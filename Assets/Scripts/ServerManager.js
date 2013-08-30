#pragma strict

private var useNat = false;

private var windowCounter = 3;
private var players = new Array();


function Start() {
	gameObject.AddComponent(MouseLook);
	gameObject.AddComponent(FPSInputController);
	
	var sim = gameObject.GetComponent(CaveSimulator);
	sim.showGUI = true;
	
	startServer();
}

function Update() {
    if (Input.GetKeyDown(KeyCode.Escape)) {
        quitApp();
    }
}

function quitApp() {
	Application.Quit();
}

function startServer() {
	Network.InitializeServer(8, 25001, useNat);
}

function OnPlayerConnected(player: NetworkPlayer) {
	players.Add(player);
	
	var test = new GameObject();
	test.AddComponent(NetworkView);
	
	var testScript = test.AddComponent(PlayerWindow);
	testScript.init(Vector2 (10,10), player, windowCounter, true);
	
	windowCounter++;
	
	Debug.Log("Player connected from " + player.ipAddress + ":" + player.port);
}

// Messages
function OnServerInitialized() {
	Debug.Log("Server Initialized!");
}