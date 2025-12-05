from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load decision tree & disease DB
with open("decision_tree.json", "r", encoding="utf-8") as f:
    tree_data = json.load(f)

with open("diseases.json", "r", encoding="utf-8") as f:
    diseases_db_raw = json.load(f)
    diseases_db = {item['name']: item for item in diseases_db_raw}

@app.get("/question/{node_id}")
def get_question(node_id: str):
    node = tree_data['nodes'].get(node_id)
    if not node:
        return {"error": "Node tidak ditemukan"}
    return node

@app.post("/diagnosis")
def post_diagnosis(node_id: str):
    node = tree_data['nodes'].get(node_id)
    if not node or node['type'] != "diagnosis":
        return {"error": "Node diagnosis tidak ditemukan"}
    disease_name = node.get("disease_name")
    msg = node.get("message")
    info = diseases_db.get(disease_name, {})
    return {
        "disease_name": disease_name,
        "message": msg,
        "info": info
    }

@app.get("/diagnosis_details/{disease_name}")
def get_diagnosis_details(disease_name: str):
    info = diseases_db.get(disease_name)

    if info:
        return {
            "name": disease_name,
            "description": info["description"],
            "causes": info["causes"],
            "symptoms": info["symptoms"],
            "treatment": info["treatment"],
            "reference": info["reference"],
            "message": info.get("message", "")
        }
    else:
        return {
            "name": disease_name,
            "description": "",
            "causes": [],
            "symptoms": [],
            "treatment": [],
            "reference": [],
            "message": ""
        }

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)

