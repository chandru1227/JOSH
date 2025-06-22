const images = [
  { src:'Images/food1.jpg', title:'Home made pizza', price:'₹190', rating:'4.7', duration:'50-79 min', discount:'50%' },
  { src:'Images/food2.jpg', title:'Home made pizza', price:'₹123', rating:'4.7', duration:'50-79 min', discount:'' },
  { src:'Images/food3.jpg', title:'Home made pizza', price:'₹190', rating:'4.7', duration:'50-79 min', discount:'20%' },
  { src:'Images/food4.jpg', title:'Home made pizza', price:'₹190', rating:'4.7', duration:'50-79 min', discount:'' },
  { src:'Images/food5.jpg', title:'Home made pizza', price:'₹190', rating:'4.7', duration:'50-79 min', discount:'' },
  { src:'Images/food6.jpg', title:'Home made pizza', price:'₹190', rating:'4.7', duration:'50-79 min', discount:'50%' },
  { src:'Images/food7.jpg', title:'Home made pizza', price:'₹190', rating:'4.7', duration:'50-79 min', discount:'' },
  { src:'Images/food8.jpg', title:'Home made pizza', price:'₹190', rating:'4.7', duration:'50-79 min', discount:'20%' },
  { src:'Images/food1.jpg', title:'Home made pizza', price:'₹190', rating:'4.7', duration:'50-79 min', discount:'50%' },
  { src:'Images/food2.jpg', title:'Home made pizza', price:'₹190', rating:'4.7', duration:'50-79 min', discount:'50%' },
  { src:'Images/food3.jpg', title:'Home made pizza', price:'₹190', rating:'4.7', duration:'50-79 min', discount:'20%' },
  { src:'Images/food4.jpg', title:'Home made pizza', price:'₹190', rating:'4.7', duration:'50-79 min', discount:'' }
];
const container = document.getElementById('card-container');

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

  container.appendChild(card);
});
const track = document.getElementById('carousel-track');
  let currentIndex = 0;
  const visibleCards = 3;

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
            <div class="tag">
              <img src="images/star.png" alt="star" width="14">
              ${item.rating}
            </div>
            <div class="tag">${item.duration}</div>
            <div class="qty-control">
              <button class="qty-btn decrement">-</button>
              <span class="qty-value">1</span>
              <button class="qty-btn increment">+</button>
            </div>
          </div>
        </div>
      `;
      track.appendChild(card);
    });

    // addQtyHandlers();
    // updateSlider();
  }

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

  function addQtyHandlers() {
    document.querySelectorAll('.food-card').forEach(card => {
      const increment = card.querySelector('.increment');
      const decrement = card.querySelector('.decrement');
      const valueSpan = card.querySelector('.qty-value');

      increment.onclick = () => {
        let val = parseInt(valueSpan.innerText);
        valueSpan.innerText = val + 1;
      };

      decrement.onclick = () => {
        let val = parseInt(valueSpan.innerText);
        if (val > 1) valueSpan.innerText = val - 1;
      };
    });
  }

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

  // Auto Slide
  // setInterval(() => {
  //   currentIndex = (currentIndex + 1) % (images.length - 2);
  //   updateSlider();
  // }, 3000);

  renderCards();