/* --- CẤU HÌNH NGÀY YÊU NHAU --- */
const yourDate = new Date(2023, 1, 14, 0, 0, 0);

/* --- LOGIC ĐỒNG HỒ (Giữ nguyên) --- */
function updateTimer() {
    const now = new Date();
    const diff = now - yourDate;
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML = 
        `<span class="highlight">${years}</span> Năm 
         <span class="highlight">${days}</span> Ngày 
         <span class="highlight">${hours}</span> Giờ 
         <span class="highlight">${minutes}</span> Phút 
         <span class="highlight">${seconds}</span> Giây`;
}
setInterval(updateTimer, 1000);

/* --- MƯA TIM (Giữ nguyên) --- */
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";
    const size = Math.random() * 15 + 10 + "px"; 
    heart.style.width = size;
    heart.style.height = size;
    const colors = ["#ff6b81", "#ff4757", "#ff7f50", "#fab1a0", "#e84393"];
    heart.style.background = colors[Math.floor(Math.random() * colors.length)];
    document.body.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 5000);
}
setInterval(createHeart, 100);

/* --- LOGIC CUỘN RESPONSIVE --- */
window.addEventListener('scroll', () => {
    const letter = document.querySelector('.letter-container');
    const rect = letter.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // 1. TÍNH TOÁN HIỆN KHUNG (CONTAINER)
    const triggerPoint = windowHeight * 0.9; 
    const fadeDistance = windowHeight * 0.6;
    
    let containerProgress = (triggerPoint - rect.top) / fadeDistance;

    // Giới hạn trong khoảng 0 đến 1
    if (containerProgress < 0) containerProgress = 0;
    if (containerProgress > 1) containerProgress = 1;

    // Áp dụng cho KHUNG BAO NGOÀI
    letter.style.opacity = containerProgress;
    const moveY = 100 - (containerProgress * 100);
    const scale = 0.9 + (0.1 * containerProgress);
    letter.style.transform = `translateY(${moveY}px) scale(${scale})`;

    // 2. TÍNH TOÁN HIỆU ỨNG CHO TỪNG DÒNG CHỮ (CHILDREN)
    // Lấy tất cả các thẻ: Tiêu đề (h2), Đoạn văn (p), Chữ ký (.signature)
    const textElements = letter.querySelectorAll('h2, p, .signature');

    textElements.forEach((el, index) => {
        // TẠO ĐỘ TRỄ (STAGGER EFFECT)
        // Mỗi phần tử sẽ bắt đầu hiện trễ hơn phần tử trước nó một chút
        // index * 0.15 nghĩa là: 
        // - Dòng 1 (index 0): Hiện ngay khi khung hiện.
        // - Dòng 2 (index 1): Hiện trễ hơn 15%.
        // - Dòng 3 (index 2): Hiện trễ hơn 30%...
        
        let elementProgress = (containerProgress - (index * 0.15)) * 2; 
        // Nhân 2 để tốc độ hiện của chữ nhanh hơn tốc độ hiện của khung (cho kịp hiển thị)

        // Giới hạn progress của chữ
        if (elementProgress < 0) elementProgress = 0;
        if (elementProgress > 1) elementProgress = 1;

        // Áp dụng CSS cho từng dòng
        el.style.opacity = elementProgress;
        
        // Hiệu ứng chữ trồi lên: Từ 30px về 0px
        const textMoveY = 30 - (elementProgress * 30);
        
        // Thêm scale nhẹ cho chữ để cảm giác "nảy" ra
        // (Không bắt buộc, nhưng thêm vào sẽ sinh động hơn)
        const textScale = 0.8 + (0.2 * elementProgress); 

        el.style.transform = `translateY(${textMoveY}px) scale(${textScale})`;
    });
});

// Gọi ngay lần đầu
window.dispatchEvent(new Event('scroll'));