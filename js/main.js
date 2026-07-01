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

  /* Contact form with EmailJS */
  var form = document.getElementById('contact-form');
  if (form) {
    var status = document.getElementById('form-status');

    // Initialize EmailJS - REPLACE WITH YOUR PUBLIC KEY
    (function() {
      emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');
    })();

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.querySelector('#name').value.trim();
      var email = form.querySelector('#email').value.trim();
      var service = form.querySelector('#service').value;
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

      // Send email using EmailJS - REPLACE WITH YOUR SERVICE & TEMPLATE IDs
      emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        from_name: name,
        from_email: email,
        service: service,
        message: comment
      })
        .then(function(response) {
          if (response.status === 200) {
            showStatus('Thanks, ' + name.split(' ')[0] + ' — your message is in. We reply within one business day.', 'success');
            form.reset();
          } else {
            showStatus('Something went wrong sending that. Please email us directly at support@nodevaro.com.', 'error');
          }
        })
        .catch(function(error) {
          console.error('EmailJS error:', error);
          showStatus('Something went wrong sending that. Please email us directly at support@nodevaro.com.', 'error');
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