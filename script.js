document.addEventListener('DOMContentLoaded', function () {
    emailjs.init('VXrxCjioO6p93R7_9'); // Remplacez par votre propre clé publique

    const formContainer = document.getElementById('formContainer');
    const thankYouMessage = document.getElementById('thankYouMessage');
    const submitButton = document.getElementById('submitButton');
    const imageContainer = document.querySelector('.image-container');
    const contactPermissionCheckbox = document.getElementById('contactPermission');

    if (!formContainer || !thankYouMessage || !submitButton || !imageContainer || !contactPermissionCheckbox) {
        console.error('Un ou plusieurs éléments nécessaires sont manquants dans le DOM.');
        return;
    }

    // Fonction pour activer ou désactiver le bouton en fonction de l'état de la case à cocher
    function updateSubmitButtonState() {
        submitButton.disabled = !contactPermissionCheckbox.checked;
    }

    // Appeler la fonction pour initialiser l'état du bouton lors du chargement
    updateSubmitButtonState();

    // Ajouter un écouteur d'événements pour la case à cocher
    contactPermissionCheckbox.addEventListener('change', updateSubmitButtonState);

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
                imageContainer.classList.add('hidden'); // Ajouter la classe pour réduire l'espacement
            }, function(error) {
                console.error('Erreur lors de l\'envoi de l\'email:', error);
                alert('Une erreur est survenue. Veuillez réessayer.');
            });
    });
});
