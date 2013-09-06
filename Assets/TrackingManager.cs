using UnityEngine;
using System.Collections;
using System;
using System.Runtime.InteropServices;

public class TrackingManager : MonoBehaviour {
//Lets make our calls from the Plugin	
	
	const int BUTTON = 0;
	const int NOT_BUTTON = 1;
	
	[DllImport ("dtkPlugin")]
	private static extern IntPtr ReadDevice_Create(string deviceName, int size, int type);
	
	[DllImport ("dtkPlugin")]
	private static extern bool ReadDevice_valid(IntPtr pFoo);
	
	[DllImport ("dtkPlugin")]
	private static extern float[] ReadDevice_get6DOF(IntPtr pFoo);
	
	[DllImport ("dtkPlugin")]
	private static extern float[] ReadDevice_getPosition(IntPtr pFoo, int size);
	
	[DllImport ("dtkPlugin")]
	private static extern char ReadDevice_getButtons(IntPtr pFoo);
	
	[DllImport ("dtkPlugin")]
	private static extern void ReadDevice_Delete(IntPtr pFoo);
	
	private IntPtr head;
	private IntPtr wand;
	private IntPtr joystick;
	private IntPtr button;
	
	private Debugger debugger;
	
	void Start () {
		debugger = (Debugger) gameObject.GetComponent("Debugger");
		debugger.setText("Attempting to load trackers");
		
		Debug.Log("Attempting to load trackers");
		
		head = ReadDevice_Create ("head", 6, NOT_BUTTON);
		
		if (ReadDevice_valid(head)) {
			debugger.setText ("Connected to head");
		} else {
			debugger.setText ("Connecting to head failed");
		}
	}
	
	private float[] headData = new float[6];
	
	void Update () {
		if (ReadDevice_valid(head)) {
			headData = ReadDevice_get6DOF(head);
			
			string data = "";
			
			data = headData[0].ToString() + headData[1].ToString() + headData[2].ToString();
			
			debugger.setText(data);
		
			
		}
	}
}
