import json
import time
import sys

def load_json(filename):
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Error: File '{filename}' tidak ditemukan.")
        sys.exit()
    except json.JSONDecodeError:
        print(f"Error: Format file '{filename}' salah.")
        sys.exit()

def print_slow(text, delay=0.01):
    for char in text:
        sys.stdout.write(char)
        sys.stdout.flush()
        time.sleep(delay)
    print()

def ask_question(node_data):
    """Menampilkan pertanyaan berdasarkan data node dari JSON"""
    print("\n" + "="*50)
    
    if "image_desc" in node_data:
        print(f"[GAMBAR: {node_data['image_desc']}]")
        print("-" * 50)
    
    print_slow(node_data['text'])
    
    # Tampilkan Opsi
    options = node_data['options']
    for idx, opt in enumerate(options, 1):
        print(f"{idx}. {opt['label']}")
    
    while True:
        choice = input("\n>> Masukkan nomor pilihan Anda: ").strip()
        if choice.isdigit():
            idx = int(choice) - 1
            if 0 <= idx < len(options):
                return options[idx]['next'] 
        print("Input salah. Masukkan nomor yang tersedia.")

def show_diagnosis(disease_name, diseases_db, custom_message=None):
    """Menampilkan hasil diagnosis"""
    print("\n" + "#"*60)
    
    if disease_name and disease_name in diseases_db:
        print(f"🔍 HASIL DIAGNOSIS: {disease_name.upper()}")
        print("#"*60)
        
        info = diseases_db[disease_name]
        
        print("\n🛑 PENYEBAB KEMUNGKINAN:")
        for cause in info['causes']:
            print(f" - {cause}")
            
        print("\n🤒 GEJALA KHAS:")
        for sym in info['symptoms']:
            print(f" - {sym}")
            
        print("\n💊 SARAN PENGOBATAN:")
        for treat in info['treatment']:
            print(f" - {treat}")

        if 'reference' in info and info['reference']:
            print("\n📚 REFERENSI:")
            for ref in info['reference']:
                print(f" - {ref}")
            
    else:
        # Jika diagnosis tidak ada di database atau hasil unknown
        print("HASIL ANALISIS:")
        print("#"*60)
        if custom_message:
            print(f"\n{custom_message}")
        else:
            print(f"\nPenyakit '{disease_name}' belum terdaftar di database kami.")
            
    print("\nDISCLAIMER: Ini adalah sistem pakar bantuan.")
    print("   Konsultasi dokter tetap disarankan.")
    print("#"*60)

def run_expert_system(tree_data, diseases_db):
    print("\nHalo! Saya HairExpert.")
    print("Mari kita cek kondisi rambut dan kulit kepala Anda.")
    
    current_node_id = "root"
    
    while True:
        # Ambil data node saat ini dari JSON
        node = tree_data['nodes'].get(current_node_id)
        
        if not node:
            print(f"Error: Node '{current_node_id}' tidak ditemukan di decision tree.")
            break
            
        # Cek tipe node: Apakah Pertanyaan atau Diagnosis?
        if node['type'] == 'question':
            # Jika pertanyaan, update current_node_id berdasarkan jawaban user
            next_node_id = ask_question(node)
            current_node_id = next_node_id
            
        elif node['type'] == 'diagnosis':
            # Jika diagnosis, tampilkan hasil dan stop loop
            d_name = node.get('disease_name')
            msg = node.get('message')
            show_diagnosis(d_name, diseases_db, msg)
            break

if __name__ == "__main__":
    tree_data = load_json('decision_tree.json') 
    diseases_db_raw = load_json('diseases.json') 
    
    diseases_db = {item['name']: item for item in diseases_db_raw}
    
    while True:
        run_expert_system(tree_data, diseases_db)
        
        again = input("\nIngin diagnosa ulang? (y/n): ").lower()
        if again != 'y':
            break