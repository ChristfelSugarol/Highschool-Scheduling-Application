function start_loading(){
    const container = document.getElementById('loadingContainer');
            
            // Create heading
            const heading = document.createElement('h2');
            heading.textContent = 'Loading Progress';
            heading.style.marginBottom = '20px';
            container.appendChild(heading);
            
            // Create progress container
            const progressContainer = document.createElement('div');
            progressContainer.style.width = '80%';
            progressContainer.style.maxWidth = '500px';
            progressContainer.style.backgroundColor = '#e0e0e0';
            progressContainer.style.borderRadius = '10px';
            progressContainer.style.marginBottom = '20px';
            progressContainer.style.overflow = 'hidden';
            progressContainer.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
            container.appendChild(progressContainer);
            
            // Create progress bar
            const progressBar = document.createElement('div');
            progressBar.style.height = '30px';
            progressBar.style.width = '0%';
            progressBar.style.background = 'linear-gradient(to right, #3b82f6, #72a0e9)';
            progressBar.style.borderRadius = '10px';
            progressBar.style.transition = 'width 0.5s';
            progressBar.style.display = 'flex';
            progressBar.style.alignItems = 'center';
            progressBar.style.justifyContent = 'center';
            progressContainer.appendChild(progressBar);
            
            // Create percentage text
            const percentageText = document.createElement('span');
            percentageText.textContent = '0%';
            percentageText.style.color = 'white';
            percentageText.style.fontWeight = 'bold';
            percentageText.style.textShadow = '1px 1px 1px rgba(0,0,0,0.3)';
            progressBar.appendChild(percentageText);
            
            // Create status text
            const statusText = document.createElement('p');
            statusText.textContent = 'Assigning schedules...';
            statusText.style.fontSize = '18px';
            statusText.style.color = '#555';
            statusText.style.color = 'white';
            container.appendChild(statusText);
            
            // Progress bar functionality
            let progress = 0;
            let speed = 50;  // Initial speed (ms)
            
            function updateProgressBar() {
                // Update the progress bar width and text
                progressBar.style.width = progress + '%';
                percentageText.textContent = progress + '%';
                
                // Progressively slow down as we approach 99%
                if (progress < 75) {
                    // Normal progress up to 75%
                    progress += 1;
                    setTimeout(updateProgressBar, speed);
                } else if (progress < 90) {
                    // Slowing down between 75-90%
                    progress += 0.5;
                    setTimeout(updateProgressBar, speed * 2);
                } else if (progress < 98) {
                    // Even slower between 90-98%
                    progress += 0.2;
                    setTimeout(updateProgressBar, speed * 4);
                } else if (progress < 99) {
                    // Final approach to 99%
                    progress += 0.1;
                    setTimeout(updateProgressBar, speed * 8);
                } else if (progress >= 99) {
                    // Get stuck at 99%
                    statusText.textContent = "Almost there...";
                    
                    // Simulate perpetual loading
                    setTimeout(() => {
                        statusText.textContent = "Shuffling timeslots...";
                        setTimeout(() => {
                            statusText.textContent = "Calculating fitness...";
                            setTimeout(() => {
                                statusText.textContent = "Assigning new generations...";
                                // Loop back to "Almost there..." message
                                setTimeout(() => {
                                    statusText.textContent = "Finalizing...";
                                    setTimeout(updateStatusLoop, 5000);
                                }, 5000);
                            }, 5000);
                        }, 5000);
                    }, 3000);
                }
            }
            
            function updateStatusLoop() {
                const messages = [
                    "Shuffling timeslots...",
                    "Calculating fitness...",
                    "Assigning new generations...",
                    "Finalizing...",
                    "Just a moment longer...",
                    "Still working...",
                    "Almost there...",
                    "Assigning schedules..."
                ];
                
                let index = 0;
                
                function cycleMessage() {
                    statusText.textContent = messages[index];
                    index = (index + 1) % messages.length;
                    setTimeout(cycleMessage, 5000);
                }
                
                cycleMessage();
            }
            
            // Start the progress animation
            setTimeout(updateProgressBar, 250);
}
