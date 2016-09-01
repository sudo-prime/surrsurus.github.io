'use strict';

function include(arr, obj) {
    return (arr.indexOf(obj) != -1);
}

var PhoneForm = {
    updateValue: function (val) {
        var phoneString = ''
        for ( var i = 0; i < val.toString().length; i++ ) {
            if ( include ([3, 6], i) ) {
                phoneString += '-'
            }
            phoneString += val.toString().split('')[i]
        }
        document.getElementById('js-phone-range').innerHTML = '<p>' + phoneString + '</p>';
    }
}
