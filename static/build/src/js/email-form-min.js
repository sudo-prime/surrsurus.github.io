'use strict';String.prototype.replaceAt=function(index,character){return this.substr(0,index)+character+this.substr(index+character.length)}
function nextChar(c){return String.fromCharCode(c.charCodeAt(0)+1)}
var EmailForm={currentEmail:'a',extension:'@gmail.com',getEmailArray:function(){return this.currentEmail.split('')},getFullEmail:function(){return this.currentEmail+this.extension},checkZs:function(){for(var i=0;i<this.currentEmail.length;i++){if(this.currentEmail.charAt(i)=='z'){if(i+1<this.currentEmail.length){this.currentEmail=this.currentEmail.replaceAt(i+1,nextChar(this.currentEmail.charAt(i+1)))}else{this.currentEmail+='a'}
this.currentEmail=this.currentEmail.replaceAt(i,'a')}}},incrementEmail:function(){if(this.currentEmail.charAt(0)!='z'){this.currentEmail=this.currentEmail.replaceAt(0,nextChar(this.currentEmail.charAt(0)))}else{this.checkZs()}},updateEmail:function(){document.getElementById('js-email-content').innerHTML='<p>'+this.getFullEmail()+'</p>'},incButtonPress:function(){this.incrementEmail();this.updateEmail()},submitButtonPress:function(){this.currentEmail='a';this.updateEmail()}}