const API_URL = 'http://127.0.0.1:8000/api';

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast show ${type}`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Format Rupiah
const formatRupiah = (angka) => {
    if (!angka) return '-';
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);
};

// Check Auth & Set User Data
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('auth_token');
    const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
    const userType = localStorage.getItem('user_type');

    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    // Set Header Info
    document.getElementById('userName').textContent = userData.nama_user || userData.nama_perusahaan || 'Pengguna';
    document.getElementById('userRole').textContent = userType === 'user' ? 'Panitia Lelang' : 'Vendor';

    // Only Panitia/User can create Pengadaan
    if (userType === 'user') {
        document.getElementById('btnOpenModal').style.display = 'inline-flex';
        fetchVendorList(token);
    }

    // Fetch Data
    fetchPengadaan(token);
});

// Logout
document.getElementById('btnLogout').addEventListener('click', async () => {
    const token = localStorage.getItem('auth_token');

    try {
        await fetch(API_URL + '/auth/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });
    } catch (e) {
        console.error(e);
    } finally {
        localStorage.clear();
        window.location.href = 'index.html';
    }
});

// Fetch Pengadaan
async function fetchPengadaan(token) {
    const tbody = document.getElementById('pengadaanTableBody');
    const userType = localStorage.getItem('user_type');
    const userData = JSON.parse(localStorage.getItem('user_data'));

    try {
        const response = await fetch(API_URL + '/pengadaan', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        const data = await response.json();

        if (response.ok) {
            if (data.length === 0) {
                tbody.innerHTML = `<tr><td colspan="7" style="text-align: center;" class="text-muted">Belum ada data pengadaan.</td></tr>`;
                return;
            }

            tbody.innerHTML = '';
            data.forEach((item, index) => {

                // Filter view based on role
                if (userType === 'penyedia' && item.id_penyedia !== userData.id_penyedia) return;

                // Get latest progress
                const latestProgress = item.progress && item.progress.length > 0
                    ? item.progress[item.progress.length - 1].persentase_progress
                    : '0%';

                let statusClass = 'status-draft';
                if (item.status_pengadaan === 'SELESAI') statusClass = 'status-selesai';
                if (item.status_pengadaan === 'PENAWARAN MASUK') statusClass = 'status-penawaran';

                // Construct money info
                let moneyHtml = `<div style="font-size:0.8rem; color:var(--text-muted);">Pagu: ${formatRupiah(item.pagu_anggaran)}</div>`;
                if (item.nilai_penawaran) moneyHtml += `<div style="font-size:0.8rem; color:#93C5FD;">Penawaran: ${formatRupiah(item.nilai_penawaran)}</div>`;
                if (item.nilai_kontrak) moneyHtml += `<div style="font-size:0.8rem; color:#6EE7B7; font-weight:bold;">Kontrak: ${formatRupiah(item.nilai_kontrak)}</div>`;

                // Logic for Action Button
                let actionHtml = '-';

                // 1. Vendor menginput penawaran saat status DRAFT
                if (userType === 'penyedia' && item.status_pengadaan === 'DRAFT') {
                    actionHtml = `<button class="btn btn-primary" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;" onclick="openPenawaranModal(${item.id_pengadaan})">Kirim Penawaran</button>`;
                }

                // 2. Panitia menginput kontrak saat status PENAWARAN MASUK
                if (userType === 'user' && item.status_pengadaan === 'PENAWARAN MASUK') {
                    actionHtml = `<button class="btn btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.8rem; color: #6EE7B7; border: 1px solid #6EE7B7;" onclick="openKontrakModal(${item.id_pengadaan})">Tetapkan Kontrak</button>`;
                }

                // 3. Unduh Surat PDF saat status SELESAI (semua role bisa)
                if (item.status_pengadaan === 'SELESAI') {
                    const dataEncoded = encodeURIComponent(JSON.stringify(item));
                    actionHtml = `<button class="btn" style="padding: 0.4rem 0.8rem; font-size: 0.8rem; background: linear-gradient(135deg, #7C3AED, #4F46E5); color: white;" onclick="generatePDF(${item.id_pengadaan})"><i class="fa-solid fa-file-pdf"></i> Unduh Surat</button>`;
                    // Store data globally for PDF access
                    window._pengadaanData = window._pengadaanData || {};
                    window._pengadaanData[item.id_pengadaan] = item;
                }

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td style="font-weight: 500;">${item.nama_pengadaan}</td>
                    <td>${moneyHtml}</td>
                    <td>${item.penyedia ? item.penyedia.nama_perusahaan : '-'}</td>
                    <td>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <div style="flex: 1; height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden;">
                                <div style="height: 100%; width: ${latestProgress}; background: var(--primary-color);"></div>
                            </div>
                            <span style="font-size: 0.8rem; font-weight: 600;">${latestProgress}</span>
                        </div>
                    </td>
                    <td>
                        <span class="status-badge ${statusClass}">${item.status_pengadaan}</span>
                    </td>
                    <td>${actionHtml}</td>
                `;
                tbody.appendChild(tr);
            });

            if (tbody.innerHTML === '') {
                tbody.innerHTML = `<tr><td colspan="7" style="text-align: center;" class="text-muted">Belum ada paket untuk Anda.</td></tr>`;
            }
        }
    } catch (error) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: #EF4444;">Gagal mengambil data. Pastikan server Backend aktif.</td></tr>`;
    }
}

// Fetch Vendor for Dropdown
async function fetchVendorList(token) {
    try {
        const response = await fetch(API_URL + '/penyedia', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });
        const data = await response.json();

        const select = document.getElementById('inputVendor');
        if (response.ok && data.length > 0) {
            select.innerHTML = '<option value="">-- Pilih Vendor --</option>';
            data.forEach(vendor => {
                const opt = document.createElement('option');
                opt.value = vendor.id_penyedia;
                opt.textContent = vendor.nama_perusahaan;
                select.appendChild(opt);
            });
        } else {
            select.innerHTML = '<option value="">Belum ada vendor terdaftar</option>';
        }
    } catch (e) {
        console.error(e);
    }
}

// --- MODAL UTILITIES ---
function openModal(modalId) {
    document.getElementById(modalId).classList.add('show');
}
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

// 1. Create Modal
const btnOpen = document.getElementById('btnOpenModal');
if (btnOpen) btnOpen.addEventListener('click', () => openModal('createModal'));

document.getElementById('createPengadaanForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('auth_token');
    const userData = JSON.parse(localStorage.getItem('user_data'));
    const btnSubmit = e.target.querySelector('button[type="submit"]');

    const payload = {
        nama_pengadaan: document.getElementById('inputNama').value,
        pagu_anggaran: document.getElementById('inputPagu').value,
        id_penyedia: document.getElementById('inputVendor').value,
        id_user: userData.id_user
    };

    submitUpdate(API_URL + '/pengadaan', 'POST', payload, btnSubmit, 'createModal', e.target);
});


// 2. Penawaran Modal (Vendor)
window.openPenawaranModal = (id_pengadaan) => {
    document.getElementById('penawaranPengadaanId').value = id_pengadaan;
    openModal('penawaranModal');
};

document.getElementById('penawaranForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('penawaranPengadaanId').value;
    const btnSubmit = e.target.querySelector('button[type="submit"]');

    const payload = {
        nilai_penawaran: document.getElementById('inputPenawaran').value
    };

    submitUpdate(API_URL + '/pengadaan/' + id, 'PUT', payload, btnSubmit, 'penawaranModal', e.target);
});


// 3. Kontrak Modal (Pejabat)
window.openKontrakModal = (id_pengadaan) => {
    document.getElementById('kontrakPengadaanId').value = id_pengadaan;
    openModal('kontrakModal');
};

document.getElementById('kontrakForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('kontrakPengadaanId').value;
    const btnSubmit = e.target.querySelector('button[type="submit"]');

    const payload = {
        nilai_kontrak: document.getElementById('inputKontrak').value
    };

    submitUpdate(API_URL + '/pengadaan/' + id, 'PUT', payload, btnSubmit, 'kontrakModal', e.target);
});

// Generic Fetch logic for Form Submit
async function submitUpdate(url, method, payload, btnElement, modalId, formElement) {
    const token = localStorage.getItem('auth_token');
    const originalText = btnElement.innerHTML;

    try {
        btnElement.innerHTML = 'Memproses...';
        btnElement.disabled = true;

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            showToast('Data berhasil disimpan!', 'success');
            closeModal(modalId);
            formElement.reset();
            fetchPengadaan(token);
        } else {
            showToast('Gagal menyimpan data', 'error');
        }
    } catch (error) {
        showToast('Koneksi server gagal', 'error');
    } finally {
        btnElement.innerHTML = originalText;
        btnElement.disabled = false;
    }
}

/* -------------------------------------------------------------
   generatePDF(idPengadaan)
   Membuat PDF “Surat Kontrak” untuk pengadaan yang sudah
   berstatus SELESAI (progress 100%).
   Menggunakan jsPDF (umd) yang sudah di‑include di <head>.
------------------------------------------------------------- */
function generatePDF(idPengadaan) {
    // Ambil data yang sudah disimpan di window._pengadaanData
    const data = window._pengadaanData?.[idPengadaan];
    if (!data) {
        showToast('Data pengadaan tidak ditemukan.', 'error');
        return;
    }

    // Inisialisasi jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
    });

    // --------------------- Header ---------------------
    const logoBase64 = '';        // Jika ingin menambah logo, isi dataURL di sini
    const title = 'SURAT KONTRAK PENGADAAN BARANG/JASA';
    const today = new Date().toLocaleDateString('id-ID');

    doc.setFillColor(241, 245, 249);           // background light gray
    doc.rect(0, 0, 210, 297, 'F');

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(30, 58, 138);
    doc.text(title, 105, 30, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('Helvetica', 'normal');
    doc.text(`Tanggal: ${today}`, 20, 40);

    // --------------------- Detail Pengadaan ---------------------
    const lineStart = 50;
    const lineHeight = 8;
    let y = lineStart;

    const addRow = (label, value) => {
        doc.setFont('Helvetica', 'bold');
        doc.text(`${label}:`, 20, y);
        doc.setFont('Helvetica', 'normal');
        doc.text(String(value), 70, y);
        y += lineHeight;
    };

    addRow('Nomor Pengadaan', data.id_pengadaan);
    addRow('Nama Paket', data.nama_pengadaan);
    addRow('Pagu Anggaran', `Rp ${Number(data.pagu_anggaran).toLocaleString('id-ID')}`);
    addRow('Nilai Penawaran', data.nilai_penawaran
        ? `Rp ${Number(data.nilai_penawaran).toLocaleString('id-ID')}`
        : '-');
    addRow('Nilai Kontrak', data.nilai_kontrak
        ? `Rp ${Number(data.nilai_kontrak).toLocaleString('id-ID')}`
        : '-');
    addRow('Status Pengadaan', data.status_pengadaan);
    addRow('Panitia (User)', data.user?.nama_user ?? '-');
    addRow('Vendor (Penyedia)', data.penyedia?.nama_perusahaan ?? '-');

    // --------------------- Footer / Tanda Tangan ---------------------
    const footerY = 250;
    doc.setFontSize(11);
    doc.text('Panitia Pengadaan', 20, footerY);
    doc.text('Penyedia', 150, footerY);
    doc.text('_________________________', 20, footerY + 12);
    doc.text('_________________________', 150, footerY + 12);
    doc.text('(Nama & Tanda Tangan)', 20, footerY + 20);
    doc.text('(Nama & Tanda Tangan)', 150, footerY + 20);

    // --------------------- Simpan PDF ---------------------
    const fileName = `Surat_Kontrak_Pengadaan_${data.id_pengadaan}.pdf`;
    doc.save(fileName);
}
