/* 
	Snippet for text replace
*/

	Array.prototype.contains = function(elem)
	{
	   for (var i in this)
	   {
	       if (this[i] == elem) return true;
	   }
	   return false;
	}
	console.log("loading htr...");
	var htr = function(content){
		return {
			content: content,
			//Loop on texts
			//For every text, replace by another array of text

			findHtmls : function( content ){
				
				var htmls = [];
				if(typeof(content) !== "undefined"){
					for (var i=0, max=content.length; i < max; i++) {
						
						if( !["SCRIPT", "HTML", "HEAD", "BODY", "STYLE"].contains(content[i].tagName )){
							
							if(content[i].childNodes[0].nodeValue.replace(/\n/g, " ").trim() != ""){
								htmls.push(content[i]);
							}
						}
					}
					console.log( htmls );
				}
				return htmls;
			},

			replaceParagraph : function( new_content ){
				
				var elements = this.findHtmls( this.prepareContent( this.content ) ) ;
				var new_elements = this.findHtmls( this.prepareContent( new_content ) );

				var min_length = Math.min(elements.length, new_elements.length);

				replace = 0;
				i =0;
				j =0;
				last_i = -1;
				last_j = 0;
				changer = setInterval(function() {

					if(last_i != i){
						max_string = Math.max(elements[i].childNodes[0].nodeValue.trim().length, new_elements[i].childNodes[0].nodeValue.trim().length);
						elements[i].childNodes[0].nodeValue = elements[i].childNodes[0].nodeValue.trim();
						new_elements[i].childNodes[0].nodeValue = new_elements[i].childNodes[0].nodeValue.trim();
						last_i = i;
					}

					if( replace == 0){
						last = elements[i].childNodes[0].nodeValue;
						temp_string = (( j > 0) ? elements[i].childNodes[0].nodeValue.substring(0,j) : "")
								+ ( ( elements[i].childNodes[0].nodeValue.charAt(j) != "") 
									? '<span class="change_word">' + elements[i].childNodes[0].nodeValue.charAt(j) + '</span>'
									: " ")
								+  elements[i].childNodes[0].nodeValue.substring(j +1);

						elements[i].innerHTML = temp_string;

					}else{
						elements[i].innerHTML = last;
						new_string = 
								(( j > 0) ? elements[i].childNodes[0].nodeValue.substring(0,j) : "")
								+ ( ( new_elements[i].childNodes[0].nodeValue.charAt(j) != "") ? new_elements[i].childNodes[0].nodeValue.charAt(j) : " ")
								+  elements[i].childNodes[0].nodeValue.substring(j +1);

						elements[i].childNodes[0].nodeValue = new_string;
					}

					replace =  ( replace * -1 ) + 1;

					if(j >= max_string){
						i++;
						j = 0;
						last =  elements[i].childNodes[0].nodeValue.trim();
					}else if(replace == 0){
						j++;
					}
					if( i >= min_length){
						clearInterval(changer);
					}


				}, 100);
				// for (var i=0; i < min_length; i++) {
				// 	var max_string = Math.max(elements[i].childNodes[0].nodeValue.trim().length, new_elements[i].childNodes[0].nodeValue.trim().length);
				// 	elements[i].childNodes[0].nodeValue = elements[i].childNodes[0].nodeValue.trim();
				// 	new_elements[i].childNodes[0].nodeValue = new_elements[i].childNodes[0].nodeValue.trim();


				// 	for (var j=0; j < max_string; j++) {
				// 		new_string = 
				// 			(( j > 0) ? elements[i].childNodes[0].nodeValue.substring(0,j) : "")
				// 			+ ( ( new_elements[i].childNodes[0].nodeValue.charAt(j) != "") ? new_elements[i].childNodes[0].nodeValue.charAt(j) : " ")
				// 			+  elements[i].childNodes[0].nodeValue.substring(j +1);

				// 		elements[i].childNodes[0].nodeValue = new_string;
						
				// 		console.log(new_string);
				// 	}
				// }
			},

			prepareContent : function( content ){
				var final_content = content;
				
				if( typeof( content ) == "string" ){
					var div = document.createElement( 'div' );
					div.innerHTML = content;
					final_content = div.getElementsByTagName("*");
				}
				return final_content;
			}

		}
	};
	console.log("loaded htr");
	
