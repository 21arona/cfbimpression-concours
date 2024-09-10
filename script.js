document.addEventListener('DOMContentLoaded', function () {
    emailjs.init('VXrxCjioO6p93R7_9'); // Remplacez par votre propre clé publique

    const formContainer = document.getElementById('formContainer');
    const thankYouMessage = document.getElementById('thankYouMessage');
    const submitButton = document.getElementById('submitButton');

    if (!formContainer || !thankYouMessage || !submitButton) {
        console.error('Un ou plusieurs éléments nécessaires sont manquants dans le DOM.');
        return;
    }

    submitButton.addEventListener('click', function () {
        const formData = new FormData(document.getElementById('contactForm'));

        const emailData = {
            from_name: formData.get('contactName'),
            from_email: formData.get('contactEmail'),
            message: formData.get('contactMessage')
        };

        console.log('Email Data:', emailData);

        emailjs.send('service_0llem7e', 'template_392nz36', emailData)
            .then(function(response) {
                console.log('Email envoyé avec succès:', response);
                formContainer.style.display = 'none'; // Masquer le formulaire
                thankYouMessage.style.display = 'block'; // Afficher le message de remerciement
            }, function(error) {
                console.error('Erreur lors de l\'envoi de l\'email:', error);
                alert('Une erreur est survenue. Veuillez réessayer.');
            });
    });
});
