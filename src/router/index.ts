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
import RawatInapView from "@/views/RawatInap/RawatInapView.vue";
import FisioterapiView from "@/views/Fisioterapi/FisioterapiView.vue";

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
import TransactionPage from "@/views/Pembayaran/Transaction/Pelayanan.vue";
import APSOTC from "@/views/Pembayaran/Transaction/APS&OTC.vue";
import ClosedBillPage from "@/views/Pembayaran/ClosedBillPage.vue";
import PembayaranKunjunganPage from "@/views/Pembayaran/Report/PembayaranKunjunganPage.vue";
import ClosingCashierPage from "@/views/Pembayaran/Report/ClosingCashierPage.vue";
import LaporanPendapatanPage from "@/views/Pembayaran/Report/LaporanPendapatanPage.vue";
import PelunasanPage from "@/views/Pembayaran/layout/PelunasanPage.vue";

// NOTE Farmasi
import DoctorPrescriptionPage from "@/views/Farmasi/DoctorPrescription/DoctorPrescriptionPage.vue";
import DrugSalesPage from "@/views/Farmasi/DrugSalesPage.vue";
import DrugReturnsPage from "@/views/Farmasi/DrugReturnsPage.vue";
import RoomPharmacyPage from "@/views/Farmasi/RoomPharmacy/RoomPharmacyPage.vue";
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
import BPJSPageMonitoringKunjunganPage from "@/views/RawatJalan/Page/BPJSMonitoringPage.vue";
import ProfilFaskesPage from "@/views/SettingPage/Template/ProfilFaskes/ProfilFaskesPage.vue";
import KonfigurasiIntegrasiPage from "@/views/SettingPage/Template/KonfigurasiIntegrasi/KonfigurasiIntegrasiPage.vue";
import PoliPage from "@/views/RawatJalan/Page/PoliPage.vue";
import BPJSMonitoringPage from "@/views/RawatJalan/Page/BPJSMonitoringPage.vue";
import LaporanPage from "@/views/RawatJalan/Page/LaporanPage.vue";

// NOTE Setting
import PermissionMenuPage from "@/views/SettingPage/Template/PermissionMenu/PermissionMenuPage.vue";
import PrintOutPage from "../views/SettingPage/Template/PrintOut/PrintOutPage.vue";
import ProfilAkunPage from "../views/SettingPage/Template/ProfilAkun/ProfilAkunPage.vue";
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
import KomponenTarifPage from "@/views/Datamaster/KomponenTarif/KomponenTarifPage.vue";

// NOTE Page Antrian
import LayarAntrianPage from "@/views/Antrian/Layar/LayarAntrianPage.vue";
import DataAntrianPage from "@/views/Antrian/DataAntrian/AntrianPage.vue";
import ApmPage from "@/views/Antrian/APM/ApmPage.vue";
import KonfigurasiLayarPage from "@/views/Antrian/Konfigurasi/KonfigurasiLayar/KonfigurasiLayarPage.vue";
import KonfigurasiJadwalPage from "@/views/Antrian/Konfigurasi/KonfigurasiJadwalDokter/KonfigurasiJadwalPage.vue";
import DaftarPasienPage from "@/views/Antrian/APM/ApmPasienJKN/DaftarPasienPage.vue";
import PasienDataPage from "@/views/Antrian/APM/ApmPasienJKN/PasienDataPage.vue";
import DaftarPasienNonPage from "@/views/Antrian/APM/ApmPasienNonJKN/DaftarPasienNonPage.vue";
import PasienNonDataPage from "@/views/Antrian/APM/ApmPasienNonJKN/PasienNonDataPage.vue";
import CheckinPendaftaranPage from "@/views/Antrian/APM/ApmCheckin/CheckinPendaftaranPage.vue";
import CheckinBerhasilPage from "@/views/Antrian/APM/ApmCheckin/CheckinBerhasilPage.vue";
import PrintAntrianPage from "@/views/Antrian/APM/ApmPrint/PrintAntrianPage.vue";
import PrintDataPage from "@/views/Antrian/APM/ApmPrint/PrintDataPage.vue";
import PasienBerhasilPage from "@/views/Antrian/APM/ApmPasienJKN/PasienBerhasilPage.vue";
import PasienNonPoliPage from "@/views/Antrian/APM/ApmPasienNonJKN/PasienNonPoliPage.vue";
import PasienNonBerhasilPage from "@/views/Antrian/APM/ApmPasienNonJKN/PasienNonBerhasilPage.vue";
import PasienPoliPage from "@/views/Antrian/APM/ApmPasienJKN/PasienPoliPage.vue";
import DaftarFarmasiPage from "@/views/Antrian/APM/APMFarmasi/DaftarFarmasiPage.vue";

// NOTE Page Laboratorium
import OrderPage from "@/views/Laboratorium/OrderLab/OrderPage.vue";
import HasilPemeriksaanPage from "@/views/Laboratorium/HasilPemeriksaan/HasilPemeriksaanPage.vue";
import ExpertisePage from "@/views/Laboratorium/Expertise/ExpertisePage.vue";
import KategoriPemeriksaanPage from "@/views/Laboratorium/Masterdata/KategoriPemeriksaanPage.vue";
import KelompokPemeriksaanPage from "@/views/Laboratorium/Masterdata/KelompokPemeriksaan/KelompokPemeriksaanPage.vue";
import ItemPemeriksaanLabPage from "@/views/Laboratorium/Masterdata/ItemPemeriksaan/ItemPemeriksaanLabPage.vue";
import SpesimenPage from "@/views/Laboratorium/Masterdata/Spesimen/SpesimenPage.vue";
import KunjunganLabPage from "@/views/Laboratorium/Report/KunjunganLabPage.vue";
import WaktuTungguLabPage from "@/views/Laboratorium/Report/WaktuTungguLabPage.vue";
import RekapJumlahPemeriksaanLabPage from "@/views/Laboratorium/Report/RekapJumlahPemeriksaanLabPage.vue";
import TarifLabPage from "@/views/Laboratorium/Masterdata/TarifLabPage.vue";

// NOTE Page Rawat Inap
import RuanganRIPage from "@/views/RawatInap/Page/RuanganPage.vue";
import PerpindahanBangsal from "@/views/RawatInap/Page/PerpindahanBangsal.vue";
import BPJSMonitoringRIPage from "@/views/RawatInap/Page/BPJSMonitoringPage.vue";
import LaporanPageRI from "@/views/RawatInap/Page/LaporanPage.vue";

// NOTE Page IGD
import IGDView from "@/views/IGD/IGDView.vue";
import PasienIgdPage from "@/views/IGD/PasienIgd/PasienIgdPage.vue";
import MonitoringKunjunganPage from "@/views/IGD/BPJS/MonitoringKunjungan.vue";
import MonitoringRiwayatKunjunganPage from "@/views/IGD/BPJS/MonitoringRiwayatKunjungan.vue";
import MonitoringObatKunjunganPage from "@/views/IGD/BPJS/MonitoringObatKunjungan.vue";
import KunjunganIgdPage from "@/views/IGD/Laporan/KunjunganIgd.vue";
import PembatalanDirawatPage from "@/views/IGD/Laporan/PembatalanDirawat.vue";
import RekapTindakanPasien from "@/views/IGD/Laporan/RekapTindakanPasien.vue";
import BPJSPage from "@/views/IGD/BPJS/BPJSPage.vue";
import LaporanIGDPage from "@/views/IGD/Laporan/LaporanPage.vue";

// NOTE FISIOTERAPI DATAMASTER
import BedRuanganPage from "@/views/Fisioterapi/BedRuanganPage.vue";

// NOTE MENU FISIOTERAPI
import OrderFisioterapiPage from "@/views/Fisioterapi/OrderFisioterapiPage.vue";
import PenjadwalanTerapiPage from "@/views/Fisioterapi/PenjadwalanTerapiPage.vue";
import EvaluasiTerapiPage from "@/views/Fisioterapi/EvaluasiTerapiPage.vue";
import BookingTerapiPage from "@/views/Fisioterapi/BookingTerapiPage.vue";

// NOTE FISIOTERAPI/LAPORAN
import KunjunganPage from "@/views/Fisioterapi/Report/KunjunganPage.vue";
import RekapitulasiKunjunganJenisFisioterapiPage from "@/views/Fisioterapi/Report/RekapitulasiKunjunganJenisFisioterapiPage.vue";
import RekapitulasiTerapiPage from "@/views/Fisioterapi/Report/RekapitulasiTerapiPage.vue";
import RekapitulasiPendapatanFisioterapiPage from "@/views/Fisioterapi/Report/RekapitulasiPendapatanFisioterapiPage.vue";

// NOTE Page Inventory
import PurchaseOfSupplierPage from "@/views/Inventory/Page/PengadaanBarang/PembelianBarangSupplier/PurchaseOfSupplierPage.vue";
import VerificationOfGoodsPurchasePage from "@/views/Inventory/Page/PengadaanBarang/VerifikasiPembelianBarangSupplier/VerificationOfGoodsPurchasePage.vue";
import SupplierReturnsPage from "@/views/Inventory/Page/PengadaanBarang/ReturPenggantian/SupplierReturnsPage.vue";
import UnitDeliveryVerificationPage from "@/views/Inventory/Page/PengeluaranBarang/VerifikasiPengirimanUnit/UnitDeliveryVerificationPage.vue";
import UnitOfExpenditurePage from "@/views/Inventory/Page/PengeluaranBarang/PengeluaranUnit/UnitOfExpenditurePage.vue";
import PenerimaanPembelianPage from "@/views/Inventory/Page/PenerimaanBarang/PenerimaanPembelianPage.vue";
import PenerimaanReturUnitPage from "@/views/Inventory/Page/PenerimaanBarang/PenerimaanReturUnitPage.vue";
import SupplierPage from "@/views/Inventory/Page/Datamaster/SupplierPage.vue";
import RiwayatTarifPage from "@/views/Inventory/Page/RiwayatTarif/RiwayatTarifPage.vue";
import ObatExpiredPage from "@/views/Inventory/Page/Laporan/ObatExpiredPage.vue";
import PersediaanPage from "@/views/Inventory/Page/Laporan/PersediaanPage.vue";
import StokAdjustmentPage from "@/views/Inventory/Page/StokAdjustment/StokAdjustmentPage.vue";
import KartustokMutasiPage from "@/views/Inventory/Page/KartustokMutasi/KartustokMutasiPage.vue";
import StokOpnamePage from "@/views/Inventory/Page/StokOpname/StokOpnamePage.vue";
import InventoryView from "@/views/Inventory/InventoryView.vue";

// NOTE Training
import TrainingView from "@/views/Training/TrainingView.vue";
import DaftarKelasPage from "@/views/Training/DaftarKelas/DaftarKelasPage.vue";
import BookingKelasPage from "@/views/Training/BookingKelas/BookingKelasPage.vue";
import SectionKelas from "@/views/Training/Datamaster/SectionKelas.vue";
import SectionRekapitulasi from "@/views/Training/Laporan/SectionRekapitulasi.vue";

// NOTE Laporan
import LaporanView from "@/views/Laporan/LaporanView.vue";
import JumlahKunjunganPage from "@/views/Laporan/JumlahKunjunganPage.vue";
import RekapTindakanPage from "@/views/Laporan/RekapTindakanPage.vue";
import RekapPemeriksaanPage from "@/views/Laporan/RekapPemeriksaanPage.vue";
import RekapPendapatan from "@/views/Laporan/RekapPendapatanPage.vue";
import RekapDiagnosis from "@/views/Laporan/RekapDiagnosisPage.vue";
// !SECTION

// NOTE Test Component
import TestComponentNaya from "@/views/TestComponentNaya.vue";
import TestComponentAdamNew from "@/views/TestComponentAdamNew.vue";
import TestComponentAlex from "@/views/TestComponentAlex.vue";
import TestComponentFahmi from "@/views/TestComponentFahmi.vue";
// import APSOTC from "@/views/Pembayaran/Transaction/APS&OTC.vue";

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

    // SECTION Router RAWAT JALAN
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
      meta: {
        layout: SidebarLayout,
        page: BPJSMonitoringPage,
        requiresAuth: true,
      },
      component: RawatJalanView,
    },
    {
      path: "/rawat-jalan/bpjs/monitoring-riwayat-kunjungan",
      name: "rawat-jalan-bpjs-monitoring-riwayat-kunjungan",
      meta: {
        layout: SidebarLayout,
        page: BPJSMonitoringPage,
        requiresAuth: true,
      },
      component: RawatJalanView,
    },
    {
      path: "/rawat-jalan/bpjs/monitoring-obat-kunjungan",
      name: "rawat-jalan-bpjs-monitoring-obat-kunjungan",
      meta: {
        layout: SidebarLayout,
        page: BPJSMonitoringPage,
        requiresAuth: true,
      },
      component: RawatJalanView,
    },
    {
      path: "/rawat-jalan/laporan/kunjungan-rawat-jalan",
      name: "rawat-jalan-laporan-kunjungan-rawat-jalan",
      meta: { layout: SidebarLayout, page: LaporanPage, requiresAuth: true },
      component: RawatJalanView,
    },
    {
      path: "/rawat-jalan/laporan/pembatalan-poli",
      name: "rawat-jalan-laporan-pembatalan-poli",
      meta: { layout: SidebarLayout, page: LaporanPage, requiresAuth: true },
      component: RawatJalanView,
    },
    {
      path: "/rawat-jalan/laporan/rekap-tindakan-pasien",
      name: "rawat-jalan-laporan-rekap-tindakan-pasien",
      meta: { layout: SidebarLayout, page: LaporanPage, requiresAuth: true },
      component: RawatJalanView,
    },
    // !SECTION

    // SECTION Router Setting
    {
      path: "/setting/profil-faskes",
      name: "setting-profil-faskes",
      meta: {
        layout: SidebarLayout,
        page: ProfilFaskesPage,
        requiresAuth: true,
      },
      component: SettingView,
    },
    {
      path: "/setting/konfigurasi-integrasi",
      name: "setting-konfigurasi-integrasi",
      meta: {
        layout: SidebarLayout,
        page: KonfigurasiIntegrasiPage,
        requiresAuth: true,
      },
      component: SettingView,
    },
    {
      path: "/setting/permission-menu",
      name: "setting-permission-menu",
      meta: {
        layout: SidebarLayout,
        page: PermissionMenuPage,
        requiresAuth: true,
      },
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
      component: SettingView,
    },
    // !SECTION

    // SECTION Router Datamaster
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
      meta: {
        layout: SidebarLayout,
        page: KategoriRuanganPage,
        requiresAuth: true,
      },
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
      meta: {
        layout: SidebarLayout,
        page: KomponenTarifPage,
        requiresAuth: true,
      },
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
      meta: {
        layout: SidebarLayout,
        page: DiagnosisICD10Page,
        requiresAuth: true,
      },
      component: DatamasterView,
    },
    {
      path: "/datamaster/praktisi",
      name: "datamaster-paktisi",
      meta: { layout: SidebarLayout, page: PraktisiPage, requiresAuth: true },
      component: DatamasterView,
    },
    {
      path: "/datamaster/pegawai",
      name: "datamaster-pegawai",
      meta: { layout: SidebarLayout, page: PegawaiPage, requiresAuth: true },
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
      meta: {
        layout: SidebarLayout,
        page: GeneralConsentPage,
        requiresAuth: true,
      },
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
    // !SECTION

    // SECTION Router Admisi
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
      meta: {
        layout: SidebarLayout,
        page: PatientDataPage,
        requiresAuth: true,
      },
      component: AdmisiView,
    },
    {
      path: "/admisi/monitoring-kamar",
      name: "admisi-monitoring-kamar",
      meta: {
        layout: SidebarLayout,
        page: RoomMonitoringPage,
        requiresAuth: true,
      },
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
      meta: {
        pageType: "kunjungan",
        layout: SidebarLayout,
        page: AdmisiReportPage,
        requiresAuth: true,
      },
      component: AdmisiView,
    },
    {
      path: "/admisi/laporan/penjamin",
      name: "admisi-laporan-penjamin",
      meta: {
        pageType: "penjamin",
        layout: SidebarLayout,
        page: AdmisiReportPage,
        requiresAuth: true,
      },
      component: AdmisiView,
    },
    {
      path: "/admisi/laporan/batal-kunjungan",
      name: "admisi-laporan-batal-kunjungan",
      meta: {
        pageType: "batal-kunjungan",
        layout: SidebarLayout,
        page: AdmisiReportPage,
        requiresAuth: true,
      },
      component: AdmisiView,
    },
    {
      path: "/admisi/laporan/status-kamar",
      name: "admisi-laporan-status-kamar",
      meta: {
        pageType: "status-kamar",
        layout: SidebarLayout,
        page: AdmisiReportPage,
        requiresAuth: true,
      },
      component: AdmisiView,
    },
    {
      path: "/admisi/laporan/keperawatan-inap-pasien",
      name: "admisi-laporan-keperawatan-inap-pasien",
      meta: {
        pageType: "keperawatan-inap-pasien",
        layout: SidebarLayout,
        page: AdmisiReportPage,
        requiresAuth: true,
      },
      component: AdmisiView,
    },
    {
      path: "/admisi/laporan/bayi-baru-lahir",
      name: "admisi-laporan-bayi-baru-lahir",
      meta: {
        pageType: "bayi-baru-lahir",
        layout: SidebarLayout,
        page: AdmisiReportPage,
        requiresAuth: true,
      },
      component: AdmisiView,
    },
    {
      path: "/admisi/laporan/rekap-kunjungan",
      name: "admisi-laporan-rekap-kunjungan",
      meta: {
        layout: SidebarLayout,
        page: AdmisiReportPage,
        requiresAuth: true,
      },
      component: AdmisiView,
    },
    // !SECTION

    // SECTION Router Antrian
    {
      path: "/antrian",
      name: "antrian",
      redirect: "/antrian/konfigurasi/jadwal-dokter",
    },
    {
      path: "/antrian/konfigurasi/jadwal-dokter",
      name: "antrian-konfigurasi-jadwal-dokter",
      meta: {
        layout: SidebarLayout,
        page: KonfigurasiJadwalPage,
        requiresAuth: true,
      },
      component: AntrianView,
    },
    {
      path: "/antrian/konfigurasi/layar-antrian",
      name: "antrian-konfigurasi-layar-antrian",
      meta: {
        layout: SidebarLayout,
        page: KonfigurasiLayarPage,
        requiresAuth: true,
      },
      component: AntrianView,
    },
    {
      path: "/antrian/data-antrian",
      name: "antrian-data-antrian",
      meta: {
        layout: SidebarLayout,
        page: DataAntrianPage,
        requiresAuth: true,
      },
      component: AntrianView,
    },
    {
      path: "/antrian/layar",
      name: "antrian-layar",
      meta: {
        layout: SidebarLayout,
        page: LayarAntrianPage,
        requiresAuth: true,
      },
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
      path: "/antrian/apm/aktif/pasien/jkn/data-pasien",
      name: "antrian-apm-aktif-pasien-jkn-data-pasien",
      meta: { layout: DefaultLayout, requiresAuth: true },
      component: PasienDataPage,
    },
    {
      path: "/antrian/apm/aktif/pasien/jkn/poli",
      name: "antrian-apm-aktif-pasien-jkn-poli",
      meta: { layout: DefaultLayout, requiresAuth: true },
      component: PasienPoliPage,
    },
    {
      path: "/antrian/apm/aktif/pasien/jkn/farmasi",
      name: "antrian-apm-aktif-pasien-jkn-farmasi",
      meta: { layout: DefaultLayout, requiresAuth: true },
      component: DaftarFarmasiPage,
    },
    {
      path: "/antrian/apm/aktif/pasien/jkn/berhasil",
      name: "antrian-apm-aktif-pasien-jkn-berhasil",
      meta: { layout: DefaultLayout, requiresAuth: true },
      component: PasienBerhasilPage,
    },
    {
      path: "/antrian/apm/aktif/pasien/non-jkn",
      name: "antrian-apm-aktif-pasien-non-jkn",
      meta: { layout: DefaultLayout, requiresAuth: true },
      component: DaftarPasienNonPage,
    },
    {
      path: "/antrian/apm/aktif/pasien/non-jkn/data-pasien",
      name: "antrian-apm-aktif-pasien-non-jkn-data-pasien",
      meta: { layout: DefaultLayout, requiresAuth: true },
      component: PasienNonDataPage,
    },
    {
      path: "/antrian/apm/aktif/pasien/non-jkn/poli",
      name: "antrian-apm-aktif-pasien-non-jkn-poli",
      meta: { layout: DefaultLayout, requiresAuth: true },
      component: PasienNonPoliPage,
    },
    {
      path: "/antrian/apm/aktif/pasien/non-jkn/berhasil",
      name: "antrian-apm-aktif-pasien-non-jkn-berhasil",
      meta: { layout: DefaultLayout, requiresAuth: true },
      component: PasienNonBerhasilPage,
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
    {
      path: "/antrian/apm/aktif/print/data",
      name: "antrian-apm-aktif-print-data",
      meta: { layout: DefaultLayout, requiresAuth: true },
      component: PrintDataPage,
    },
    // !SECTION

    // SECTION Router Laboratorium
    {
      path: "/laboratorium",
      name: "laboratorium",
      redirect: "/laboratorium/order-lab",
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
      meta: {
        layout: SidebarLayout,
        page: HasilPemeriksaanPage,
        requiresAuth: true,
      },
      component: LaboratoriumView,
    },
    {
      path: "/laboratorium/expertise",
      name: "laboratorium-expertise",
      meta: { layout: SidebarLayout, page: ExpertisePage, requiresAuth: true },
      component: LaboratoriumView,
    },
    {
      path: "/laboratorium/datamaster/kategori-pemeriksaan",
      name: "laboratorium-datamaster/kategori-pemeriksaan",
      meta: {
        layout: SidebarLayout,
        page: KategoriPemeriksaanPage,
        requiresAuth: true,
      },
      component: LaboratoriumView,
    },
    {
      path: "/laboratorium/datamaster/kelompok-pemeriksaan",
      name: "laboratorium-datamaster/kelompok-pemeriksaan",
      meta: {
        layout: SidebarLayout,
        page: KelompokPemeriksaanPage,
        requiresAuth: true,
      },
      component: LaboratoriumView,
    },
    {
      path: "/laboratorium/datamaster/item-pemeriksaan",
      name: "laboratorium-datamaster/item-pemeriksaan",
      meta: {
        layout: SidebarLayout,
        page: ItemPemeriksaanLabPage,
        requiresAuth: true,
      },
      component: LaboratoriumView,
    },
    {
      path: "/laboratorium/datamaster/spesimen",
      name: "laboratorium-datamaster/spesimen",
      meta: { layout: SidebarLayout, page: SpesimenPage, requiresAuth: true },
      component: LaboratoriumView,
    },
    {
      path: "/laboratorium/datamaster/tarif-lab",
      name: "laboratorium-datamaster/tarif-lab",
      meta: { layout: SidebarLayout, page: TarifLabPage, requiresAuth: true },
      component: LaboratoriumView,
    },
    {
      path: "/laboratorium/laporan/kunjungan",
      name: "laboratorium-laporan-kunjungan",
      meta: {
        layout: SidebarLayout,
        page: KunjunganLabPage,
        requiresAuth: true,
      },
      component: LaboratoriumView,
    },
    {
      path: "/laboratorium/laporan/waktu-tunggu",
      name: "laboratorium-laporan-waktu-tunggu",
      meta: {
        layout: SidebarLayout,
        page: WaktuTungguLabPage,
        requiresAuth: true,
      },
      component: LaboratoriumView,
    },
    {
      path: "/laboratorium/laporan/rekap-jumlah",
      name: "laboratorium-laporan-rekap-jumlah",
      meta: {
        layout: SidebarLayout,
        page: RekapJumlahPemeriksaanLabPage,
        requiresAuth: true,
      },
      component: LaboratoriumView,
    },
    // !SECTION

    // SECTION Router Pembayaran
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
    // {
    //   path: "/pembayaran/transaksi",
    //   name: "pembayaran-transaksi",
    //   meta: {
    //     layout: SidebarLayout,
    //     page: TransactionPage,
    //     requiresAuth: true,
    //   },
    //   component: PaymentView,
    // },
    {
      path: "/pembayaran/transaksi/pelayanan",
      name: "pembayaran-transaksi-pelayanan",
      meta: {
        layout: SidebarLayout,
        page: TransactionPage,
        requiresAuth: true,
      },
      component: PaymentView,
    },
    {
      path: "/pembayaran/transaksi/APSOTC",
      name: "pembayaran-transaksi-APSOTC",
      meta: {
        layout: SidebarLayout,
        page: APSOTC,
        requiresAuth: true,
      },
      component: PaymentView,
    },
    {
      path: "/pembayaran/closed-bill",
      name: "pembayaran-closed-bill",
      meta: { layout: SidebarLayout, page: ClosedBillPage, requiresAuth: true },
      component: PaymentView,
    },
    {
      path: "/pembayaran/closed-bill/:billUuid/pelunasan",
      name: "pembayaran-pelunasan",
      meta: {
        layout: SidebarLayout,
        page: PelunasanPage, 
        requiresAuth: true,
      },
      component: PaymentView, 
      props: true
    },
    {
      path: "/pembayaran/laporan/pendapatan",
      name: "pembayaran-laporan-pendapatan",
      meta: {
        layout: SidebarLayout,
        page: LaporanPendapatanPage,
        requiresAuth: true,
      },
      component: PaymentView,
    },
    {
      path: "/pembayaran/laporan/pembayaran",
      name: "pembayaran-laporan-pembayaran",
      meta: {
        layout: SidebarLayout,
        page: PembayaranKunjunganPage,
        requiresAuth: true,
      },
      component: PaymentView,
    },
    {
      path: "/pembayaran/laporan/closing",
      name: "pembayaran-laporan-closing",
      meta: {
        layout: SidebarLayout,
        page: ClosingCashierPage,
        requiresAuth: true,
      },
      component: PaymentView,
    },
    // !SECTION

    // SECTION Router Farmasi
    {
      path: "/farmasi",
      name: "farmasi",
      redirect: "/farmasi/resep-dokter",
    },
    {
      path: "/farmasi/resep-dokter",
      name: "farmasi-resep-dokter",
      meta: {
        layout: SidebarLayout,
        page: DoctorPrescriptionPage,
        requiresAuth: true,
      },
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
      meta: {
        layout: SidebarLayout,
        page: DrugReturnsPage,
        requiresAuth: true,
      },
      component: PharmacyView,
    },
    {
      path: "/farmasi/farmasi-ruangan",
      name: "farmasi-retur-ruangan",
      meta: {
        layout: SidebarLayout,
        page: RoomPharmacyPage,
        requiresAuth: true,
      },
      component: PharmacyView,
    },
    {
      path: "/farmasi/riwayat-transaksi",
      name: "farmasi-riwayat-transaksi",
      meta: {
        layout: SidebarLayout,
        page: TransactionHistoryPage,
        requiresAuth: true,
      },
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
      meta: {
        layout: SidebarLayout,
        page: DrugCategoryPage,
        requiresAuth: true,
      },
      component: PharmacyView,
    },
    {
      path: "/farmasi/datamaster/manufaktur",
      name: "farmasi-datamaster-manufaktur",
      meta: {
        layout: SidebarLayout,
        page: ManufacturingPage,
        requiresAuth: true,
      },
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
      meta: {
        layout: SidebarLayout,
        page: StockLocationPage,
        requiresAuth: true,
      },
      component: PharmacyView,
    },
    {
      path: "/farmasi/datamaster/item-medis",
      name: "farmasi-datamaster-item-medis",
      meta: {
        layout: SidebarLayout,
        page: MedicalItemPage,
        requiresAuth: true,
      },
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
      meta: {
        layout: SidebarLayout,
        page: CompositionPage,
        requiresAuth: true,
      },
      component: PharmacyView,
    },
    {
      path: "/farmasi/datamaster/konfigurasi-harga",
      name: "farmasi-datamaster-konfigurasi-harga",
      meta: {
        layout: SidebarLayout,
        page: PriceConfigurationPage,
        requiresAuth: true,
      },
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
      meta: {
        layout: SidebarLayout,
        page: WaitingTimePage,
        requiresAuth: true,
      },
      component: PharmacyView,
    },
    {
      path: "/farmasi/laporan/rekap-pendapatan-dokter-resep-per-apotik",
      name: "farmasi-laporan-rekap-pendapatan-dokter-resep-per-apotik",
      meta: {
        layout: SidebarLayout,
        page: RevenueRecapPage,
        requiresAuth: true,
      },
      component: PharmacyView,
    },
    // !SECTION

    // SECTION Router Rawat Inap
    {
      path: "/rawat-inap",
      name: "rawat-inap",
      redirect: "/rawat-inap/ruangan",
    },
    {
      path: "/rawat-inap/ruangan",
      name: "rawat-inap-ruangan",
      meta: { layout: SidebarLayout, page: RuanganRIPage, requiresAuth: true },
      component: RawatInapView,
    },
    {
      path: "/rawat-inap/perpindahan-bangsal",
      name: "rawat-inap-perpindahan-bangsal",
      meta: {
        layout: SidebarLayout,
        page: PerpindahanBangsal,
        requiresAuth: true,
      },
      component: RawatInapView,
    },
    {
      path: "/rawat-inap/bpjs/monitoring-kunjungan",
      name: "rawat-inap-bpjs-monitoring-kunjungan",
      meta: {
        layout: SidebarLayout,
        page: BPJSMonitoringRIPage,
        requiresAuth: true,
      },
      component: RawatInapView,
    },
    {
      path: "/rawat-inap/bpjs/monitoring-riwayat-kunjungan",
      name: "rawat-inap-bpjs-monitoring-riwayat-kunjungan",
      meta: {
        layout: SidebarLayout,
        page: BPJSMonitoringRIPage,
        requiresAuth: true,
      },
      component: RawatInapView,
    },
    {
      path: "/rawat-inap/bpjs/monitoring-obat-kunjungan",
      name: "rawat-inap-bpjs-monitoring-obat-kunjungan",
      meta: {
        layout: SidebarLayout,
        page: BPJSMonitoringRIPage,
        requiresAuth: true,
      },
      component: RawatInapView,
    },
    {
      path: "/rawat-inap/laporan/kunjungan-rawat-inap",
      name: "rawat-inap-laporan-kunjungan-rawat-inap",
      meta: { layout: SidebarLayout, page: LaporanPageRI, requiresAuth: true },
      component: RawatInapView,
    },
    {
      path: "/rawat-inap/laporan/perpindahan-pasien",
      name: "rawat-inap-laporan-perpindahan-pasien",
      meta: { layout: SidebarLayout, page: LaporanPageRI, requiresAuth: true },
      component: RawatInapView,
    },
    {
      path: "/rawat-inap/laporan/pembatalan-dirawat",
      name: "rawat-inap-laporan-pembatalan-dirawat",
      meta: { layout: SidebarLayout, page: LaporanPageRI, requiresAuth: true },
      component: RawatInapView,
    },
    {
      path: "/rawat-inap/laporan/rekap-tindakan-pasien",
      name: "rawat-inap-laporan-rekap-tindakan-pasien",
      meta: { layout: SidebarLayout, page: LaporanPageRI, requiresAuth: true },
      component: RawatInapView,
    },
    // !SECTION

    // SECTION Router IGD
    {
      path: "/igd",
      name: "igd",
      redirect: "/igd/pasien-igd",
    },
    {
      path: "/igd/pasien-igd",
      name: "igd-pasien-igd",
      meta: { layout: SidebarLayout, page: PasienIgdPage, requiresAuth: true },
      component: IGDView,
    },
    {
      path: "/igd/bpjs/monitoring-kunjungan",
      name: "igd-bpjs-monitoring-kunjungan",
      meta: { layout: SidebarLayout, page: BPJSPage, requiresAuth: true },
      component: IGDView,
    },
    {
      path: "/igd/bpjs/monitoring-riwayat-kunjungan",
      name: "igd-bpjs-monitoring-riwayat-kunjungan",
      meta: { layout: SidebarLayout, page: BPJSPage, requiresAuth: true },
      component: IGDView,
    },
    {
      path: "/igd/bpjs/monitoring-obat-kunjungan",
      name: "igd-bpjs-monitoring-obat-kunjungan",
      meta: { layout: SidebarLayout, page: BPJSPage, requiresAuth: true },
      component: IGDView,
    },
    {
      path: "/igd/laporan/kunjungan-igd",
      name: "igd-laporan-kunjungan-igd",
      meta: { layout: SidebarLayout, page: LaporanIGDPage, requiresAuth: true },
      component: IGDView,
    },
    {
      path: "/igd/laporan/pembatalan-dirawat",
      name: "igd-laporan-pembatalan-dirawat",
      meta: { layout: SidebarLayout, page: LaporanIGDPage, requiresAuth: true },
      component: IGDView,
    },
    {
      path: "/igd/laporan/rekap-tindakan-pasien",
      name: "igd-laporan-rekap-tindakan-pasien",
      meta: { layout: SidebarLayout, page: LaporanIGDPage, requiresAuth: true },
      component: IGDView,
    },
    // !SECTION

    // SECTION FISIOTERAPI
    {
      path: "/fisioterapi",
      name: "fisioterapi",
      redirect: "/fisioterapi/order-fisioterapi",
    },
    {
      path: "/fisioterapi/order-fisioterapi",
      name: "fisioterapi-order-fisioterapi",
      meta: {
        layout: SidebarLayout,
        page: DoctorPrescriptionPage,
        requiresAuth: true,
      },
      component: FisioterapiView,
    },
    // NOTE FISIOTERAPI DATAMASTER
    {
      path: "/fisioterapi/datamaster/bed-ruangan",
      name: "fisioterapi-datamaster-bed-ruangan",
      meta: { layout: SidebarLayout, page: BedRuanganPage, requiresAuth: true },
      component: FisioterapiView,
    },
    // NOTE ORDER FISIOTERAPI
    {
      path: "/fisioterapi/order-fisioterapi",
      name: "fisioterapi-order-fisioterapi",
      meta: {
        layout: SidebarLayout,
        page: OrderFisioterapiPage,
        requiresAuth: true,
      },
      component: FisioterapiView,
    },
    {
      path: "/fisioterapi/penjadwalan-fisioterapi",
      name: "fisioterapi-penjadwalan-fisioterapi",
      meta: {
        layout: SidebarLayout,
        page: PenjadwalanTerapiPage,
        requiresAuth: true,
      },
      component: FisioterapiView,
    },
    {
      path: "/fisioterapi/evaluasi-terapi",
      name: "fisioterapi-evaluasi-terapi",
      meta: {
        layout: SidebarLayout,
        page: EvaluasiTerapiPage,
        requiresAuth: true,
      },
      component: FisioterapiView,
    },
    {
      path: "/fisioterapi/booking-terapi",
      name: "fisioterapi-booking-terapi",
      meta: {
        layout: SidebarLayout,
        page: BookingTerapiPage,
        requiresAuth: true,
      },
      component: FisioterapiView,
    },
    // NOTE FISIOTERAPI LAPORAN
    {
      path: "/fisioterapi/laporan/kunjungan",
      name: "fisioterapi-laporan-kunjungan",
      meta: { layout: SidebarLayout, page: KunjunganPage, requiresAuth: true },
      component: FisioterapiView,
    },
    {
      path: "/fisioterapi/laporan/rekapitulasi-kunjungan-jenis-fisioterapi",
      name: "fisioterapi-laporan-rekapitulasi-kunjungan-jenis-fisioterapi",
      meta: {
        layout: SidebarLayout,
        page: RekapitulasiKunjunganJenisFisioterapiPage,
        requiresAuth: true,
      },
      component: FisioterapiView,
    },
    {
      path: "/fisioterapi/laporan/rekapitulasi-terapi",
      name: "fisioterapi-laporan-rekapitulasi-terapi",
      meta: {
        layout: SidebarLayout,
        page: RekapitulasiTerapiPage,
        requiresAuth: true,
      },
      component: FisioterapiView,
    },
    {
      path: "/fisioterapi/laporan/rekapitulasi-pendapatan-fisioterapi",
      name: "fisioterapi-laporan-rekapitulasi-pendapatan-fisioterapi",
      meta: {
        layout: SidebarLayout,
        page: RekapitulasiPendapatanFisioterapiPage,
        requiresAuth: true,
      },
      component: FisioterapiView,
    },
    // !SECTION

    // SECTION Inventory
    {
      path: "/inventory",
      name: "inventory",
      redirect: "/inventory/pengadaan-barang/pembelian-barang-supplier",
    },
    {
      path: "/inventory/pengadaan-barang/pembelian-barang-supplier",
      name: "inventory-pengadaan-barang-pembelian-barang-supplier",
      meta: {
        layout: SidebarLayout,
        page: PurchaseOfSupplierPage,
        requiresAuth: true,
      },
      component: InventoryView,
    },
    {
      path: "/inventory/pengadaan-barang/verifikasi-pembelian-barang-supplier",
      name: "inventory-pengadaan-barang-verifikasi-pembelian-barang-supplier",
      meta: {
        layout: SidebarLayout,
        page: VerificationOfGoodsPurchasePage,
        requiresAuth: true,
      },
      component: InventoryView,
    },
    {
      path: "/inventory/pengadaan-barang/retur-penggantian-barang-supplier",
      name: "inventory-pengadaan-barang-retur-penggantian-barang-supplier",
      meta: {
        layout: SidebarLayout,
        page: SupplierReturnsPage,
        requiresAuth: true,
      },
      component: InventoryView,
    },
    {
      path: "/inventory/pengeluaran-barang/verifikasi-pengiriman-unit",
      name: "inventory-pengeluaran-barang-verifikasi-pengiriman-unit",
      meta: {
        layout: SidebarLayout,
        page: UnitDeliveryVerificationPage,
        requiresAuth: true,
      },
      component: InventoryView,
    },
    {
      path: "/inventory/pengeluaran-barang/pengeluaran-unit",
      name: "inventory-pengeluaran-barang-pengeluaran-unit",
      meta: {
        layout: SidebarLayout,
        page: UnitOfExpenditurePage,
        requiresAuth: true,
      },
      component: InventoryView,
    },
    {
      path: "/inventory/penerimaan-barang/penerimaan-pembelian",
      name: "inventory-penerimaan-barang-penerimaan-pembelian",
      meta: {
        layout: SidebarLayout,
        page: PenerimaanPembelianPage,
        requiresAuth: true,
      },
      component: InventoryView,
    },
    {
      path: "/inventory/penerimaan-barang/penerimaan-retur-unit",
      name: "inventory-penerimaan-barang-penerimaan-retur-unit",
      meta: {
        layout: SidebarLayout,
        page: PenerimaanReturUnitPage,
        requiresAuth: true,
      },
      component: InventoryView,
    },
    {
      path: "/inventory/datamaster/supplier",
      name: "inventory-datamaster-supplier",
      meta: {
        layout: SidebarLayout,
        page: SupplierPage,
        requiresAuth: true,
      },
      component: InventoryView,
    },
    {
      path: "/inventory/riwayat-tarif",
      name: "inventory-riwayat-tarif",
      meta: {
        layout: SidebarLayout,
        page: RiwayatTarifPage,
        requiresAuth: true,
      },
      component: InventoryView,
    },
    {
      path: "/inventory/kartustok-mutasi",
      name: "inventory-kartustok-mutasi",
      meta: {
        layout: SidebarLayout,
        page: KartustokMutasiPage,
        requiresAuth: true,
      },
      component: InventoryView,
    },
    {
      path: "/inventory/stok-opname",
      name: "inventory-stok-opname",
      meta: { layout: SidebarLayout, page: StokOpnamePage, requiresAuth: true },
      component: InventoryView,
    },
    {
      path: "/inventory/stok-adjustment",
      name: "inventory-stok-adjustment",
      meta: {
        layout: SidebarLayout,
        page: StokAdjustmentPage,
        requiresAuth: true,
      },
      component: InventoryView,
    },
    {
      path: "/inventory/laporan/obat-expired",
      name: "inventory-laporan-obat-expired",
      meta: {
        layout: SidebarLayout,
        page: ObatExpiredPage,
        requiresAuth: true,
      },
      component: InventoryView,
    },
    {
      path: "/inventory/laporan/persediaan",
      name: "inventory-laporan-persediaan",
      meta: { layout: SidebarLayout, page: PersediaanPage, requiresAuth: true },
      component: InventoryView,
    },
    // !SECTION

    // SECTION Training
    {
      path: "/training",
      name: "training",
      redirect: "/training/daftar-kelas",
    },
    {
      path: "/training/daftar-kelas",
      name: "training-daftar-kelas",
      meta: {
        layout: SidebarLayout,
        page: DaftarKelasPage,
        requiresAuth: true,
      },
      component: TrainingView,
    },
    {
      path: "/training/booking-kelas",
      name: "training-booking-kelas",
      meta: {
        layout: SidebarLayout,
        page: BookingKelasPage,
        requiresAuth: true,
      },
      component: TrainingView,
    },
    {
      path: "/training/datamaster/kelas",
      name: "training-datamaster-kelas",
      meta: { layout: SidebarLayout, page: SectionKelas, requiresAuth: true },
      component: TrainingView,
    },
    {
      path: "/training/laporan/rekapitulasi",
      name: "training-laporan-rekapitulasi",
      meta: {
        layout: SidebarLayout,
        page: SectionRekapitulasi,
        requiresAuth: true,
      },
      component: TrainingView,
    },
    // !SECTION

    // SECTION Laporan
    {
      path: "/laporan",
      name: "laporan",
      redirect: "/laporan/jumlah-kunjungan",
    },
    {
      path: "/laporan/jumlah-kunjungan",
      name: "laporan-jumlah-kunjungan",
      meta: {
        layout: SidebarLayout,
        page: JumlahKunjunganPage,
        requiresAuth: true,
      },
      component: LaporanView,
    },
    {
      path: "/laporan/rekapitulasi-tindakan",
      name: "laporan-rekapitulasi-tindakan",
      meta: {
        layout: SidebarLayout,
        page: RekapTindakanPage,
        requiresAuth: true,
      },
      component: LaporanView,
    },
    {
      path: "/laporan/rekapitulasi-pemeriksaan-lab",
      name: "laporan-rekapitulasi-pemeriksaan-lab",
      meta: {
        layout: SidebarLayout,
        page: RekapPemeriksaanPage,
        requiresAuth: true,
      },
      component: LaporanView,
    },
    {
      path: "/laporan/rekapitulasi-pendapatan",
      name: "laporan-rekapitulasi-pendapatan",
      meta: {
        layout: SidebarLayout,
        page: RekapPendapatan,
        requiresAuth: true,
      },
      component: LaporanView,
    },
    {
      path: "/laporan/rekapitulasi-diagnosis",
      name: "laporan-rekapitulasi-diagnosis",
      meta: { layout: SidebarLayout, page: RekapDiagnosis, requiresAuth: true },
      component: LaporanView,
    },
    // !SECTION

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
  } else if (to.path == "/login") {
    if (isAuthenticated()) {
      next({
        path: "/dashboard",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
