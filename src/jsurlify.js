var JSUrlify = function(u) {
  
  // Private methods.
  var valid_arguments = function(args){
    // Accept only undefined, or non empty strings
    return args.length == 1 && ( typeof args[0] === 'undefined' || args[0].length > 0 );
  };
  
  var array_filter = function(array, fun /*, thisp */){
    // IE doesn't support filter method
    var len = array.length >>> 0;
    if (typeof fun != "function"){
      throw new TypeError();
    }

    var res = [];
    var thisp = arguments[2];
    for (var i = 0; i < len; i++)
    {
      if (i in array)
      {
        var val = array[i]; // in case fun mutates this
        if (fun.call(thisp, val, i, array)){
          res.push(val);
        }
      }
    }

    return res;
  };
  
  var array_index_of = function(array, obj, start){
    // IE doesn't support indexOf method
    for (var i = (start || 0); i < array.length; i++) {
      if (array[i] == obj) {
        return i;
      }
    }
    return -1;
  };
  
  // Privileged methods.
  this.attribute_names = function(){
    var all_names = [];
    
    // Get the names of the properties
    for(var prop in this) { 
      if( typeof(this[prop]) != 'function' ){
        all_names.push(prop);
      }
    }
    
    // Remove any out of date properties
    var that = this;
    attribute_names = array_filter(attribute_names, function(n){ return that.hasOwnProperty( n ); });
        
    // Compare with original order to get new attributes
    new_names = array_filter(all_names, function(n){ return array_index_of( attribute_names, n ) < 0; });
    
    // Return original names and new names
    return attribute_names.concat(new_names);
  };
  
  this.prepend = function(key,value){
    attribute_names.unshift(key);
    this[key] = value;
    return this;
  };
  
  this.scheme = function(){
    if( valid_arguments(arguments) ){ scheme = arguments[0]; }
    return scheme;
  };
  
  this.authority = function(){
    if( valid_arguments(arguments) ){ authority = arguments[0]; }
    return authority;
  };
  
  this.path = function(){
    if( valid_arguments(arguments) ){ path = arguments[0]; }
    return path;
  };
  
  this.query = function(query){
    switch( typeof(query) ){
      case 'string':
        this.clear_query();
        attribute_names = [];
        if( array_index_of( query,'=' ) > 0){
          var query_array = query.split("&");        
          for (var i in query_array){
            if( query_array.hasOwnProperty(i) ){
              var a = query_array[i].split("=");
              attribute_names.push( a[0] );
              this[a[0]] = decodeURIComponent(a[1].replace(/\+/g,' '));
            }
          }
        }
        break;
      case 'object':
        this.clear_query();
        for (var key in query){
          if( typeof(query[key]) != "function" ){
            this[key] = query[key];
          }
        }
        break;
    }
    
    return this;
  };
  
  this.fragment = function(){
    if( valid_arguments(arguments) ){ fragment = arguments[0]; }
    return fragment;
  };

  // Private attributes
  var attribute_names = [];
  // http://www.ietf.org/rfc/rfc2396.txt (Appendix B)
  //                        --scheme--      -author-   --path--     -query-    -f-
  var match = new RegExp('^(([^:/?#]+):)?(//([^/?#]*))?([^?#]+)?(\\?([^#]*))?(#(.*))?').exec(u);
  var scheme, authority, path, query, fragment;  
  
  this.scheme( match[2] );
  this.authority( match[4] );
  this.path( match[5] );
  this.query( match[7] );
  this.fragment( match[9] );
};

// Public methods
JSUrlify.prototype.toString = function(){
  var url = [];
  // Add scheme and authority if available
  if( typeof(this.scheme()) == 'string' && typeof(this.authority()) == 'string' ){ url.push(this.scheme() + "://" + this.authority()); }
  // Add path if available
  if( typeof(this.path()) == 'string' ){ url.push(this.path()); }
  // Add query parameters, maintaining original order if available
  var names = this.attribute_names();
  if( names.length > 0 ){ 
    var params = [];
    for (var i in names){
      if( names.hasOwnProperty(i) ){
        key = names[i];
        if ( this[key] === null || this[key] === undefined){
          value = "";
        } else {
          value = encodeURIComponent( this[key] ).replace(/%20/g,'+');
        }
        params.push(key + "=" + value);
      }
    }
    url.push("?" + params.join("&"));
  }
  // Add fragment if available
  if( typeof(this.fragment()) == 'string' ){ url.push("#" + this.fragment()); }
  return url.join('');
};

JSUrlify.prototype.clear_scheme = function(){
  this.scheme(undefined);
};

JSUrlify.prototype.clear_authority = function(){
  this.authority(undefined);
};

JSUrlify.prototype.clear_path = function(){
  this.path(undefined);
};

JSUrlify.prototype.clear_query = function(){
  var names = this.attribute_names();
  for (var i in names){
    if( names.hasOwnProperty(i) ){
      delete this[names[i]];
    }
  }
};

JSUrlify.prototype.clear_fragment = function(){
  this.fragment(undefined);
};

JSUrlify.prototype.append = function(key,value){
  this[key] = value;
  return this;
};

JSUrlify.prototype.remove = function(attribute){
  value = this[attribute];
  delete this[attribute];
  return value;
};

JSUrlify.prototype.go = function(attribute){
  window.location.href = this.toString();
  return this;
};