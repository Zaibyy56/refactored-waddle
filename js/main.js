document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you. A SafeDecrypt specialist will reach out shortly.');
      contactForm.reset();
    });
  }

  const chatToggle = document.getElementById('chat-toggle');
  const chatbox = document.getElementById('chatbox');
  if (chatToggle && chatbox) {
    chatToggle.addEventListener('click', function() {
      chatbox.style.display = 'block';
    });
    chatbox.querySelector('header').addEventListener('click', function() {
      chatbox.style.display = 'none';
    });
  }

  const diagnoseForm = document.getElementById('diagnose-form');
  if (diagnoseForm) {
    const data = {
      '.lockbit': 'LockBit Ransomware - known for double extortion tactics.',
      '.conti': 'Conti Ransomware - typically spreads via phishing emails.',
      '.revil': 'REvil Ransomware - often targets managed service providers.'
    };
    diagnoseForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const ext = document.getElementById('extension').value.toLowerCase();
      const result = data[ext] || 'Extension not found. Contact SafeDecrypt for a custom analysis.';
      document.getElementById('diagnosis-result').textContent = result;
    });
  }
});
