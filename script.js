document.addEventListener('DOMContentLoaded', function () {
    emailjs.init('VXrxCjioO6p93R7_9');

    const formContainer = document.getElementById('formContainer');
    const thankYouMessage = document.getElementById('thankYouMessage');
    const submitButton = document.getElementById('submitButton');
    const imageContainer = document.querySelector('.image-container');
    const contactPermissionCheckbox = document.getElementById('contactPermission');
    const contactForm = document.getElementById('contactForm');
    
    if (!formContainer || !thankYouMessage || !submitButton || !imageContainer || !contactPermissionCheckbox || !contactForm) {
        console.error('Un ou plusieurs éléments nécessaires sont manquants dans le DOM.');
        return;
    }

    // Fonction pour valider les champs du formulaire
    function validateForm() {
        const name = contactForm.elements['contactName'].value.trim();
        const email = contactForm.elements['contactEmail'].value.trim();
        const message = contactForm.elements['contactMessage'].value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Vérifiez si tous les champs sont remplis et si l'email est valide
        const isFormValid = name && email && message && emailPattern.test(email) && contactPermissionCheckbox.checked;

        submitButton.disabled = !isFormValid; // Activer/désactiver le bouton en fonction de la validité du formulaire
    }

    // Appeler la fonction pour initialiser l'état du bouton lors du chargement
    validateForm();

    // Ajouter des écouteurs d'événements pour vérifier la validité du formulaire lors des changements
    contactForm.addEventListener('input', validateForm);
    contactPermissionCheckbox.addEventListener('change', validateForm);

    submitButton.addEventListener('click', function () {
        // Validation finale avant l'envoi
        if (submitButton.disabled) {
            alert('Veuillez remplir tous les champs correctement et accepter la communication.');
            return;
        }

        const formData = new FormData(contactForm);

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
