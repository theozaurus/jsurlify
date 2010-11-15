describe("instance methods", function(){
  
  describe("toString()", function(){
    
    it("output entire url for url with path and parameters",function(){
      var url =  new JSUrlify("/images/foobar.png?x=27");
      expect( url.toString() ).toEqual( "/images/foobar.png?x=27" );
    });
    
    it("output entire url for url with path and fragment",function(){
      var url =  new JSUrlify("/help/faq#how-do-i");
      expect( url.toString() ).toEqual( "/help/faq#how-do-i" );
    });
    
    it("output entire url for url with path, query and fragment",function(){
      var url =  new JSUrlify("/search?term=jsurlify&bob=yes#download");
      expect( url.toString() ).toEqual( "/search?term=jsurlify&bob=yes#download" );
    });
    
    it("output entire url for url with scheme and authority", function(){
      var url =  new JSUrlify("http://github.com");
      expect( url.toString() ).toEqual( "http://github.com" );
    });
    
    it("output entire url for url with scheme, authority and path", function(){
      var url =  new JSUrlify("http://github.com/theoooo/jsurlify");
      expect( url.toString() ).toEqual( "http://github.com/theoooo/jsurlify" );
    });
    
    it("output entire url for url with scheme, authority, path and fragment", function(){
      var url =  new JSUrlify("http://github.com/theoooo/jsurlify#bish");
      expect( url.toString() ).toEqual( "http://github.com/theoooo/jsurlify#bish" );
    });
    
    it("output entire url for url with scheme, authority, path, query", function(){
      var url =  new JSUrlify("http://github.com/theoooo/jsurlify?one=1&two=2&three=3");
      expect( url.toString() ).toEqual( "http://github.com/theoooo/jsurlify?one=1&two=2&three=3" );
    });
    
    it("output entire url for url with scheme, authority, path, query and fragment", function(){
      var url =  new JSUrlify("http://github.com/theoooo/jsurlify?one=1&two=2&three=3#now");
      expect( url.toString() ).toEqual( "http://github.com/theoooo/jsurlify?one=1&two=2&three=3#now" );
    });
    
  });
  
  describe("attribute_names()", function(){
    it("should return the list of attribute names in original order", function(){
      var url =  new JSUrlify("/theoooo/jsurlify?one=1&two=2&three=3");
      
      expect( url.attribute_names() ).toEqual(['one','two','three']);
    });
    
    it("should not return any removed attributes", function(){
      var url =  new JSUrlify("/theoooo/jsurlify?one=1&two=2&three=3");
      
      url.remove('two');
      
      expect( url.attribute_names() ).toEqual(['one','three']);
    });
    
    it("should have any new attributes added to the end", function(){
      var url =  new JSUrlify("/theoooo/jsurlify?one=1&two=2&three=3");
      
      url['four'] = 4;
      url['five'] = 5;
      url['six']  = 6;
      
      expect( url.attribute_names() ).toEqual(['one','two','three','four','five','six']);
    });
  });
  
  describe("scheme()", function(){
    it("should be set when initialized with an absolute URL", function(){
      var url =  new JSUrlify("http://github.com/theoooo");
      
      expect( url.scheme() ).toEqual("http");
    });
    
    it("should be undefined when initialized with a relative URL", function(){
      var url =  new JSUrlify("/theoooo/jsurlify");
      
      expect( url.scheme() ).toBeUndefined();
    });
    
    it("should be possible to edit", function(){
      var url =  new JSUrlify("http://github.com/theoooo");
      
      url.scheme('https');
      
      expect( url.toString() ).toEqual('https://github.com/theoooo');
    });
  });
  
  describe("authority()", function(){
    it("should be set when initialized with an absolute URL", function(){
      var url =  new JSUrlify("http://github.com/theoooo");
      
      expect( url.authority() ).toEqual("github.com");
    });
    
    it("should be undefined when initialized with a relative URL", function(){
      var url =  new JSUrlify("/theoooo/jsurlify");
      
      expect( url.authority() ).toBeUndefined();
    });
    
    it("should be possible to edit", function(){
      var url =  new JSUrlify("http://github.com/theoooo");
      
      url.authority('gitblub.com');
      
      expect( url.toString() ).toEqual('http://gitblub.com/theoooo');
    });
  });
  
  describe("path()", function(){
    it("should be set when initialized with a URL with a path", function(){
      var url =  new JSUrlify("http://github.com/theoooo?abc=123");
      
      expect( url.path() ).toEqual("/theoooo");
    });
    
    it("should be '' when initialized with a URL without a path", function(){
      var url =  new JSUrlify("http://github.com?abc=123#flub");
      
      expect( url.path() ).toBeUndefined();
    });
    
    it("should be possible to edit", function(){
      var url =  new JSUrlify("http://github.com/theoooo?abc=123#flub");
      
      url.path('/theozaurus');
      
      expect( url.toString() ).toEqual('http://github.com/theozaurus?abc=123#flub');
    });
  });
  
  describe("fragment()", function(){
    it("should be set when initialized with a URL with a fragment", function(){
      var url =  new JSUrlify("http://github.com/theoooo?abc=123#flub");
      
      expect( url.fragment() ).toEqual("flub");
    });
    
    it("should be undefined when initialized with a URL without a fragment", function(){
      var url =  new JSUrlify("http://github.com/theoooo?abc=123");
      
      expect( url.fragment() ).toBeUndefined();
    });
    
    it("should be possible to edit", function(){
      var url =  new JSUrlify("http://github.com/theoooo?abc=123");
      
      url.fragment("yay");
      
      expect( url.toString() ).toEqual('http://github.com/theoooo?abc=123#yay');
    });
  });
  
  describe("query()", function(){
    it("should return self", function(){
      var url =  new JSUrlify("/theoooo/jsurlify?one=1&two=2&three=3");
      
      expect( url.query() ).toEqual( url );
    });
    
    it("bulk set query from a string", function(){
      var url =  new JSUrlify("/theoooo/jsurlify?one=1&two=2&three=3");
      
      url.query("four=4&five=5");
      
      expect( url.toString() ).toEqual( "/theoooo/jsurlify?four=4&five=5" );
    });
    
    it("bulk set query from an object", function(){
      var url =  new JSUrlify("/theoooo/jsurlify?one=1&two=2&three=3");
      
      var o = {
        four: 4,
        five: 5
      };
      
      url.query(o);
      
      expect( url.toString() ).toEqual( "/theoooo/jsurlify?four=4&five=5" );
    });
    
    it("remove all attributes with empty string", function(){
      var url =  new JSUrlify("/theoooo/jsurlify?one=1&two=2&three=3");
      
      url.query("");
      
      expect( url.toString() ).toEqual( "/theoooo/jsurlify" );
    });
    
    it("remove all attribuet with empty object", function(){
      var url =  new JSUrlify("/theoooo/jsurlify?one=1&two=2&three=3");
      
      url.query({});
      
      expect( url.toString() ).toEqual( "/theoooo/jsurlify" );
    });    
  });
  
  describe("clear_scheme()", function(){
    it("should remove the scheme", function(){
      var url = new JSUrlify("http://foo.com/bish/bash?hello=there&wiggle=12&blob=askdf");
      
      url.clear_scheme();
      
      expect( url.toString() ).toEqual("/bish/bash?hello=there&wiggle=12&blob=askdf");
    });
  });
  
  describe("clear_authority()", function(){
    it("should remove the authority", function(){
      var url = new JSUrlify("http://foo.com/bish/bash?hello=there&wiggle=12&blob=askdf");
      
      url.clear_authority();
      
      expect( url.toString() ).toEqual("/bish/bash?hello=there&wiggle=12&blob=askdf");
    });
  });
  
  describe("clear_path()", function(){
    it("should remove the path", function(){
      var url = new JSUrlify("http://foo.com/bish/bash?hello=there&wiggle=12&blob=askdf");
      
      url.clear_path();
      
      expect( url.toString() ).toEqual("http://foo.com?hello=there&wiggle=12&blob=askdf");
    });
  });
  
  describe("clear_query()", function(){
    it("should remove the query", function(){
      var url = new JSUrlify("/bish/bash?hello=there&wiggle=12&blob=askdf");
      
      url.clear_query();
      
      expect( url.toString() ).toEqual("/bish/bash");
    });

    it("should remove any added query elements", function(){
      var url = new JSUrlify("/bish/bash?hello=there&wiggle=12&blob=askdf");
      url["foo"] = "bar";
      
      url.clear_query();
      
      expect( url.toString() ).toEqual("/bish/bash");
    });

  });
  
  describe("clear_fragment()", function(){
    it("should remove the fragment", function(){
      var url = new JSUrlify("/bish/bash?hello=there&wiggle=12&blob=askdf#suey");
      
      url.clear_fragment();
      
      expect( url.toString() ).toEqual("/bish/bash?hello=there&wiggle=12&blob=askdf");
    });
  });
  
  describe("remove()", function(){
    it("remove('wiggle') should delete the wiggle property from '/bish/bash?hello=there&wiggle=12'", function(){
      var url = new JSUrlify("/bish/bash?hello=there&wiggle=12");
      
      url.remove('wiggle');
      
      expect( url['wiggle'] ).toBeUndefined();
    });
    
    it("remove('wiggle') should remove the wiggle property from the output of '/bish/bash?hello=there&wiggle=12'", function(){
      var url = new JSUrlify("/bish/bash?hello=there&wiggle=12");
      
      url.remove('wiggle');
      
      expect( url.toString() ).toEqual( '/bish/bash?hello=there' );
    });
    
    it("remove('wiggle') should return the value from '/bish/bash?hello=there&wiggle=12'", function(){
      var url = new JSUrlify("/bish/bash?hello=there&wiggle=12");
      
      expect( url.remove('wiggle') ).toEqual( '12' );
    });
    
    it("remove('wiggle') from '/bish/bash?wiggle=12' should not output ?wiggle=12", function(){
      var url = new JSUrlify("/bish/bash?wiggle=12");
      
      url.remove('wiggle');
      
      expect( url.toString() ).toEqual( '/bish/bash' );
    });
  });
  
  describe("prepend()", function(){
    
    it("should add attribute to the begining of the query", function(){
      var url = new JSUrlify("/bish/bash?hello=there&wiggle=12");
      
      url.prepend('wibble','wobble');
      
      expect( url.toString() ).toEqual("/bish/bash?wibble=wobble&hello=there&wiggle=12");
    });
    
    it("should return self", function(){
      var url = new JSUrlify("/bish/bash?hello=there&wiggle=12");
      
      expect( url.prepend('wibble','wobble') ).toEqual(url);
    });
    
  });
  
  describe("append()", function(){
    
    it("should add attribute to the end of the query", function(){
      var url = new JSUrlify("/bish/bash?hello=there&wiggle=12");
      
      url.append('wibble','wobble');
      
      expect( url.toString() ).toEqual("/bish/bash?hello=there&wiggle=12&wibble=wobble");
    });
    
    it("should return self", function(){
      var url = new JSUrlify("/bish/bash?hello=there&wiggle=12");
      
      expect( url.append('wibble','wobble') ).toEqual(url);
    });
    
  });
  
  
  describe("[]", function(){
    
    describe("when reading", function(){
      it("['foo'] should return undefinied from '/images?abc=blob'", function(){
        var url = new JSUrlify("/images?abc=blob");

        expect( url["foo"] ).toBeUndefined();
      });

      it("['abc'] should return 'blob' from '/images?abc=blob'", function(){
        var url = new JSUrlify("/images?abc=blob");

        expect( url["abc"] ).toEqual("blob");
      });

      it("['abc'] should return '' from '/images?abc=&xyz=123'", function(){
        var url = new JSUrlify("/images?abc=&xyz=123");

        expect( url["abc"] ).toEqual("");
      });

      it("['abc'] should return 'second' from '/images?abc=first&abc=second'", function(){
        var url = new JSUrlify("/images?abc=first&abc=second");

        expect( url["abc"] ).toEqual("second");
      });
      
      it("['abc'] should return decoded value from '/hardware?shop=B%26Q'", function(){
        var url = new JSUrlify("/hardware?shop=B%26Q");

        expect( url["shop"] ).toEqual("B&Q");
      });
      
      it("['abc'] should return decoded value from '/sentences?sentence=this+has+spaces'", function(){
        var url = new JSUrlify("/sentences?sentence=this+has+spaces");

        expect( url["sentence"] ).toEqual("this has spaces");
      });
    });
    
    describe("when writing", function(){
      it("['foo'] = 'bar' should set override the foo attribute from '/images?foo=ey'", function(){
        var url = new JSUrlify("/images?foo=ey");
        url["foo"] = "bar";

        expect( url.toString() ).toEqual( "/images?foo=bar");
      });
      
      it("['scooby'] = 'doo' should add a new attribute to '/images?foo=ey'", function(){
        var url = new JSUrlify("/images?foo=ey");
        url["scooby"] = "doo";

        expect( url.toString() ).toEqual( "/images?foo=ey&scooby=doo");
      });
      
      it("['scooby'] = 2 should add a new attribute to '/images?foo=ey'", function(){
        var url = new JSUrlify("/images?foo=ey");
        url["scooby"] = 2;

        expect( url.toString() ).toEqual( "/images?foo=ey&scooby=2");
      });
      
      it("should add a new attribute to url in order added '/images?foo=ey'", function(){
        var url = new JSUrlify("/images?foo=ey");
        url["b"] = "b";
        url["a"] = "a";
        url["z"] = "z";
        
        expect( url.toString() ).toEqual( "/images?foo=ey&b=b&a=a&z=z");
      });
      
      it("['foo'] = 0 should change the value of /images?foo=ey", function(){
        var url = new JSUrlify("/images?foo=ey");
        url["foo"] = 0;
        
        expect( url.toString() ).toEqual( "/images?foo=0");
      });
      
      it("['foo'] = null should remove the value from /images?foo=ey", function(){
        var url = new JSUrlify("/images?foo=ey");
        url["foo"] = null;
        
        expect( url.toString() ).toEqual( "/images?foo=");
      });
      
      it("['foo'] = undefined should remove the value from /images?foo=ey", function(){
        var url = new JSUrlify("/images?foo=ey");
        url["foo"] = null;
        
        expect( url.toString() ).toEqual( "/images?foo=");
      });
      
      it("['question'] = 'what is 1 + 1? & 2%' should add the encoded version to the url", function(){
        var url = new JSUrlify("/questions");
        
        url['question'] = 'what is 1 + 1? & 2%';
        
        expect( url.toString() ).toEqual( "/questions?question=what+is+1+%2B+1%3F+%26+2%25" );
      });
    });

  });
  
});