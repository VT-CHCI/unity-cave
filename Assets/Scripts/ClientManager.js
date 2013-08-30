﻿#pragma strict

import System.Xml;
import System.IO;

private var useNat = false;
private var inCave = true;
private var endClient = false;

private var players = new Array();

function setCamera (position: String) {
	for (var camera : Camera in Camera.allCameras) {
		if (camera.name.Contains(position)) {
			camera.enabled = true;
		}
		else {
			camera.enabled = false;
		}
	}
}

function Start() {
	var sim = gameObject.GetComponent(CaveSimulator);
	sim.showGUI = false;
	
	var asset:TextAsset = Resources.Load("config");
	
    if(asset != null) {
        var reader:XmlTextReader = new XmlTextReader(new StringReader(asset.text));
        while(reader.Read()) {
            if(reader.Name == "wallPosition") {
            	setCamera(reader.GetAttribute("label"));
            }
        }
    }
    
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