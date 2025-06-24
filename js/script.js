const images = [
  { src: 'Images/food1.jpg', title: 'Home made pizza', price: '₹190', rating: '4.7', duration: '50-79 min', discount: '50%' },
  { src: 'Images/food2.jpg', title: 'Home made pizza', price: '₹123', rating: '4.7', duration: '50-79 min', discount: '' },
  { src: 'Images/food3.jpg', title: 'Home made pizza', price: '₹190', rating: '4.7', duration: '50-79 min', discount: '20%' },
  { src: 'Images/food4.jpg', title: 'Home made pizza', price: '₹190', rating: '4.7', duration: '50-79 min', discount: '' },
  { src: 'Images/food5.jpg', title: 'Home made pizza', price: '₹190', rating: '4.7', duration: '50-79 min', discount: '' },
  { src: 'Images/food6.jpg', title: 'Home made pizza', price: '₹190', rating: '4.7', duration: '50-79 min', discount: '50%' },
  { src: 'Images/food7.jpg', title: 'Home made pizza', price: '₹190', rating: '4.7', duration: '50-79 min', discount: '' },
  { src: 'Images/food8.jpg', title: 'Home made pizza', price: '₹190', rating: '4.7', duration: '50-79 min', discount: '20%' },
  { src: 'Images/food1.jpg', title: 'Home made pizza', price: '₹190', rating: '4.7', duration: '50-79 min', discount: '50%' },
  { src: 'Images/food2.jpg', title: 'Home made pizza', price: '₹190', rating: '4.7', duration: '50-79 min', discount: '50%' },
  { src: 'Images/food3.jpg', title: 'Home made pizza', price: '₹190', rating: '4.7', duration: '50-79 min', discount: '20%' },
  { src: 'Images/food4.jpg', title: 'Home made pizza', price: '₹190', rating: '4.7', duration: '50-79 min', discount: '' }
];

const container = document.getElementById('card-container');
const track = document.getElementById('carousel-track');
const visibleCards = 3;
let currentIndex = 0;

// Render cards in Home Kitchen section
images.forEach(item => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="card-img-wrapper">
      ${item.discount ? `<span class="discount-badge">${item.discount}</span>` : ''}
      <img src="${item.src}" alt="${item.title}" class="card-img" />
    </div>
    <div class="card-info">
      <div class="card-title-row">
        <h3 class="card-title">${item.title}</h3>
        <span class="card-price">${item.price}</span>
      </div>
      <div class="card-meta">
        <span class="meta-tag rating"><img class="star" src="Images/star.png" alt="star" /> ${item.rating}</span>
        <span class="meta-tag duration">${item.duration}</span>
        <span class="meta-tag add"><img src="Images/Card.png" alt="add" /></span>
      </div>
    </div>
  `;
  card.addEventListener('click', () => openModal(item));
  container.appendChild(card);
});

// Render cards in the carousel
function renderCards() {
  track.innerHTML = '';
  images.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'food-card';
    card.dataset.index = i;
    card.innerHTML = `
      <div class="card-image-wrapper">
        <img src="${item.src}" class="card-image" alt="${item.title}">
        ${item.discount ? `<div class="badge-discount">${item.discount}</div>` : ''}
      </div>
      <div class="card-body">
        <div class="card-header">
          <span>${item.title}</span>
          <span class="item-price">${item.price}</span>
        </div>
        <div class="card-tags">
          <div class="tag"><img src="images/star.png" alt="star" width="14"> ${item.rating}</div>
          <div class="tag">${item.duration}</div>
          <div class="qty-control">
            <button class="qty-btn decrement">-</button>
            <span class="qty-value">0</span>
            <button class="qty-btn increment">+</button>
          </div>
        </div>
      </div>
    `;
    card.addEventListener('click', () => openModal(item));
    track.appendChild(card);
  });
  addQtyHandlers();
  updateSlider();
}

// Slider movement
function updateSlider() {
  const offset = currentIndex * 330;
  track.style.transform = `translateX(-${offset}px)`;
  const cards = document.querySelectorAll('.food-card');
  cards.forEach(card => card.classList.remove('focused'));
  const center = currentIndex + 1;
  if (cards[center]) {
    cards[center].classList.add('focused');
  }
}

// Quantity increment/decrement
function addQtyHandlers() {
  document.querySelectorAll('.food-card').forEach(card => {
    const increment = card.querySelector('.increment');
    const decrement = card.querySelector('.decrement');
    const valueSpan = card.querySelector('.qty-value');

    increment.addEventListener('click', (e) => {
      e.stopPropagation(); // prevents modal from opening
      let val = parseInt(valueSpan.innerText);
      valueSpan.innerText = val + 1;
    });

    decrement.addEventListener('click', (e) => {
      e.stopPropagation(); // prevents modal from opening
      let val = parseInt(valueSpan.innerText);
      if (val > 0) valueSpan.innerText = val - 1;
    });
  });
}


// Carousel controls
document.getElementById('carousel-left').addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});

document.getElementById('carousel-right').addEventListener('click', () => {
  if (currentIndex + visibleCards < images.length) {
    currentIndex++;
    updateSlider();
  }
});

// Auto slide every 3 seconds
setInterval(() => {
  currentIndex = (currentIndex + 1) % (images.length - visibleCards);
  updateSlider();
}, 3000);

// Modal logic
const modal = document.getElementById('food-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const modalRating = document.getElementById('modal-rating');
const modalDuration = document.getElementById('modal-duration');
const modalClose = document.getElementById('modal-close');

function openModal(item) {
  modalImage.src = item.src;
  modalTitle.textContent = item.title;
  modal.classList.remove('hidden');
}

modalClose.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Initial render
renderCards();
// Request Modal logic
const requestBtn = document.querySelector('.request-btn');
const requestModal = document.getElementById('request-modal');
const requestClose = document.getElementById('request-close');
const cancelRequest = document.getElementById('cancel-request');
const submitRequest = document.getElementById('submit-request');

function toggleRequestModal(show) {
  requestModal.classList.toggle('hidden', !show);
  document.body.style.overflow = show ? 'hidden' : 'auto';
}

requestBtn.addEventListener('click', () => toggleRequestModal(true));
requestClose.addEventListener('click', () => toggleRequestModal(false));
cancelRequest.addEventListener('click', () => toggleRequestModal(false));
submitRequest.addEventListener('click', () => toggleRequestModal(false));

// Video toggle play/pause
const video = document.getElementById('promo-video');
const playIcon = document.getElementById('play-icon');

video.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    playIcon.style.display = 'none';
  } else {
    video.pause();
    playIcon.style.display = 'block';
  }
});

// Hover effect for arrows and middle card
document.getElementById('carousel-right').addEventListener('mouseover', () => {
  document.getElementById('carousel-right').style.backgroundColor = '#fff';
});
document.getElementById('carousel-right').addEventListener('mouseout', () => {
  document.getElementById('carousel-right').style.backgroundColor = '';
});