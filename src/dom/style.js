/**
 * @fileoverview styles support - emulate built-in DOM style object
 * 
 * @author Tony Parisi
 */

goog.provide('glam.DOMStyle');

glam.DOMStyle = function(docelt) {

	this.docelt = docelt;
	this._properties = {
	};
	
	this.setPropertyHandlers = [];
	this.defineStandardProperties();
}

glam.DOMStyle.prototype = new Object;

glam.DOMStyle.prototype.addProperties = function(props) {
	for (var p in props) {
		this.addProperty(p, props[p]);
	}
}

glam.DOMStyle.prototype.addProperty = function(propName, propValue) {

	this.defineProperty(propName, propValue);

	this._properties[propName] = propValue;
}

glam.DOMStyle.prototype.addPropertiesFromString = function(str) {
	var propstrs = str.split(';');
	var props = {
	};
	
	var i, len = propstrs.length;
	for (i = 0; i < len; i++) {
		var prop = propstrs[i];
		var elts = prop.split(':');
		var propName = elts[0];
		propName = propName.replace(/ /g,'');
		if (propName) {
			var propValue = elts[1];
			props[propName] = propValue;
		}
	}
	
	this.addProperties(props);
}

glam.DOMStyle.prototype.onPropertyChanged = function(propName, propValue) {

	// console.log(this.docelt.id, "property", propName, "value changed to", propValue);

	var i, len = this.setPropertyHandlers.length;
	for (i = 0; i < len; i++) {
		var handler = this.setPropertyHandlers[i];
		if (handler) {
			handler(propName, propValue);
		}
	}
}

glam.DOMStyle.prototype.defineProperty = function(propName, propValue) {
	Object.defineProperty(this, propName, {
			enumerable : true,
			configurable : true,
	        get: function() {
	            return this._properties[propName];
	        },
	        set: function(v) {
	        	this._properties[propName] = v;
	        	this.onPropertyChanged(propName, v);
	        }
		});
}

glam.DOMStyle.prototype.defineStandardProperties = function() {

	var props = glam.DOMStyle._standardProperties
	var propName;
	for (propName in props) {
		var propValue = props[propName];
		this.defineProperty(propName, propValue)
	}
}

glam.DOMStyle._standardProperties = {
		"angle" : "",
		"backface-visibility" : "visible",
		"background-type" : "",
		"bevel-size" : "",
		"bevel-thickness" : "",
		"color" : "",
		"diffuse-color" : "",
		"diffuseColor" : "",
		"specular-color" : "",
		"specularColor" : "",
		"dash-size" : "",
		"depth" : "",
		"distance" : "",
		"end-angle" : "",
		"cube-image-back" : "",
		"cube-image-bottom" : "",
		"cube-image-front" : "",
		"cube-image-left" : "",
		"cube-image-right" : "",
		"cube-image-top" : "",
		"sphere-image" : "",
		"sphereImage" : "",
		"font-bevel" : "",
		"font-depth" : "",
		"font-family" : "",
		"font-size" : "",
		"font-style" : "",
		"font-weight" : "",
		"gap-size" : "",
		"height" : "",
		"line-width" : "",
		"image" : "",
		"normal-image" : "",
		"bump-image" : "",
		"specular-image" : "",
		"opacity" : "",
		"radius" : "",
		"radius-segments" : "",
		"width-segments" : "",
		"height-segments" : "",
		"reflectivity" : "",
		"refraction-ratio" : "",
		"render-mode" : "",
		"rx" : "",
		"ry" : "",
		"rz" : "",
		"shader" : "phong",
		"fragment-shader" : "",
		"vertex-shader" : "",
		"shader-uniforms" : "",
		"start-angle" : "",
		"sx" : "",
		"sy" : "",
		"sz" : "",
		"vertex-colors" : "",
		"vertex-normals" : "",
		"width" : "",
		"x" : "",
		"y" : "",
		"z" : "",
};

