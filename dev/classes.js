Element.prototype.kitAddClass = function (classN) {
	if(!this.kitHasClass(classN)) this.className += " " + classN;
	return this;
};

Element.prototype.kitRemoveClass = function (classN) {
	if (this.kitHasClass(classN)) this.className = this.className.replace(new RegExp('[\\s]{0,1}\\b' + classN + '\\b',"g"),"");
	return this;
};

Element.prototype.kitHasClass = function (classN) {
	return this.className.indexOf(classN) >= 0;
};