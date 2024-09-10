document.addEventListener('DOMContentLoaded', function () {
    // Assurez-vous que EmailJS est bien initialisé avec votre clé publique
    emailjs.init('VXrxCjioO6p93R7_9'); // Remplacez par votre propre clé publique
  
    const formContainer = document.getElementById('formContainer');
    const contactTitle = document.getElementById('contactTitle'); // Assurez-vous que cet élément existe dans votre HTML
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const submitButton = document.getElementById('submitButton');

 // Vérifiez si tous les éléments sont présents
    // if (!form || !submitButton || !formContainer || !contactTitle || !successMessage) {
    //   console.error('Un ou plusieurs éléments nécessaires sont manquants dans le DOM.');
    //   return;
    // }
  
    submitButton.addEventListener('click', function () {
      // Assurez-vous que FormData est correctement utilisé
      const formData = new FormData(form);
  
      // Préparez les données pour EmailJS
      const emailData = {
        from_name: formData.get('contactName'),
        from_email: formData.get('contactEmail'),
        subject: formData.get('contactSubject') || '', // Si vous avez un champ de sujet
        message: formData.get('contactMessage')
      };
  
      // Vérifiez les données avant envoi
      console.log('Email Data:', emailData);
  
      // Envoyez les données à EmailJS
      emailjs.send('service_0llem7e', 'template_392nz36', emailData)
        .then(function(response) {
          console.log('Email envoyé avec succès:', response); 
          // Cachez le formulaire
          formContainer.style.display = 'none';
          // Modifiez le titre en message de succès
          contactTitle.textContent = 'Message bien envoyé !';
          // Affichez le message de succès
          successMessage.style.display = 'block';
        }, function(error) {
          console.error('Erreur lors de l\'envoi de l\'email:', error);
          alert('Une erreur est survenue. Veuillez réessayer.');
        });
    });
});
