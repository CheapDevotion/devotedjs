function Terrain(segmentCount) {
    this.segmentCount = segmentCount;
    this.points = [];
    for (i=0; i<=segmentCount; ++i) {
        this.points[i] = 0;
    }
};

/**
* Generate the terrain using the mid-point displacement algorithm. This is in fact
* a shortcut to the recursive function with the appropriate value to start
* generating the terrain.
*
* @param maxElevation the maximal vertical displacement to apply at this iteration
* @param sharpness how much to attenuate maxElevation at each iteration (lower
*        value means a smoother terrain). Keep between 0 and 1.
*/
Terrain.prototype.generateUsingMidPoint = function(maxElevation, sharpness) {
    this.midPoint(0, this.segmentCount, maxElevation, sharpness);
}

/**
* This is the recursive function to actually generate the terrain. It computes a new height for the point
* between "start" and "end" (the mid-point): averages start and end heights and adds a random
* displacement.
*
* @param maxElevation the maximal vertical displacement to apply at this iteration
* @param sharpness how much to attenuate maxElevation at each iteration (lower
*        value means a smoother terrain). Keep between 0 and 1.
*/
Terrain.prototype.midPoint = function(start, end, maxElevation, sharpness) {
    var middle = Math.round((start + end) * 0.5);
    if ((end-start<=1) || middle==start || middle==end) {
        return;
    }

    var newAltitude = 0.5 * (this.points[end] + this.points[start]) + maxElevation*(1 - 2*Math.random());
    this.points[middle] = newAltitude;

    this.midPoint(start, middle, maxElevation*sharpness, sharpness);
    this.midPoint(middle, end, maxElevation*sharpness, sharpness);
};