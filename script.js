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

    // ĐIỂM KÍCH HOẠT:
    // Trên điện thoại thì kích hoạt sớm hơn một chút để dễ thấy
    const triggerPoint = windowHeight * 0.9; // 90% màn hình là bắt đầu hiện

    // KHOẢNG CÁCH KÉO:
    // Thay vì cố định 400px, ta để nó bằng 60% chiều cao màn hình.
    // Ví dụ: Laptop màn cao 800px -> kéo 480px là hiện hết.
    // Điện thoại màn cao 600px -> kéo 360px là hiện hết.
    const fadeDistance = windowHeight * 0.6; 

    let progress = (triggerPoint - rect.top) / fadeDistance;

    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;

    // Áp dụng CSS
    letter.style.opacity = progress;
    
    // Hiệu ứng di chuyển
    const moveY = 100 - (progress * 100);
    const scale = 0.9 + (0.1 * progress);
    
    letter.style.transform = `translateY(${moveY}px) scale(${scale})`;
});

// Gọi 1 lần để cập nhật ngay khi tải trang
window.dispatchEvent(new Event('scroll'));