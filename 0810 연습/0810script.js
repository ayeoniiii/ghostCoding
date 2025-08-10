// script.js 파일의 전체 내용

const menuItems = [
    { name: "☕ 아메리카노", category: "커피", price: 4500, description: "신선한 원두로 내린 아메리카노", image: "https://unsplash.com/ko/%EC%82%AC%EC%A7%84/%EC%BB%A4%ED%94%BC-%EC%9B%90%EB%91%90-%EB%8D%94%EB%AF%B8-%EC%9C%84%EC%97%90-%EC%95%89%EC%95%84%EC%9E%88%EB%8A%94-%EC%BB%A4%ED%94%BC-%ED%95%9C-%EC%9E%94-8blVdQB0hoI" },
    { name: "☕ 카페 라떼", category: "커피", price: 5000, description: "부드러운 우유와 에스프레소의 조화", image: "https://via.placeholder.com/150/b76e79/ffffff?text=Cafe+Latte" },
    { name: "☕ 바닐라 라떼", category: "커피", price: 5500, description: "달콤한 바닐라 향이 느껴지는 라떼", image: "https://via.placeholder.com/150/8b5e3c/ffffff?text=Vanilla+Latte" },
    { name: "🍹 자몽 에이드", category: "에이드", price: 6000, description: "상큼한 자몽이 들어간 시원한 에이드", image: "https://via.placeholder.com/150/ffa07a/ffffff?text=Grapefruit+Ade" },
    { name: "🍹 청포도 에이드", category: "에이드", price: 6000, description: "톡 쏘는 청포도 맛이 일품인 에이드", image: "https://via.placeholder.com/150/9acd32/ffffff?text=Green+Grape+Ade" },
    { name: "🥤 딸기 스무디", category: "스무디", price: 6500, description: "딸기 본연의 맛을 살린 달콤한 스무디", image: "https://via.placeholder.com/150/ff6347/ffffff?text=Strawberry+Smoothie" },
    { name: "🥤 망고 스무디", category: "스무디", price: 6500, description: "열대과일 망고의 진한 풍미를 느낄 수 있는 스무디", image: "https://via.placeholder.com/150/ff8c00/ffffff?text=Mango+Smoothie" }
];

const menuContainer = document.querySelector('.menu-container');
const modalContainer = document.getElementById('modal-container');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalPrice = document.getElementById('modal-price');
const orderBtn = document.querySelector('.order-btn');
const closeBtn = document.querySelector('.close-btn');
const totalPriceElement = document.getElementById('total-price');
const checkoutBtn = document.querySelector('.checkout-btn');
const favoritesList = document.getElementById('favorites-list');

let cartPrice = 0;
let currentItem = null;
let favorites = [];

// 메뉴 아이템 생성 및 이벤트 리스너 추가
menuItems.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('menu-item');
    itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.price}원</p>
        <button class="like-btn"><i class="fas fa-heart"></i></button>
    `;

    const likeButton = itemElement.querySelector('.like-btn');
    likeButton.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleFavorite(item);
        likeButton.classList.toggle('liked', favorites.some(fav => fav.name === item.name));
    });

    itemElement.addEventListener('click', () => {
        openModal(item);
    });

    menuContainer.appendChild(itemElement);
    if (favorites.some(fav => fav.name === item.name)) {
        likeButton.classList.add('liked');
    }
});

// 즐겨찾기 토글 기능
function toggleFavorite(item) {
    const index = favorites.findIndex(fav => fav.name === item.name);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(item);
    }
    updateFavoritesList();
}

// 즐겨찾기 목록 업데이트
function updateFavoritesList() {
    favoritesList.innerHTML = '';
    favorites.forEach(fav => {
        const li = document.createElement('li');
        li.textContent = fav.name;
        favoritesList.appendChild(li);
    });
}

// 모달(팝업) 열기
function openModal(item) {
    currentItem = item;
    modalTitle.textContent = item.name;
    modalDescription.textContent = item.description;
    modalPrice.textContent = `${item.price}원`;
    modalContainer.style.display = 'flex';
}

// 모달 닫기
closeBtn.addEventListener('click', () => {
    modalContainer.style.display = 'none';
});

// 장바구니 담기
orderBtn.addEventListener('click', () => {
    if (currentItem) {
        cartPrice += currentItem.price;
        totalPriceElement.textContent = cartPrice;
        alert(`${currentItem.name}이(가) 장바구니에 담겼습니다.`);
        modalContainer.style.display = 'none';
    }
});

// 결제하기 버튼
checkoutBtn.addEventListener('click', () => {
    if (cartPrice > 0) {
        alert(`총 ${cartPrice}원을 결제합니다. 맛있게 드세요!`);
        cartPrice = 0;
        totalPriceElement.textContent = cartPrice;
    } else {
        alert('장바구니가 비어있습니다.');
    }
});

// 모달 외부 클릭 시 닫기
window.addEventListener('click', (event) => {
    if (event.target === modalContainer) {
        modalContainer.style.display = 'none';
    }
});