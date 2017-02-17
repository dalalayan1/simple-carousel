var carousel = carousel || {};

(function(){

	var frames = document.getElementsByClassName('frame');
	var currFrame = 0;
	var noOfFrames = frames.length-1;
	var prevBtn = document.getElementsByClassName('prev-btn')[0];
	var nextBtn = document.getElementsByClassName('next-btn')[0];

	prevBtn.addEventListener('click',checkFrame('prev'));
	nextBtn.addEventListener('click',checkFrame('next'));

	function checkFrame(flag){
		//e.preventDefault();
		if(currFrame>=0 && currFrame<noOfFrames){
			displayFrame(currFrame,flag);
		}
		else{
			throw new Error('Invalid frame number');
		}
	}

	function displayFrame(active,flag){
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
		if(flag=='prev'){
			currFrame--;
			if(currFrame==0){
				currFrame=noOfFrames;
			}
			
		}
		else{
			currFrame++;
			if(currFrame==noOfFrames){
			currFrame = 0;
			}
		}
	}

})();