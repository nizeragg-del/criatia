import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const { data: post } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single()

    if (!post) {
        notFound()
    }

    return (
        <main>
            <nav className="navbar">
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link href="/" className="logo-container">
                        <div className="logo-symbol">F</div>
                        <span className="logo-text">Flowyn<span className="logo-dot">.</span></span>
                    </Link>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <Link href="/">Início</Link>
                        <Link href="/sobre">Sobre</Link>
                    </div>
                </div>
            </nav>

            <div className="container" style={{ padding: '4rem 2rem' }}>
                <article style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>{post.title}</h1>
                        <div style={{ opacity: 0.6, fontSize: '0.9rem' }}>
                            Publicado em {new Date(post.published_at).toLocaleDateString('pt-BR')}
                        </div>
                    </header>

                    {post.cover_image && (
                        <div style={{ width: '100%', height: '400px', borderRadius: '16px', overflow: 'hidden', marginBottom: '3rem' }}>
                            <img src={post.cover_image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    )}

                    <div className="markdown-content">
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>
                </article>
            </div>

            <footer style={{ padding: '4rem 0', borderTop: '1px solid var(--border)', textAlign: 'center', opacity: 0.6, fontSize: '0.9rem' }}>
                <p>&copy; 2025 Flowyn - Powered by Intelligence</p>
            </footer>
        </main>
    )
}
