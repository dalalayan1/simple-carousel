var carousel = carousel || {};

(function(){

/*************************************DOM CACHING*********************************************************/

	var frames = document.getElementsByClassName('frame');
	var carousel = document.getElementsByClassName('carousel')[0];
	var currFrame = 0;
	var noOfFrames = frames.length-1;
	var flag = 0;
	var prevBtn = document.getElementsByClassName('prev-btn')[0];
	var nextBtn = document.getElementsByClassName('next-btn')[0];
	var bubblesContainer = document.getElementsByClassName('bubbles-container')[0];
	var bubbles = document.getElementsByClassName('bubble');


/*************************************ATTACHING EVENTS*****************************************************/
	window.addEventListener('load',makeBubbles);
	prevBtn.addEventListener('click',checkFrame);
	nextBtn.addEventListener('click',checkFrame);
	//carousel.addEventListener('mouseover',pauseCarousel);
	//carousel.addEventListener('mouseout',resumeCarousel);
	document.addEventListener('keydown',checkKey);
	bubblesContainer.addEventListener('click',getIndex);


/****************************************FUNCTIONS*********************************************************/

	function checkKey(e){    //to check if the keypress is anyone of right arrow or left arrow

		if(e.which==37 || e.which==39){
			e.preventDefault();
			checkFrame(e);
		}
		//return;
	}

	var slideShow = window.setInterval(checkFrame,4000);

	function pauseCarousel(e){   //pause the slideshow

			if(e){
				e.preventDefault();
			}
		flag = 1;	
		clearInterval(slideShow);
		
	}

	function resumeCarousel(e){   //resume the slideshow

			if(e){
				e.preventDefault();
			}	        
		flag = 0;
		slideShow = window.setInterval(checkFrame,4000);
		
	}


	function checkFrame(e){    //check whether the frame no. is valid else throw error

		if(e){
			e.preventDefault();
			pauseCarousel();
			
			if(e.type=='click'){
				var btnType = e.target.parentNode.classList[0];
			}
			
		}
		
		
			if(!e && currFrame==noOfFrames){       					 //if last-frame, next is first-frame
				currFrame=0;
			}
			else if(!e){    										 //increment frame no.
				currFrame++;
			}
			else if(currFrame==0 && btnType=='prev-btn'){   		//if first-frame & prev btn is clicked
				currFrame=noOfFrames;
			}
			else if(currFrame==0 && e.which==37){					//if first-frame & left-arrow is pressed
				currFrame=noOfFrames;
			}
			else if(currFrame==noOfFrames && btnType=='next-btn'){  //if last-frame & next btn is clicked
			currFrame = 0;
			}
			else if(currFrame==noOfFrames && e.which==39){			//if last-frame & right-arrow is pressed
			currFrame = 0;
			}
			else if(btnType=='next-btn' || e.which==39){			//if next btn is clicked or right-arrow is pressed
				currFrame++;
			}
			else if(btnType=='prev-btn' || e.which==37){			//if prev btn is clicked or left-arrow is pressed
				currFrame--;
			}
			
		

		if(currFrame>=0 && currFrame<=noOfFrames){     //check for a valid frame

			displayFrame(currFrame);
		}
		else{
			throw new Error('Invalid frame number');
		}
	}

	function displayFrame(active){      //toggle the frames by adding & removing a class

		for(var i=0;i<=noOfFrames;i++){
			if(i==active){
				frames[i].classList.add('display-block');
				bubbles[i].classList.add('full-opacity');
			}
			else{
				if(frames[i].classList.contains('display-block')){
					frames[i].classList.remove('display-block');
					bubbles[i].classList.remove('full-opacity');
				}
				
			}
		}
		if(flag==1){       //flag to check if carousel is paused

			resumeCarousel();
		}

	}

	function makeBubbles(){     //make the bubbles at the bottom of the carousel

		for(var i=0;i<=noOfFrames;i++){
			var li = document.createElement('li');
			li.classList.add('bubble',i);
			if(i==0){
				li.classList.add('full-opacity');
			}
			bubblesContainer.append(li);
		}
	}

	function getIndex(e){     //get Index of the frame to be displayed

		e.preventDefault();
		pauseCarousel();
		var index = parseInt(e.target.classList[1]);
		currFrame = index;
		displayFrame(index);
	}

	


})();