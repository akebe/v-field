const HANDLE_PROPERTY = '__v-field';

const defaultOptions = {
  event: 'click',
  nodeName: 'TD',
  inputClass: 'v-field',
  inputType: 'text',
};

const isFunc = v => typeof v === 'function';

const getTargetEl = (el, nodeName) =>
  !nodeName || el.nodeName === nodeName ? el :
    el.parentElement ? getTargetEl(el.parentElement, nodeName) : undefined;

function createInput(options) {
  const input = document.createElement('input');
  input.className = options.inputClass || defaultOptions.inputClass;
  input.type = options.inputType || defaultOptions.inputType;
  input.value = isFunc(options.value) ? options.value(input, options) : options.value;
  return input;
}

function handle(el, binding) {
  const options = binding.value || {};
  const targetEl = getTargetEl(el, options.nodeName || defaultOptions.nodeName);
  if (targetEl) {
    let handle = el[HANDLE_PROPERTY];
    if (!handle) {
      let inputEl;
      handle = {
        options,
        el: targetEl,
        event: options.event || defaultOptions.event,
        listener() {
          const disabled = isFunc(options.disabled) ? options.disabled(options) : options.disabled;
          if (!disabled && !inputEl) {
            inputEl = createInput(handle.options);
            targetEl.appendChild(inputEl);
            inputEl.focus();
            inputEl.onblur = () => {
              handle.options.input && handle.options.input(inputEl.value, handle.options);
              targetEl.removeChild(inputEl);
              inputEl = undefined;
            };
          }
        },
      };
      targetEl.addEventListener(handle.event, handle.listener, false);
      el[HANDLE_PROPERTY] = handle;
    } else {
      handle.options = options;
    }
  }
}

function unbind(el) {
  const handle = el[HANDLE_PROPERTY];
  if (handle) {
    handle.el.removeEventListener(handle.event, handle.listener, false);
    delete el[HANDLE_PROPERTY];
  }
}

const VField = {
  inserted: handle,
  update: handle,
  unbind,
  defaultOptions,
};

export default VField;