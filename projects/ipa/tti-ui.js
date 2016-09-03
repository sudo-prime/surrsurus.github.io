'use strict';

var TTIForm = {
    undefMsg: "Some words you have entered cannot be found in the IPA dictionary.",
	multiMsg: "Some words you have entered have multiple pronunciations in english. These differences are seperated with 'OR'",
	currErrMsg: "",
	currMulMsg: "",
	resetErrMsgs: function () {
		this.currErrMsg = "";
		this.currMulMsg = "";
	},
	updateMsgs: function () {
		document.getElementById("ipa-err-undef").innerHTML = "<p>" + this.currErrMsg + "</p>";
		document.getElementById("ipa-warn-multi").innerHTML = "<p>" + this.currMulMsg + "</p>";
	},
	updateTextarea: function (IPAText) {
		document.getElementById("ipa-out").value = IPAText
	},
	//TODO: Strip and reinsert punctuation
	convert: function () {
		this.resetErrMsgs();
		var IPAText = [];
		var englishText = document.getElementById("ipa-in").value.split(/\s+/g);
		for ( var i = 0; i < englishText.length; i++ ) {
            // Strip punctuation and look up word
			var IPAWordArr = TextToIPA.lookup(englishText[i].toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " "));
			if ( typeof IPAWordArr[0] == "undefined" ) {
				this.currErrMsg = this.undefMsg
				IPAText.push(englishText[i]);
            } else if ( IPAWordArr[0] == "multi" ) {
                this.currMulMsg = this.multiMsg
                IPAText.push(IPAWordArr[1]);
			} else {
				IPAText.push(IPAWordArr[1]);
			}
		}
		IPAText = IPAText.join(" ");
		this.updateTextarea(IPAText);
		this.updateMsgs();
	}
}
