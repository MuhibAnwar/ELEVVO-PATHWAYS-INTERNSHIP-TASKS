const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('successMsg');

  const fields = {
    fullName: {
      el: document.getElementById('fullName'),
      errorEl: document.getElementById('nameError'),
      validate: v => v.length >= 3 || 'Full name must be at least 3 characters.'
    },
    email: {
      el: document.getElementById('email'),
      errorEl: document.getElementById('emailError'),
      validate: v => !!v.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || 'Please enter a valid email.'
    },
    subject: {
      el: document.getElementById('subject'),
      errorEl: document.getElementById('subjectError'),
      validate: v => v.length >= 3 || 'Subject is required (min 3 chars).'
    },
    message: {
      el: document.getElementById('message'),
      errorEl: document.getElementById('messageError'),
      validate: v => v.length >= 10 || 'Message should be at least 10 characters.'
    }
  };

  // instant validation on blur
  Object.values(fields).forEach(({ el, errorEl, validate }) => {
    el.addEventListener('blur', () => {
      const res = validate(el.value.trim());
      errorEl.textContent = res === true ? '' : res;
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;

    Object.values(fields).forEach(({ el, errorEl, validate }) => {
      const res = validate(el.value.trim());
      errorEl.textContent = res === true ? '' : res;
      if(res !== true) {
        valid = false;
        el.classList.add('shake');
        setTimeout(()=> el.classList.remove('shake'), 400);
      }
    });

    if(!valid) return;

    // Simulate submit
    successMsg.style.display = 'block';
    form.reset();

    // Hide after 5s
    setTimeout(() => successMsg.style.display = 'none', 5000);
  });