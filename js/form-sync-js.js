// Form Data Synchronization Script for AskMyPolicy

document.addEventListener('DOMContentLoaded', function() {
    // Get all form elements
    const forms = {
        personal: document.getElementById('personalForm'),
        family: document.getElementById('familyForm'),
        car: document.getElementById('carForm'),
        bike: document.getElementById('bikeForm'),
        international: document.getElementById('internationalForm'),
        domestic: document.getElementById('domesticForm')
    };

    // Get chatbot elements
    const chatbotDomain = document.querySelector('#chatbotform select[name="domain"]');
    const chatbotPolicy = document.querySelector('#chatbotform select[name="policy"]');
    const chatbotSlide = document.querySelector('.chatbot-slide');
    const closeButton = document.getElementById('close');

    // Store current selection state
    let currentSelection = {
        domain: '',
        subdomain: '',
        policy: '',
        formData: {}
    };

    // Domain mapping for forms
    const domainMapping = {
        'personalForm': { domain: 'health', subdomain: 'personal' },
        'familyForm': { domain: 'health', subdomain: 'family' },
        'carForm': { domain: 'vehicle', subdomain: 'car' },
        'bikeForm': { domain: 'vehicle', subdomain: 'bike' },
        'internationalForm': { domain: 'travel', subdomain: 'international' },
        'domesticForm': { domain: 'travel', subdomain: 'domestic' }
    };

    // Policy options for each domain/subdomain
    const policyOptions = {
        health: {
            personal: ['Tuzya Khatir(goa)'],
            family: ['Meri family', 'hum sath hai']
        },
        vehicle: {
            car: ['Apni car', 'meri car'],
            bike: ['rider assure', 'roadies']
        },
        travel: {
            international: ['Europe Dream', 'Australian Open'],
            domestic: ['Maharashtra Darshan', 'kerala diaries']
        }
    };

    // Function to update chatbot domain and policy dropdowns
    function updateChatbotDropdowns(domain, subdomain, selectedPolicy = '') {
        // Update domain selection
        if (domain && subdomain) {
            chatbotDomain.value = subdomain; // Using subdomain as the value
            
            // Clear and repopulate policy options based on selection
            chatbotPolicy.innerHTML = '<option value="">Select</option>';
            
            if (policyOptions[domain] && policyOptions[domain][subdomain]) {
                policyOptions[domain][subdomain].forEach(policy => {
                    const option = document.createElement('option');
                    option.value = policy.toLowerCase();
                    option.textContent = policy;
                    chatbotPolicy.appendChild(option);
                });
            }
            
            // Set selected policy if provided
            if (selectedPolicy) {
                chatbotPolicy.value = selectedPolicy;
            }
        }
    }

    // Function to collect form data
    function collectFormData(form) {
        const formData = {};
        const inputs = form.querySelectorAll('input, select');
        
        inputs.forEach(input => {
            if (input.name && input.value) {
                formData[input.name] = input.value;
            }
        });
        
        return formData;
    }

    // Function to show chatbot with animation
    function showChatbot() {
        chatbotSlide.style.transform = 'translateX(0)';
        chatbotSlide.style.opacity = '1';
        chatbotSlide.style.visibility = 'visible';
    }

    // Function to hide chatbot
    function hideChatbot() {
        chatbotSlide.style.transform = 'translateX(100%)';
        chatbotSlide.style.opacity = '0';
        chatbotSlide.style.visibility = 'hidden';
    }

    // Add event listeners to all forms
    Object.keys(forms).forEach(formKey => {
        const form = forms[formKey];
        if (!form) return;

        const formId = form.id;
        const mapping = domainMapping[formId];

        // Add change event listeners to all form inputs
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('change', function() {
                // Update current selection
                currentSelection.domain = mapping.domain;
                currentSelection.subdomain = mapping.subdomain;
                currentSelection.formData = collectFormData(form);
                
                // Get selected policy
                const policySelect = form.querySelector('select[name="policy"]');
                if (policySelect && policySelect.value) {
                    currentSelection.policy = policySelect.value;
                }

                // Update chatbot dropdowns
                updateChatbotDropdowns(
                    currentSelection.domain,
                    currentSelection.subdomain,
                    currentSelection.policy
                );
            });
        });

        // Add submit event listeners to show chatbot
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Update selection before showing chatbot
            currentSelection.domain = mapping.domain;
            currentSelection.subdomain = mapping.subdomain;
            currentSelection.formData = collectFormData(form);
            
            const policySelect = form.querySelector('select[name="policy"]');
            if (policySelect && policySelect.value) {
                currentSelection.policy = policySelect.value;
            }

            // Update chatbot and show it
            updateChatbotDropdowns(
                currentSelection.domain,
                currentSelection.subdomain,
                currentSelection.policy
            );
            
            showChatbot();
        });

        // Add click event listeners to "Ask any question!" buttons
        const askButtons = form.querySelectorAll('input[type="submit"]');
        askButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Update selection
                currentSelection.domain = mapping.domain;
                currentSelection.subdomain = mapping.subdomain;
                currentSelection.formData = collectFormData(form);
                
                const policySelect = form.querySelector('select[name="policy"]');
                if (policySelect && policySelect.value) {
                    currentSelection.policy = policySelect.value;
                }

                updateChatbotDropdowns(
                    currentSelection.domain,
                    currentSelection.subdomain,
                    currentSelection.policy
                );
                
                showChatbot();
            });
        });
    });

    // Close chatbot functionality
    if (closeButton) {
        closeButton.addEventListener('click', hideChatbot);
    }

    // Handle chatbot form submission
    const chatbotForm = document.getElementById('chatbotform');
    if (chatbotForm) {
        chatbotForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const searchInput = document.getElementById('search');
            const query = searchInput.value.trim();

            // Here you can add the actual chatbot submission logic
            console.log('Chatbot Query:', {
                domain: currentSelection.domain,
                subdomain: currentSelection.subdomain,
                policy: chatbotPolicy.value,
                query: query,
                formData: currentSelection.formData
            });
            
            // Clear the search input after submission
            searchInput.value = '';
            
            // You can add actual chatbot response handling here
        });
    }

    // Initialize chatbot as hidden
    hideChatbot();

    // Add some basic styling for the chatbot slide animation
    if (chatbotSlide) {
        chatbotSlide.style.transition = 'all 0.3s ease-in-out';
        chatbotSlide.style.position = 'fixed';
        chatbotSlide.style.right = '0';
        chatbotSlide.style.top = '50%';
        chatbotSlide.style.transform = 'translateY(-50%) translateX(100%)';
        chatbotSlide.style.zIndex = '1000';
    }

    // Debug function to check current selection (can be removed in production)
    window.getCurrentSelection = function() {
        return currentSelection;
    };

    console.log('Form synchronization initialized successfully!');
});