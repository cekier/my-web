// Efekt blur na tle i zmiana koloru tekstu
window.addEventListener("scroll", function () {
    const heroBackground = document.querySelector(".hero-background");
    const heroContent = document.querySelector(".hero-content");
    const scrollPosition = window.scrollY;

    const blurAmount = Math.min(scrollPosition / 200, 10);
  

    if (scrollPosition > 200) {
        heroContent.style.color = "black";
    } else {
        heroContent.style.color = "white";
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const servicesContainer = document.querySelector('.services-container');
    const serviceBoxes = Array.from(document.querySelectorAll('.service-box'));
    const boxWidth = serviceBoxes[0].offsetWidth + 20;
    let currentPosition = 0;

    function cloneServices(times) {
        for (let i = 0; i < times; i++) {
            serviceBoxes.forEach(service => {
                const clonedService = service.cloneNode(true);
                servicesContainer.appendChild(clonedService);
            });
        }
    }

    cloneServices(3);

    function moveServices() {
        currentPosition -= 2;
        if (Math.abs(currentPosition) >= servicesContainer.scrollWidth / 3) {
            currentPosition = 0;
        }
        
    }

    setInterval(moveServices, 20);
});
// Existing scripts
// ...

// Admin Panel Script
document.getElementById('admin-login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Simple login mechanism, replace with actual authentication
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === 'admin' && password === 'admin') {
        document.getElementById('admin-login-form').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'block';
    } else {
        alert('Nieprawidłowa nazwa użytkownika lub hasło');
    }
});

// Photo Upload Script
document.getElementById('photo-upload-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const file = document.getElementById('photo-upload').files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            document.getElementById('gallery-content').appendChild(img);
        };
        reader.readAsDataURL(file);
    }
});

// Existing scripts
// ...

// Admin Panel Script
document.getElementById('admin-login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Simple login mechanism, replace with actual authentication
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === 'admin' && password === 'admin') {
        document.getElementById('admin-login-form').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'block';
    } else {
        alert('Nieprawidłowa nazwa użytkownika lub hasło');
    }
});

// Load photos and posts from localStorage on page load
window.onload = function() {
    loadPhotos();
    loadPosts();
};

// Photo Upload Script
document.getElementById('photo-upload-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const file = document.getElementById('photo-upload').files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            document.getElementById('gallery-content').appendChild(img);
            savePhoto(e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

function savePhoto(photo) {
    const photos = JSON.parse(localStorage.getItem('photos')) || [];
    photos.push(photo);
    localStorage.setItem('photos', JSON.stringify(photos));
}

function loadPhotos() {
    const photos = JSON.parse(localStorage.getItem('photos')) || [];
    photos.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo;
        document.getElementById('gallery-content').appendChild(img);
    });
}

// Post Upload Script
document.getElementById('post-upload-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const content = document.getElementById('post-content').value;
    if (content) {
        const post = document.createElement('div');
        post.className = 'post';
        post.textContent = content;
        document.getElementById('posts-content').appendChild(post);
        savePost(content);
        document.getElementById('post-content').value = '';
    }
});

function savePost(content) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(content);
    localStorage.setItem('posts', JSON.stringify(posts));
}

function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.forEach(content => {
        const post = document.createElement('div');
        post.className = 'post';
        post.textContent = content;
        document.getElementById('posts-content').appendChild(post);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const showLoginBtn = document.getElementById('show-login-btn');
    const loginFormContainer = document.getElementById('login-form-container');

    // Przełącz widoczność formularza logowania po kliknięciu przycisku
    showLoginBtn.addEventListener('click', () => {
        loginFormContainer.classList.toggle('hidden');
    });

    // Opcjonalne: Zamknięcie formularza po kliknięciu poza nim
    document.addEventListener('click', (event) => {
        if (!loginFormContainer.contains(event.target) && event.target !== showLoginBtn) {
            loginFormContainer.classList.add('hidden');
        }
    });

    // Obsługa logowania
    const loginForm = document.getElementById('admin-login-form');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'admin' && password === 'admin') {
            alert('Zalogowano pomyślnie!');
            loginFormContainer.classList.add('hidden');
        } else {
            alert('Nieprawidłowe dane logowania.');
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const serviceBoxes = document.querySelectorAll('.service-box');
    const modal = document.getElementById('service-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeModalBtn = document.querySelector('.close-btn');

    // Przykładowe opisy do wyświetlenia w modalnym oknie
    const serviceDetails = {
        Projektowanie: "Szczegółowy opis usługi projektowania, w tym zakres prac, technologie i przykłady projektów.",
        Rozwój: "Pełny opis rozwoju aplikacji, obejmujący technologie, wydajność i przykłady realizacji.",
        Wsparcie: "Szczegóły wsparcia technicznego, SLA i zakres działań naprawczych.",
        SEO: "Opis optymalizacji pod kątem wyszukiwarek, w tym strategie i narzędzia.",
        Marketing: "Strategie marketingowe, przykłady kampanii oraz metody analizy danych.",
        Analiza: "Szczegółowy opis analizy danych oraz optymalizacji procesów biznesowych.",
        Bezpieczeństwo: "Opis zabezpieczeń aplikacji, danych użytkowników i przykładów wdrożeń.",
        Design: "Tworzenie unikalnych projektów graficznych i identyfikacji wizualnej."
    };

    serviceBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const title = box.querySelector('h3').innerText;
            const description = serviceDetails[title] || "Brak szczegółowych informacji.";
            
            // Ustaw tytuł i opis w oknie modalnym
            modalTitle.innerText = title;
            modalDescription.innerText = description;
            
            // Pokaż modalne okno z animacją
            modal.classList.add('visible');
        });
    });

    // Zamknięcie modalnego okna
    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('visible');
    });

    // Zamknięcie modalnego okna po kliknięciu poza treścią
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('visible');
        }
    });
});

