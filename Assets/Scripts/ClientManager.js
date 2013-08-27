#pragma strict

private var useNat = false;
private var inCave = true;
private var endClient = false;

private var players = new Array();

function Start() {
	var sim = gameObject.GetComponent(CaveSimulator);
	sim.showGUI = false;

	Network.Connect("console.sv.vt.edu", 25001);
}

function Update() {
    if (Input.GetKeyDown(KeyCode.Escape)) {
        quitApp();
    }
}

function quitApp() {
	Application.Quit();
}

// Messages
function OnFailedToConnect(error : NetworkConnectionError) {
	Debug.Log("Could not connect to server: "+ error);
	
	inCave = false;
	if (!inCave && !endClient) {
		Network.Connect("127.0.0.1", 25001);
		endClient = true;
	} else {
		Debug.Log("Could not connect to either server, quitting app");
		quitApp();
	}
}

function OnConnectedToServer() {
	Debug.Log("Connected to server");
	// Send local player name to server ...
}

function OnDisconnectedFromServer () {
	quitApp();
}