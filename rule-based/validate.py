import json
import sys

def load_json(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        return json.load(f)

def test_scenario(tree_data, inputs, expected_diagnosis):
    current_node_id = "root"
    steps_taken = []
    
    # Simulasi berjalan menelusuri tree
    input_index = 0
    
    while True:
        node = tree_data['nodes'].get(current_node_id)
        
        # 1. Jika sampai di Diagnosis
        if node['type'] == 'diagnosis':
            actual_diagnosis = node.get('disease_name')
            
            # Cek apakah sesuai harapan
            if actual_diagnosis == expected_diagnosis:
                return True, f" PASS: {expected_diagnosis}"
            else:
                return False, f"FAIL: Harapan '{expected_diagnosis}', tapi dapetnya '{actual_diagnosis}'"

        # 2. Jika masih Pertanyaan
        elif node['type'] == 'question':
            # Ambil input simulasi
            if input_index >= len(inputs):
                return False, "FAIL: Input kurang (jalan buntu/loop)"
            
            user_choice_index = inputs[input_index] - 1 # Convert 1-based to 0-based
            input_index += 1
            
            # Validasi apakah pilihan ada
            if 0 <= user_choice_index < len(node['options']):
                next_node_id = node['options'][user_choice_index]['next']
                current_node_id = next_node_id
            else:
                return False, f"FAIL: Pilihan index {user_choice_index+1} tidak ada di node ini"

# --- DEFINISI SKENARIO UJI ---
# Format Input: [Jawaban Pertanyaan 1, Jawaban Pertanyaan 2, dst...]
# Angka sesuai urutan opsi di JSON (1, 2, 3...)

test_cases = [
    {
        "name": "Cek Pedikulosis",
        "inputs": [1, 1], # 1. Masalah Kulit -> 1. Ada Kutu
        "expected": "Pedikulosis Kapitis"
    },
    {
        "name": "Cek Psoriasis",
        "inputs": [1, 2, 2, 2, 1], # 1. Kulit -> 2. No Kutu -> 2. No Benjolan -> 2. Sisik Kering -> 1. Kuku Rusak
        "expected": "Psoriasis"
    },
    {
        "name": "Cek Alopecia Areata",
        "inputs": [2, 1, 2, 2, 1], # 2. Rontok -> 1. Patchy -> 2. Bukan Segitiga -> 2. Tidak Dicabut -> 1. Licin
        "expected": "Alopecia Areata"
    },
    {
        "name": "Cek Telogen Effluvium",
        "inputs": [2, 2, 2, 1], # 2. Rontok -> 2. Diffuse -> 2. No Kemo -> 1. Ada Stress/Sakit
        "expected": "Telogen Effluvium"
    }
]

if __name__ == "__main__":
    print("MEMULAI VALIDASI OTOMATIS...\n")
    tree_data = load_json('decision_tree.json')
    
    success_count = 0
    for case in test_cases:
        is_pass, message = test_scenario(tree_data, case['inputs'], case['expected'])
        print(f"Test '{case['name']}': {message}")
        if is_pass:
            success_count += 1
            
    print(f"\nSKOR AKHIR: {success_count}/{len(test_cases)} Skenario Valid.")