var carousel = carousel || {};

(function(){

	var frames = document.getElementsByClassName('frame');
	var carousel = document.getElementsByClassName('carousel')[0];
	var currFrame = 0;
	var noOfFrames = frames.length-1;
	var paused = false;
	var flag = 0;
	var prevBtn = document.getElementsByClassName('prev-btn')[0];
	var nextBtn = document.getElementsByClassName('next-btn')[0];

	prevBtn.addEventListener('click',checkFrame);
	nextBtn.addEventListener('click',checkFrame);
	carousel.addEventListener('mouseover',pauseCarousel);
	carousel.addEventListener('mouseout',resumeCarousel);
	document.addEventListener("keydown",checkKey);

	function checkKey(e){
		if(e.which==37 || e.which==39){
			e.preventDefault();
			checkFrame(e);
		}
		return;
	}

	var slideShow = window.setInterval(function(){
		checkFrame();
	},2000);

	function pauseCarousel(e){
		if(e){
			e.preventDefault();
		}
		else{
			flag = 1;
		}
		clearInterval(slideShow);
		
	}

	function resumeCarousel(e){
		if(e){
			e.preventDefault();
		}
		else{
			flag = 0;
		}
		slideShow = window.setInterval(function(){
						checkFrame();
					},2000);
		
	}


	function checkFrame(e){
		if(e){
			e.preventDefault();
			pauseCarousel();
			console.log(e.which);
			var btnType = e.target.classList[0];
		}
		
		
			if(!e && currFrame==noOfFrames){
				currFrame=0;
			}
			else if(!e){
				currFrame++;
			}
			else if(currFrame==0 && btnType=='prev-btn'){
				currFrame=noOfFrames;
			}
			else if(currFrame==0 && e.which==37){
				currFrame=noOfFrames;
			}
			else if(currFrame==noOfFrames && btnType=='next-btn'){
			currFrame = 0;
			}
			else if(currFrame==noOfFrames && e.which==39){
			currFrame = 0;
			}
			else if(btnType=='next-btn' || e.which==39){
				currFrame++;
			}
			else if(btnType=='prev-btn' || e.which==37){
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
		if(flag==1){
			resumeCarousel();
		}

	}

	


})();