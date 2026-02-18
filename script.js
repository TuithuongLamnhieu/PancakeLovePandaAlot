const totalTime = 10000;
const intervalTime = 100; // Cập nhật mỗi 0.1s (Khớp với transition CSS)
const steps = totalTime / intervalTime; 

let currentStep = 0;
const overlay = document.getElementById('intro-overlay');
const progressBar = document.getElementById('progress-bar');
const pandaRunner = document.getElementById('panda-runner');
const loadingText = document.getElementById('loading-text');

// --- HÀM TẠO TIM NỀN INTRO (DÀY HƠN & TỐI ƯU) ---
function createIntroHeart() {
    const heart = document.createElement("div");
    heart.classList.add("intro-heart");
    heart.innerHTML = ["❤", "💖", "✨", "💕"][Math.floor(Math.random() * 4)]; // Thêm icon lấp lánh
    
    // Vị trí ngẫu nhiên chiều ngang
    heart.style.left = Math.random() * 100 + "%"; 
    
    // Random kích thước nhỏ to khác nhau để tạo chiều sâu
    const size = Math.random() * 40 + 35; 
    heart.style.fontSize = size + "px";
    
    // Random thời gian bay (nhanh/chậm)
    heart.style.animationDuration = (Math.random() * 2 + 2) + "s"; // 2s - 4s
    
    document.querySelector('.intro-hearts-container').appendChild(heart);

    // Xóa nhanh hơn (4s) để tránh lag máy khi số lượng tim nhiều
    setTimeout(() => { heart.remove(); }, 4000);
}

// TẠO TIM DÀY ĐẶC HƠN: Cứ 150ms tạo 1 tim (Thay vì 400ms như trước)
const introHeartInterval = setInterval(createIntroHeart, 150);


// --- MAIN LOADING LOOP ---
const loadingInterval = setInterval(() => {
    currentStep++;
    const percentage = Math.round((currentStep / steps) * 100);
    
    // Cập nhật CSS
    progressBar.style.width = percentage + '%';
    pandaRunner.style.left = percentage + '%';
    
    // Đổi chữ
    if(percentage < 30) { loadingText.innerText = `Đang gói ghém tình yêu... ${percentage}%`; } 
    else if (percentage < 70) { loadingText.innerText = `Đang vận chuyển nỗi nhớ... ${percentage}%`; } 
    else { loadingText.innerText = `Sắp đến nơi rồi nè... ${percentage}%`; }

    // KHI ĐẾN 100%
    if (currentStep >= steps) {
        clearInterval(loadingInterval);
        clearInterval(introHeartInterval); 
        
        // Đặt cứng 100%
        progressBar.style.width = '100%';
        pandaRunner.style.left = '100%';
        pandaRunner.style.animation = 'none'; // Dừng chạy
        
        loadingText.innerHTML = "Đã đến nơi! Bbi chờ xíu mở quà nha... <br> ❤️❤️❤️";
        
        // DELAY 3 GIÂY
        setTimeout(() => {
            overlay.style.opacity = '0';
            document.body.classList.remove('loading-mode');
            
            // Xóa DOM overlay sau khi fade out xong để nhẹ web
            setTimeout(() => { 
                overlay.style.display = 'none';
                // Xóa luôn html bên trong intro để giải phóng bộ nhớ triệt để
                overlay.innerHTML = ''; 
            }, 1000);
        }, 3000);
    }
}, intervalTime);

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
let isTicking = false; // Cờ kiểm tra trạng thái vẽ

function onScroll() {
    const letter = document.querySelector('.letter-container');
    
    // Nếu chưa tìm thấy thư (do đang loading) thì bỏ qua
    if (!letter) return; 

    const rect = letter.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Tính toán Progress
    const triggerPoint = windowHeight * 0.85; // Hiện sớm hơn chút (85%) để đỡ phải kéo sâu
    const fadeDistance = windowHeight * 0.5;
    
    let containerProgress = (triggerPoint - rect.top) / fadeDistance;

    // Clamp giá trị từ 0 đến 1
    if (containerProgress < 0) containerProgress = 0;
    if (containerProgress > 1) containerProgress = 1;

    // --- CẬP NHẬT GIAO DIỆN (Sử dụng requestAnimationFrame tự động tối ưu) ---
    
    // 1. Khung thư
    letter.style.opacity = containerProgress;
    const moveY = 100 - (containerProgress * 100);
    const scale = 0.9 + (0.1 * containerProgress);
    // Dùng translate3d để ép trình duyệt dùng GPU
    letter.style.transform = `translate3d(0, ${moveY}px, 0) scale(${scale})`;

    // 2. Nội dung chữ
    const textElements = letter.querySelectorAll('h2, p, .signature');
    textElements.forEach((el, index) => {
        // Tính độ trễ cho từng dòng
        let elementProgress = (containerProgress - (index * 0.1)) * 2.5; 

        if (elementProgress < 0) elementProgress = 0;
        if (elementProgress > 1) elementProgress = 1;

        el.style.opacity = elementProgress;
        
        const textMoveY = 30 - (elementProgress * 30);
        const textScale = 0.9 + (0.1 * elementProgress); 
        
        // Dùng translate3d thay vì translateY
        el.style.transform = `translate3d(0, ${textMoveY}px, 0) scale(${textScale})`;
    });

    isTicking = false; // Đã vẽ xong, mở khóa cho lần cuộn tiếp theo
}

// SỰ KIỆN CUỘN ĐÃ ĐƯỢC TỐI ƯU
window.addEventListener('scroll', () => {
    if (!isTicking) {
        window.requestAnimationFrame(onScroll);
        isTicking = true;
    }
});

// Gọi 1 lần ngay khi tải xong để set vị trí ban đầu
window.addEventListener('load', () => {
    onScroll();
});