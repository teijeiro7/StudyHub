document.addEventListener('DOMContentLoaded', function () {
    // Step navigation elements
    const steps = document.querySelectorAll('.step');
    const formSteps = document.querySelectorAll('.form-step');
    const stepConnectors = document.querySelectorAll('.step-connector');
    const successMessage = document.getElementById('successMessage');

    // Buttons
    const sendCodeBtn = document.getElementById('sendCodeBtn');
    const backToEmailBtn = document.getElementById('backToEmail');
    const verifyCodeBtn = document.getElementById('verifyCodeBtn');
    const backToCodeBtn = document.getElementById('backToCode');
    const resetPasswordBtn = document.getElementById('resetPasswordBtn');
    const resendCodeBtn = document.getElementById('resendCodeBtn');

    // Current step tracking
    let currentStep = 1;

    // Go to specific step
    function goToStep(step) {
        // Hide all steps
        formSteps.forEach(formStep => {
            formStep.classList.remove('active');
        });

        // Show current step
        document.getElementById(`step${step}`).classList.add('active');

        // Update step indicators
        steps.forEach(s => {
            const stepNum = parseInt(s.getAttribute('data-step'));
            s.classList.remove('active', 'completed');

            if (stepNum === step) {
                s.classList.add('active');
            } else if (stepNum < step) {
                s.classList.add('completed');
            }
        });

        // Update connectors
        stepConnectors.forEach((connector, index) => {
            connector.classList.remove('active');
            if (index < step - 1) {
                connector.classList.add('active');
            }
        });

        currentStep = step;
    }

    // Event listeners for navigation
    sendCodeBtn.addEventListener('click', function () {
        const email = document.getElementById('email').value;
        if (validateEmail(email)) {
            goToStep(2);
            simulateCodeSent(email);
        } else {
            alert('Por favor, introduce un correo electrónico válido.');
        }
    });

    backToEmailBtn.addEventListener('click', function () {
        goToStep(1);
    });

    verifyCodeBtn.addEventListener('click', function () {
        if (validateCode()) {
            goToStep(3);
        } else {
            alert('Por favor, introduce el código de 6 dígitos completo.');
        }
    });

    backToCodeBtn.addEventListener('click', function () {
        goToStep(2);
    });

    resetPasswordBtn.addEventListener('click', function () {
        if (validateNewPassword()) {
            // Hide form steps
            formSteps.forEach(step => step.classList.remove('active'));

            // Show success message
            successMessage.classList.add('active');
        }
    });

    resendCodeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        simulateCodeSent(document.getElementById('email').value);
    });

    // Code input handling
    const codeInputs = document.querySelectorAll('.code-input');
    codeInputs.forEach((input, index) => {
        input.addEventListener('input', function () {
            if (this.value.length === this.maxLength) {
                // Move to next input if not the last one
                if (index < codeInputs.length - 1) {
                    codeInputs[index + 1].focus();
                }
            }
        });

        input.addEventListener('keydown', function (e) {
            if (e.key === 'Backspace' && this.value.length === 0) {
                // Move to previous input if not the first one
                if (index > 0) {
                    codeInputs[index - 1].focus();
                }
            }
        });
    });

    // Toggle password visibility
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function () {
            const passwordInput = this.previousElementSibling;
            const type = passwordInput.getAttribute('type');

            if (type === 'password') {
                passwordInput.setAttribute('type', 'text');
                this.innerHTML = '<i class="fas fa-eye-slash"></i>';
            } else {
                passwordInput.setAttribute('type', 'password');
                this.innerHTML = '<i class="fas fa-eye"></i>';
            }
        });
    });

    // Password strength checker
    const newPasswordInput = document.getElementById('newPassword');
    newPasswordInput.addEventListener('input', checkPasswordStrength);

    // Validation functions
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validateCode() {
        for (let input of codeInputs) {
            if (!input.value) {
                return false;
            }
        }
        return true;
    }

    function validateNewPassword() {
        const password = newPasswordInput.value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return false;
        }

        // Check if all requirements are met
        const requirements = document.querySelectorAll('.password-requirements li');
        for (let req of requirements) {
            if (!req.classList.contains('valid')) {
                alert('Tu contraseña no cumple con todos los requisitos de seguridad.');
                return false;
            }
        }

        return true;
    }

    function checkPasswordStrength() {
        const password = newPasswordInput.value;
        const strengthSegments = document.querySelectorAll('.strength-segment');
        const strengthText = document.querySelector('.strength-text');

        // Check requirements
        const requirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[^A-Za-z0-9]/.test(password)
        };

        // Update requirement indicators
        for (let req in requirements) {
            const reqElement = document.getElementById(`req-${req}`);
            if (requirements[req]) {
                reqElement.classList.add('valid');
            } else {
                reqElement.classList.remove('valid');
            }
        }

        // Calculate strength score (0-4)
        let score = Object.values(requirements).filter(Boolean).length;

        // Update strength meter
        strengthSegments.forEach((segment, index) => {
            segment.className = 'strength-segment';
            if (index < score) {
                if (score <= 2) {
                    segment.classList.add('weak');
                } else if (score === 3) {
                    segment.classList.add('medium');
                } else {
                    segment.classList.add('strong');
                }
            }
        });

        // Update strength text
        if (score === 0) {
            strengthText.textContent = 'Sin contraseña';
        } else if (score <= 2) {
            strengthText.textContent = 'Contraseña débil';
            strengthText.style.color = '#e74c3c';
        } else if (score === 3) {
            strengthText.textContent = 'Contraseña media';
            strengthText.style.color = '#f39c12';
        } else {
            strengthText.textContent = 'Contraseña fuerte';
            strengthText.style.color = '#2ecc71';
        }
    }

    // Simulate code being sent (in a real app, this would be server-side)
    function simulateCodeSent(email) {
        const codeSentMessage = document.querySelector('.verification-info p');
        codeSentMessage.textContent = `Hemos enviado un código de verificación a ${email.substring(0, 3)}...${email.substring(email.indexOf('@'))}`;

        // Clear and focus first code input
        codeInputs.forEach(input => input.value = '');
        codeInputs[0].focus();

        // Show "sending" message briefly
        const resendLink = document.getElementById('resendCodeBtn');
        const originalText = resendLink.textContent;
        resendLink.textContent = 'Enviando...';
        resendLink.style.pointerEvents = 'none';

        setTimeout(() => {
            resendLink.textContent = originalText;
            resendLink.style.pointerEvents = 'auto';
        }, 2000);
    }
});