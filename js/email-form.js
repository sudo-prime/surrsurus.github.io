'use strict';

// Email form manager. Allows users to input their emails in the best way possible.
// Requires an output div with ID js-email-content and then two buttons to link
// the increment and submit actions to.

String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

var EmailForm = {
    currentEmail: "a",          // Store the current email as a string
    extension: "@gmail.com",    // Store the extension used

    // Return an array of the current email (minus extension)
    getEmailArray: function () {
        return this.currentEmail.split("");
    },

    // Return the email with extension
    getFullEmail: function () {
        return this.currentEmail + this.extension;
    },

    // Break email down into characters and search for Zs
    // If there are Zs, increment next letter or add it if it's not there
    checkZs: function () {
        for ( var i = 0; i < this.currentEmail.length; i++ ) {
            if ( this.currentEmail.charAt(i) == "z" ) {
                if ( i + 1 < this.currentEmail.length ) {
                    this.currentEmail = this.currentEmail.replaceAt(i + 1, nextChar(this.currentEmail.charAt(i + 1)));
                } else {
                    this.currentEmail += "a";
                }
                this.currentEmail = this.currentEmail.replaceAt(i, "a");
            }
        }
    },

    // Increment the email by one letter
    incrementEmail: function () {
        // If the first letter does not equal z, increment it
        // Otherwise check all other spaces
        if ( this.currentEmail.charAt(0) != "z" ) {
            this.currentEmail = this.currentEmail.replaceAt(0, nextChar(this.currentEmail.charAt(0)));
        } else {
            this.checkZs();
        }
    },

    // Set the designated element with id to have the contents of the email
    // Depends on the existance of a div with a js-email-content ID
    updateEmail: function () {
        document.getElementById("js-email-content").innerHTML = "<p>" + this.getFullEmail() + "</p>";
    },

    // Increment button press action
    incButtonPress: function () {
        this.incrementEmail();
        this.updateEmail();
    },

    // Submit the email
    submitButtonPress: function () {
        this.currentEmail = "a";
        this.updateEmail();
    }
}
