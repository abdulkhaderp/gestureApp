// Import dependencies
import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose'; 

// Define Gesture Description
export const fullCloseGesture = new GestureDescription('full_close'); 


for(let finger of [Finger.Middle, Finger.Ring, Finger.Thumb , Finger.Pinky, Finger.Index]){
    fullCloseGesture.addCurl(finger, FingerCurl.FullCurl, 1.0); 
}




