'use strict';

var TextToIPA = {
    location: './ipadict.txt',
    ipadict: [], // gotta load this up
    parseDict: function (lines) {
        console.log(lines);
    },
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
    lookup: function (word) {
        console.log('lookup ' + word);
    }
}

window.onload = TextToIPA.loadDict();
