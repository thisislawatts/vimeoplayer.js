"use strict";!function(e){var t=e("[data-vimeo]"),i=function(t){var i=this;i.loadCount=0,i.playing=!1,i.el=t,i.$el=e(t).addClass("vimeojs--wrapper"),i.id=i._generateID(),i.iframe=document.createElement("iframe"),i.$img=i.$el.find("img"),i.$iframe=e(i.iframe),i.$iframe.attr("src","http://player.vimeo.com/video/"+i.$el.attr("href").split("/").pop()+"?api=1&player_id="+i.id),i.$el.css({position:"relative"}),i.$iframe.css({border:"0",position:"absolute",top:0,left:0,height:"100%",width:"100%",zIndex:-1}),i.el.appendChild(i.$iframe),i.getDimensions(),i.$el.on("click",function(e){i.$el.addClass("vimeojs__loading"),i._post("play"),i.$img.fadeOut(function(){i.$iframe.css("zIndex",1)}),i.playing=!0,e.preventDefault()}),e(window).on("message",function(e){i.onMessageReceived(e)})};i.prototype._generateID=function(){for(var e="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",i=0;6>i;i++)e+=t.charAt(Math.floor(Math.random()*t.length));return e},i.prototype.getDimensions=function(){var e=this;e.$img.width()<10&&e.loadCount<10?setTimeout(function(){e.getDimensions(),e.loadCount++},750):e.$el.css({width:e.$img.width(),height:e.$img.height()})},i.prototype.ready=function(){var e=this;e._post("addEventListener","playProgress")},i.prototype.onMessageReceived=function(e){var t=this,i=JSON.parse(e.data);switch(i.event){case"ready":t.ready()}},i.prototype._post=function(e,t){var i,o=this;i={method:e},t&&(i.value=t),o.iframe.contentWindow.postMessage(JSON.stringify(i),o.iframe.src.split("?")[0])},t.each(function(){new i(this)})}(jQuery);