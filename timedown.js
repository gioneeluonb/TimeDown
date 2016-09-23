;(function(win){
	'use strict';
	/**
	 * [TimeDown time down by second]
	 * @param {[String]} elDay    dom----->class='day'
	 * @param {[String]} elHour   dom----->class='hour'
	 * @param {[String]} elMinute dom----->class='minute'
	 * @param {[String]} elSecond dom----->class='second'
	 * @param {[Object]} options  target date  ex:{year:2016,month:10,day:12,hour:12,minute:30,second:40}
	 */
	function TimeDown(elDay,elHour,elMinute,elSecond,options){
		this.seconds = 0;
		this.$elDay = document.querySelector('.'+ elDay); 
		this.$elHour = document.querySelector('.'+ elHour); 
		this.$elMinute = document.querySelector('.'+ elMinute); 
		this.$elSecond = document.querySelector('.'+ elSecond); 
		this.target = options || (Date.now() + 3600000);
		this.stop = function(){};
		this.reset = function(){};
	}

	TimeDown.prototype = {
		/**
		 * [_setTimeOut setTimeOut could pass params]
		 * @param {[function]} func  [the function to be execute by second]
		 * @param {[number]} delay [delay time]
		 * @param {[argument]} args  [the params that the func need]
		 */
		_setTimeOut:function(func,delay,args){
			var that = this;
			if(args == undefined){
				return window.setTimeOut(func,delay)
			}else{
				return window.setTimeout(function(){
					func.apply(that,args);
				},delay)
			}
		},
		/**
		 * [pad0 if num is 7 change to 07]
		 * @param  {[num]} num [the num need to be checked]
		 * @return {[num]}     [the num after pad0]
		 */
		pad0:function(num){
			return ((''+num).length == 1) ? ('0'+num) : num;
		},
		/**
		 * [delMilliecond delete timestamp's last three num]
		 * @param  {[type]} timestamp [description]
		 * @return {[type]}           [description]
		 */
		delMilliecond:function(timestamp){
			var arr = String(timestamp).split('');
			arr.length = arr.length - 3;
			return Number(arr.join(''));
		},
		/**
		 * [secondToDate change timestamp to date]
		 * @param  {[number]} seconds [timestamp have been delete millisecond]
		 * @return {[Object]}         [day,hour,minute,second]
		 */
		secondToDate:function(seconds){
			return {
				days:Math.floor(seconds / (3600 * 24)),
				hours:Math.floor(seconds % (3600 * 24) / 3600),
				minutes:Math.floor((seconds % (3600 * 24) % 3600) / 60),
				seconds:(seconds % (3600 * 24) % 3600) % 60
			}
		},
		/**
		 * [toSecond change date to millisecond]
		 * @return {[number]} [description]
		 */
		toSecond:function(){
			var now = (new Date()).valueOf();
			var target = this.target;
			var date = new Date(target.year,target.month-1,target.day,target.hour,target.minute,target.minute)
			var end = 0;
			if(typeof target == "object"){
				end = date.valueOf()
			}else{
				end = target
			}
			return end - now;
		},
		/**
		 * [changeDom description]
		 * @param  {[object]} date [return by function secondToDate]
		 * @return {[type]}      [description]
		 */
		changeDom:function(date){
			this.$elDay.innerHTML = this.pad0(date.days)
			this.$elHour.innerHTML = this.pad0(date.hours)
			this.$elMinute.innerHTML = this.pad0(date.minutes)
			this.$elSecond.innerHTML = this.pad0(date.seconds)
		},
		/**
		 * [init init timedown]
		 */
		init:function(){
			var milliseconds = this.toSecond();
			console.log(milliseconds)
			this.seconds = this.delMilliecond(milliseconds);
		},
		/**
		 * [start description]
		 * @return {[type]} [description]
		 */
		start:function(){
			var date = this.secondToDate(this.seconds);
			this.changeDom(date);
			this._setTimeOut(this.start,1000,[--this.seconds]);
		}
	}
	win.TimeDown = TimeDown;
})(window);


