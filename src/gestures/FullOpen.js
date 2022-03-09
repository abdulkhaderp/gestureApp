// Import dependencies
import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose'; 

// Define Gesture Description
export const fullOpenGesture = new GestureDescription('full_open'); 


for(let finger of [Finger.Middle, Finger.Ring, Finger.Thumb , Finger.Pinky, Finger.Index]){
    fullOpenGesture.addCurl(finger, FingerCurl.NoCurl, 1.0); 
    fullOpenGesture.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}
