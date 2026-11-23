document.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('.video-player__video');
  const errorState = document.querySelector('.error-state');
  const form = document.querySelector('.search-form');
  const container = document.querySelector('.cities-container');
  const moreSection = document.querySelector('.show-more-section');
  const moreBtn = document.querySelector('.show-more-button');

  const initialCities = [
    { title: 'БЕЛГОРОД', subtitle: 'ночной Белгород', img: 'photo/p1.png', vid: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4' },
    { title: 'АДЛЕР', subtitle: 'Адлер утром', img: 'photo/p2.png', vid: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/ElephantsDream.mp4' },
    { title: 'ВОРОНЕЖ', subtitle: 'Воронеж днём', img: 'photo/p3.png', vid: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerBlazes.mp4' },
    { title: 'ЗЕЛЕНОГРАД', subtitle: 'Дневной Зеленоград', img: 'photo/p4.png', vid: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerEscapes.mp4' },
  ];

  const extraCities = [
    { title: 'МУРМАНСК', subtitle: 'Ночной Мурманск', img: 'photo/p5.jpg', vid: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/ForBiggerJoyrides.mp4' },
    { title: 'КАЗАНЬ', subtitle: 'Казань вечером', img: 'photo/p6.jpg', vid: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/Google_Chromebook_Commercial.mp4' },
    { title: 'СОЧИ', subtitle: 'Сочи днём', img: 'photo/p7.jpg', vid: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/Google_IndiaMade.mp4' }
  ];

  const allCities = [...initialCities, ...extraCities];

  const initialCards = container.querySelectorAll('.city-card');
  initialCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      const data = initialCities[index];
      if (data && video) {
        errorState.style.display = 'none';
        video.style.display = 'block';
        video.poster = data.img;
        video.src = data.vid;
        video.load();
        video.play().catch(() => {});
      }
    });
  });

  // Поиск
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = new FormData(form).get('searchQuery').trim().toLowerCase();

    container.querySelectorAll('.city-card').forEach(el => el.remove());
    moreSection.style.display = 'none';

    if (!query) {
      initialCities.forEach(createCard);
      errorState.style.display = 'none';
      video.style.display = 'block';
      moreSection.style.display = 'flex';
      return;
    }

    const filtered = allCities.filter(c => c.title.toLowerCase().includes(query) || c.subtitle.toLowerCase().includes(query));

    if (filtered.length === 0) {
      errorState.style.display = 'flex';  
      video.style.display = 'none';       
    } else {
      errorState.style.display = 'none';
      video.style.display = 'block';
      filtered.forEach(createCard);
    }
  });

  if (moreBtn) {
    moreBtn.addEventListener('click', () => {
      extraCities.forEach(createCard);
      moreSection.style.display = 'none'; 
    });
  }

  // Функция создания карточки
  function createCard(data) {
    const card = document.createElement('div');
    card.className = 'city-card';
    card.innerHTML = `
      <div class="city-card__info">
        <h2 class="city-card__title">${data.title}</h2>
        <p class="city-card__subtitle">${data.subtitle}</p>
      </div>
      <img class="city-card__image" src="${data.img}" alt="${data.title}">
    `;
    
    card.addEventListener('click', () => {
      if (video) {
        errorState.style.display = 'none';
        video.style.display = 'block';
        video.poster = data.img;
        video.src = data.vid;
        video.load();
        video.play().catch(() => {});
      }
    });
    
    container.insertBefore(card, moreSection);
  }
});