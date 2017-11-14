// Create a ConverterForm object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.
if (typeof PhoneForm !== 'object') {
  PhoneForm = {};
}

(function () {

  'use strict';

  // Find if array includes element. Used for inserting hyphens into phone number
  if (typeof PhoneForm.include !== 'function') {
    PhoneForm.include = function (arr, obj) {
      return ( arr.indexOf(obj) !== -1 );
    };
  };

  if (typeof PhoneForm.updateValue !== 'function') {
    PhoneForm.updateValue = function (val, id) {

      // The output string
      var phoneString = '';

      // If number has less than 10 digits, add preceding 0s
      if (val.toString().length < 10) {
        val = Array(11 - val.toString().length).join('0') + val.toString();
      };

      // Format phone number
      for ( var i = 0; i < val.toString().length; i++ ) {
          // Use the include function to add hypens at positions 3 and 6 in the phoneString
          if ( PhoneForm.include ([3, 6], i) ) {
              phoneString += '-'
          }
          // Add number to string
          phoneString += val.toString().split('')[i]
        }

      // Update DOM object that shows the phone number
      document.getElementById(id).innerHTML = '<p>' + phoneString + '</p>';

    };
  };

  if (typeof PhoneForm.submitButtonPress !== 'function') {
    PhoneForm.submitButtonPress = function (id) {
      PhoneForm.updateValue(5555555555, id);
    }
  }

}());