const totalLocations = 1 //figure out total checks
let totalLocationsChecked = 0;
let totalLocationsUnchecked = totalLocations;

function UpdateTotalUnchecked()
{
    totalLocationsUnchecked = totalLocations - totalLocationsChecked;
}