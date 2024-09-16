import Splitting from 'splitting';

function splittingOptions() {
  const results = Splitting();

  function processElement(element) {
    const splittingType = element.getAttribute('data-splitting');

    if (splittingType === 'words') {
      element.querySelectorAll('.word').forEach(word => {
        if (!word.querySelector('.wordText')) {
          const wordTextSpan = document.createElement('span');
          wordTextSpan.className = 'wordText';
          wordTextSpan.innerHTML = word.innerHTML;
          word.innerHTML = '';
          word.appendChild(wordTextSpan);
        }
        
        // Check for nested splitting
        const nestedElements = word.querySelectorAll('[data-splitting]');
        nestedElements.forEach(processElement);
      });
    }
    // We're not adding any additional spans for char splitting
    // The default Splitting.js behavior for chars will be maintained
  }

  results.forEach(result => {
    processElement(result.el);
  });
}

export default splittingOptions;