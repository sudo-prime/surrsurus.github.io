// Email form manager. Allows users to input their emails in the best way possible.
// Requires an output div with ID js-email-content and then two buttons to link
// the increment and submit actions to.

// String prototypes

if (typeof String.replaceAt !== 'function') {
  // Replace the character at a specific location of a string
  String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
  }
}

if (typeof String.nextCharAt !== 'function') {
  // Get the next sequential character by ASCII value at a specific
  // point in the string.
  String.prototype.nextCharAt = function(index) {
    return String.fromCharCode(this.charCodeAt(index) + 1);
  }
}

if (typeof String.replaceNextCharAt !== 'function') {
  // Replace the character at index with the next sequential
  // character in terms of it's ASCII value.
  String.prototype.replaceNextCharAt = function(index) {
    return this.replaceAt(index, this.nextCharAt(index));
  }
}

if (typeof EmailForm !== 'object') {
  var EmailForm = {};
}

(function () {
  
  'use strict';
  
  if (typeof EmailForm.currentEmail !== 'string') {
    // Store the current email as a string
    EmailForm.currentEmail = 'a';
  }
    
  if (typeof EmailForm.extension !== 'string') {
    // Store the extension used
    EmailForm.extension = '@gmail.com';
  }

  if (typeof EmailForm.incrementEmail !== 'function') {
    // Increment the email by one letter
    EmailForm.incrementEmail = function () {
      // If the first letter does not equal z, increment it
      // Otherwise check all other spaces
      if ( this.currentEmail.charAt(0) !== 'z') {
        this.currentEmail = this.currentEmail.replaceNextCharAt(0);
      } else {
        for ( var i = 0; i < this.currentEmail.length; i++ ) {
          if ( this.currentEmail.charAt(i) == 'z' ) {
            if ( i + 1 < this.currentEmail.length ) {
              this.currentEmail = this.currentEmail.replaceNextCharAt(i + 1);
            } else {
              this.currentEmail += 'a';
            }
          }
          this.currentEmail = this.currentEmail.replaceAt(0, 'a');
        }
      }
    }
  } 

  if (typeof EmailForm.updateEmail !== 'function') {
    // Set the designated element with id to have the contents of the email
    // Depends on the existance of a div with a js-email-content ID
    EmailForm.updateEmail = function (id) {
      document.getElementById(id).innerHTML = '<p>' + this.currentEmail + this.extension + '</p>';
    }
  }

  if (typeof EmailForm.incButtonPress !== 'function') {
    // Increment button press action
    EmailForm.incButtonPress = function (id) {
      this.incrementEmail();
      this.updateEmail(id);
    }
  }

  if (typeof EmailForm.updateEmail !== 'function') {
    // Submit the email
    EmailForm.submitButtonPress = function (id) {
      this.currentEmail = 'a';
      this.updateEmail(id);
    }
  }

}());