var addVulcanTitleGenerator = setInterval(function() {
	// If the insert PR title button doesn't exist
	if (!document.getElementById('customPRTitleGeneratorButton')) {
		let titleDiv = document.querySelector('.ms-TextField-fieldGroup');

		// Check if VS title element exists
		if (titleDiv) {
			let generateButton = document.createElement('button');
			generateButton.id = 'customPRTitleGeneratorButton';
			generateButton.innerText = '🖖';

			generateButton.addEventListener('click', () => {
				let titleInput = document.getElementsByClassName('ms-TextField-field')[0];

				let fromBranchName = document.getElementsByClassName('vss-PickListDropdown--title-text')[1].innerText;
				let toBranchName = document.getElementsByClassName('vss-PickListDropdown--title-text')[2].innerText;

				titleInput.value = fromBranchName + ' into ' + toBranchName;

				//https://stackoverflow.com/questions/54137836/change-value-of-input-made-with-react-from-chrome-extension/54138182
				titleInput.setAttribute('value', fromBranchName + ' into ' + toBranchName);
				titleInput.dispatchEvent(new Event('change', { bubbles: true }));
				titleInput.dispatchEvent(new Event('blur', { bubbles: true }));
			});

			titleDiv.appendChild(generateButton);
		}
	}
}, 1000); // check every second
