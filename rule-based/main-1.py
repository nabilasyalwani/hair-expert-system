import json

# ==========================================
# Load Data
# ==========================================
with open("all_diseases.json", "r") as f:
    diseases_data = json.load(f)

with open("clustering-diseases.json", "r") as f:
    clusters = json.load(f)


# ==========================================
# Helper Functions
# ==========================================
def get_disease_details(disease_name):
    for disease in diseases_data:
        if disease["name"] == disease_name:
            return disease
    return None


def filter_by_symptoms(symptoms):
    possible = set()
    for symptom in symptoms:
        for cluster_symptom, disease_list in clusters['kemiripan_gejala'].items():
            if symptom.lower() == cluster_symptom.lower():
                possible.update(disease_list)
    return possible


def filter_by_causes(possible_diseases, causes):
    final = set()
    for cause in causes:
        for cluster_cause, disease_list in clusters['kemiripan_penyebab'].items():
            if cause.lower() == cluster_cause.lower():
                final.update(set(disease_list).intersection(possible_diseases))
    return final if final else possible_diseases


def decision_tree_rules(symptoms, causes):
    diagnosis = set()

    # --- Kerontokan rambut ---
    if "kerontokan_bercak_patch" in symptoms or "kerontokan_patch" in symptoms:
        if "dipicu_stres" in causes or "penyakit_autoimun" in causes:
            diagnosis.add("Alopecia Areata")
        if "Temporal Triangular Alopecia".lower() in " ".join(symptoms).lower():
            diagnosis.add("Temporal Triangular Alopecia")
        if "Trikotilomania".lower() in " ".join(symptoms).lower():
            diagnosis.add("Trikotilomania")
        if "Folliculitis".lower() in " ".join(symptoms).lower():
            diagnosis.add("Folliculitis")

    elif "kerontokan_umum" in symptoms or "kerontokan_cepat_mendadak" in symptoms:
        if "disebabkan_obat" in causes:
            diagnosis.add("Anagen Effluvium")
        if "dipicu_stres" in causes or "faktor_hormonal" in causes:
            diagnosis.add("Telogen Effluvium")

    elif "menipis_progresif" in symptoms:
        diagnosis.add("Androgenic Alopecia")

    # --- Gatal / ketombe / rambut patah ---
    if "gatal_pruritus" in symptoms:
        if "Psoriasis" in symptoms or "perubahan_kuku" in symptoms:
            diagnosis.add("Psoriasis")
        elif "Seborrheic Dermatitis".lower() in " ".join(symptoms).lower():
            diagnosis.add("Seborrheic Dermatitis")
        elif "Pedikulosis Kapitis".lower() in " ".join(symptoms).lower():
            diagnosis.add("Pedikulosis Kapitis")

    if "rambut_patah" in symptoms:
        diagnosis.add("Trikotilomania")

    # Apply clustering filters
    possible_by_symptoms = filter_by_symptoms(symptoms)
    diagnosis = diagnosis.union(possible_by_symptoms)
    final_diagnosis = filter_by_causes(diagnosis, causes)

    return final_diagnosis


def display_results(disease_list):
    if not disease_list:
        print("Tidak ada diagnosis yang cocok. Periksa input gejala/penyebab.")
        return
    print("\n==== Hair Expert System ====")
    for disease in disease_list:
        details = get_disease_details(disease)
        if not details:
            continue
        print(f"\nNama Penyakit: {details['name']}")
        print("Penyebab:")
        for c in details['causes']:
            print(f" - {c}")
        print("Gejala:")
        for s in details['symptoms']:
            print(f" - {s}")
        print("Pengobatan:")
        for t in details['treatment']:
            print(f" - {t}")


# ==========================================
# Main Program: Pilihan + Input
# ==========================================
if __name__ == "__main__":
    print("=== Hair Expert System ===\n")

    # Tampilkan pilihan gejala
    print("Pilih gejala pasien dari list berikut (gunakan key cluster, pisahkan dengan koma):")
    for key in clusters['kemiripan_gejala']:
        print(f" - {key}")
    symptoms_input = input("\nMasukkan gejala pasien: ").strip().split(",")
    symptoms_input = [s.strip() for s in symptoms_input]

    # Tampilkan pilihan penyebab
    print("\nPilih penyebab/faktor pasien dari list berikut (gunakan key cluster, pisahkan dengan koma):")
    for key in clusters['kemiripan_penyebab']:
        print(f" - {key}")
    causes_input = input("\nMasukkan penyebab/faktor pasien: ").strip().split(",")
    causes_input = [c.strip() for c in causes_input]

    # Diagnosis
    result = decision_tree_rules(symptoms_input, causes_input)

    # Tampilkan hasil
    display_results(result)
