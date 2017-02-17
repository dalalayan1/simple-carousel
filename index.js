var carousel = carousel || {};

(function(){

	var frames = document.getElementsByClassName('frame');
	var currFrame = 0;
	var noOfFrames = frames.length-1;
	var paused = false;
	var prevBtn = document.getElementsByClassName('prev-btn')[0];
	var nextBtn = document.getElementsByClassName('next-btn')[0];

	prevBtn.addEventListener('click',checkFrame);
	nextBtn.addEventListener('click',checkFrame);

	var slideShow = window.setInterval(function(){
		checkFrame();
	},2000);


	function checkFrame(e){
		if(e){
			e.preventDefault();
			var btnType = e.target.classList[0];
			//clearInterval(slideShow);
		}
		

			if(!btnType && currFrame==noOfFrames){
				currFrame=0;
			}
			else if(!btnType){
				currFrame++;
			}
			else if(currFrame==0 && btnType=='prev-btn'){
				currFrame=noOfFrames;
			}
			else if(currFrame==noOfFrames && btnType=='next-btn'){
			currFrame = 0;
			}
			else if(btnType=='next-btn'){
				currFrame++;
			}
			else if(btnType=='prev-btn'){
				currFrame--;
			}
			
		

		if(currFrame>=0 && currFrame<=noOfFrames){
			displayFrame(currFrame);
		}
		else{
			throw new Error('Invalid frame number');
		}
	}

	function displayFrame(active){
		for(var i=0;i<=noOfFrames;i++){
			if(i==active){
				frames[i].classList.add('display-block')
			}
			else{
				if(frames[i].classList.contains('display-block')){
					frames[i].classList.remove('display-block')
				}
				
			}
		}
		//resumeSlideShow();

	}

	


})();