//hiding the preloader class after loading
function eventListener(){
	const ui= new UI();
	//hide Preloader
	window.addEventListener('load',function(){
		ui.hidePreloader();
	});
	//toggleButton
	document.querySelector('.navBtn').addEventListener('click',function(){
	ui.toggleButton();
	});
	//control video
	document.querySelector('.video_switch').addEventListener('click',function(){
	ui.videoControl();
	});
	//submit button 
	document.querySelector('.drink-form').addEventListener('submit',function(event){
		event.preventDefault();
		const name=document.querySelector('.input-name').value;
		const lastName=document.querySelector('.input-lastname').value;
		const email=document.querySelector('.input-email').value;

		let value=ui.checkEmpty(name, lastName, email);
		if(value){
			let customer=new Customer(name,lastName,email)
			console.log(customer);
			ui.addCustomer(customer);
			ui.showfeedback('customer added to the list','success');
			ui.clearField();
		}
		else{
			ui.showfeedback('Fill the all the form !','error');
		}
	})
	//display model
	const links=document.querySelectorAll('.work-item_icon')
	links.forEach(function(item){
		item.addEventListener('click',function(event){
			ui.showModal(event);
		})
	})
	//hide modal
	document.querySelector('.work-modal_close').addEventListener('click', function(){
		ui.closeModal();
	})
};
eventListener();
//constructor function
function UI(){}
//hide Preloader
UI.prototype.hidePreloader=function(){
	document.querySelector('.preloader').style.display="none";
};
//toggleButton
UI.prototype.toggleButton=function(){
	document.querySelector('nav').classList.toggle('nav-show');

};
//control video
UI.prototype.videoControl=function(){
	let btn=document.querySelector('.video_switch-btn');
	if(!btn.classList.contains('video_slide')){
		btn.classList.add('video_slide');
		document.querySelector('.video_item').pause();
	}else{
		btn.classList.remove('video_slide');
		document.querySelector('.video_item').play();
	}
}
//check for empty value
UI.prototype.checkEmpty=function(name, lastName, email){
	let result;
	if(name===""||lastName===""||email===""){
		result=false;
	}
		else{
			result=true;
		}
		return result;
}
//show feedback
UI.prototype.showfeedback=function(text, type){
const feedback=document.querySelector('.drink-form_feedback');
	if(type==='success'){
		feedback.classList.add('success');
		feedback.innerText=text;
		this.removeAlert('success');
	}
	else if(type==='error'){
		feedback.classList.add('error');
		feedback.innerText=text;
		this.removeAlert('error');
	}
}
//remove Alert
UI.prototype.removeAlert=function(type){
	setTimeout(function(){
		document.querySelector('.drink-form_feedback').classList.remove(type)
	},3000)
}
//add customer
UI.prototype.addCustomer=function(customer){
	const images=[1,2,3,4,5];
	let random=Math.floor(Math.random()*images.length);
	console.log(random);
	const div =document.createElement('div');
	div.classList.add('person');
	div.innerHTML=`<img src="image/sample-${random}.jpg" alt="person" class="person_thumbnail">
						<h4 class="person-name">${customer.name}</h4>
						<h4 class="person-lastname">${customer.lastName}</h4>`
	document.querySelector('.drink-card_list').appendChild(div);
}
//clear Field
UI.prototype.clearField=function(){
	document.querySelector('.input-name').value ='';
	document.querySelector('.input-lastname').value ='';
	document.querySelector('.input-email').value = '';
}
//show moadel
UI.prototype.showModal=function(event){
	event.preventDefault();		
	if(event.target.parentElement.classList.contains('work-item_icon')){
	let id =event.target.parentElement.dataset.id;

	const modal=document.querySelector('.work-modal');
	const modalItem=document.querySelector('.work-modal_item')
	;
	modal.classList.add('work-modal-show');
	modalItem.style.backgroundImage=`url(image/work/work${id}.jpg)`;

	}
}
//close odal
UI.prototype.closeModal=function(){
	document.querySelector('.work-modal').classList.remove('work-modal-show');
}
function Customer(name,lastName,email){
	this.name=name,
	this.lastName=lastName,
	this.email=email;
}