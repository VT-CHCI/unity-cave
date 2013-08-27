#pragma downcast

private var windowSize : Rect = Rect (20, Screen.height - 220, 200, 200);
private var avatarSize = 15;
private var caveSize = 200;
private var center = 118;

private var mdown = false;
private var t1 : Rect = Rect (caveSize/2 - avatarSize/2,caveSize/2 - avatarSize/2,avatarSize,avatarSize);

public var cave : GameObject;
public var caveWidth = 2.5;

private var windowRect : Rect = Rect (Screen.width - 150, Screen.height - 150, 120, 130);
public var cameras : GameObject;

public var showGUI = true;

// Make the contents of the window
function caveSim (windowID : int) {
	var fMouseX : float = Input.mousePosition.x;
    var fMouseY : float = 235-Input.mousePosition.y;

	if (t1.Contains(Event.current.mousePosition)) {
		if (Event.current.type == EventType.MouseDown && mdown==false) {
		    mdown=true; 
		    return;
		}
		if (Event.current.type == EventType.MouseUp && mdown==true) {
		    mdown=false;
		}
	}

    if (mdown) {
		t1 = Rect(fMouseX-25, fMouseY-25, 15, 15);//notice the -25, did this so the button would center on my cursor, otherwise it grabs on the top left corner. Based off of the size of your button of course
    	
    	if (null != cave) {
    		cave.transform.localPosition = Vector3(2.5*(118-fMouseX)/118,-1,-2.5*(118-fMouseY)/118);
    	}
    }
    GUI.Button (Rect(t1), "X");
}

function viewCamera (position: String) {
	for (var camera : Camera in cameras.GetComponentsInChildren(Camera)) {
		if (camera.name.Contains(position)) {
			camera.depth = 1;
		}
		else {
			camera.depth = 0;
		}
	}
}

function cameraChooser (windowID: int) {
	if (GUI.Button (Rect (10,20,100,20), "Front")) {
			viewCamera("Front");
	}
	else if (GUI.Button (Rect (10,45,100,20), "Left")) {
			viewCamera("Left");
	}
	else if (GUI.Button (Rect (10,70,100,20), "Right")) {
			viewCamera("Right");
	}
	else if (GUI.Button (Rect (10,95,100,20), "Bottom")) {
			viewCamera("Bottom");
	}
}

function OnGUI () {
	if (showGUI) {
		GUI.Window (0, windowSize, caveSim, "CAVE View");
		GUI.Window (1, windowRect, cameraChooser, "Camera Select");
	}
}