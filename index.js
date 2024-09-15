const { claimPoints } = require('./services/claimService');

let nextRunTime = Date.now() + 12 * 60 * 60 * 1000; // Waktu berikutnya dalam 12 jam dari sekarang

// Fungsi utama yang akan dijalankan setiap 12 jam sekali
async function main() {
    console.log('Memulai proses klaim poin...');
    await claimPoints();
    nextRunTime = Date.now() + 12 * 60 * 60 * 1000; // Update waktu berikutnya
    startCountdown(); // Mulai hitungan mundur
}

// Fungsi untuk menampilkan hitungan mundur di satu baris
function startCountdown() {
    const interval = setInterval(() => {
        const now = Date.now();
        const timeLeft = nextRunTime - now;

        if (timeLeft <= 0) {
            clearInterval(interval);
            main(); // Jalankan proses klaim poin berikutnya
            return;
        }

        // Format waktu
        const timeString = formatTime(timeLeft);

        // Tampilkan waktu berikutnya di satu baris dengan menggunakan \r untuk mengganti baris
        process.stdout.write(`Waktu berikutnya: ${timeString}\r`);
    }, 1000); // Update setiap detik
}

// Format waktu dalam jam, menit, dan detik
function formatTime(milliseconds) {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    return `${hours} jam ${minutes} menit ${seconds} detik`;
}

main(); // Jalankan langsung saat skrip dijalankan
