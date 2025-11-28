import json

# 1. LOAD DATA
def load_data():
    try:
        with open('diseases.json', 'r') as f:
            diseases_data = json.load(f)
        with open('decision_tree.json', 'r') as f:
            tree_data = json.load(f)
        return diseases_data, tree_data
    except FileNotFoundError:
        print("Error: File JSON tidak ditemukan.")
        exit()

# 2. LOGIKA TRAVERSE 
def traverse_tree(node, history=None):
    if history is None:
        history = []
    
    current_step = {"question": node['question'], "answer": ""}
    
    print(f"\n[TANYA]: {node['question']}")
    for i, option in enumerate(node['options']):
        print(f"{i + 1}. {option['label']}")
    
    try:
        raw_input = input("Pilih jawaban (angka): ")
        choice = int(raw_input) - 1
        if choice < 0 or choice >= len(node['options']):
            print("Pilihan tidak valid, coba lagi.")
            return traverse_tree(node, history)
    except ValueError:
        print("Masukkan angka saja.")
        return traverse_tree(node, history)
    
    selected_option = node['options'][choice]
    
    current_step["answer"] = selected_option['label']
    history.append(current_step) # <--- Simpan tracking
    
    if "result" in selected_option:
        return selected_option["result"], history 
    elif "next_node" in selected_option:
        return traverse_tree(selected_option["next_node"], history)
    else:
        return "Tidak diketahui", history

# 3. FITUR PENJELASAN (XAI)
def show_explanation(history):
    print("\n" + "="*40)
    print("PENJELASAN DIAGNOSA (WHY?)")
    print("="*40)
    print("Sistem menyimpulkan ini berdasarkan jawabanmu:")
    for i, step in enumerate(history):
        print(f"{i+1}. {step['question']}")
        print(f"   --> Jawaban: {step['answer']}")

# 4. TAMPILKAN DETAIL PENYAKIT
def show_diagnosis(disease_name, diseases_data):
    result_data = next((item for item in diseases_data if item["name"] == disease_name), None)
    
    print("\n" + "="*40)
    print(f"HASIL DIAGNOSA FINAL: {disease_name.upper()}")
    print("="*40)
    
    if result_data:
        print(f"\n[PENYEBAB]:")
        for cause in result_data['causes']:
            print(f"- {cause}")
        print(f"\n[GEJALA]:")
        for sym in result_data['symptoms']:
            print(f"- {sym}")
        print(f"\n[PENGOBATAN]:")
        for treat in result_data['treatment']:
            print(f"- {treat}")
    else:
        print("Data detail tidak ditemukan di database.")

# --- MAIN PROGRAM ---
if __name__ == "__main__":
    print("--- SISTEM PAKAR HAIR EXPERT (RULE BASED) ---")
    
    diseases_data, tree_data = load_data()
    
    diagnosis_result, user_history = traverse_tree(tree_data)
    
    # Tampilkan Alasan 
    show_explanation(user_history)
    
    # Tampilkan Detail Penyakit
    show_diagnosis(diagnosis_result, diseases_data)