import { useEffect, useState, useCallback } from 'react'; 
import axios from 'axios';
import Login from '../src/pages/login'; 
import { useAuth } from './hooks/useAuth'; 

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const { isAuthenticated, logout, token } = useAuth(); 

  const fetchPosts = useCallback(() => {
    if (isAuthenticated) {
      axios.post('http://localhost:3002/api/posts/publicaciones')
        .then(res => setPosts(res.data))
        .catch(err => console.error("Error cargando posts:", err));
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]); 

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3002/api/posts/publicar-post', 
        {
          content: newPost,
          userId: 1 
        }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      setNewPost('');
      fetchPosts(); 
    } catch (err) {
      console.error("Error al publicar:", err.response?.data || err.message);
      alert("No se pudo publicar. Verifica la sesión.");
    }
  };

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-900">
      <div className="max-w-2xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-600 tracking-tight">SendFace</h1>
          <button 
            onClick={logout} 
            className="px-4 py-2 bg-white text-sm font-bold text-red-500 rounded-xl shadow-sm hover:bg-red-50 transition-colors border border-red-100"
          >
            Cerrar sesión
          </button>
        </header>

        <form onSubmit={handleCreatePost} className="mb-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 transition-all">
          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">¿En qué piensas?</label>
          <textarea 
            className="w-full p-4 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none resize-none text-lg transition-all"
            placeholder="Escribe algo increíble..."
            rows="3"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            required
          />
          <button 
            type="submit"
            className="mt-4 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-200"
          >
            Publicar ahora
          </button>
        </form>
        
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-400 uppercase tracking-widest border-b border-gray-200 pb-2">Feed Global</h2>
          {posts.length > 0 ? (
            posts.map(post => (
              <div key={post.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <p className="text-gray-800 text-xl leading-relaxed mb-4">{post.content}</p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-50 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                      {post.userId}
                    </div>
                    <span className="font-bold text-blue-500">Usuario #{post.userId}</span>
                  </div>
                  <span className="text-gray-400 font-medium">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400 italic text-lg">Aún no hay historias que contar...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;