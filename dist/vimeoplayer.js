"use strict";!function(e){var t=e("[data-vimeo]"),i=function(t){var i=this;i.defaultOptions={width:!1,maxwidth:!1,height:!1,maxheight:!1,byline:!0,title:!0,portrait:!1,color:!1,callback:!1,autoplay:!1,loop:!1,autopause:!0,xhtml:!1},i.loadCount=0,i.playing=!1,i.el=t,i.$el=e(t).addClass("vimeojs--wrapper"),i.id=i._generateID(),i.iframeContainer=document.createElement("div"),i.iframeContainer.className="vimeojs--iframe-wrapper",i.$iframeContainer=jQuery(i.iframeContainer),i.iframe=document.createElement("iframe"),i.$iframe=jQuery(i.iframe),i.$img=i.$el.find("img"),i.$img=i.$el.find("img").css({position:"absolute",top:0,left:0}),i.options=i.getOptions(),i.$iframe.attr("src",i.getVimeoUrl()),i.$el.css({display:"block",position:"relative"}),i.$iframe.css({border:0,position:"absolute",top:0,left:0,height:"100%",width:"100%",zIndex:-1}),i.iframeContainer.appendChild(i.iframe),i.el.appendChild(i.iframeContainer),i.getDimensions(),i.$el.on("click",function(e){e.preventDefault(),i.start()}),e(window).on("message",function(e){i.onMessageReceived(e)}),i.options.autoplay&&i.start()};i.prototype.start=function(){var e=this;e.$el.addClass("vimeojs__loading"),e._post("play"),e.$img.fadeOut(function(){e.$iframe.css("zIndex",1).addClass("s__now-playing")}),e.playing=!0},i.prototype.getOptions=function(){var e,t=this,i={};e=t.el.dataset;for(var o in e){o=o.replace("vimeo","").toLowerCase();var a=e[o];o&&(a=void 0===a,i[o]=a)}return jQuery.extend(t.defaultOptions,i)},i.prototype._generateID=function(){for(var e="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",i=0;i<6;i++)e+=t.charAt(Math.floor(Math.random()*t.length));return e},i.prototype.getDimensions=function(){var e,t,i=this;i.$img.width()<10&&i.loadCount<10?setTimeout(function(){i.getDimensions(),i.loadCount++},750):(e=i.$img.width(),t=i.$img.height(),i.$iframeContainer.css({paddingTop:t/e*100+"%",height:0,width:"100%"}))},i.prototype.getVimeoUrl=function(){var e=this,t=["player_id="+e.id,"api=1"];for(var i in e.options)e.options.hasOwnProperty(i)&&t.push(i+"="+(e.options[i]===!0?1:0));return"https://player.vimeo.com/video/"+e.$el.attr("href").split("/").pop()+"?"+t.join("&")},i.prototype.ready=function(){var e=this;e._post("addEventListener","playProgress")},i.prototype.onMessageReceived=function(e){try{var t=this,i=JSON.parse(e.data);switch(i.event){case"ready":t.ready()}}catch(e){}},i.prototype._post=function(e,t){var i,o=this;i={method:e},t&&(i.value=t),o.iframe.contentWindow.postMessage(JSON.stringify(i),o.iframe.src.split("?")[0])},t.each(function(){new i(this)})}(jQuery);