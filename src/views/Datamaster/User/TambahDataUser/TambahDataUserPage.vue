<script lang="ts" setup>
import { ref, watch, defineProps, computed, onMounted } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import { usePraktisiStore } from "@/stores/datamaster/praktisi";
import { useFaskesStore } from "@/stores/datamaster/faskes";
import { useRoleStore } from "@/stores/datamaster/role";
import CustomBreadCrumb from "@/components/Base/CustomBreadCrumb.vue";
import CustomSelect from "@/components/Base/CustomSelect.vue";
import CustomTextfield from "@/components/Base/CustomTextfield.vue";
import CustomSwitch from "@/components/Base/CustomSwitch.vue";
import CustomButton from "@/components/Base/CustomButton.vue";
import CustomAccordion from "@/components/Base/CustomAccordion.vue";
import CustomCheckbox from "@/components/Base/CustomCheckbox.vue";
import CustomInfoRow from "@/components/Base/CustomInfoRow.vue";
import CustomInputNumber from "@/components/Base/CustomInputNumber.vue";

const praktisiStore = usePraktisiStore();
const faskesStore = useFaskesStore();
const roleStore = useRoleStore();
const praktisiPayload = ref<any[]>([]);
const faskesPayload = ref<any[]>([]);
const rolePayload = ref<any[]>([]);
const emit = defineEmits(["back"]);
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-])|(\\([0-9]{2,3}\\)[ \\-])|([0-9]{2,4})[ \\-])?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const schema = computed(() =>
  toTypedSchema(
    yup.object({
      faskesUuid: yup.string(),
      praktisiUuid: yup.string(),
      phone: yup
        .string()
        .required("No. Handhpone harus diisi")
        .matches(phoneRegExp, "Format tidak sesuai"),
      email: yup
        .string()
        .required("Email harus diisi")
        .email("Format email tidak sesuai")
        .required("Email harus diisi"),
      username: yup.string().required("Username harus diisi"),
      password: yup
        .string()
        .min(8, "Password minimal 8 karakter")
        .matches(
          /[A-Z]/,
          "Password harus mengandung setidaknya satu huruf besar"
        )
        .matches(
          /[a-z]/,
          "Password harus mengandung setidaknya satu huruf kecil"
        )
        .matches(/\d/, "Password harus mengandung setidaknya satu angka")
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Password harus mengandung setidaknya satu simbol khusus"
        )
        .required("Password harus diisi"),
      confirmPassword: yup
        .string()
        .min(8, "Password minimal 8 digit")
        .matches(
          /[A-Z]/,
          "Password harus mengandung setidaknya satu huruf besar"
        )
        .matches(
          /[a-z]/,
          "Password harus mengandung setidaknya satu huruf kecil"
        )
        .matches(/\d/, "Password harus mengandung setidaknya satu angka")
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Password harus mengandung setidaknya satu simbol khusus"
        )
        .required("Password harus diisi")
        .oneOf([yup.ref("password")], "Password tidak sama"),
      status: yup.bool(),
      permission: yup.bool(),
    })
  )
);

const { errors, handleSubmit, defineField, resetForm, setValues } = useForm({
  validationSchema: schema,
});

const [faskesUuid] = defineField("faskesUuid");
const [praktisiUuid] = defineField("praktisiUuid");
const [phone] = defineField("phone");
const [email] = defineField("email");
const [username] = defineField("username");
const [password] = defineField("password");
const [confirmPassword] = defineField("confirmPassword");
const [status] = defineField("status");
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const dataBreadHome = ref({ label: "User", home: true });
const dataBreadCrumb = ref([{ label: "Tambah Data" }]);

const fetchPraktisi = async () => {
  try {
    const response = await praktisiStore.getAktifApi();
    if (response && response.payload) {
      praktisiPayload.value = response.payload;
    } else {
      praktisiPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch praktisi", error);
    praktisiPayload.value = [];
  }
};
const fetchFaskes = async () => {
  try {
    const response = await faskesStore.getAktifApi();
    if (response && response.payload) {
      faskesPayload.value = response.payload;
    } else {
      faskesPayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch faskes", error);
    faskesPayload.value = [];
  }
};
const fetchRole = async () => {
  try {
    const response = await roleStore.getAktifApi();
    if (response && response.payload) {
      rolePayload.value = response.payload;
    } else {
      rolePayload.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch role", error);
    rolePayload.value = [];
  }
};

onMounted(() => {
  fetchPraktisi();
  fetchFaskes();
  fetchRole();
});

const permissionsItem = ref([
  {
    module: "Antrian",
    sub_modules: [
      {
        name: "Konfigurasi",
        allows: ["READ", "CREATE", "UPDATE", "DELETE"],
      },
      {
        name: "Data Antrian",
        allows: ["READ"],
      },
      {
        name: "Layar",
        allows: ["READ"],
      },
      {
        name: "Apm",
        allows: [
          "CREATE PASIEN JKN",
          "CREATE PASIEN NON-JKN",
          "CHECKIN",
          "PRINT",
        ],
      },
    ],
  },
  {
    module: "Admisi",
    sub_modules: [
      {
        name: "Antrian",
        allows: ["PANGGIL", "LEWATI", "PROSES", "SELESAI", "CHECKIN"],
      },
      {
        name: "RJ",
        allows: [
          "READ",
          "CREATE PASIEN RJ",
          "CREATE GENERAL CONSENT",
          "UPDATE ADMISI RJ",
          "UPDATE GENERAl CONSENT",
          "CETAK KUNJUNGAN",
          "CETAK LABEL",
          "BATAL RJ",
        ],
      },
      {
        name: "RI",
        allows: [
          "READ",
          "CREATE BAYI BARU LAHIR",
          "CREATE GENERAL CONSENT",
          "UPDATE ADMISI RI",
          "UPDATE GENERAL CONSENT",
          "BATAL REQUEST RI",
          "CETAK GENERAL CONSENT",
          "CETAK KUNJUNGAN",
          "CETAK LABEL",
        ],
      },
      {
        name: "IGD",
        allows: [
          "READ",
          "CREATE PASIEN IGD",
          "CREATE GENERAL CONSENT",
          "UPDATE ADMISI IGD",
          "UPDATE GENERAL CONSENT",
          "BATAL IGD",
          "CETAK GENERAL CONSENT",
          "CETAK KUNJUNGAN",
          "CETAK LABEL",
        ],
      },
      {
        name: "SEP",
        allows: [
          "READ",
          "CREATE SEP",
          "CREATE SEP MANUAL",
          "DELETE SEP",
          "SIMPAN SEP MANUAL",
        ],
      },
      {
        name: "Data Pasien",
        allows: [
          "READ",
          "CREATE PASIEN",
          "UPDATE BERKAS RM",
          "UPDATE DATA PASIEN",
          "DELETE PASIEN",
          "DELETE BERKAS RM",
          "IMPORT DATA PASIEN",
          "CETAK KARTU PASIEN",
          "UPLOAD BERKAS RM",
          "PREVIEW BERKAS RM",
          "GENERAL CONSENT",
        ],
      },
      {
        name: "Monitoring Kamar",
        allows: ["READ", "SETTING BED", "CREATE BED", "DELETE BED"],
      },
      {
        name: "Laporan Admisi",
        features: [
          {
            name: "Kunjungan",
            allows: ["READ", "CETAK LAPORAN"],
          },
          {
            name: "penjamin",
            allows: ["READ", "CETAK LAPORAN"],
          },
          {
            name: "Batal Kunjungan",
            allows: ["READ", "CETAK LAPORAN"],
          },
          {
            name: "Status kamar",
            allows: ["READ", "CETAK LAPORAN"],
          },
          {
            name: "Keperawatan Inap Pasien",
            allows: ["READ", "CETAK LAPORAN"],
          },
          {
            name: "Bayi Baru Lahir",
            allows: ["READ", "CETAK LAPORAN"],
          },
          {
            name: "Rekap Jumlah Pasien BPJS",
            allows: ["READ", "CETAK LAPORAN"],
          },
        ],
      },
    ],
  },
  {
    module: "Rawat Jalan",
    sub_modules: [
      {
        name: "Antrian",
        allows: ["PANGGIL", "LEWATI", "PROSSES", "SELESAI"],
      },
      {
        name: "Poli",
        allows: ["READ", "BATAL KUNJUNGAN"],
      },
      {
        name: "BPJS-PCARE",
        features: [
          {
            name: "Monitoring Kunjungan",
            allows: ["READ", "CETAK BPJS"],
          },
          {
            name: "Monitoring Riwayat Kunjungan",
            allows: ["READ", "CETAK BPJS"],
          },
          {
            name: "Monitoring Obat Kunjungan",
            allows: ["READ", "CETAK BPJS"],
          },
        ],
      },
      {
        name: "Laporan Rawat Jalan",
        features: [
          {
            name: "Kunjungan",
            allows: ["READ", "CETAK LAPORAN"],
          },
          {
            name: "Pembatalan Poli",
            allows: ["READ", "CETAK LAPORAN"],
          },
          {
            name: "rekap Pembatalan Pasien",
            allows: ["READ", "CETAK LAPORAN"],
          },
        ],
      },
      {
        name: "RME",
        features: [
          {
            name: "Rekap Medis",
            allows: [
              "READ",
              "UPDATE PEMERIKSAAN GIGI",
              "UPDATE PEMERIKSAAN MATA",
              "UPDATE PEMERIKSAAN FISIK",
              "UPDATE DERAJAT LUKA BAKAR",
              "UPDATE PEMERIKSAAN DAN TINDAKAN",
              "UPDATE REKAM MEDIS",
              "CETAK LABEL",
              "TUTUP SEMUA FORM",
              "BUKA SEMUA FORM",
              "RIWAYAT",
              "SEMBUNYIKAN DETAIL PASIEN",
              "TAMPILKAN DETAIL PASIEN",
            ],
          },
          {
            name: "Asemen",
            allows: [
              "READ",
              "CETAK LABEL",
              "RIWAYAT",
              "SEMBUNYIKAN DETAIL PASIEN",
              "TIDAK ADA ALERGI",
              "CREATE ALERGI",
              "CREATE ANAMNESIS",
              "CREATE TANDA VITAL",
              "CREATE ANTROPOMETRI",
              "CREATE ASESMEN NYERI",
              "CREATE KESADARAN",
              "CREATE PEMERIKSAAN FISIK",
              "CREATE PEMERIKSAAN GIGI",
              "CREATE PEMERIKSAAN MATA",
              "CREATE DERAJAT LUKA BAKAR",
              "CREATE CATATAN HASIL PENUNJANG",
              "CREATE DIAGNOSIS DOKTER",
              "CREATE ASUHAN KEPERAWATAN",
              "CREAT CATATAN PERAWAT",
              "CREATE INSTRUKSI MEDIS",
              "CREATE PEMERIKSAAN DAN TINDAKAN",
            ],
          },
          {
            name: "SOAP",
            allows: [
              "READ",
              "CETAK LABEL",
              "RIWAYAT",
              "SEMBUNYIKAN DETAIL PASIEN",
              "TUTUP SEMUA FORM",
              "BUKA SEMUA FORM",
              "CREATE OBAT",
              "CREATE OBAT RACIKAN",
              "UPDATE OBAT",
              "DELETE OBAT",
            ],
          },
          {
            name: "Akses Dan Penunjang",
            allows: [
              "READ",
              "CETAK LABEL",
              "RIWAYAT",
              "SEMBUNYIKAN DETAIL PASIEN",
              "CREATE ALKES",
              "CREATE ALKES MULTIPLE",
              "DELETE LIST ALKES",
              "DELETE ITEM ALKES MULTIPLE",
              "DELETE SEMUA",
              "AMBIL ITEM",
              "SIMPAN ORDER",
              "CREATE TINDAKAN",
              "DELETE LIST TINDAKAN",
            ],
          },
          {
            name: "Inform Consent",
            allows: [
              "READ",
              "CETAK LABEL",
              "RIWAYAT",
              "SEMBUNYIKAN DETAIL PASIEN",
              "CREATE",
            ],
          },
          {
            name: "Unggah Berkas",
            allows: [
              "READ",
              "UPDATE FILE TERUNGGAH",
              "DELETE FILE TERUNGGAH",
              "CETAK LABEL",
              "RIWAYAT",
              "MENYEMBUNYIKAN DETAIL PASIEN",
              "CARI FILE",
              "TAMPILAN LIST",
              "TAMPILAN GRID",
            ],
          },
          {
            name: "Resume Dan Discarge",
            allows: [
              "READ",
              "CETAK LABEL",
              "RIWAYAT",
              "SEMBUNYIKAN DETAIL PASIEN",
              "TUTUP SEMUA FORM",
              "BUKA SEMUA FORM",
              "CETAK RESUME MEDIS",
              "SIMPAN RESUME MEDIS",
              "DISCHARGE",
            ],
          },
          {
            name: "Cetak Hasil Dan Surat",
            allows: [
              "READ",
              "CETAK LABEL",
              "RIWAYAT",
              "SEMBUNYIKAN DETAIL PASIEN",
              "TUTUP SEMUA FORM",
              "BUKA SEMUA FORM",
              "CETAK HASIL",
              "CREATE SURAT",
              "DELETE SURAT KETERANGAN",
              "CETAK SURAT",
            ],
          },
        ],
      },
    ],
  },
  {
    module: "Rawat Inap",
    sub_modules: [
      {
        name: "Rawat Inap",
        allows: ["READ", "BATAL DIRAWAT"],
      },
      {
        name: "Perpindahan Bangsal",
        allows: ["READ", "BATAL TERIMA", "SETUJU DAN TERIMA"],
      },
      {
        name: "BPJS-PCARE",
        features: [
          {
            name: "Monitoring Kunjungan",
            allows: ["READ", "CETAK BPJS"],
          },
          {
            name: "Monitoring Riwayat Kunjungan",
            allows: ["READ", "CETAK BPJS"],
          },
          {
            name: "Monitoring Obat Kunjungan",
            allows: ["READ", "CETAK BPJS"],
          },
        ],
      },
      {
        name: "Laporan",
        features: [
          {
            name: "Monitoring Rawat Inap",
            allows: ["READ", "CETAK LAPORAN"],
          },
          {
            name: "Perpindahan Pasien",
            allows: ["READ", "CETAK LAPORAN"],
          },
          {
            name: "Pembatalan Berobat",
            allows: ["READ", "CETAK LAPORAN"],
          },
          {
            name: "Rekap Tindakan Pasien",
            allows: ["READ", "CETAK LAPORAN"],
          },
        ],
      },
      {
        name: "Detail Pasien",
        features: [
          {
            name: "Rekam Medis",
            allows: [
              "READ",
              "UPDATE PEMERIKSAAN FISIK",
              "UPDATE DERAJAT LUKA BAKAR",
              "UPDATE PEMERIKSAAN DAN TINDAKAN",
              "UPDATE REKAM MEDIS",
              "DELETE SESI",
              "CETAK LABEL",
              "SEMBUNYIKAN DETAIL PASIEN",
              "TAMPILKAN DETAIL PASIEN",
              "TUTUP SEMUA FORM",
              "BUKA SEMUA FORM",
              "RIWAYAT",
            ],
          },
          {
            name: "Asesmen",
            allows: [
              "READ",
              "CETAK LABEL",
              "RIWAYAT",
              "TIDAK ADA ALERGI",
              "CREATE ALERGI",
              "CREATE ANAMNESIS",
              "CREATE TANDA VITAL",
              "CREATE ANTROPOMETRI",
              "CREATE ASESMEN NYERI",
              "CREATE KESADARAN",
              "CREATE PEMERIKSAAN FISIK",
              "CREATE DERAJAT LUKA BAKAR",
              "CREATE CATATAN HASIL PENUNJANG",
              "CREATE DIAGNOSIS DOKTER",
              "CREATE ASUHAN KEPERAWATAN",
              "CREATE CATATAN PERAWAT",
              "CREATE INSTRUKSI MEDIS",
              "CREATE PEMERIKSAAN DAN TINDAKAN",
            ],
          },
          {
            name: "SOAP Dokter",
            allows: [
              "READ",
              "CETAK LABEL",
              "RIWAYAT",
              "SEMBUNYIKAN DETAIL PASIEN",
              "TUTUP SEMUA FORM",
              "BUKA SEMUA FORM",
              "CREATE OBAT",
              "CREATE OBAT RACIKAN",
              "UPDATE OBAT",
              "DELETE OBAT",
            ],
          },
          {
            name: "Inform Consent",
            allows: [
              "READ",
              "CETAK LABEL",
              "RIWAYAT",
              "TUTUP SEMUA FORM",
              "BUKA SEMUA FORM",
              "CREATE",
            ],
          },
          {
            name: "Alkes Dan Penunjang",
            allows: [
              "READ",
              "CETAK LABEL",
              "RIWAYAT",
              "SEMBUNYIKAN DETAIL PASIEN",
              "CREATE ALKES",
              "CREATE ALKES MULTIPLE",
              "DELETE ALKES",
              "DELETE ALKES MULTIPLE",
              "DELETE SEMUA",
              "AMBIL ITEM",
              "SIMPAN ORDER",
              "CREATE TINDAKAN",
            ],
          },
          {
            name: "Perpindahan",
            allows: [
              "READ",
              "CETAK LABEL",
              "RIWAYAT",
              "SEMBUNYIKAN DETAIL PASIEN",
              "PINDAHKAN PASIEN",
            ],
          },
          {
            name: "FPO",
            allows: [
              "READ",
              "CREATE PEMBERIAN OBAT",
              "UPDATE PEMBERIAN OBAT",
              "CETAK LABEL",
              "RIWAYAT",
              "SEMBUNYIKAN DETAIL PASIEN",
              "TANGGAL PEMERIKSAAN",
              "TANGGAL PEMBERIAN OBAT",
            ],
          },
          {
            name: "Unggah Berkas",
            allows: [
              "READ",
              "UPDATE FILE TERUNGGAH",
              "DELETE FILE TERUNGGAH",
              "CETAK LABEL",
              "RIWAYAT",
              "SEMBUNYIKAN DETAIL PASIEN",
              "CARI FILE",
              "TAMPILAN LIST",
              "TAMPILAN GRID",
            ],
          },
          {
            name: "Resume & Discharge",
            allows: [
              "READ",
              "CETAK LABEL",
              "RIWAYAT",
              "SEMBUNYIKAN DETAIL PASIEN",
              "TUTUP SEMUA FORM",
              "BUKA SEMUA FORM",
              "CETAK RESUME MEDIS",
              "SIMPAN RESUME MEDIS",
              "DISCHARGE",
            ],
          },
          {
            name: "Cetak Hasil & Surat",
            allows: [
              "READ",
              "CETAK LABEL",
              "RIWAYAT",
              "SEMBUNYIKAN DETAIL PASIEN",
              "TUTUP SEMUA FORM",
              "BUKA SEMUA FORM",
              "CETAK HASIL",
              "CREATE SURAT",
              "DELETE SURAT KETERANGAN",
              "CETAK SURAT",
            ],
          },
        ],
      },
    ],
  },
  {
    module: "IGD",
    sub_modules: [
      {
        name: "IGD",
        allows: ["READ", "BATAL DIRAWAT"],
      },
      {
        name: "BPJS-PCARE",
        features: [
          {
            name: "Monitoring Kunjungan",
            allows: ["READ", "CETAK BPJS"],
          },
          {
            name: "Monitoring Riwayat Kunjungan",
            allows: ["READ", "CETAK BPJS"],
          },
          {
            name: "Monitoring Obat Kunjungan",
            allows: ["READ", "CETAK BPJS"],
          },
        ],
      },
      {
        name: "Laporan IGD",
        features: [
          {
            name: "Kunjungan",
            allows: ["READ", "CETAK LAPORAN"],
          },
          {
            name: "Pembatalan Berobat",
            allows: ["READ", "CETAK LAPORAN"],
          },
          {
            name: "Rekap Tindakan Pasien",
            allows: ["READ", "CETAK LAPORAN"],
          },
        ],
      },
      {
        name: "Detail Pasien",
        features: [
          {
            name: "Rekam Medis",
            allows: [
              "READ",
              "UPDATE PEMERIKSAAN FISIK",
              "UPDATE DERAJAT LUKA BAKAR",
              "UPDATE PEMERIKSAAN DAN TINDAKAN",
              "UPDATE REKAM MEDIS",
              "DELETE SESI",
              "CETAK LABEL",
              "SEMBUNYIKAN DETAIL PASIEN",
              "TAMPILKAN DETAIL PASIEN",
              "TUTUP SEMUA FORM",
              "BUKA SEMUA FORM",
              "RIWAYAT",
            ],
          },
          {
            name: "Asesmen",
            allows: [
              "READ",
              "CETAK LABEL",
              "SEMBUNYIKAN DETAIL PASIEN",
              "RIWAYAT",
              "TIDAK ADA ALERGI",
              "CREATE ALERGI",
              "CREATE ANAMNESIS IGD",
              "CREATE TRIASE",
              "CREATE TANDA VITAL",
              "CREATE ANTROPOMETRI",
              "CREATE ASESMEN NYERI",
              "CREATE KESADARAN",
              "CREATE PEMERIKSAAN FISIK",
              "CREATE DERAJAT LUKA BAKAR",
              "CREATE CATATAN HASIL PENUNJANG",
              "CREATE DIAGNOSIS DOKTER",
              "CREATE ASUHAN KEPERAWATAN",
              "CREATE CATATAN PERAWAT",
              "CREATE INSTRUKSI MEDIS",
              "CREATE PEMERIKSAAN DAN TINDAKAN",
            ],
          },
          {
            name: "SOAP Dokter",
            allows: [
              "READ",
              "CETAK LABEL",
              "RIWAYAT",
              "SEMBUNYIKAN DETAIL PASIEN",
              "TUTUP SEMUA FORM",
              "BUKA SEMUA FORM",
              "CREATE OBAT",
              "CREATE OBAT RACIKAN",
              "UPDATE OBAT",
              "DELETE OBAT",
            ],
          },

          {
            name: "Alkes Dan Penunjang",
            allows: [
              "READ",
              "CETAK LABEL",
              "RIWAYAT",
              "SEMBUNYIKAN DETAIL PASIEN",
              "CREATE ALKES",
              "CREATE ALKES MULTIPLE",
              "DELETE ALKES",
              "DELETE ALKES MULTIPLE",
              "DELETE SEMUA",
              "AMBIL ITEM",
              "SIMPAN ORDER",
              "CREATE TINDAKAN",
            ],
          },
          {
            name: "Inform Consent",
            allows: [
              "READ",
              "CETAK LABEL",
              "RIWAYAT",
              "TUTUP SEMUA FORM",
              "BUKA SEMUA FORM",
              "CREATE",
            ],
          },
          {
            name: "FPO",
            allows: [
              "READ",
              "CREATE PEMBERIAN OBAT",
              "UPDATE PEMBERIAN OBAT",
              "CETAK LABEL",
              "RIWAYAT",
              "SEMBUNYIKAN DETAIL PASIEN",
              "TANGGAL PEMERIKSAAN",
              "TANGGAL PEMBERIAN OBAT",
            ],
          },
          {
            name: "Unggah Berkas",
            allows: [
              "READ",
              "UPDATE FILE TERUNGGAH",
              "DELETE FILE TERUNGGAH",
              "CETAK LABEL",
              "RIWAYAT",
              "SEMBUNYIKAN DETAIL PASIEN",
              "CARI FILE",
              "TAMPILAN LIST",
              "TAMPILAN GRID",
            ],
          },
          {
            name: "Resume & Discharge",
            allows: [
              "READ",
              "CETAK LABEL",
              "RIWAYAT",
              "SEMBUNYIKAN DETAIL PASIEN",
              "TUTUP SEMUA FORM",
              "BUKA SEMUA FORM",
              "CETAK RESUME MEDIS",
              "SIMPAN RESUME MEDIS",
              "DISCHARGE",
            ],
          },
          {
            name: "Cetak Hasil & Surat",
            allows: [
              "READ",
              "CETAK LABEL",
              "RIWAYAT",
              "SEMBUNYIKAN DETAIL PASIEN",
              "TUTUP SEMUA FORM",
              "BUKA SEMUA FORM",
              "CETAK HASIL",
              "CREATE SURAT",
              "DELETE SURAT KETERANGAN",
              "CETAK SURAT",
            ],
          },
        ],
      },
    ],
  },
  {
    module: "Farmasi",
    sub_modules: [
      {
        name: "Panggil Antrian",
        allows: ["PANGGIL", "LEWATI", "VERIFIKASI", "PENYERAHAN OBAT"],
      },
      {
        name: "Resep Dokter",
        allows: [
          "READ",
          "UPDATE OBAT",
          "BATAL ORDER",
          "PINDAH LOKASI ORDER",
          "CETAK",
          "SIMPAN TELAAH",
          "VERIFIKASI",
          "EDIT OBAT",
          "SIMPAN EDIT",
          "OBAT DIGERUS",
          "SIMPAN & UBAH MENJADI RACIKAN",
          "BATAL",
          "(MENUNGGU PEMBAYARAN) CETAK",
          "(OBAT DISIAPKAN TUNAI) CETAK",
          "OBAT SIAP DISERAHKAN",
          "BATAL",
          "CETAK",
          "OBAT SIAP DISERAHKAN",
          "BATAL PENYERAHAN",
          "(PENYERAHAN OBAT) CETAK",
          "SERAHKAN OBAT",
        ],
      },
    ],
  },
]);

const permissions = ref(
  permissionsItem.value.map((item) => ({
    modul: item.module,
    checked: false, // Track if the module is checked
    sub_modules: item.sub_modules.map((subItem) => ({
      name: subItem.name,
      checked: false,
      features: subItem.features
        ? subItem.features.map((featureItem) => ({
            name: featureItem.name,
            checked: false,
            allows: featureItem.allows.map((allow) => ({
              name: allow,
              checked: false,
            })),
          }))
        : [], // If no features, set empty array
      // If no features, map allows directly on the sub_module level
      allows: subItem.allows
        ? subItem.allows.map((allow) => ({
            name: allow,
            checked: false, // Track if the allow is checked
          }))
        : [], // If no allows, set empty array
    })),
  }))
);

const onSubmit = () => {
  const selectedPermissions = permissions.value
    .filter((module) => module.checked) // Only selected modules
    .map((module) => ({
      modul: module.modul,
      sub_modules: module.sub_modules
        .filter((subModule) => subModule.checked) // Only selected sub_modules
        .map((subModule) => ({
          name: subModule.name,

          // If subModule has features, map selected features and their allows
          features: subModule.features
            ? subModule.features
                .filter((feature) => feature.checked) // Only selected features
                .map((feature) => ({
                  name: feature.name,
                  allows: feature.allows
                    .filter((allow) => allow.checked) // Only selected allows in features
                    .map((allow) => allow.name),
                }))
            : [],

          // Map allows if there are no features
          allows: subModule.allows
            ? subModule.allows
                .filter((allow) => allow.checked) // Only selected allows in sub_modules
                .map((allow) => allow.name)
            : [],
        })),
    }));

  console.log(selectedPermissions); // Log the selected permissions for testing
};
</script>

<template>
  <Card
    pt:body:class="h-full pt-0 overflow-auto"
    pt:content:class="h-full overflow-auto"
  >
    <template #header>
      <div class="flex items-center justify-between gap-5 p-5">
        <CustomButton label="" icon="PhArrowClockwise" @click="" />
        <CustomBreadCrumb
          :home="dataBreadHome"
          :model="dataBreadCrumb"
          class="grow"
        />
        <CustomButton
          label="Kembali"
          icon="PhCaretLeft"
          @click="emit('back')"
          background-color="bg-white"
          border-color="border-adameds-300"
          text-color="text-adameds-300"
        />
      </div>
    </template>
    <template #content>
      <CustomAccordion no-border initial-state="0">
        <template #header> Data Faskes </template>
        <template #content>
          <CustomSelect
            label="Faskes"
            v-model="faskesUuid"
            place-holder="Pilih Faskes"
            :options="faskesPayload"
            option-label="name"
            option-value="uuid"
            class="mt-5"
          />
        </template>
        <template #collapseIcon>
          <CustomButton
            icon="PhCaretUp"
            backgroundColor="bg-transparent"
            textColor="text-adameds-300"
          />
        </template>
        <template #expandIcon>
          <CustomButton
            icon="PhCaretDown"
            backgroundColor="bg-transparent"
            textColor="text-adameds-300"
          />
        </template>
      </CustomAccordion>
      <CustomAccordion no-border initial-state="0">
        <template #header> Data User </template>
        <template #content>
          <div class="grid grid-cols-12 gap-5 mt-4">
            <div class="flex items-end col-span-12 gap-y-5">
              <CustomSelect
                label="Praktisi"
                v-model="praktisiUuid"
                place-holder="Cari & Pilih Praktisi"
                :options="praktisiPayload"
                option-label="name"
            option-value="uuid"
                class="grow"
              />
              <CustomButton
                label="Cari"
                icon="PhMagnifyingGlass"
                class="ml-5 mr-2.5"
              />
              <CustomButton
                label="Reset"
                background-color="bg-transparent"
                border-color="border-adameds-300"
                text-color="text-adameds-300"
              />
            </div>
            <div
              class="grid grid-flow-col grid-cols-12 grid-rows-2 gap-5 border rounded-[10px] border-adameds-300 col-span-12 p-5"
            >
              <div class="flex flex-col col-span-4">
                <div class="font-semibold underline text-SM">Nama Pegawai</div>
                <div class="font-normal text-normal">Nama Lengkap1</div>
              </div>
              <div class="flex flex-col col-span-4">
                <div class="font-semibold underline text-SM">NIK</div>
                <div class="font-normal text-normal">Nama Lengkap2</div>
              </div>
              <div class="flex flex-col col-span-4">
                <div class="font-semibold underline text-SM">Tanggal Lahir</div>
                <div class="font-normal text-normal">Nama Lengkap3</div>
              </div>
              <div class="flex flex-col col-span-4">
                <div class="font-semibold underline text-SM">Jenis Kelamin</div>
                <div class="font-normal text-normal">Nama Lengkap4</div>
              </div>
            </div>

            <CustomInputNumber
              label="No. Handphone"
              placeholder="08xx-xxxx-xxxx"
              class="col-span-6"
              :invalid="!!errors.phone"
              :invalidMessage="errors.phone"
            />
            <CustomTextfield
              label="Email"
              v-model="email"
              placeholder="Email"
              class="col-span-6"
              :invalid="!!errors.email"
              :invalidMessage="errors.email"
            />
          </div>
        </template>
        <template #collapseIcon>
          <CustomButton
            icon="PhCaretUp"
            backgroundColor="bg-transparent"
            textColor="text-adameds-300"
          />
        </template>
        <template #expandIcon>
          <CustomButton
            icon="PhCaretDown"
            backgroundColor="bg-transparent"
            textColor="text-adameds-300"
          />
        </template>
      </CustomAccordion>
      <CustomAccordion no-border initial-state="0">
        <template #header> Akun </template>
        <template #content>
          <div class="grid grid-cols-12 gap-5 mt-5">
            <CustomTextfield
              v-model="username"
              label="Username"
              placeholder="Username"
              :invalid="!!errors.username"
              :invalidMessage="errors.username"
              class="col-span-4"
            />

            <CustomTextfield
              v-model="password"
              label="Password"
              placeholder="**"
              :type="showPassword ? 'text' : 'password'"
              :invalid="errors.password ? true : false"
              :invalidMessage="errors.password"
              :appendIcon="showPassword ? 'PhEyeSlash' : 'PhEye'"
              @clickAppend="showPassword = !showPassword"
              class="col-span-4"
            />
            <CustomTextfield
              v-model="confirmPassword"
              label="Verify Password"
              placeholder="**"
              :type="showConfirmPassword ? 'text' : 'password'"
              :invalid="errors.confirmPassword ? true : false"
              :invalidMessage="errors.confirmPassword"
              :appendIcon="showConfirmPassword ? 'PhEyeSlash' : 'PhEye'"
              @clickAppend="showConfirmPassword = !showConfirmPassword"
              class="col-span-4"
            />
          </div>
        </template>
        <template #collapseIcon>
          <CustomButton
            icon="PhCaretUp"
            backgroundColor="bg-transparent"
            textColor="text-adameds-300"
          />
        </template>
        <template #expandIcon>
          <CustomButton
            icon="PhCaretDown"
            backgroundColor="bg-transparent"
            textColor="text-adameds-300"
          />
        </template>
      </CustomAccordion>
      <!-- Modul & Permission -->
      <CustomAccordion no-border initial-state="0">
        <template #header> Modul & Permission </template>
        <template #content>
          <div class="grid grid-cols-12 gap-5 pt-5">
            <!-- Role Selection -->
            <CustomSelect
              label="Role"
              place-holder="Pilih Role"
              class="col-span-12"
              :options="rolePayload"
              option-label="name"
            option-value="uuid"
            />

            <!-- Loop through all modules -->
            <div
              v-for="(menuItem, menuIndex) in permissions"
              :key="menuItem.modul"
              class="col-span-12"
            >
              <!-- Module level -->
              <CustomAccordion
                header-class="bg-adameds-50"
                :open-with-header="false"
              >
                <template #header>
                  <div class="flex items-center gap-2.5">
                    <Checkbox
                      v-model="menuItem.checked"
                      :inputId="menuItem.modul"
                      :value="menuItem.modul"
                      name="menuItem"
                      :dt="{
                        checkedBackground: '#14B8A6',
                        checkedHoverBackground: '#14B8A6',
                        borderColor: '#98A2B3',
                      }"
                    />
                    <label :for="menuItem.modul">{{ menuItem.modul }}</label>
                  </div>
                </template>

                <template #content>
                  <!-- Loop through all sub-modules -->
                  <div
                    v-for="(subMenuItem, subMenuIndex) in menuItem.sub_modules"
                    :key="subMenuItem.name"
                  >
                    <!-- Submodule level -->
                    <CustomAccordion
                      class="col-span-12 pt-5"
                      header-class="bg-adameds-50"
                      :open-with-header="false"
                    >
                      <template #header>
                        <div class="flex items-center gap-2.5">
                          <Checkbox
                            v-model="subMenuItem.checked"
                            :inputId="subMenuItem.name"
                            :value="subMenuItem.name"
                            name="subMenuItem"
                            :dt="{
                              checkedBackground: '#14B8A6',
                              checkedHoverBackground: '#14B8A6',
                              borderColor: '#98A2B3',
                            }"
                          />
                          <label
                            :for="subMenuItem.name"
                            class="font-normal text-SM text-grey-400"
                          >
                            {{ subMenuItem.name }}
                          </label>
                        </div>
                      </template>

                      <template #content>
                        <!-- Check if the submodule has features -->
                        <div
                          v-if="
                            subMenuItem.features && subMenuItem.features.length
                          "
                        >
                          <!-- Loop through features -->
                          <div
                            v-for="(
                              feature, featureIndex
                            ) in subMenuItem.features"
                            :key="feature.name"
                          >
                            <CustomAccordion
                              class="col-span-12 pt-5"
                              header-class="bg-adameds-50"
                              :open-with-header="false"
                            >
                              <template #header>
                                <div class="flex items-center gap-2.5">
                                  <Checkbox
                                    v-model="feature.checked"
                                    :inputId="feature.name"
                                    :value="feature.name"
                                    name="featureItem"
                                    :dt="{
                                      checkedBackground: '#14B8A6',
                                      checkedHoverBackground: '#14B8A6',
                                      borderColor: '#98A2B3',
                                    }"
                                  />
                                  <label
                                    :for="feature.name"
                                    class="font-normal text-SM text-grey-400"
                                  >
                                    {{ feature.name }}
                                  </label>
                                </div>
                              </template>

                              <template #content>
                                <!-- Actions level for each feature -->
                                <div class="flex flex-wrap gap-2.5 pt-5">
                                  <div
                                    v-for="(
                                      action, actionIndex
                                    ) in feature.allows"
                                    :key="action.name"
                                  >
                                    <CustomCheckbox
                                      v-model="action.checked"
                                      :title="action.name"
                                      subTitle=""
                                    />
                                  </div>
                                </div>
                              </template>
                            </CustomAccordion>
                          </div>
                        </div>

                        <!-- If no features, show actions for submodule directly -->
                        <div v-else>
                          <!-- Render allows directly for submodules without features -->
                          <div class="flex flex-wrap gap-2.5 pt-5">
                            <div
                              v-for="(
                                action, actionIndex
                              ) in subMenuItem.allows"
                              :key="action.name"
                            >
                              <CustomCheckbox
                                v-model="action.checked"
                                :title="action.name"
                                subTitle=""
                              />
                            </div>
                          </div>
                        </div>
                      </template>
                    </CustomAccordion>
                  </div>
                </template>
              </CustomAccordion>
            </div>
          </div>
        </template>

        <template #collapseIcon>
          <CustomButton
            icon="PhCaretUp"
            backgroundColor="bg-transparent"
            textColor="text-adameds-300"
          />
        </template>
        <template #expandIcon>
          <CustomButton
            icon="PhCaretDown"
            backgroundColor="bg-transparent"
            textColor="text-adameds-300"
          />
        </template>
      </CustomAccordion>
    </template>
    <template #footer>
      <div class="flex justify-end gap-2.5 px-5 py-2.5">
        <CustomButton label="Batal" @click="emit('back')" />
        <CustomButton label="Simpan" @click="onSubmit" />
      </div>
    </template>
  </Card>
</template>
