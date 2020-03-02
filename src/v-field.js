const isFunc = v => typeof v === 'function';

const getTargetEl = (el, nodeName = 'TD') =>
  el.nodeName === nodeName ? el :
    el.parentElement ? getTargetEl(el.parentElement, nodeName) : undefined;

function createInput(options) {
  const input = document.createElement('input');
  input.className = options.inputClass || 'v-field';
  input.type = options.inputType || 'text';
  input.value = isFunc(options.value) ? options.value() : options.value;
  return input;
}

const targets = [];

function handle(el, binding) {
  const options = binding.value || {};
  const targetEl = getTargetEl(el, options.nodeName || 'TD');
  if (targetEl) {
    let target = targets.find(v => v.el === targetEl), inputEl, disabled;
    if (!target) {
      target = {options, el: targetEl};
      targets.push(target);
      targetEl.style.position = 'relative';
      targetEl.addEventListener(options.type || 'click', () => {
        disabled = isFunc(options.disabled) ? options.disabled() : options.disabled;
        if (!disabled && !inputEl) {
          inputEl = createInput(target.options);
          targetEl.appendChild(inputEl);
          inputEl.focus();
          inputEl.onblur = () => {
            target.options.input && target.options.input(inputEl.value);
            targetEl.removeChild(inputEl);
            inputEl = undefined;
          };
        }
      });
    } else {
      target.options = options;
    }
  }
}

const VField = {
  inserted: handle,
  update: handle,
};

export default VField;