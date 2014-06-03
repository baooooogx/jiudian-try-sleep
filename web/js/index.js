DP.define(['util/cookie.js','io/ajax'], function(DP, require){
	var $ = DP.DOM,
		Cookies = require('util/cookie.js'),
		Ajax = require('io/ajax');

	function main(){
		var shareBtns = $.all(".cheap-sleep-share a"),
			chanceCount = $('.cheap-sleep-chance em'),
			shareChanceNum;
		var ticket = $.all(".cheap-sleep-ticket ul input");
		var currentThis;

		ticket.on('click',function(e){
			e.stop();
			var ticketType = $(this).attr("data-type");
			currentThis = $(this);
			ctrlCount(ticketType);     
		});
		function changeTicketMark(jsonNum){
			if(currentThis.attr("class") == "ticket-btn"){
				return false;
			} else if(currentThis.attr("class") == "ticket-ybtn" & jsonNum > 0){
               openLayer();
               chanceCount.text(parseInt(chanceCount.text(),10)-1);
               jsonNum = jsonNum - 1; 
               if(jsonNum == 0){
               	   currentThis.attr("class","ticket-btn");
               	   currentThis.attr("value","已领取");
               }  
			} else {
                openLayer();
                $(".bomb-box b").destroy();
                $(".bomb-box p").destroy();
                $.create('div').html("<b>您已领取过其他券</b>").inject($(".bomb-box"));
                currentThis.attr("class","ticket-btn");
               	currentThis.attr("value","已领取");
			}   
		}

		function ctrlCount(ticketType){
			new Ajax({
				url:"",
				data:{"ticketType":ticketType}
			}).on({
				"success":changeTicketMark(json)
			}).send();
		}

		shareBtns.get(0).on('click', function(e){
			e.stop();
			remainChance();			
		});
		shareBtns.get(1).on("click",function(e){
			e.stop();
			remainChance();
		});

		function shareChanceSuccess(json){
			if(json == 1){
				chanceCount.text(parseInt(chanceCount.text(),10)+1);
				
				/*if(Cookies.read('userGetShareChance') == 1){
					return false;
				}
			    Cookies.write('userGetShareChance', 1, {duration:365});*/
				shareChanceAdd();

			}else if(json ==0){
				return false;
			}
			
		}

	}
    function remainChance() {
    	new Ajax({
    		url:"",
    		data:{	}
    	}).on({
    		"success":shareChanceSuccess(json)
    	}).send();
    }

	function shareChanceAdd(){
		new Ajax({
			url:'abc',
			data:{	}
		}).on({
			'success': function(json){
				console.log('success', json);
			},
			'error': function(){
				console.log('error', arguments);
			}
		}).send();
	}

	return {
		init: DP.ready(main)
	}
});