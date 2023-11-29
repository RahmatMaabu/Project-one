// js code navigation Bar
const menuNav = document.querySelector(".menu-nav");

const menuToggle = () => menuNav.classList.toggle("activemenudropdown");
const removeMenu = () => menuNav.classList.remove("activemenudropdown");

// js code donate button
const bodyEelement = document.querySelector("body");
const humbergerMenu = document.querySelector(".humberger-menu");
const backButtons = document.querySelector(".back-button");
const heroSection = document.querySelector(".hero");
const aboutSection = document.querySelector("#about");
const aboutpalestinaSection = document.querySelector("#about-palestina");
const donateSection = document.querySelector("#donasi");
const inputSection = document.querySelector("#input-donasi");
const mapsSection = document.querySelector("#maps");
const contactSection = document.querySelector("#contact");
const footerSection = document.querySelector("#footer");
const struksection = document.querySelector(".code-pembayaran");

backButtons.style.display = "none";
inputSection.style.display = "none";
struksection.style.display = "none";

const donateButton = () => {
  bodyEelement.style.background = "whitesmoke";
  humbergerMenu.style.display = "none";
  backButtons.style.display = "flex";
  heroSection.style.display = "none";
  aboutSection.style.display = "none";
  aboutpalestinaSection.style.display = "none";
  donateSection.style.display = "none";
  inputSection.style.display = "block";
  mapsSection.style.display = "none";
  contactSection.style.display = "none";
  footerSection.style.display = "none";
  menuNav.style.display = "none";
};
// js back button
const backButton = () => location.reload();

// js pay metode
const payMetodes = document.querySelector(".pay-metode");
const payButtons = document.querySelectorAll(".pay-one, .pay-two, .pay-tree, .pay-four, .pay-five, .pay-six, .pay-seven, .pay-eight"
);

const pembayaranInput = document.getElementById("pembayaran");
const peringatanDiv = document.getElementById("peringatan");

const payMetode = () => payMetodes.classList.add("perlihatkan");
const removePayMetodeClass = () => payMetodes.classList.remove("perlihatkan");

payButtons.forEach((button) =>
  button.addEventListener("click", removePayMetodeClass)
);

const updatePaymentInfo = (event) => {
  const clickedButton = event.target;
  const buttonText = clickedButton.textContent;

  // Update input value
  pembayaranInput.value = buttonText;

  // Menampilkan/menyembunyikan peringatan berdasarkan tombol yang diklik
  if (
    [
      "Pay One",
      "Pay Two",
      "Pay Tree",
      "Pay Four",
      "Pay Five",
      "Pay Six",
      "Pay Seven",
      "Pay Eight",
    ].includes(buttonText)
  ) {
    peringatanDiv.classList.add("hidden");
  } else {
    peringatanDiv.classList.remove("hidden");
  }
};

// Attach click event listeners to payment buttons
payButtons.forEach((button) =>
  button.addEventListener("click", updatePaymentInfo)
);

// Show/hide warning based on input value
pembayaranInput.addEventListener("input", function () {
  const inputValue = pembayaranInput.value;
  if (
    inputValue === "Pay One" ||
    inputValue === "Pay Two" ||
    inputValue === "Pay Tree" ||
    inputValue === "Pay Four" ||
    inputValue === "Pay Five" ||
    inputValue === "Pay Six" ||
    inputValue === "Pay Seven" ||
    inputValue === "Pay Eight"
  ) {
    peringatanDiv.classList.add("hidden");
  } else {
    peringatanDiv.classList.remove("hidden");
  }
});

const inputJumlahDonate = document.querySelector("#input-jumlah-donasi");

inputJumlahDonate.addEventListener("click", function () {
  const inputRp = document.querySelector("#input-jumlah-donasi");
  inputRp.value = "Rp. ";
});

inputJumlahDonate.addEventListener("input", function () {
  let inputRp = document.querySelector("#input-jumlah-donasi");

  // Hapus karakter selain angka
  let cleanValue = inputRp.value.replace(/[^0-9]/g, "");

  // Konversi ke angka
  let numericValue = parseInt(cleanValue);

  // Format angka dengan pemisahan ribuan
  let formattedValue = numericValue.toLocaleString("id-ID");

  // Tambahkan "Rp. " di depan nilai
  inputRp.value = "Rp. " + formattedValue;
});

// Cegah penghapusan "Rp. " ketika pengguna menggunakan tombol delete atau backspace
inputJumlahDonate.addEventListener("keydown", function (event) {
  let inputRp = document.querySelector("#input-jumlah-donasi");

  if (event.key === "Backspace" || event.key === "Delete") {
    // Jika panjang teks kurang dari panjang "Rp. ", hentikan penghapusan
    if (inputRp.value.length <= "Rp. ".length) {
      event.preventDefault();
    }
  }
});

let totalDonasiElement = document.querySelector(".total-donasi");

// Arrow function untuk mengirim donasi
const kirimDonasi = () => {
  struksection.style.display = "block";
  inputSection.style.display = "none";

  // Mendapatkan nilai input yang baru
  var inputJumlahDonate = document.querySelector("#input-jumlah-donasi").value;

  // Mendapatkan nilai input yang sudah disimpan sebelumnya
  var storedValue = localStorage.getItem("valueInput");

  // Memeriksa apakah nilai input sebelumnya ada atau tidak
  if (storedValue) {
    // Jika ada, gabungkan nilai input baru dengan nilai input yang sudah ada
    var combinedValue = storedValue + "," + inputJumlahDonate;
    localStorage.setItem("valueInput", combinedValue);
  } else {
    // Jika belum ada nilai input sebelumnya, simpan nilai input baru
    localStorage.setItem("valueInput", inputJumlahDonate);
  }
};

// Arrow function untuk menghitung dan memperbarui total jumlah donasi
const updateTotalDonation = () => {
  // Mendapatkan nilai input yang sudah disimpan sebelumnya
  var storedValues = localStorage.getItem("valueInput");

  // Memeriksa apakah ada nilai input yang disimpan
  if (storedValues) {
    // Menghitung total donasi dari nilai-nilai yang disimpan
    var totalDonation = storedValues.split(",").reduce((total, value) => {
      // Konversi nilai menjadi bilangan bulat sebelum ditambahkan
      return total + parseInt(value);
    }, 0);

    // Memperbarui innerHTML dari totalDonasiElement dengan total donasi yang dihitung
    totalDonasiElement.innerHTML = storedValues;
  } else {
    // Jika tidak ada nilai input yang disimpan, atur totalDonasiElement menjadi 0
    totalDonasiElement.innerHTML = "0";
  }
};

// Memanggil fungsi untuk mengupdate total donasi saat halaman dimuat
updateTotalDonation();

const calculateTotalDonation = () => {
  const currentTotal = totalDonasiElement.innerHTML;

  if (currentTotal && currentTotal !== "0") {
    try {
      const sum = eval(currentTotal);
      totalDonasiElement.innerHTML = sum.toString();
    } catch (error) {
      console.error("Error in calculation:", error);
    }
  }
};

updateTotalDonation();
calculateTotalDonation();

const formatCurrency = (amount) => {
  // Menambahkan Rp di depan jumlah
  let formattedAmount = "Rp " + amount;

  // Menambahkan tanda titik sebagai pemisah ribuan
  formattedAmount = formattedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return formattedAmount;
};

const calculateTotal = () => {
  // Mendapatkan nilai innerHTML dari totalDonasiElement
  const currentValues = totalDonasiElement.innerHTML;

  // Memeriksa apakah ada nilai innerHTML yang ada
  if (currentValues) {
    // Membuat array dari angka yang ada di innerHTML
    const numbers = currentValues.split(",").map((value) => {
      // Menghapus karakter non-angka dan mengembalikan nilai angka
      return parseInt(value.replace(/\D/g, ""), 10);
    });

    // Menghitung total dari semua angka dalam array
    const result = numbers.reduce((total, value) => total + value, 0);

    // Memformat hasil perhitungan sebagai uang Indonesia
    const formattedResult = formatCurrency(result);

    // Memperbarui innerHTML dari totalDonasiElement dengan hasil perhitungan yang diformat
    totalDonasiElement.innerHTML = formattedResult;
  }
};

// Panggil fungsi calculateTotal setelah memanggil fungsi updateTotalDonation
updateTotalDonation();
calculateTotal();

// slide code
const sliderWrapper = document.getElementById("sliderWrapper");
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
let currentSlide = 0;
let autoSlideCount = 0;
const autoSlideLimit = 10; // Batas pergeseran otomatis

sliderWrapper.style.display = "flex";

const duplicateSlides = () => {
  const firstSlideClone = slides[0].cloneNode(true);
  sliderWrapper.appendChild(firstSlideClone);
};

const showSlides = () => {
  currentSlide = (currentSlide + 1) % (totalSlides + 1);
  autoSlideCount++;

  if (autoSlideCount <= autoSlideLimit) {
    sliderWrapper.style.transition = "transform 0.5s ease-in-out";
    sliderWrapper.style.transform = `translateX(-${
      currentSlide * (200 + 20)
    }px)`;
  } else {
    autoSlideCount = 0;
    sliderWrapper.style.transition = "none";
    currentSlide = 0;
    sliderWrapper.style.transform = `translateX(-${
      currentSlide * (200 + 20)
    }px)`;
    setTimeout(() => {
      sliderWrapper.style.transition = "transform 0.5s ease-in-out";
      sliderWrapper.style.transform = `translateX(-${
        currentSlide * (200 + 20)
      }px)`;
    }, 50);
  }
};

const nextSlide = () => {
  autoSlideCount = 0;
  currentSlide = (currentSlide + 1) % (totalSlides + 1);
  sliderWrapper.style.transition = "transform 0.5s ease-in-out";
  sliderWrapper.style.transform = `translateX(-${currentSlide * (200 + 20)}px)`;
};

const prevSlide = () => {
  autoSlideCount = 0;
  currentSlide = (currentSlide - 1 + totalSlides + 1) % (totalSlides + 1);
  sliderWrapper.style.transition = "transform 0.5s ease-in-out";
  sliderWrapper.style.transform = `translateX(-${currentSlide * (200 + 20)}px)`;
};

duplicateSlides();
setInterval(showSlides, 1000);

// code menu news
const disBlock1 = document.querySelector(".jenis-news.none-1");
const disBlock2 = document.querySelector(".jenis-news.none-2");
const disBlock3 = document.querySelector(".jenis-news.none-3");
const disBlock4 = document.querySelector(".jenis-news.none-4");

const menuNews = () => {
  disBlock1.classList.toggle("block-menu");
  disBlock2.classList.toggle("block-menu");
  disBlock3.classList.toggle("block-menu");
  disBlock4.classList.toggle("block-menu");
};

// history palestina code

const sectionNews = document.querySelector(".news");
const historyNews = document.querySelector(".history-news");
const aksiPalestina = document.querySelector(".carousel");
const galeryDonate = document.querySelector(".galery-donate");
const contentLainnya = document.querySelector(".lainnya");
const x = window.matchMedia("(min-width : 576px)");

function semuaNews() {
  disBlock1.classList.toggle("block-menu");
  disBlock2.classList.toggle("block-menu");
  disBlock3.classList.toggle("block-menu");
  disBlock4.classList.toggle("block-menu");
  sliderWrapper.style.display = "flex";
  historyNews.style.display = "none";
  galeryDonate.style.display = "none";
  contentLainnya.style.display = "none";
  sectionNews.style.height = "420px";
  aksiPalestina.style.display = "none";

  function updateNewsHeight() {
    const sectionNews = document.querySelector(".news");
    var screenWidth = window.innerWidth;

    if (screenWidth <= 567) {
      // Layar lebar (min-width: 1200px)
      sectionNews.style.height = "320px";
    } else if (screenWidth <= 768) {
      // Layar medium (min-width: 1000px)
      sectionNews.style.height = "400px";
    } else if (screenWidth <= 992) {
      // Layar lebih kecil dari 1000px
      // Di sini, Anda dapat menetapkan tinggi lain jika diperlukan
      sectionNews.style.height = "420px";
      historyNews.style.display = "flex";
    } else if (screenWidth <= 1200) {
      // Layar lebih kecil dari 1000px
      // Di sini, Anda dapat menetapkan tinggi lain jika diperlukan
      sectionNews.style.height = "420px";
    } else {
      sectionNews.style.height = "420px";
    }
  }

  // Panggil fungsi pertama kali saat halaman dimuat
  updateNewsHeight();

  // Tambahkan event listener untuk mengupdate tinggi saat ukuran layar berubah
  window.addEventListener("resize", updateNewsHeight);
}

function history() {
  disBlock1.classList.toggle("block-menu");
  disBlock2.classList.toggle("block-menu");
  disBlock3.classList.toggle("block-menu");
  disBlock4.classList.toggle("block-menu");
  sliderWrapper.style.display = "none";
  historyNews.style.display = "flex";
  aksiPalestina.style.display = "none";
  galeryDonate.style.display = "none";
  contentLainnya.style.display = "none";
  sectionNews.style.height = "800px";

  function updateNewsHeight() {
    const sectionNews = document.querySelector(".news");
    var screenWidth = window.innerWidth;

    if (screenWidth <= 576) {
      // Layar lebar (min-width: 1200px)
      sectionNews.style.height = "1850px";
    } else if (screenWidth <= 768) {
      // Layar medium (min-width: 1000px)
      sectionNews.style.height = "1150px";
    } else if (screenWidth <= 992) {
      // Layar lebih kecil dari 992px
      // Di sini, Anda dapat menetapkan tinggi lain jika diperlukan
      sectionNews.style.height = "1050px";
    } else if (screenWidth <= 1200) {
      // Layar lebih kecil dari 1200px
      // Di sini, Anda dapat menetapkan tinggi lain jika diperlukan
      sectionNews.style.height = "1000px";
    } else {
      sectionNews.style.height = "800px";
    }
  }

  // Panggil fungsi pertama kali saat halaman dimuat
  updateNewsHeight();

  // Tambahkan event listener untuk mengupdate tinggi saat ukuran layar berubah
  window.addEventListener("resize", updateNewsHeight);
}

function aksi() {
  disBlock1.classList.toggle("block-menu");
  disBlock2.classList.toggle("block-menu");
  disBlock3.classList.toggle("block-menu");
  disBlock4.classList.toggle("block-menu");
  sliderWrapper.style.display = "none";
  historyNews.style.display = "none";
  galeryDonate.style.display = "none";
  aksiPalestina.style.display = "flex";
  contentLainnya.style.display = "none";
  sectionNews.style.height = "800px";

  function updateNewsHeight() {
    const sectionNews = document.querySelector(".news");
    var screenWidth = window.innerWidth;

    if (screenWidth <= 567) {
      // Layar lebar (min-width: 1200px)
      sectionNews.style.height = "320px";
    } else if (screenWidth <= 767) {
      // Layar medium (min-width: 1000px)
      sectionNews.style.height = "480px";
    } else if (screenWidth <= 1000) {
      // Layar lebih kecil dari 1000px
      // Di sini, Anda dapat menetapkan tinggi lain jika diperlukan
      sectionNews.style.height = "800px";
    } else if (screenWidth <= 1200) {
      // Layar lebih kecil dari 1000px
      // Di sini, Anda dapat menetapkan tinggi lain jika diperlukan
      sectionNews.style.height = "800px";
    } else {
      sectionNews.style.height = "800px";
    }
  }

  // Panggil fungsi pertama kali saat halaman dimuat
  updateNewsHeight();

  // Tambahkan event listener untuk mengupdate tinggi saat ukuran layar berubah
  window.addEventListener("resize", updateNewsHeight);
}
function galery() {
  disBlock1.classList.toggle("block-menu");
  disBlock2.classList.toggle("block-menu");
  disBlock3.classList.toggle("block-menu");
  disBlock4.classList.toggle("block-menu");
  sliderWrapper.style.display = "none";
  historyNews.style.display = "none";
  aksiPalestina.style.display = "none";
  galeryDonate.style.display = "block";
  contentLainnya.style.display = "none";
  sectionNews.style.height = "800px";

  function updateNewsHeight() {
    const sectionNews = document.querySelector(".news");
    var screenWidth = window.innerWidth;

    if (screenWidth <= 567) {
      // Layar lebar (min-width: 1200px)
      sectionNews.style.height = "2100px";
    } else if (screenWidth <= 768) {
      // Layar medium (min-width: 1000px)
      sectionNews.style.height = "1000px";
    } else if (screenWidth <= 992) {
      // Layar lebih kecil dari 1000px
      // Di sini, Anda dapat menetapkan tinggi lain jika diperlukan
      sectionNews.style.height = "1000px";
    } else if (screenWidth <= 1200) {
      // Layar lebih kecil dari 1000px
      // Di sini, Anda dapat menetapkan tinggi lain jika diperlukan
      sectionNews.style.height = "800px";
    } else {
      sectionNews.style.height = "800px";
    }
  }

  // Panggil fungsi pertama kali saat halaman dimuat
  updateNewsHeight();

  // Tambahkan event listener untuk mengupdate tinggi saat ukuran layar berubah
  window.addEventListener("resize", updateNewsHeight);
}
function lainnya() {
  disBlock1.classList.toggle("block-menu");
  disBlock2.classList.toggle("block-menu");
  disBlock3.classList.toggle("block-menu");
  disBlock4.classList.toggle("block-menu");
  sliderWrapper.style.display = "none";
  historyNews.style.display = "none";
  aksiPalestina.style.display = "none";
  galeryDonate.style.display = "none";
  contentLainnya.style.display = "block";
  sectionNews.style.height = "400px";
}

const news1 = () =>
  (window.location.href =
    "https://ipol.id/2023/10/3-785-warga-palestina-tewas-dalam-serangan-israel-sejak-7-oktober/");
const news2 = () =>
  (window.location.href =
    "https://www.detik.com/hikmah/khazanah/d-6999207/31-masjid-di-gaza-hancur-total-digempur-israel-sejak-7-oktober");
const news3 = () =>
  (window.location.href =
    "https://www.cnbcindonesia.com/news/20231113122459-8-488571/korban-tewas-akibat-perang-israel-hamas-tembus-11800-jiwa");
const news4 = () =>
  (window.location.href =
    "https://www.cnnindonesia.com/internasional/20231113105252-122-1023416/foto-israel-hujani-warga-sipil-lebanon-dengan-fosfor-putih-terlarang");
const news5 = () =>
  (window.location.href =
    "https://www.cnbcindonesia.com/news/20231115065305-4-489069/waduh-menteri-israel-serukan-pembersihan-warga-dari-gaza");
const news6 = () =>
  (window.location.href =
    "https://www.cnbcindonesia.com/news/20231115122510-4-489194/situasi-terkini-gaza-israel-serbu-rumah-sakit-al-shifa");
const news7 = () =>
  (window.location.href =
    "https://www.cnbcindonesia.com/news/20231115155440-4-489304/gila-israel-serbu-rs-al-shifa-gaza-kepung-ugd-tank-tempur");
const news8 = () =>
  (window.location.href =
    "https://www.menpan.go.id/site/berita-terkini/dari-istana/indonesia-kecam-tindak-kekerasan-dan-serangan-di-palestina");
const news9 = () =>
  (window.location.href =
    "https://www.cnbcindonesia.com/news/20231115051304-4-489058/update-terkini-gaza-israel-kian-brutal-as-plintat-plintut");
const news10 = () =>
  (window.location.href =
    "https://m.lampost.co/berita-kabar-palestina-hari-ini-israel-serang-rumah-sakit-terbesar-di-gaza.html");
