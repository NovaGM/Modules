export function textInputField(text, subtext, placeholder, onApply, initialValue) {
  let el = document.createElement('div');
  el.classList.add('marginBottom20-32qID7');

  // Text field
  let textEl = document.createElement('span');
  textEl.classList.add('titleDefault-a8-ZSr', 'title-31JmR4');
  textEl.style.float = 'left';
  textEl.innerHTML = text;

  let subtextEl = document.createElement('div');
  subtextEl.classList.add('colorStandard-2KCXvj', 'size14-e6ZScH', 'description-3_Ncsb', 'formText-3fs7AJ', 'note-1V3kyJ', 'modeDefault-3a2Ph1');
  subtextEl.innerHTML = subtext;
  subtextEl.style.clear = 'both';

  // Input field
  let inputWrapEl = document.createElement('div');
  inputWrapEl.classList.add('inputWrapper-31_8H8', 'codeRedemptionInput-3JOJea');
  inputWrapEl.style.float = 'right';

  let inputEl = document.createElement('input');
  inputEl.classList.add('inputDefault-_djjkz', 'input-cIJ7To');
  inputEl.placeholder = placeholder;
  inputEl.type = 'text';
  inputEl.value = initialValue ? initialValue : '';

  inputWrapEl.appendChild(inputEl);

  // Button field
  let buttonEl = document.createElement('div');
  buttonEl.classList.add('button-38aScr', 'lookFilled-1Gx00P', 'colorBrand-3pXr91', 'sizeSmall-2cSMqn', 'grow-q77ONN');
  buttonEl.style.cursor = 'pointer';
  buttonEl.style.float = 'right';

  buttonEl.onclick = () => {
    onApply(inputEl.value);
  };

  let buttonContentEl = document.createElement('div');
  buttonContentEl.classList.add('contents-18-Yxp');
  buttonContentEl.textContent = 'Apply';

  buttonEl.appendChild(buttonContentEl);

  // Divider
  let dividerEl = document.createElement('div');
  dividerEl.classList.add('divider-3573oO', 'dividerDefault-3rvLe-');
  dividerEl.style.marginTop = subtext ? '20px' : '45px';

  el.appendChild(textEl);
  el.appendChild(buttonEl);
  el.appendChild(inputWrapEl);
  el.appendChild(subtextEl);
  el.appendChild(dividerEl);

  return el;
}
