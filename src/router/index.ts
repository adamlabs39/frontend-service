import { createRouter, createWebHistory } from "vue-router";
// NOTE Layout View
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import SidebarLayout from "@/layouts/HeaderLayout.vue";
// NOTE Component View
import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/Dashboard/DashboardView.vue";
import RawatJalanView from "@/views/RawatJalan/RawatJalanView.vue";
import SettingView from "@/views/SettingPage/SettingView.vue";
import DatamasterView from "@/views/Datamaster/DatamasterView.vue";
import AdmisiView from "@/views/Admisi/AdmisiView.vue";
import PaymentView from "@/views/Pembayaran/PaymentView.vue";
import PharmacyView from "@/views/Farmasi/PharmacyView.vue";
import AntrianView from "@/views/Antrian/AntrianView.vue";
import LaboratoriumView from "@/views/Laboratorium/LaboratoriumView.vue";
import ApmAktifView from "@/views/Antrian/APM/ApmAktifView.vue";

// SECTION Page View
// NOTE Admisi
import AdmisiPage from "@/views/Admisi/AdmisiPage.vue";
import SEPAdmisiPage from "@/views/Admisi/SEPAdmisiPage.vue";
import PatientDataPage from "@/views/Admisi/PatientDataPage.vue";
import RoomMonitoringPage from "@/views/Admisi/RoomMonitoringPage.vue";
import AdmisiReportPage from "@/views/Admisi/AdmisiReportPage.vue";

// NOTE Pembayaran
import CashierPage from "@/views/Pembayaran/CashierPage.vue";
import Cashier2Page from "@/views/Pembayaran/Cashier2Page.vue";
import TransactionPage from "@/views/Pembayaran/TransactionPage.vue";
import ClosedBillPage from "@/views/Pembayaran/ClosedBillPage.vue";
import PembayaranKunjunganPage from "@/views/Pembayaran/Report/PembayaranKunjunganPage.vue";
import ClosingCashierPage from "@/views/Pembayaran/Report/ClosingCashierPage.vue";

// NOTE Farmasi
import DoctorPrescriptionPage from "@/views/Farmasi/DoctorPrescriptionPage.vue";
import DrugSalesPage from "@/views/Farmasi/DrugSalesPage.vue";
import DrugReturnsPage from "@/views/Farmasi/DrugReturnsPage.vue";
import RoomPharmacyPage from "@/views/Farmasi/RoomPharmacyPage.vue";
import TransactionHistoryPage from "@/views/Farmasi/TransactionHistoryPage.vue";
// NOTE Farmasi/Datamaster
import RulesOfUsePage from "@/views/Farmasi/Masterdata/RulesOfUsePage.vue";
import UnitPage from "@/views/Farmasi/Masterdata/UnitPage.vue";
import DosageFormPage from "@/views/Farmasi/Masterdata/DosageFormPage.vue";
import DrugCategoryPage from "@/views/Farmasi/Masterdata/DrugCategoryPage.vue";
import ManufacturingPage from "@/views/Farmasi/Masterdata/ManufacturingPage.vue";
import StockTypePage from "@/views/Farmasi/Masterdata/StockTypePage.vue";
import StockLocationPage from "@/views/Farmasi/Masterdata/StockLocationPage.vue";
import MedicalItemPage from "@/views/Farmasi/Masterdata/MedicalItemPage.vue";
import HowToUsePage from "@/views/Farmasi/Masterdata/HowToUsePage.vue";
import CompositionPage from "@/views/Farmasi/Masterdata/CompositionPage.vue";
import PriceConfigurationPage from "@/views/Farmasi/Masterdata/PriceConfigurationPage.vue";
// NOTE Farmasi/Laporan
import RevenuePage from "@/views/Farmasi/Report/RevenuePage.vue";
import WaitingTimePage from "@/views/Farmasi/Report/WaitingTimePage.vue";
import RevenueRecapPage from "@/views/Farmasi/Report/RevenueRecapPage.vue";

// NOTE Rawat Jalan
// import PoliPage from "@/views/RawatJalan/PoliPage.vue";
import BPJSPageMonitoringKunjunganPage from "@/views/RawatJalan/BPJSMonitoringPage.vue";
import ProfilFaskesPage from "@/views/SettingPage/Template/ProfilFaskes/ProfilFaskesPage.vue";
import KonfigurasiIntegrasiPage from "@/views/SettingPage/Template/KonfigurasiIntegrasi/KonfigurasiIntegrasiPage.vue";

// NOTE Setting
import PermissionMenuPage from "@/views/SettingPage/Template/PermissionMenu/PermissionMenuPage.vue";
import PrintOutPage from "../views/SettingPage/Template/PrintOut/PrintOutPage.vue"
import ProfilAkunPage from "../views/SettingPage/Template/ProfilAkun/ProfilAkunPage.vue"
import ProfilAkunView from "@/views/SettingPage/ProfilAkunView.vue";
import SystemPage from "@/views/SettingPage/Template/System/SystemPage.vue";

// NOTE Page View Datamaster
import UserPage from "@/views/Datamaster/User/UserPage.vue";
import RolePage from "@/views/Datamaster/Role/RolePage.vue";
import RuanganPage from "@/views/Datamaster/Ruangan/RuanganPage.vue";
import KategoriRuanganPage from "@/views/Datamaster/KategoriRuangan.vue/KategoriRuanganPage.vue";
import TarifPage from "@/views/Datamaster/Tarif/TarifPage.vue";
import ICD9CMPage from "@/views/Datamaster/ICD9CM/ICD9CMPage.vue";
import SnomedCTPage from "@/views/Datamaster/SnomedCT/SnomedCTPage.vue";
import LoincPage from "@/views/Datamaster/Loinc/LoincPage.vue";
import PraktisiPage from "@/views/Datamaster/Praktisi/PraktisiPage.vue";
import PegawaiPage from "@/views/Datamaster/Pegawai/PegawaiPage.vue";
import DiagnosisICD10Page from "@/views/Datamaster/DiagnosisICD10/DiagnosisICD10Page.vue";
import PenjaminPage from "@/views/Datamaster/Penjamin/PenjaminPage.vue";
import OrganisasiPage from "@/views/Datamaster/Organisasi/OrganisasiPage.vue";
import FaskesPage from "@/views/Datamaster/Faskes/FaskesPage.vue";
import LokasiPage from "@/views/Datamaster/Lokasi/LokasiPage.vue";
import GeneralConsentPage from "@/views/Datamaster/GeneralConsent/GeneralConsentPage.vue";
import TindakanPage from "@/views/Datamaster/Tindakan/TindakanPage.vue";
import VoucherPage from "@/views/Datamaster/Voucher/VoucherPage.vue";
import GigiFDIPage from "@/views/Datamaster/SuperAdmin/GigiFDI/GigiFDIPage.vue";
import KategoriGigi from "@/views/Datamaster/SuperAdmin/KategoriGigi/KategoriGigi.vue";
import ItemGigiPage from "@/views/Datamaster/SuperAdmin/ItemGigi/ItemGigiPage.vue";
import OklusiPage from "@/views/Datamaster/SuperAdmin/Oklusi/OklusiPage.vue";

// NOTE Page Antrian
import LayarAntrianPage from "@/views/Antrian/Layar/LayarAntrianPage.vue";
import DataAntrianPage from "@/views/Antrian/DataAntrian/DataAntrianPage.vue";
import ApmPage from "@/views/Antrian/APM/ApmPage.vue";
import KonfigurasiLayarPage from "@/views/Antrian/Konfigurasi/KonfigurasiLayarPage.vue";
import KonfigurasiJadwalPage from "@/views/Antrian/Konfigurasi/KonfigurasiJadwalPage.vue";
import DaftarPasienPage from "@/views/Antrian/APM/ApmPasienJKN/DaftarPasienPage.vue";
import DaftarPasienNonPage from "@/views/Antrian/APM/ApmPasienNonJKN/DaftarPasienNonPage.vue";
import CheckinPendaftaranPage from "@/views/Antrian/APM/ApmCheckin/CheckinPendaftaranPage.vue";
import CheckinBerhasilPage from "@/views/Antrian/APM/ApmCheckin/CheckinBerhasilPage.vue";
import PrintAntrianPage from "@/views/Antrian/APM/ApmPrint/PrintAntrianPage.vue";

// NOTE Page Laboratorium
import OrderPage from "@/views/Laboratorium/OrderLab/OrderPage.vue";
import HasilPage from "@/views/Laboratorium/Hasil/HasilPage.vue";


// !SECTION
// NOTE Test Component
import TestComponentNaya from "@/views/TestComponentNaya.vue";
import TestComponentAdamNew from "@/views/TestComponentAdamNew.vue";
import TestComponentAlex from "@/views/TestComponentAlex.vue";
import TestComponentFahmi from "@/views/TestComponentFahmi.vue";
import KomponenTarifPage from "@/views/Datamaster/KomponenTarif/KomponenTarifPage.vue";
import PoliPage from "@/views/RawatJalan/PoliPage.vue";
import BPJSPageMonitoringRiwayatKunjunganPage from "@/views/RawatJalan/BPJSPageMonitoringRiwayatKunjunganPage.vue";
import BPJSMonitoringPage from "@/views/RawatJalan/BPJSMonitoringPage.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "login",
      meta: { layout: DefaultLayout },
      component: LoginView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      meta: { layout: SidebarLayout, requiresAuth: true },
      component: DashboardView,
    },

    // RAWAT JALAN

    {
      path: "/rawat-jalan",
      name: "rawat-jalan",
      redirect: "/rawat-jalan/poli",
    },
    {
      path: "/rawat-jalan/poli",
      name: "rawat-jalan-poli",
      meta: { layout: SidebarLayout, page: PoliPage, requiresAuth: true },
      component: RawatJalanView,
    },
    {
      path: "/rawat-jalan/bpjs/monitoring-kunjungan",
      name: "rawat-jalan-bpjs-monitoring-kunjungan",
      meta: { layout: SidebarLayout, page: BPJSMonitoringPage, requiresAuth: true },
      component: RawatJalanView,
    },
    {
      path: "/rawat-jalan/bpjs/monitoring-riwayat-kunjungan",
      name: "rawat-jalan-bpjs-monitoring-riwayat-kunjungan",
      meta: { layout: SidebarLayout, page: BPJSMonitoringPage, requiresAuth: true },
      component: RawatJalanView,
    },
    {
      path: "/rawat-jalan/bpjs/monitoring-obat-kunjungan",
      name: "rawat-jalan-bpjs-monitoring-obat-kunjungan",
      meta: { layout: SidebarLayout, page: BPJSMonitoringPage, requiresAuth: true },
      component: RawatJalanView,
    },
    {
      path: "/setting/profil-faskes",
      name: "setting-profil-faskes",
      meta: { layout: SidebarLayout, page: ProfilFaskesPage, requiresAuth: true },
      component: SettingView,
    },

    {
      path: "/setting/konfigurasi-integrasi",
      name: "setting-konfigurasi-integrasi",
      meta: { layout: SidebarLayout, page: KonfigurasiIntegrasiPage, requiresAuth: true },
      component: SettingView,
    },
    {
      path: "/setting/permission-menu",
      name: "setting-permission-menu",
      meta: { layout: SidebarLayout, page: PermissionMenuPage, requiresAuth: true },
      component: SettingView,
    },

    {
      path: "/setting/print-out",
      name: "setting-print-out",
      meta: { layout: SidebarLayout, page: PrintOutPage, requiresAuth: true },
      component: SettingView,
    },
    {
      path: "/setting/profil-akun",
      name: "setting-profil-akun",
      meta: { layout: SidebarLayout, page: ProfilAkunPage, requiresAuth: true },
      component: ProfilAkunView,
    },
    {
      path: "/setting/system",
      name: "setting-system",
      meta: { layout: SidebarLayout, page: SystemPage, requiresAuth: true },
      component: SettingView
    },

    // NOTE Datamaster
    {
      path: "/datamaster",
      name: "datamaster",
      redirect: "/datamaster/user",
    },
    {
      path: "/datamaster/user",
      name: "datamaster-user",
      meta: { layout: SidebarLayout, page: UserPage, requiresAuth: true },
      component: DatamasterView,
    },
    {
      path: "/datamaster/role",
      name: "datamaster-role",
      meta: { layout: SidebarLayout, page: RolePage, requiresAuth: true },
      component: DatamasterView,
    },
    {
      path: "/datamaster/ruangan",
      name: "datamaster-ruangan",
      meta: { layout: SidebarLayout, page: RuanganPage, requiresAuth: true },
      component: DatamasterView,
    },
    {
      path: "/datamaster/kategori-ruangan",
      name: "datamaster-kategori-ruangan",
      meta: { layout: SidebarLayout, page: KategoriRuanganPage, requiresAuth: true },
      component: DatamasterView,
    },
    {
      path: "/datamaster/tarif",
      name: "datamaster-tarif",
      meta: { layout: SidebarLayout, page: TarifPage, requiresAuth: true },
      component: DatamasterView,
    },
    {
      path: "/datamaster/komponen-tarif",
      name: "datamaster-komponen-tarif",
      meta: { layout: SidebarLayout, page: KomponenTarifPage, requiresAuth: true },
      component: DatamasterView,
    },
    {
      path: "/datamaster/tindakan",
      name: "datamaster-tindakan",
      meta: { layout: SidebarLayout, page: TindakanPage, requiresAuth: true },
      component: DatamasterView,
    },
    {
      path: "/datamaster/icd9-cm",
      name: "datamaster-icd9-cm",
      meta: { layout: SidebarLayout, page: ICD9CMPage, requiresAuth: true },
      component: DatamasterView,
    },
    {
      path: "/datamaster/snomed-ct",
      name: "datamaster-snomed-ct",
      meta: { layout: SidebarLayout, page: SnomedCTPage, requiresAuth: true },
      component: DatamasterView,
    },
    {
      path: "/datamaster/loinc",
      name: "datamaster-loinc",
      meta: { layout: SidebarLayout, page: LoincPage, requiresAuth: true },
      component: DatamasterView,
    },
    {
      path: "/datamaster/diagnosis-icd10",
      name: "datamaster-diagnosis-icd10",
      meta: { layout: SidebarLayout, page: DiagnosisICD10Page, requiresAuth: true },
      component: DatamasterView,
    },
    {
      path: "/datamaster/praktisi",
      name: "datamaster-paktisi",
      meta: { layout: SidebarLayout, page: PraktisiPage },
      component: DatamasterView,
    },
    {
      path: "/datamaster/pegawai",
      name: "datamaster-pegawai",
      meta: { layout: SidebarLayout, page: PegawaiPage },
      component: DatamasterView,
    },
    {
      path: "/datamaster/penjamin",
      name: "datamaster-penjamin",
      meta: { layout: SidebarLayout, page: PenjaminPage, requiresAuth: true },
      component: DatamasterView,
    },
    {
      path: "/datamaster/voucher",
      name: "datamaster-voucher",
      meta: { layout: SidebarLayout, page: VoucherPage, requiresAuth: true },
      component: DatamasterView,
    },
    {
      path: "/datamaster/faskes",
      name: "datamaster-faskes",
      meta: { layout: SidebarLayout, page: FaskesPage, requiresAuth: true },
      component: DatamasterView,
    },
    {
      path: "/datamaster/lokasi",
      name: "datamaster-lokasi",
      meta: { layout: SidebarLayout, page: LokasiPage, requiresAuth: true },
      component: DatamasterView,
    },
    {
      path: "/datamaster/organisasi",
      name: "datamaster-organisasi",
      meta: { layout: SidebarLayout, page: OrganisasiPage, requiresAuth: true },
      component: DatamasterView,
    },
    {
      path: "/datamaster/general-consent",
      name: "datamaster-general-consent",
      meta: { layout: SidebarLayout, page: GeneralConsentPage, requiresAuth: true },
      component: DatamasterView,
    },
    {
      path: "/datamaster/super-admin/",
      name: "datamaster-super-admin",
      redirect: "/datamaster/super-admin/gigi-fdi",
    },
    {
      path: "/datamaster/super-admin/gigi-fdi",
      name: "datamaster-super-admin-gigi-fdi",
      meta: { layout: SidebarLayout, page: GigiFDIPage, requiresAuth: true },
      component: DatamasterView,
    },
    {
      path: "/datamaster/super-admin/kategori-gigi",
      name: "datamaster-super-admin-kategori-gigi",
      meta: { layout: SidebarLayout, page: KategoriGigi, requiresAuth: true },
      component: DatamasterView,
    },
    {
      path: "/datamaster/super-admin/item-gigi",
      name: "datamaster-super-admin-item-gigi",
      meta: { layout: SidebarLayout, page: ItemGigiPage, requiresAuth: true },
      component: DatamasterView,
    },
    {
      path: "/datamaster/super-admin/oklusi",
      name: "datamaster-super-admin-oklusi",
      meta: { layout: SidebarLayout, page: OklusiPage, requiresAuth: true },
      component: DatamasterView,
    },
    // NOTE Admisi
    {
      path: "/admisi",
      name: "admisi",
      redirect: "/admisi/rawat-jalan",
    },
    {
      path: "/admisi/rawat-jalan",
      name: "admisi-rawat-jalan",
      meta: { layout: SidebarLayout, page: AdmisiPage, requiresAuth: true },
      component: AdmisiView,
    },
    {
      path: "/admisi/rawat-inap",
      name: "admisi-rawat-inap",
      meta: { layout: SidebarLayout, page: AdmisiPage, requiresAuth: true },
      component: AdmisiView,
    },
    {
      path: "/admisi/igd",
      name: "admisi-igd",
      meta: { layout: SidebarLayout, page: AdmisiPage, requiresAuth: true },
      component: AdmisiView,
    },
    {
      path: "/admisi/sep/rawat-jalan",
      name: "admisi-sep-rawat-jalan",
      meta: { layout: SidebarLayout, page: SEPAdmisiPage, requiresAuth: true },
      component: AdmisiView,
    },
    {
      path: "/admisi/sep/rawat-inap",
      name: "admisi-sep-rawat-inap",
      meta: { layout: SidebarLayout, page: SEPAdmisiPage, requiresAuth: true },
      component: AdmisiView,
    },
    {
      path: "/admisi/sep/igd",
      name: "admisi-sep-igd",
      meta: { layout: SidebarLayout, page: SEPAdmisiPage, requiresAuth: true },
      component: AdmisiView,
    },
    {
      path: "/admisi/data-pasien",
      name: "admisi-data-pasien",
      meta: { layout: SidebarLayout, page: PatientDataPage, requiresAuth: true },
      component: AdmisiView,
    },
    {
      path: "/admisi/monitoring-kamar",
      name: "admisi-monitoring-kamar",
      meta: { layout: SidebarLayout, page: RoomMonitoringPage, requiresAuth: true },
      component: AdmisiView,
    },
    {
      path: "/admisi/laporan",
      name: "admisi-laporan",
      redirect: "/admisi/laporan/kunjungan",
    },
    {
      path: "/admisi/laporan/kunjungan",
      name: "admisi-laporan-kunjungan",
      meta: { layout: SidebarLayout, page: AdmisiReportPage, requiresAuth: true },
      component: AdmisiView,
    },
    {
      path: "/admisi/laporan/penjamin",
      name: "admisi-laporan-penjamin",
      meta: { layout: SidebarLayout, page: AdmisiReportPage, requiresAuth: true },
      component: AdmisiView,
    },
    {
      path: "/admisi/laporan/batal-kunjungan",
      name: "admisi-laporan-batal-kunjungan",
      meta: { layout: SidebarLayout, page: AdmisiReportPage, requiresAuth: true },
      component: AdmisiView,
    },
    {
      path: "/admisi/laporan/status-kamar",
      name: "admisi-laporan-status-kamar",
      meta: { layout: SidebarLayout, page: AdmisiReportPage, requiresAuth: true },
      component: AdmisiView,
    },
    {
      path: "/admisi/laporan/keperawatan-inap-pasien",
      name: "admisi-laporan-keperawatan-inap-pasien",
      meta: { layout: SidebarLayout, page: AdmisiReportPage, requiresAuth: true },
      component: AdmisiView,
    },
    {
      path: "/admisi/laporan/bayi-baru-lahir",
      name: "admisi-laporan-bayi-baru-lahir",
      meta: { layout: SidebarLayout, page: AdmisiReportPage, requiresAuth: true },
      component: AdmisiView,
    },
    {
      path: "/admisi/laporan/rekap-jumlah-pasien-BPJS",
      name: "admisi-laporan-rekap-jumlah-pasien-BPJS",
      meta: { layout: SidebarLayout, page: AdmisiReportPage, requiresAuth: true },
      component: AdmisiView,
    },

    // NOTE Antrian
    {
      path: "/antrian",
      name: "antrian",
      redirect: '/antrian/konfigurasi/jadwal-dokter'
    },
    {
      path: "/antrian/konfigurasi/jadwal-dokter",
      name: "antrian-konfigurasi-jadwal-dokter",
      meta: { layout: SidebarLayout, page: KonfigurasiJadwalPage, requiresAuth: true },
      component: AntrianView,
    },
    {
      path: "/antrian/konfigurasi/layar-antrian",
      name: "antrian-konfigurasi-layar-antrian",
      meta: { layout: SidebarLayout, page: KonfigurasiLayarPage, requiresAuth: true },
      component: AntrianView,
    },
    {
      path: "/antrian/data-antrian",
      name: "antrian-data-antrian",
      meta: { layout: SidebarLayout, page: DataAntrianPage, requiresAuth: true },
      component: AntrianView,
    },
    {
      path: "/antrian/monitoring-antrian",
      name: "antrian-monitoring-antrian",
      meta: { layout: SidebarLayout, page: LayarAntrianPage, requiresAuth: true },
      component: AntrianView,
    },
    {
      path: "/antrian/layar",
      name: "antrian-layar",
      meta: { layout: SidebarLayout, page: LayarAntrianPage, requiresAuth: true },
      component: AntrianView,
    },
    {
      path: "/antrian/apm",
      name: "antrian-apm",
      meta: { layout: SidebarLayout, page: ApmPage, requiresAuth: true },
      component: AntrianView,
    },
    {
      path: "/antrian/apm/aktif",
      name: "antrian-apm-aktif",
      meta: { layout: DefaultLayout, requiresAuth: true },
      component: ApmAktifView,
    },
    {
      path: "/antrian/apm/aktif/pasien/jkn",
      name: "antrian-apm-aktif-pasien-jkn",
      meta: { layout: DefaultLayout, requiresAuth: true },
      component: DaftarPasienPage,
    },
    {
      path: "/antrian/apm/aktif/pasien/non-jkn",
      name: "antrian-apm-aktif-pasien-non-jkn",
      meta: { layout: DefaultLayout, requiresAuth: true },
      component: DaftarPasienNonPage,
    },
    {
      path: "/antrian/apm/aktif/checkin",
      name: "antrian-apm-aktif-checkin",
      meta: { layout: DefaultLayout, requiresAuth: true },
      component: CheckinPendaftaranPage,
    },
    {
      path: "/antrian/apm/aktif/checkin/berhasil",
      name: "antrian-apm-aktif-checkin-berhasil",
      meta: { layout: DefaultLayout, requiresAuth: true },
      component: CheckinBerhasilPage,
    },
    {
      path: "/antrian/apm/aktif/print",
      name: "antrian-apm-aktif-print",
      meta: { layout: DefaultLayout, requiresAuth: true },
      component: PrintAntrianPage,
    },
    
    // NOTE Laboratorium
    {
      path: "/laboratorium",
      name: "laboratorium",
      redirect: '/laboratorium/order-lab'
    },
    {
      path: "/laboratorium/order-lab",
      name: "laboratorium-order-lab",
      meta: { layout: SidebarLayout, page: OrderPage, requiresAuth: true },
      component: LaboratoriumView,
    },
    {
      path: "/laboratorium/hasil-pemeriksaan",
      name: "laboratorium-hasil-pemeriksaan",
      meta: { layout: SidebarLayout, page: HasilPage, requiresAuth: true },
      component: LaboratoriumView,
    },
    {
      path: "/laboratorium/expertise",
      name: "laboratorium-expertise",
      meta: { layout: SidebarLayout, page: OrderPage, requiresAuth: true },
      component: LaboratoriumView,
    },
    {
      path: "/laboratorium/datamaster/kategori-pemeriksaan",
      name: "laboratorium-datamaster/kategori-pemeriksaan",
      meta: { layout: SidebarLayout, page: OrderPage, requiresAuth: true },
      component: LaboratoriumView,
    },
    {
      path: "/laboratorium/datamaster/kelompok-pemeriksaan",
      name: "laboratorium-datamaster/kelompok-pemeriksaan",
      meta: { layout: SidebarLayout, page: OrderPage, requiresAuth: true },
      component: LaboratoriumView,
    },
    {
      path: "/laboratorium/datamaster/item-pemeriksaan",
      name: "laboratorium-datamaster/item-pemeriksaan",
      meta: { layout: SidebarLayout, page: OrderPage, requiresAuth: true },
      component: LaboratoriumView,
    },
    {
      path: "/laboratorium/datamaster/spesimen",
      name: "laboratorium-datamaster/spesimen",
      meta: { layout: SidebarLayout, page: OrderPage, requiresAuth: true },
      component: LaboratoriumView,
    },
    {
      path: "/laboratorium/datamaster/tarif-lab",
      name: "laboratorium-datamaster/tarif-lab",
      meta: { layout: SidebarLayout, page: OrderPage, requiresAuth: true },
      component: LaboratoriumView,
    },
    {
      path: "/laboratorium/laporan/kunjungan",
      name: "laboratorium-laporan-kunjungan",
      meta: { layout: SidebarLayout, page: OrderPage, requiresAuth: true },
      component: LaboratoriumView,
    },
    {
      path: "/laboratorium/laporan/waktu-tunggu",
      name: "laboratorium-laporan-waktu-tunggu",
      meta: { layout: SidebarLayout, page: OrderPage, requiresAuth: true },
      component: LaboratoriumView,
    },
    {
      path: "/laboratorium/laporan/rekap-jumlah",
      name: "laboratorium-laporan-rekap-jumlah",
      meta: { layout: SidebarLayout, page: OrderPage, requiresAuth: true },
      component: LaboratoriumView,
    },

     // NOTE Pembayaran
    {
      path: "/pembayaran",
      name: "pembayaran",
      redirect: "/pembayaran/kasir",
    },
    {
      path: "/pembayaran/kasir",
      name: "pembayaran-kasir",
      meta: { layout: SidebarLayout, page: CashierPage, requiresAuth: true },
      component: PaymentView,
    },
    {
      path: "/pembayaran/transaksi",
      name: "pembayaran-transaksi",
      meta: { layout: SidebarLayout, page: TransactionPage, requiresAuth: true },
      component: PaymentView,
    },
    {
      path: "/pembayaran/closed-bill",
      name: "pembayaran-closed-bill",
      meta: { layout: SidebarLayout, page: ClosedBillPage, requiresAuth: true },
      component: PaymentView,
    },
    {
      path: "/pembayaran/laporan/pembayaran",
      name: "pembayaran-laporan-pembayaran",
      meta: { layout: SidebarLayout, page: PembayaranKunjunganPage, requiresAuth: true },
      component: PaymentView,
    },
    {
      path: "/pembayaran/laporan/closing",
      name: "pembayaran-laporan-closing",
      meta: { layout: SidebarLayout, page: ClosingCashierPage, requiresAuth: true },
      component: PaymentView,
    },

     // NOTE Farmasi
     {
      path: "/farmasi",
      name: "farmasi",
      redirect: "/farmasi/resep-dokter",
    },
    {
      path: "/farmasi/resep-dokter",
      name: "farmasi-resep-dokter",
      meta: { layout: SidebarLayout, page: DoctorPrescriptionPage, requiresAuth: true },
      component: PharmacyView,
    },
    {
      path: "/farmasi/penjualan-obat",
      name: "farmasi-penjualan-obat",
      meta: { layout: SidebarLayout, page: DrugSalesPage, requiresAuth: true },
      component: PharmacyView,
    },
    {
      path: "/farmasi/retur-obat-&-material",
      name: "farmasi-retur-obat-&-material",
      meta: { layout: SidebarLayout, page: DrugReturnsPage, requiresAuth: true },
      component: PharmacyView,
    },
    {
      path: "/farmasi/farmasi-ruangan",
      name: "farmasi-retur-ruangan",
      meta: { layout: SidebarLayout, page: RoomPharmacyPage, requiresAuth: true },
      component: PharmacyView,
    },
    {
      path: "/farmasi/riwayat-transaksi",
      name: "farmasi-riwayat-transaksi",
      meta: { layout: SidebarLayout, page: TransactionHistoryPage, requiresAuth: true },
      component: PharmacyView,
    },

    // NOTE Farmasi/Datamaster
    {
      path: "/farmasi/datamaster/aturan-pakai",
      name: "farmasi-datamaster-aturan-pakai",
      meta: { layout: SidebarLayout, page: RulesOfUsePage, requiresAuth: true },
      component: PharmacyView,
    },
    {
      path: "/farmasi/datamaster/satuan",
      name: "farmasi-datamaster-satuan",
      meta: { layout: SidebarLayout, page: UnitPage, requiresAuth: true },
      component: PharmacyView,
    },
    {
      path: "/farmasi/datamaster/bentuk-sediaan",
      name: "farmasi-datamaster-bentuk-sediaan",
      meta: { layout: SidebarLayout, page: DosageFormPage, requiresAuth: true },
      component: PharmacyView,
    },
    {
      path: "/farmasi/datamaster/kategori-obat",
      name: "farmasi-datamaster-kategori-obat",
      meta: { layout: SidebarLayout, page: DrugCategoryPage, requiresAuth: true },
      component: PharmacyView,
    },
    {
      path: "/farmasi/datamaster/manufaktur",
      name: "farmasi-datamaster-manufaktur",
      meta: { layout: SidebarLayout, page: ManufacturingPage, requiresAuth: true },
      component: PharmacyView,
    },
    {
      path: "/farmasi/datamaster/jenis-stok",
      name: "farmasi-datamaster-jenis-stok",
      meta: { layout: SidebarLayout, page: StockTypePage, requiresAuth: true },
      component: PharmacyView,
    },
    {
      path: "/farmasi/datamaster/lokasi-stok",
      name: "farmasi-datamaster-lokasi-stok",
      meta: { layout: SidebarLayout, page: StockLocationPage, requiresAuth: true },
      component: PharmacyView,
    },
    {
      path: "/farmasi/datamaster/item-medis",
      name: "farmasi-datamaster-item-medis",
      meta: { layout: SidebarLayout, page: MedicalItemPage, requiresAuth: true },
      component: PharmacyView,
    },
    {
      path: "/farmasi/datamaster/cara-pakai",
      name: "farmasi-datamaster-cara-pakai",
      meta: { layout: SidebarLayout, page: HowToUsePage, requiresAuth: true },
      component: PharmacyView,
    },
    {
      path: "/farmasi/datamaster/komposisi",
      name: "farmasi-datamaster-komposisi",
      meta: { layout: SidebarLayout, page: CompositionPage, requiresAuth: true },
      component: PharmacyView,
    },
    {
      path: "/farmasi/datamaster/konfigurasi-harga",
      name: "farmasi-datamaster-konfigurasi-harga",
      meta: { layout: SidebarLayout, page: PriceConfigurationPage, requiresAuth: true },
      component: PharmacyView,
    },

    // NOTE Farmasi/Laporan
    {
      path: "/farmasi/laporan/pendapatan",
      name: "farmasi-laporan-pendapatan",
      meta: { layout: SidebarLayout, page: RevenuePage, requiresAuth: true },
      component: PharmacyView,
    },
    {
      path: "/farmasi/laporan/waktu-tunggu",
      name: "farmasi-laporan-waktu-tunggu",
      meta: { layout: SidebarLayout, page: WaitingTimePage, requiresAuth: true },
      component: PharmacyView,
    },
    {
      path: "/farmasi/laporan/rekap-pendapatan-dokter-resep-per-dokter",
      name: "farmasi-laporan-rekap-pendapatan-dokter-resep-per-dokter",
      meta: { layout: SidebarLayout, page: RevenueRecapPage, requiresAuth: true },
      component: PharmacyView,
    },

    // NOTE Test Component
    {
      path: "/component-fahmi",
      name: "component-fahmi",
      meta: { layout: DefaultLayout },
      component: TestComponentFahmi,
    },
    {
      path: "/component-naya",
      name: "component-naya",
      meta: { layout: DefaultLayout },
      component: TestComponentNaya,
    },
    {
      path: "/component-adam-new",
      name: "component-adam",
      meta: { layout: DefaultLayout },
      component: TestComponentAdamNew,
    },
    {
      path: "/component-alex",
      name: "component-alex",
      meta: { layout: DefaultLayout },
      component: TestComponentAlex,
    },

    { path: "/:pathMatch(.*)*", redirect: "/dashboard" },
  ],
});

function isAuthenticated() {
  return localStorage.getItem("access_token") !== null;
}

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
