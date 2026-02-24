import google.generativeai as genai
import os
from dotenv import load_dotenv

# Carregar variáveis do .env.local ou .env
for path in [".env.local", "../.env.local", ".env", "../.env"]:
    if os.path.exists(path):
        load_dotenv(dotenv_path=path)
        break

class AIEngine:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables.")
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('models/gemini-flash-latest')

    def generate_article(self, topic, keywords):
        prompt = f"""
        Você é um especialista em SEO e Redação para Blogs de Tecnologia.
        Escreva um artigo completo e profissional sobre o tema: "{topic}".
        Use as seguintes palavras-chave: {', '.join(keywords)}.
        
        Requisitos do artigo:
        - Idioma: Português do Brasil.
        - Tamanho: Mínimo 1500 palavras.
        - Estrutura: Use H1 para o título, H2 e H3 para subtítulos.
        - Estilo: Informativo, prático e engajador.
        - SEO: Inclua uma introdução forte, listas (bullet points), conclusão e uma FAQ no final.
        - Formato: Markdown.
        
        Nichos Sugerido: IA para Criadores de Conteúdo.
        Foque em dicas práticas e ferramentas reais.
        """
        
        response = self.model.generate_content(prompt)
        return response.text

    def generate_seo_meta(self, content):
        prompt = f"""
        Com base no conteúdo abaixo, gere:
        1. Um Meta Title atraente (máximo 60 caracteres).
        2. Uma Meta Description impactante (máximo 160 caracteres).
        3. Um Slug de URL amigável.
        
        Conteúdo:
        {content[:2000]}
        
        Retorne apenas um JSON formatado com as chaves: title, description, slug.
        """
        
        response = self.model.generate_content(prompt)
        return response.text
