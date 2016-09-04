'use strict';

// Find if array includes element. Used for inserting hyphens into phone number
function include(arr, obj) {
    return (arr.indexOf(obj) != -1);
}

// Phone input brains
var PhoneForm = {
    // Every time the slider moves, it calls this method with it's value as input
    updateValue: function (val) {
        var phoneString = '' // The output string
        // Format phone number
        for ( var i = 0; i < val.toString().length; i++ ) {
            // Use the include function to add hypens at positions 3 and 6 in the phoneString
            if ( include ([3, 6], i) ) {
                phoneString += '-'
            }
            // Add number to string
            phoneString += val.toString().split('')[i]
        }
        // Update DOM object that shows the phone number
        document.getElementById('js-phone-range').innerHTML = '<p>' + phoneString + '</p>';
    }
}
