import os
import json
import requests
from dotenv import load_dotenv
from ai_engine import AIEngine
from seo_optimizer import SEOOptimizer

# Carregar variáveis do .env.local ou .env
# Tenta no diretório atual (se rodar na raiz do projeto) ou no pai (se rodar dentro de /automation)
for path in [".env.local", "../.env.local", ".env", "../.env"]:
    if os.path.exists(path):
        load_dotenv(dotenv_path=path)
        break

def post_to_supabase(title, slug, content, seo_meta):
    url = f"{os.getenv('SUPABASE_URL')}/rest/v1/posts"
    headers = {
        "apikey": os.getenv("SUPABASE_SERVICE_KEY"),
        "Authorization": f"Bearer {os.getenv('SUPABASE_SERVICE_KEY')}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
    }
    
    # Extrair dados do JSON de SEO
    try:
        seo_data = json.loads(seo_meta)
    except:
        seo_data = {"description": "", "slug": slug}

    payload = {
        "title": title,
        "slug": seo_data.get("slug", slug),
        "content": content,
        "excerpt": seo_data.get("description", ""),
        "cover_image": "https://images.unsplash.com/photo-1677442136019-21780ecad995" # Placeholder premium
    }
    
    response = requests.post(url, json=payload, headers=headers)
    if response.status_code in [200, 201]:
        print("Post publicado com sucesso no Supabase!")
    else:
        print(f"Erro ao publicar: {response.text}")

def main():
    topic = "Como usar a IA para automatizar seu workflow de criação de vídeo em 2025"
    keywords = ["automação de vídeo", "IA para criadores", "Gemini", "produtividade digital"]

    print(f"Gerando artigo sobre: {topic}...")
    
    engine = AIEngine()
    content = engine.generate_article(topic, keywords)
    
    print("Gerando metadados SEO...")
    seo_meta_raw = engine.generate_seo_meta(content)
    
    print("Publicando no Flowyn (Supabase)...")
    post_to_supabase(topic, "automacao-video-2025", content, seo_meta_raw)

if __name__ == "__main__":
    main()
