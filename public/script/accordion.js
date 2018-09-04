var ISAccordion = document.getElementsByClassName("is-accordion");
var _i;

for (_i = 0; _i < ISAccordion.length; _i++) {
	ISAccordion[_i].addEventListener('click', function() {
		this.classList.toggle('active');

		var panel = this.nextElementSibling;
		/*
		if (panel.style.display === 'block') {
			panel.style.display = 'none';
		} else {
			panel.style.display = 'block';
		}
		*/
		if (panel.style.maxHeight) {
			panel.style.maxHeight = null;
	   	} else {
			panel.style.maxHeight = panel.scrollHeight + "px";
		}
	});
}