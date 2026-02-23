import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  cover_image: string
  published_at: string
}

export default async function Home() {
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .order('published_at', { ascending: false })

  const postList = posts as Post[] | null

  return (
    <main>
      <nav className="navbar">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>CriatIA</Link>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/">Início</Link>
            <Link href="/sobre">Sobre</Link>
          </div>
        </div>
      </nav>

      <div className="container">
        <section className="hero">
          <h1 className="premium-gradient">A Nova Era da Criatividade Artificial</h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
            Explorando as fronteiras da IA para transformar a produção de conteúdo digital em 2025.
          </p>
        </section>

        <section style={{ padding: '4rem 0' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Artigos Recentes</h2>
          <div className="grid-posts">
            {postList?.map((post) => (
              <Link href={`/posts/${post.slug}`} key={post.id} className="glass-card" style={{ padding: '1.5rem', display: 'block' }}>
                <div style={{ height: '200px', backgroundColor: '#1a1a1e', borderRadius: '8px', marginBottom: '1.5rem', backgroundImage: post.cover_image ? `url(${post.cover_image})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <h3 style={{ marginBottom: '0.75rem' }}>{post.title}</h3>
                <p style={{ opacity: 0.7, fontSize: '0.9rem', marginBottom: '1rem' }}>{post.excerpt}</p>
                <span style={{ color: 'var(--secondary)', fontWeight: '600', fontSize: '0.85rem' }}>Ler mais →</span>
              </Link>
            ))}

            {(!postList || postList.length === 0) && (
              <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '4rem', opacity: 0.5 }}>
                <p>Nenhum post encontrado ainda. A IA está preparando as novidades!</p>
              </div>
            )}
          </div>
        </section>
      </div>

      <footer style={{ padding: '4rem 0', borderTop: '1px solid var(--border)', textAlign: 'center', opacity: 0.6, fontSize: '0.9rem' }}>
        <p>&copy; 2025 CriatIA - Powered by Intelligence</p>
      </footer>
    </main>
  )
}
