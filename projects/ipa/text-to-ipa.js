'use strict';

var TextToIPA = {
    location: './ipadict.txt', // Probably should use json, but this dictionary will do
    ipadict: {},
    // Parse array from read file to the dictionary
    parseDict: function (lines) {
        console.log("beginning parsing to dict...");

        for (var i = 0; i < lines.length; i++) {
            var arr = lines[i].split(/\s+/g);
            this.ipadict[arr[0]] = arr[1];
        }

        console.log("done parsing");
    },
    // Loads dictionary to object for lookups
    // MUST run when page is loaded, or this entire thing is useless
    loadDict: function () {
        console.log('loading dict...');

        var txtFile = new XMLHttpRequest();

        txtFile.open('GET', this.location, true);

        txtFile.onreadystatechange = function() {
          if (txtFile.readyState == 4) {  // document is ready to parse.
            if (txtFile.status == 200 || txtFile.status == 0) {  // file is found
              TextToIPA.parseDict(txtFile.responseText.split("\n"));
            }
          }
        }

        txtFile.send(null);
    },
    // Lookup a word in a dictionary
    lookup: function (word) {
        // It is possible to return undefined, so that case should not be ignored
        if ( typeof this.ipadict[word] != "undefined" ) {
            // Some words in english have multiple pronunciations (maximum of 4 in this dictionary)
            if ( typeof this.ipadict[word + "(1)"] != "undefined" ) {
                if ( typeof this.ipadict[word + "(2)"] != "undefined" ) {
                    if ( typeof this.ipadict[word + "(3)"] != "undefined" ) {
                        return this.ipadict[word] + " OR " + this.ipadict[word + "(1)"] + " OR " + this.ipadict[word + "(2)"] + " OR " + this.ipadict[word + "(3)"]
                    } else {
                        return this.ipadict[word] + " OR " + this.ipadict[word + "(1)"] + " OR " + this.ipadict[word + "(2)"]
                    }
                } else {
                    return this.ipadict[word] + " OR " + this.ipadict[word + "(1)"]
                }
            } else {
                return this.ipadict[word]
            }
        } else {
            return undefined
        }
    }
}

window.onload = TextToIPA.loadDict();
