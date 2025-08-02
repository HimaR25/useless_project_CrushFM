// Compliment Database
const compliments = {
    flirty: [
      "Your smile is my favorite notification.😌💖",
      "Are you a magician? Because whenever I look at you, everyone else disappears.🪄🤘",
      "If you were a fruit, you'd be a fine-apple. 😏🍎",
      "You're not just a 10,You're the reason 11 exists!. 🔟💅"
    ],
    funny: [
      "Are you a bank loan? Because you got my interest.🪙😻",
      "Is your name Wi-Fi? Because I'm feeling a connection.🛜💘",
      "Do you have a map? I keep getting lost in your eyes.🗺️👀"
    ],
    bold: [
      "I'm not a photographer, but I can picture us together.📸💘",
      "You must be made of copper and tellurium, because you're Cu-Te.😮‍💨😍",
      "I'm not a genie, but I can make your dreams come true.🧞😏",
      "You're energy? UNMATCHED. You're aura? UNTOUCHABLE.👠💅"
    ],
    poetic: [
      "You're the moonlight in my midnight thoughts.🌚💖",
      "If my heart had a color, it would match your aura.😳❤️",
      "Time slows down when you enter the room.⌛💗"
    ],
    shy: [
      "I'd give up my favorite snack to share one with you.😳👉👈",
      "I practiced this compliment in the mirror 10 times... you look nice.❤️👉👈",
      "I'm not good at flirting, but you're making me want to try.😌👉👈"
    ]
};

// Mood Themes
const moodThemes = {
    flirty: { bgClass: "flirty", btnClass: "flirty-btn", bgColor: "#ff9a9e" },
    funny: { bgClass: "funny", btnClass: "funny-btn", bgColor: "#a1c4fd" },
    bold: { bgClass: "bold", btnClass: "bold-btn", bgColor: "#ff758c" },
    poetic: { bgClass: "poetic", btnClass: "poetic-btn", bgColor: "#a18cd1" },
    shy: { bgClass: "shy", btnClass: "shy-btn", bgColor: "#84fab0" }
};

// Global Variables
let currentMood = "flirty";
let starCount = 0;
let isMusicPlaying = false;
let bgMusic = null;

// DOM Elements - Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const body = document.body;
    const rizzBtn = document.getElementById("rizz-btn");
    const complimentText = document.getElementById("compliment-text");
    const moodBtns = document.querySelectorAll(".mood-btn");
    const copyBtn = document.getElementById("copy-btn");
    const shareBtn = document.getElementById("share-btn");
    const mainControl = document.getElementById('main-control');
    const bunny = document.getElementById('bunny');
    const starCounter = document.getElementById('star-counter');
    const universeMessage = document.getElementById('universe-message');
    const starContainer = document.getElementById('star-container');

    // Initialize audio (only if the audio file exists)
    try {
        bgMusic = new Audio('assets/audio/lofi-whisper.mp3');
        bgMusic.loop = true;
        bgMusic.volume = 0.3;
    } catch (error) {
        console.log('Audio file not found, continuing without background music');
        bgMusic = null;
    }

    // Confetti setup
    function createConfetti() {
        const canvas = document.createElement("canvas");
        canvas.className = "confetti-canvas";
        document.body.appendChild(canvas);

        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const colors = ["#ff9a9e", "#fad0c4", "#a1c4fd", "#c2e9fb", "#ff758c", "#ff7eb3", "#a18cd1", "#fbc2eb", "#84fab0", "#8fd3f4"];

        for (let i = 0; i < 150; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * -canvas.height,
                size: Math.random() * 8 + 3,
                color: colors[Math.floor(Math.random() * colors.length)],
                speed: Math.random() * 3 + 2,
                angle: Math.random() * 360,
                rotation: Math.random() * 0.2 - 0.1
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let allDone = true;

            particles.forEach(p => {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.angle);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                ctx.restore();

                p.y += p.speed;
                p.angle += p.rotation;

                if (p.y < canvas.height) allDone = false;
            });

            if (!allDone) {
                requestAnimationFrame(animate);
            } else {
                canvas.remove();
            }
        }

        animate();
    }

    // Generate compliment function
    function generateCompliment() {
        if (complimentText) {
            const randomCompliment = compliments[currentMood][Math.floor(Math.random() * compliments[currentMood].length)];
            complimentText.textContent = randomCompliment;
        }
    }

    // Show temporary message function
    function showTemporaryMessage(text) {
        if (universeMessage) {
            universeMessage.textContent = text;
            universeMessage.classList.add('show');
            setTimeout(() => {
                universeMessage.classList.remove('show');
            }, 2000);
        }
    }

    // Initial theme setup
    if (body && rizzBtn) {
        body.classList.add(moodThemes[currentMood].bgClass);
        rizzBtn.classList.add(moodThemes[currentMood].btnClass);
    }

    // Mood Selection
    if (moodBtns.length > 0) {
        moodBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const mood = btn.dataset.mood;
                currentMood = mood;
                const theme = moodThemes[mood];

                btn.style.transform = "scale(0.95)";
                setTimeout(() => btn.style.transform = "scale(1)", 150);

                const ripple = document.createElement("div");
                ripple.className = "ripple-effect";
                ripple.style.backgroundColor = theme.bgColor;
                document.body.appendChild(ripple);

                setTimeout(() => {
                    ripple.style.opacity = "0";
                    ripple.style.transform = "scale(2)";
                    setTimeout(() => ripple.remove(), 700);
                }, 50);

                body.className = theme.bgClass;
                rizzBtn.className = "glow " + theme.btnClass;
            });
        });
    }

    // Generate Rizz Button
    if (rizzBtn) {
        rizzBtn.addEventListener("click", () => {
            generateCompliment();

            rizzBtn.style.transform = "scale(0.95)";
            setTimeout(() => rizzBtn.style.transform = "scale(1)", 150);

            createConfetti();
        });
    }

    // Copy functionality
    if (copyBtn) {
        copyBtn.addEventListener("click", () => {
            if (complimentText && complimentText.textContent) {
                navigator.clipboard.writeText(complimentText.textContent);
                copyBtn.textContent = "Copied!";
                setTimeout(() => copyBtn.textContent = "Copy ✂️", 2000);
            }
        });
    }

    // Share functionality
    if (shareBtn) {
        shareBtn.addEventListener("click", () => {
            if (complimentText && complimentText.textContent) {
                if (navigator.share) {
                    navigator.share({
                        title: "RizzyCompliment",
                        text: complimentText.textContent,
                        url: window.location.href
                    });
                } else {
                    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(complimentText.textContent + " ✨ via RizzyCompliments")}`;
                    window.open(shareUrl, "_blank");
                }
            }
        });
    }

    // Main Control Button
    if (mainControl) {
        mainControl.addEventListener('click', () => {
            if (bgMusic) {
                if (isMusicPlaying) {
                    bgMusic.pause();
                    mainControl.innerHTML = "🎵 Start Magic + Rizz 💫";
                    mainControl.classList.remove('music-playing');
                } else {
                    bgMusic.play()
                        .then(() => {
                            mainControl.innerHTML = "🔊 Music + Rizz Active ✨";
                            mainControl.classList.add('music-playing');
                        })
                        .catch(e => {
                            console.error("Audio error:", e);
                            mainControl.innerHTML = "❌ Allow Audio First";
                            setTimeout(() => {
                                mainControl.innerHTML = "🎵 Start Magic + Rizz 💫";
                            }, 2000);
                        });
                }
                isMusicPlaying = !isMusicPlaying;
            } else {
                // If no audio, just show visual effects
                mainControl.innerHTML = "✨ Rizz Mode Active ✨";
                setTimeout(() => {
                    mainControl.innerHTML = "🎵 Start Magic + Rizz 💫";
                }, 2000);
            }
            
            // Generate compliment and confetti
            generateCompliment();
            createConfetti();
        });
    }

    // Star Collector with Bunny - MOVED INSIDE DOMContentLoaded
    document.addEventListener('click', (e) => {
        // Create star
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${e.clientX - 12}px`;
        star.style.top = `${e.clientY - 12}px`;
        
        if (starContainer) {
            starContainer.appendChild(star);
        } else {
            document.body.appendChild(star);
        }
        
        // Update counter with bunny reaction
        starCount++;
        if (starCounter) {
            starCounter.textContent = `${starCount} ✨`;
            // Add pulse effect
            starCounter.classList.add('pulse');
            setTimeout(() => starCounter.classList.remove('pulse'), 500);
        }
        
        if (bunny) {
            bunny.style.transform = 'translateX(-50%) scale(1.2)';
            setTimeout(() => bunny.style.transform = 'translateX(-50%) scale(1)', 300);
        }
        
        // Special messages
        if (starCount === 10) {
            showTemporaryMessage("Keep going! 🥕");
        } else if (starCount === 50) {
            showTemporaryMessage("Halfway there! 🌟");
        } else if (starCount === 100) {
            showTemporaryMessage("🌈 You won the universe! 🌈");
            // Bunny celebration
            if (bunny) {
                bunny.style.animation = 'none';
                bunny.style.transform = 'translateX(-50%) rotate(360deg) scale(1.5)';
                setTimeout(() => {
                    bunny.style.animation = 'bunny-hop 2s infinite alternate';
                    bunny.style.transform = 'translateX(-50%)';
                }, 2000);
            }
        }
        
        // Remove star after animation
        setTimeout(() => star.remove(), 3000);
    });

    // Add this to your existing script.js inside the DOMContentLoaded function

// Pink Bear Interactions
const pinkBear = document.getElementById('pink-bear');

if (pinkBear) {
  // Click interaction - wiggle animation
  pinkBear.addEventListener('click', () => {
    pinkBear.classList.add('wiggle');
    
    // Remove wiggle class after animation
    setTimeout(() => {
      pinkBear.classList.remove('wiggle');
    }, 500);
    
    // Optional: Show a cute message
    showTemporaryMessage("🐻💕 Bear says hi!");
    
    // Optional: Create heart confetti
    createHeartConfetti();
  });
  
  // Double click for special effect
  pinkBear.addEventListener('dblclick', () => {
    pinkBear.style.filter = 'hue-rotate(60deg)';
    setTimeout(() => {
      pinkBear.style.filter = '';
    }, 1000);
    
    showTemporaryMessage("🌈 Rainbow bear mode!");
  });
}

// Heart confetti function (optional cute effect)
function createHeartConfetti() {
  const heartCanvas = document.createElement("canvas");
  heartCanvas.className = "heart-confetti-canvas";
  heartCanvas.style.position = "fixed";
  heartCanvas.style.top = "0";
  heartCanvas.style.left = "0";
  heartCanvas.style.width = "100%";
  heartCanvas.style.height = "100%";
  heartCanvas.style.pointerEvents = "none";
  heartCanvas.style.zIndex = "999";
  document.body.appendChild(heartCanvas);

  const ctx = heartCanvas.getContext("2d");
  heartCanvas.width = window.innerWidth;
  heartCanvas.height = window.innerHeight;

  const hearts = [];
  const heartColors = ["#ff69b4", "#ff1493", "#ffb6c1", "#ffc0cb"];

  for (let i = 0; i < 20; i++) {
    hearts.push({
      x: Math.random() * heartCanvas.width,
      y: Math.random() * -heartCanvas.height,
      size: Math.random() * 15 + 10,
      color: heartColors[Math.floor(Math.random() * heartColors.length)],
      speed: Math.random() * 2 + 1,
      rotation: Math.random() * 360
    });
  }

  function animateHearts() {
    ctx.clearRect(0, 0, heartCanvas.width, heartCanvas.height);
    let allDone = true;

    hearts.forEach(heart => {
      ctx.save();
      ctx.translate(heart.x, heart.y);
      ctx.rotate(heart.rotation * Math.PI / 180);
      ctx.font = `${heart.size}px Arial`;
      ctx.fillStyle = heart.color;
      ctx.fillText("💕", -heart.size/2, heart.size/2);
      ctx.restore();

      heart.y += heart.speed;
      heart.rotation += 2;

      if (heart.y < heartCanvas.height) allDone = false;
    });

    if (!allDone) {
      requestAnimationFrame(animateHearts);
    } else {
      heartCanvas.remove();
    }
  }

  animateHearts();
}

}); // End of DOMContentLoaded