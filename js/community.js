/*
ListJS Beta 0.2.0
By Jonny Strömberg (www.jonnystromberg.com, www.listjs.com)
*/
(function(a,b){"use strict";var c=a.document,d;var e=function(a,e,f){var g=this,i,j,k,l,m,n,o={updated:[]};this.listContainer=typeof a=="string"?c.getElementById(a):a;if(!this.listContainer)return;this.items=[];this.visibleItems=[];this.matchingItems=[];this.searched=false;this.filtered=false;this.list=null;this.templateEngines={};this.page=e.page||200;this.i=e.i||1;j={start:function(a,b){b.plugins=b.plugins||{};this.classes(b);i=new m(g,b);this.callbacks(b);this.items.start(a,b);g.update();this.plugins(b.plugins)},classes:function(a){a.listClass=a.listClass||"list";a.searchClass=a.searchClass||"search";a.sortClass=a.sortClass||"sort"},callbacks:function(a){g.list=d.getByClass(a.listClass,g.listContainer,true);d.addEvent(d.getByClass(a.searchClass,g.listContainer),"keyup",g.search);n=d.getByClass(a.sortClass,g.listContainer);d.addEvent(n,"click",g.sort)},items:{start:function(a,c){if(c.valueNames){var d=this.get(),e=c.valueNames;if(c.indexAsync){this.indexAsync(d,e)}else{this.index(d,e)}}if(a!==b){g.add(a)}},get:function(){var a=g.list.childNodes,c=[];for(var d=0,e=a.length;d<e;d++){if(a[d].data===b){c.push(a[d])}}return c},index:function(a,b){for(var c=0,d=a.length;c<d;c++){g.items.push(new l(b,a[c]))}},indexAsync:function(a,b){var c=a.splice(0,100);this.index(c,b);if(a.length>0){setTimeout(function(){j.items.indexAsync(a,b)},10)}else{g.update()}}},plugins:function(a){var b={templater:i,init:j,initialItems:k,Item:l,Templater:m,sortButtons:n,events:o,reset:r};for(var c=0;c<a.length;c++){a[c][1]=a[c][1]||{};var d=a[c][1].name||a[c][0];g[d]=g.plugins[a[c][0]].call(g,b,a[c][1])}}};this.add=function(a,c){if(c){p(a,c)}var d=[],e=false;if(a[0]===b){a=[a]}for(var f=0,h=a.length;f<h;f++){var i=null;if(a[f]instanceof l){i=a[f];i.reload()}else{e=g.items.length>g.page?true:false;i=new l(a[f],b,e)}g.items.push(i);d.push(i)}g.update();return d};var p=function(a,b,c){var d=a.splice(0,100);c=c||[];c=c.concat(g.add(d));if(a.length>0){setTimeout(function(){p(a,b,c)},10)}else{g.update();b(c)}};this.show=function(a,b){this.i=a;this.page=b;g.update()};this.remove=function(a,b,c){var d=0;for(var e=0,f=g.items.length;e<f;e++){if(g.items[e].values()[a]==b){i.remove(g.items[e],c);g.items.splice(e,1);f--;d++}}g.update();return d};this.get=function(a,b){var c=[];for(var d=0,e=g.items.length;d<e;d++){var f=g.items[d];if(f.values()[a]==b){c.push(f)}}if(c.length==0){return null}else if(c.length==1){return c[0]}else{return c}};this.sort=function(a,c){var e=g.items.length,f=null,i=a.target||a.srcElement,j="",k=false,l="asc",m="desc",c=c||{};if(i===b){f=a;k=c.asc||false}else{f=d.getAttribute(i,"data-sort");k=d.hasClass(i,l)?false:true}for(var o=0,p=n.length;o<p;o++){d.removeClass(n[o],l);d.removeClass(n[o],m)}if(k){if(i!==b){d.addClass(i,l)}k=true}else{if(i!==b){d.addClass(i,m)}k=false}if(c.sortFunction){c.sortFunction=c.sortFunction}else{c.sortFunction=function(a,b){return d.sorter.alphanum(a.values()[f].toLowerCase(),b.values()[f].toLowerCase(),k)}}g.items.sort(c.sortFunction);g.update()};this.search=function(a,c){g.i=1;var d=[],e,f,h,j,k,c=c===b?g.items[0].values():c,a=a===b?"":a,l=a.target||a.srcElement;a=l===b?(""+a).toLowerCase():""+l.value.toLowerCase();k=g.items;a=a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");i.clear();if(a===""){r.search();g.searched=false;g.update()}else{g.searched=true;for(var m=0,n=k.length;m<n;m++){e=false;f=k[m];j=f.values();for(var o in c){if(j.hasOwnProperty(o)&&c[o]!==null){h=j[o]!=null?j[o].toString().toLowerCase():"";if(a!==""&&h.search(a)>-1){e=true}}}if(e){f.found=true;d.push(f)}else{f.found=false}}g.update()}return g.visibleItems};this.filter=function(a){g.i=1;r.filter();if(a===b){g.filtered=false}else{g.filtered=true;var c=g.items;for(var d=0,e=c.length;d<e;d++){var f=c[d];if(a(f)){f.filtered=true}else{f.filtered=false}}}g.update();return g.visibleItems};this.size=function(){return g.items.length};this.clear=function(){i.clear();g.items=[]};this.on=function(a,b){o[a].push(b)};var q=function(a){var b=o[a].length;while(b--){o[a][b]()}};var r={filter:function(){var a=g.items,b=a.length;while(b--){a[b].filtered=false}},search:function(){var a=g.items,b=a.length;while(b--){a[b].found=false}}};this.update=function(){var a=g.items,b=a.length;g.visibleItems=[];g.matchingItems=[];i.clear();for(var c=0;c<b;c++){if(a[c].matching()&&g.matchingItems.length+1>=g.i&&g.visibleItems.length<g.page){a[c].show();g.visibleItems.push(a[c]);g.matchingItems.push(a[c])}else if(a[c].matching()){g.matchingItems.push(a[c]);a[c].hide()}else{a[c].hide()}}q("updated")};l=function(a,c,d){var e=this,f={};this.found=false;this.filtered=false;var h=function(a,c,d){if(c===b){if(d){e.values(a,d)}else{e.values(a)}}else{e.elm=c;var f=i.get(e,a);e.values(f)}};this.values=function(a,c){if(a!==b){for(var d in a){f[d]=a[d]}if(c!==true){i.set(e,e.values())}}else{return f}};this.show=function(){i.show(e)};this.hide=function(){i.hide(e)};this.matching=function(){return g.filtered&&g.searched&&e.found&&e.filtered||g.filtered&&!g.searched&&e.filtered||!g.filtered&&g.searched&&e.found||!g.filtered&&!g.searched};this.visible=function(){return e.elm.parentNode?true:false};h(a,c,d)};m=function(a,c){if(c.engine===b){c.engine="standard"}else{c.engine=c.engine.toLowerCase()}return new g.constructor.prototype.templateEngines[c.engine](a,c)};j.start(f,e)};e.prototype.templateEngines={};e.prototype.plugins={};e.prototype.templateEngines.standard=function(a,e){function j(a){if(a===b){var d=f.childNodes,g=[];for(var h=0,i=d.length;h<i;h++){if(d[h].data===b){return d[h]}}return null}else if(a.indexOf("<")!==-1){var j=c.createElement("div");j.innerHTML=a;return j.firstChild}else{return c.getElementById(e.item)}}var f=d.getByClass(e.listClass,a.listContainer,true),g=j(e.item),i=this;var k={created:function(a){if(a.elm===b){i.create(a)}}};this.get=function(a,b){k.created(a);var c={};for(var e=0,f=b.length;e<f;e++){var g=d.getByClass(b[e],a.elm,true);c[b[e]]=g?g.innerHTML:""}return c};this.set=function(a,b){k.created(a);for(var c in b){if(b.hasOwnProperty(c)){var e=d.getByClass(c,a.elm,true);if(e){e.innerHTML=b[c]}}}};this.create=function(a){if(a.elm!==b){return}var c=g.cloneNode(true);c.id="";a.elm=c;i.set(a,a.values())};this.remove=function(a){f.removeChild(a.elm)};this.show=function(a){k.created(a);f.appendChild(a.elm)};this.hide=function(a){if(a.elm!==b&&a.elm.parentNode===f){f.removeChild(a.elm)}};this.clear=function(){if(f.hasChildNodes()){while(f.childNodes.length>=1){f.removeChild(f.firstChild)}}}};d={getByClass:function(){if(c.getElementsByClassName){return function(a,b,c){if(c){return b.getElementsByClassName(a)[0]}else{return b.getElementsByClassName(a)}}}else{return function(a,b,d){var e=[],f="*";if(b==null){b=c}var g=b.getElementsByTagName(f);var h=g.length;var i=new RegExp("(^|\\s)"+a+"(\\s|$)");for(var j=0,k=0;j<h;j++){if(i.test(g[j].className)){if(d){return g[j]}else{e[k]=g[j];k++}}}return e}}}(),addEvent:function(a,c){if(c.addEventListener){return function(c,e,f){if(c&&!(c instanceof Array)&&!c.length&&!d.isNodeList(c)&&c.length!==0||c===a){c.addEventListener(e,f,false)}else if(c&&c[0]!==b){var g=c.length;for(var i=0;i<g;i++){d.addEvent(c[i],e,f)}}}}else if(c.attachEvent){return function(c,e,f){if(c&&!(c instanceof Array)&&!c.length&&!d.isNodeList(c)&&c.length!==0||c===a){c.attachEvent("on"+e,function(){return f.call(c,a.event)})}else if(c&&c[0]!==b){var g=c.length;for(var i=0;i<g;i++){d.addEvent(c[i],e,f)}}}}}(this,c),getAttribute:function(a,c){var d=a.getAttribute&&a.getAttribute(c)||null;if(!d){var e=a.attributes;var f=e.length;for(var g=0;g<f;g++){if(c[g]!==b){if(c[g].nodeName===c){d=c[g].nodeValue}}}}return d},isNodeList:function(a){var b=Object.prototype.toString.call(a);if(typeof a==="object"&&/^\[object (HTMLCollection|NodeList|Object)\]$/.test(b)&&(a.length==0||typeof a[0]==="object"&&a[0].nodeType>0)){return true}return false},hasClass:function(a,b){var c=this.getAttribute(a,"class")||this.getAttribute(a,"className")||"";return c.search(b)>-1},addClass:function(a,b){if(!this.hasClass(a,b)){var c=this.getAttribute(a,"class")||this.getAttribute(a,"className")||"";c=c+" "+b+" ";c=c.replace(/\s{2,}/g," ");a.setAttribute("class",c)}},removeClass:function(a,b){if(this.hasClass(a,b)){var c=this.getAttribute(a,"class")||this.getAttribute(a,"className")||"";c=c.replace(b,"");a.setAttribute("class",c)}},sorter:{alphanum:function(a,c,d){if(a===b||a===null){a=""}if(c===b||c===null){c=""}a=a.toString().replace(/&(lt|gt);/g,function(a,b){return b=="lt"?"<":">"});a=a.replace(/<\/?[^>]+(>|$)/g,"");c=c.toString().replace(/&(lt|gt);/g,function(a,b){return b=="lt"?"<":">"});c=c.replace(/<\/?[^>]+(>|$)/g,"");var e=this.chunkify(a);var f=this.chunkify(c);for(var g=0;e[g]&&f[g];g++){if(e[g]!==f[g]){var h=Number(e[g]),i=Number(f[g]);if(d){if(h==e[g]&&i==f[g]){return h-i}else{return e[g]>f[g]?1:-1}}else{if(h==e[g]&&i==f[g]){return i-h}else{return e[g]>f[g]?-1:1}}}}return e.length-f.length},chunkify:function(a){var b=[],c=0,d=-1,e=0,f,g;while(f=(g=a.charAt(c++)).charCodeAt(0)){var h=f==45||f==46||f>=48&&f<=57;if(h!==e){b[++d]="";e=h}b[d]+=g}return b}}};a.List=e;a.ListJsHelpers=d})(window)

/*
 * jQuery Highlight plugin
 *
 * Based on highlight v3 by Johann Burkard
 * http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html
 */
jQuery.extend({highlight:function(a,c,b,e){if(3===a.nodeType){if(c=a.data.match(c))return b=document.createElement(b||"span"),b.className=e||"highlight",a=a.splitText(c.index),a.splitText(c[0].length),e=a.cloneNode(!0),b.appendChild(e),a.parentNode.replaceChild(b,a),1}else if(1===a.nodeType&&a.childNodes&&!/(script|style)/i.test(a.tagName)&&!(a.tagName===b.toUpperCase()&&a.className===e))for(var d=0;d<a.childNodes.length;d++)d+=jQuery.highlight(a.childNodes[d],c,b,e);return 0}});
jQuery.fn.unhighlight=function(a){var c={className:"highlight",element:"span"};jQuery.extend(c,a);return this.find(c.element+"."+c.className).each(function(){var a=this.parentNode;a.replaceChild(this.firstChild,this);a.normalize()}).end()};
jQuery.fn.highlight=function(a,c){var b={className:"highlight",element:"span",caseSensitive:!1,wordsOnly:!1};jQuery.extend(b,c);a.constructor===String&&(a=[a]);a=jQuery.grep(a,function(a){return""!=a});a=jQuery.map(a,function(a){return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")});if(0==a.length)return this;var e=b.caseSensitive?"":"i",d="("+a.join("|")+")";b.wordsOnly&&(d="\\b"+d+"\\b");var f=RegExp(d,e);return this.each(function(){jQuery.highlight(this,f,b.element,b.className)})};


// Community.js
$(function() {
	var productList = new ProductList('.packages');
});

function ProductList(itemContainer) {
	this._init(itemContainer);
	return this;
}

ProductList.prototype = {
	listjs: {},

	_init: function(itemContainer) {
		// Build the control HTML
		var originalList = $(itemContainer);
		var search = this._createSearchBar();
		var sort = this._createSortButtons();
		var package_count = this._createPackageCounter();
		var list = $('<div class="packages community"><ul style="list-style-type: none; margin: -25px;" class="list"></ul></div>');
		var list_div = $('<div id="package-list"></div>');

		list_div.append(search).append(sort).append(package_count).append(list);

		originalList.hide();
		originalList.before(list_div);

		// Set List.js options.
		var options = {
			item: '<li><div class="item_html package"></div></li>',
			sortClass: 'sort-btn'
		};

		// Convert original list into a List.js value array.
		var values = this._getValues('.package');

		this.listjs = new List('package-list', options, values);

		// Set callbacks when the list get filtered or sorted.
		var self = this;
		this.listjs.on('updated', function() {
			self._listChangedCallback();
		});
		self._listChangedCallback();

		// Clean up old html
		originalList.remove();

		// Make hash links work.
		this._hashInit();
	},

	_createSearchBar: function() {
		var searchBar = $('<div class="filter"><input class="search" type="text" name="filter" id="package_filter" value="" placeholder="Instant Search" /></div>');
		return searchBar;
	},

	_createSortButtons: function() {
		var buttons = $('<div class="sort group"><strong>Sort: </strong><a class="sort-btn active" data-sort="data_firstinstall" href="#sort-firstinstall">Newest</a><a class="sort-btn" data-sort="data_name" href="#sort-name">Name</a><a class="sort-btn" data-sort="data_installs" href="#sort-installs">Installs</a><a class="sort-btn" data-sort="data_lastmodified" href="#sort-lastmodified">Last Modified</a></div>');
		buttons.find('a').click(function() {
			buttons.children().removeClass('active');
			$(this).addClass('active');
		});
		return buttons;
	},

	_getValues: function(itemSelector) {
		var package_values = [];
		// Unpack each item into a Listjs value object.
		$(itemSelector).each(function(index, el) {
			var s = $(this);
			package_values.push({
				item_html: s.html(),
				data_firstinstall: s.attr('data-firstinstall') || '0',
				data_lastmodified: s.attr('data-lastmodified') || '0',
				data_name: s.attr('data-name'),
				data_installs: s.attr('data-installs') || '0',
				data_description: s.find('p').text()
			});
		});

		return package_values;
	},

	_createPackageCounter: function() {
		var totalPackages = $('<div class="total">0 Packages</div>');
		return totalPackages;
	},

	_listChangedCallback: function() {
		// Keep matching package count updated.
		var matching = this.listjs.matchingItems.length;
		var pack = (matching === 1) ? 'Package' : 'Packages';
		$('.total').text(matching + " " + pack);

		var text = $('.search').attr('value');
		$('#package-list').unhighlight();
		$('#package-list').highlight(text);
	},

	_hashInit: function() {
		if(window.location.hash) {
			var sortbtn = $($('a[href="' + window.location.hash + '"]')[0]);
			sortbtn.click();
			this.listjs.sort(sortbtn.attr('data-sort'), {
				asc: false
			});
		}
	}
};
