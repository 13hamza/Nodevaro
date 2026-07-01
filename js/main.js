// Nodevaro — shared site behaviour

document.addEventListener('DOMContentLoaded', function () {

  /* Mobile nav toggle */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  /* FAQ accordion */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (i) { i.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* Contact form */
  var form = document.getElementById('contact-form');
  if (form) {
    var status = document.getElementById('form-status');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.querySelector('#name').value.trim();
      var email = form.querySelector('#email').value.trim();
      var comment = form.querySelector('#comment').value.trim();
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !comment) {
        showStatus('Please fill in your name, email, and message.', 'error');
        return;
      }
      if (!emailPattern.test(email)) {
        showStatus('That email address doesn\'t look right — please double-check it.', 'error');
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      })
        .then(function (response) {
          if (response.ok) {
            showStatus('Thanks, ' + name.split(' ')[0] + ' — your message is in. We reply within one business day.', 'success');
            form.reset();
          } else {
            showStatus('Something went wrong sending that. Please email us directly at ameerhamzaabbas4@gmail.com.', 'error');
          }
        })
        .catch(function () {
          showStatus('Something went wrong sending that. Please email us directly at ameerhamzaabbas4@gmail.com.', 'error');
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send message';
        });
    });

    function showStatus(message, type) {
      status.textContent = message;
      status.className = 'form-status ' + type;
      status.style.display = 'block';
      status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
});
