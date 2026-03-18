// app/dashboard/post/page.tsx

export default function CreatePostPage() {
  return (
    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
      <h1 className="text-2xl font-bold text-white mb-6">Create New Blog Post</h1>
      
      <form className="space-y-4">
        <input 
          type="text" 
          placeholder="Blog Title" 
          className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white"
        />
        <textarea 
          placeholder="Write your content here..." 
          className="w-full p-3 h-40 rounded-xl bg-white/5 border border-white/10 text-white"
        ></textarea>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold">
          Publish Post
        </button>
      </form>
    </div>
  );
}