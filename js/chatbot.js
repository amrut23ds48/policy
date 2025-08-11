 const botResponses = {
            health: [
                "Great choice! Health insurance is essential for your wellbeing. What specific health coverage are you looking for?",
                "I can help you understand your health insurance benefits. What would you like to know about your policy?",
                "Health insurance can cover medical expenses, prescriptions, and preventive care. How can I assist you today?"
            ],
            vehicle: [
                "Vehicle insurance protects you on the road. Whether it's comprehensive or third-party, I'm here to help!",
                "Car or bike insurance queries? I've got you covered! What would you like to know?",
                "Vehicle insurance is mandatory and important. Let me help you understand your policy better."
            ],
            travel: [
                "Travel insurance ensures peace of mind during your journeys. Planning a domestic or international trip?",
                "Travel insurance can cover trip cancellations, medical emergencies abroad, and lost luggage. How can I help?",
                "Whether you're exploring Kerala or dreaming of Europe, travel insurance is essential. What's your question?"
            ],
            general: [
                "I'm here to help with all your insurance queries! Could you provide more details about what you're looking for?",
                "Thanks for your question! Based on your selected domain and policy, how can I assist you further?",
                "I understand you have an insurance question. Let me help you find the right information!",
                "That's an interesting question! Let me provide you with the most relevant information for your policy.",
                "I'm analyzing your query in context of your selected insurance options. Here's what I can tell you:",
                "Great question! Insurance can be complex, but I'm here to make it simple for you."
            ],
            claim: [
                "For claim-related queries, I'll need some basic information. Have you already filed a claim or are you looking to file one?",
                "Claim processing typically takes 7-15 business days. What specific aspect of the claim would you like to know about?",
                "I can help you with claim procedures, required documents, and status updates. What do you need assistance with?"
            ],
            premium: [
                "Premium calculations depend on various factors like age, coverage amount, and policy type. What would you like to know?",
                "Your premium can be paid monthly, quarterly, or annually. Would you like information about payment options?",
                "Premium discounts may be available for early payments or no-claim bonuses. Shall I explain the details?"
            ]
        };

        const chatMessages = document.getElementById('chatMessages');
        const chatForm = document.getElementById('chatbotform');
        const searchInput = document.getElementById('search');
        const domainSelect = document.querySelector('select[name="domain"]');
        const policySelect = document.querySelector('select[name="policy"]');
        const typingIndicator = document.getElementById('typingIndicator');

        // Initialize bot time
        document.getElementById('botTime').textContent = getCurrentTime();

        function getCurrentTime() {
            return new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        }

        function addMessage(message, isUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
            
            const messageContent = document.createElement('div');
            messageContent.textContent = message;
            
            const timeDiv = document.createElement('div');
            timeDiv.className = 'message-time';
            timeDiv.textContent = getCurrentTime();
            
            messageDiv.appendChild(messageContent);
            messageDiv.appendChild(timeDiv);
            
            chatMessages.appendChild(messageDiv);
            scrollToBottom();
        }

        function scrollToBottom() {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function showTypingIndicator() {
            typingIndicator.style.display = 'block';
            scrollToBottom();
        }

        function hideTypingIndicator() {
            typingIndicator.style.display = 'none';
        }

        function getBotResponse(userMessage, domain, policy) {
            const message = userMessage.toLowerCase();
            
            // Check for specific keywords
            if (message.includes('claim') || message.includes('settlement')) {
                return getRandomResponse(botResponses.claim);
            }
            if (message.includes('premium') || message.includes('payment') || message.includes('cost')) {
                return getRandomResponse(botResponses.premium);
            }
            
            // Domain-specific responses
            if (domain) {
                if (domain.includes('health') || domain === 'personal' || domain === 'family') {
                    return getRandomResponse(botResponses.health);
                }
                if (domain.includes('vehicle') || domain === 'car' || domain === 'bike') {
                    return getRandomResponse(botResponses.vehicle);
                }
                if (domain.includes('travel') || domain === 'international' || domain === 'domestic') {
                    return getRandomResponse(botResponses.travel);
                }
            }
            
            // Policy-specific responses
            if (policy) {
                if (policy.includes('kerala') || policy.includes('maharashtra') || policy.includes('goa')) {
                    return `Great choice with the ${policy} policy! This covers domestic travel within India. ${getRandomResponse(botResponses.travel)}`;
                }
                if (policy.includes('europe') || policy.includes('australian')) {
                    return `The ${policy} policy covers international destinations. ${getRandomResponse(botResponses.travel)}`;
                }
                if (policy.includes('car') || policy.includes('rider')) {
                    return `Your ${policy} policy provides excellent vehicle coverage. ${getRandomResponse(botResponses.vehicle)}`;
                }
                if (policy.includes('family')) {
                    return `The ${policy} policy covers your entire family's health needs. ${getRandomResponse(botResponses.health)}`;
                }
            }
            
            return getRandomResponse(botResponses.general);
        }

        function getRandomResponse(responseArray) {
            return responseArray[Math.floor(Math.random() * responseArray.length)];
        }

        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const userMessage = searchInput.value.trim();
            if (!userMessage) return;
            
            const selectedDomain = domainSelect.value;
            const selectedPolicy = policySelect.value;
            
            // Add user message
            addMessage(userMessage, true);
            
            // Clear input
            searchInput.value = '';
            
            // Show typing indicator
            showTypingIndicator();
            
            // Simulate bot thinking time
            setTimeout(() => {
                hideTypingIndicator();
                const botResponse = getBotResponse(userMessage, selectedDomain, selectedPolicy);
                addMessage(botResponse, false);
            }, Math.random() * 1000 + 1000); // Random delay between 1-2 seconds
        });

        // Close button functionality
        document.getElementById('close').addEventListener('click', function() {
            if (confirm('Are you sure you want to close the chat?')) {
                document.querySelector('.chatbot-slide').style.transform = 'scale(0)';
                setTimeout(() => {
                    document.querySelector('.chatbot-slide').style.display = 'none';
                }, 300);
            }
        });

        // Auto-focus on input
        searchInput.focus();

        // Handle Enter key in input
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                chatForm.dispatchEvent(new Event('submit'));
            }
        });